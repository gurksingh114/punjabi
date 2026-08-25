/**
 * Kid-friendly Gurmukhi stroke recognizer.
 * $1-style resample + order-sensitive scoring for tracing,
 * $P-style point-cloud match for freehand "what letter is this?"
 */

import { GURMUKHI_STROKE_DIRECTIONS } from "../data/strokeDirections";
import type { StrokePoint } from "../types";

export type Pt = { x: number; y: number };

export type StrokeScore = {
  score: number;
  reversed: boolean;
  coverage: number;
  tooShort: boolean;
};

export type LetterGuess = {
  char: string;
  name: string;
  gurmukhiName: string;
  score: number;
};

const SAMPLE = 64;

export function dist(a: Pt, b: Pt) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pathLength(points: Pt[]) {
  let n = 0;
  for (let i = 1; i < points.length; i++) n += dist(points[i - 1], points[i]);
  return n;
}

export function densify(points: StrokePoint[], steps = 12): Pt[] {
  if (points.length === 0) return [];
  const out: Pt[] = [{ x: points[0].x, y: points[0].y }];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

export function resample(points: Pt[], n = SAMPLE): Pt[] {
  if (points.length === 0) return [];
  if (points.length === 1) return Array.from({ length: n }, () => ({ ...points[0] }));
  const pts = points.map((p) => ({ ...p }));
  const interval = pathLength(pts) / (n - 1);
  if (interval === 0) return Array.from({ length: n }, () => ({ ...pts[0] }));
  const out: Pt[] = [pts[0]];
  let d = 0;
  for (let i = 1; i < pts.length && out.length < n; ) {
    const gap = dist(pts[i - 1], pts[i]);
    if (d + gap >= interval) {
      const t = (interval - d) / gap;
      const q = {
        x: pts[i - 1].x + t * (pts[i].x - pts[i - 1].x),
        y: pts[i - 1].y + t * (pts[i].y - pts[i - 1].y),
      };
      out.push(q);
      pts.splice(i, 0, q);
      d = 0;
      i++;
    } else {
      d += gap;
      i++;
    }
  }
  while (out.length < n) out.push({ ...pts[pts.length - 1] });
  return out;
}

function centroid(points: Pt[]): Pt {
  let x = 0;
  let y = 0;
  for (const p of points) {
    x += p.x;
    y += p.y;
  }
  const n = points.length || 1;
  return { x: x / n, y: y / n };
}

/** Translate to origin, scale into a unit square. No rotation — Gurmukhi direction matters. */
export function normalizeCloud(points: Pt[]): Pt[] {
  if (points.length === 0) return [];
  const c = centroid(points);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const shifted = points.map((p) => {
    const q = { x: p.x - c.x, y: p.y - c.y };
    minX = Math.min(minX, q.x);
    minY = Math.min(minY, q.y);
    maxX = Math.max(maxX, q.x);
    maxY = Math.max(maxY, q.y);
    return q;
  });
  const scale = Math.max(maxX - minX, maxY - minY, 1e-6);
  return shifted.map((p) => ({ x: p.x / scale, y: p.y / scale }));
}

function meanPairedDistance(a: Pt[], b: Pt[]) {
  const n = Math.min(a.length, b.length);
  if (!n) return 1;
  let s = 0;
  for (let i = 0; i < n; i++) s += dist(a[i], b[i]);
  return s / n;
}

function cloudDistance(user: Pt[], tmpl: Pt[]) {
  const n = Math.min(user.length, tmpl.length);
  const used = new Uint8Array(n);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let best = Infinity;
    let bestJ = 0;
    for (let j = 0; j < n; j++) {
      if (used[j]) continue;
      const d = dist(user[i], tmpl[j]);
      if (d < best) {
        best = d;
        bestJ = j;
      }
    }
    used[bestJ] = 1;
    sum += best;
  }
  return n ? sum / n : 1;
}

/**
 * Score a single guided stroke against its template in the same canvas space.
 * Generous for toddlers: direction + coverage + shape.
 */
export function scoreStroke(user: Pt[], template: Pt[], canvasMin: number): StrokeScore {
  const tooShort = user.length < 6 || pathLength(user) < canvasMin * 0.12;
  if (!template.length) {
    return { score: 0, reversed: false, coverage: 0, tooShort };
  }

  const hitR = Math.max(36, canvasMin * 0.16);
  let hits = 0;
  for (const tp of template) {
    if (user.some((u) => dist(u, tp) < hitR)) hits += 1;
  }
  const coverage = hits / template.length;

  if (tooShort) {
    return { score: coverage * 0.4, reversed: false, coverage, tooShort: true };
  }

  const ru = resample(user);
  const rt = resample(template);
  const forward = meanPairedDistance(ru, rt);
  const backward = meanPairedDistance(ru, [...rt].reverse());
  const reversed = backward < forward * 0.88;
  const shape = reversed ? backward : forward;
  const diag = Math.hypot(canvasMin, canvasMin);
  const shapeScore = Math.max(0, 1 - shape / (diag * 0.28));
  const startBonus = dist(user[0], template[0]) < hitR * 1.2 ? 0.08 : 0;
  const endBonus = dist(user[user.length - 1], template[template.length - 1]) < hitR * 1.4 ? 0.08 : 0;
  const score = Math.min(1, coverage * 0.55 + shapeScore * 0.35 + startBonus + endBonus);

  return { score, reversed, coverage, tooShort: false };
}

type LetterTemplate = {
  char: string;
  name: string;
  gurmukhiName: string;
  cloud: Pt[];
};

let cached: LetterTemplate[] | null = null;

export function letterGestureTemplates(): LetterTemplate[] {
  if (cached) return cached;
  cached = Object.values(GURMUKHI_STROKE_DIRECTIONS)
    .filter((d) => d.char.length === 1)
    .map((d) => {
      const raw = d.strokes.flatMap((s) => densify(s.pathPoints, 10));
      return {
        char: d.char,
        name: d.name,
        gurmukhiName: d.gurmukhiName,
        cloud: normalizeCloud(resample(raw)),
      };
    });
  return cached;
}

/** Freehand: what Gurmukhi letter does this drawing look like? */
export function recognizeLetter(strokes: Pt[][]): LetterGuess[] {
  const raw = strokes.flat();
  if (raw.length < 8) return [];
  const cloud = normalizeCloud(resample(raw));
  const ranked = letterGestureTemplates()
    .map((t) => {
      const d = cloudDistance(cloud, t.cloud);
      const score = Math.max(0, 1 - d / 0.55);
      return { char: t.char, name: t.name, gurmukhiName: t.gurmukhiName, score };
    })
    .sort((a, b) => b.score - a.score);
  return ranked.slice(0, 3);
}

export function hintForStroke(result: StrokeScore): string {
  if (result.tooShort) return "Keep drawing along the line…";
  if (result.reversed) return "Other way! Start on the star.";
  if (result.coverage < 0.45) return "Follow more of the dotted line!";
  if (result.score < 0.62) return "Almost — stay on the letter!";
  return "Star!";
}
