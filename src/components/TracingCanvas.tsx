import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { GURMUKHI_LETTERS, GURMUKHI_NUMBERS } from "../data/punjabiData";
import { GurmukhiLetter } from "../types";
import {
  playSparkle,
  playSuccessChime,
  playCelebration,
  speakPunjabi,
  speakLetterDetails,
  playChime,
  speakPraise,
} from "../utils/audio";

interface TracingCanvasProps {
  initialLetter?: GurmukhiLetter | null;
  onTraceCompleted: (charName: string) => void;
}

type Pt = { x: number; y: number };

const CRAYONS = [
  { id: "saffron", color: "#c97820", label: "Gold" },
  { id: "teal", color: "#2a6b63", label: "Peacock" },
  { id: "rose", color: "#c45c4a", label: "Clay" },
] as const;

function glyphFont(h: number) {
  return `900 ${Math.floor(h * 0.72)}px "Noto Sans Gurmukhi", "Baloo Paaji 2", sans-serif`;
}

function drawGlyph(
  ctx: CanvasRenderingContext2D,
  char: string,
  w: number,
  h: number,
  mode: "fill" | "stroke",
  color: string,
  lineWidth = 22,
) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = glyphFont(h);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  const x = w / 2;
  const y = h / 2 + h * 0.02;
  if (mode === "fill") {
    ctx.fillStyle = color;
    ctx.fillText(char, x, y);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeText(char, x, y);
  }
  ctx.restore();
}

type Track = {
  sil: HTMLCanvasElement;
  count: number;
  start: Pt;
};

function buildTrack(w: number, h: number, char: string): Track {
  const sil = document.createElement("canvas");
  sil.width = w;
  sil.height = h;
  const ctx = sil.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  // Tight glyph only — no fat halo that fills in one swipe.
  drawGlyph(ctx, char, w, h, "fill", "#000", 1);
  drawGlyph(ctx, char, w, h, "stroke", "#000", 5);

  const data = ctx.getImageData(0, 0, w, h).data;
  let count = 0;
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = data[(y * w + x) * 4 + 3];
      if (a > 24) {
        count++;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Suggested start: top of the real glyph, slightly left (typical Gurmukhi onset).
  const targetX = minX + (maxX - minX) * 0.22;
  const targetY = minY + (maxY - minY) * 0.12;
  let start: Pt = { x: targetX, y: targetY };
  let best = Infinity;
  const band = Math.max(8, (maxY - minY) * 0.18);
  for (let y = minY; y < minY + band && y < h; y++) {
    for (let x = minX; x <= maxX; x++) {
      const a = data[(y * w + x) * 4 + 3];
      if (a <= 24) continue;
      const d = (x - targetX) ** 2 + (y - targetY) ** 2;
      if (d < best) {
        best = d;
        start = { x, y };
      }
    }
  }

  return { sil, count: Math.max(count, 1), start };
}

function coverage(ink: HTMLCanvasElement, track: Track) {
  const w = ink.width;
  const h = ink.height;
  const inkData = ink.getContext("2d")!.getImageData(0, 0, w, h).data;
  const silData = track.sil.getContext("2d")!.getImageData(0, 0, w, h).data;
  const COLS = 10;
  const ROWS = 10;
  const cellW = w / COLS;
  const cellH = h / ROWS;
  let letterCells = 0;
  let filledCells = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let sil = 0;
      let hit = 0;
      const x0 = Math.floor(col * cellW);
      const y0 = Math.floor(row * cellH);
      const x1 = Math.floor((col + 1) * cellW);
      const y1 = Math.floor((row + 1) * cellH);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const a = silData[(y * w + x) * 4 + 3];
          if (a <= 24) continue;
          sil++;
          if (inkData[(y * w + x) * 4 + 3] > 24) hit++;
        }
      }
      if (sil < 18) continue;
      letterCells++;
      if (hit / sil >= 0.28) filledCells++;
    }
  }
  return letterCells ? filledCells / letterCells : 0;
}

export function TracingCanvas({ initialLetter, onTraceCompleted }: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<Track | null>(null);
  const sizeRef = useRef({ w: 360, h: 360, dpr: 1 });
  const drawingRef = useRef(false);
  const lastRef = useRef<Pt | null>(null);
  const demoRef = useRef<number | null>(null);
  const demoTRef = useRef(0);

  const [tracingMode, setTracingMode] = useState<"letters" | "numbers">("letters");
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);
  const [crayon, setCrayon] = useState<(typeof CRAYONS)[number]["color"]>(CRAYONS[0].color);
  const crayonRef = useRef(crayon);
  crayonRef.current = crayon;
  const [done, setDone] = useState(false);
  const [watching, setWatching] = useState(false);
  const [hint, setHint] = useState("Trace the letter — stay on the shape!");
  const [praise, setPraise] = useState<string | null>(null);
  const [startPx, setStartPx] = useState<Pt | null>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (!initialLetter) return;
    const idx = GURMUKHI_LETTERS.findIndex((l) => l.id === initialLetter.id);
    if (idx !== -1) {
      setTracingMode("letters");
      setSelectedLetterIndex(idx);
    }
  }, [initialLetter]);

  const activeChar =
    tracingMode === "letters"
      ? GURMUKHI_LETTERS[selectedLetterIndex].letter
      : GURMUKHI_NUMBERS[selectedNumberIndex].char;
  const activeName =
    tracingMode === "letters"
      ? GURMUKHI_LETTERS[selectedLetterIndex].name
      : GURMUKHI_NUMBERS[selectedNumberIndex].name;
  const activeGurmukhiName =
    tracingMode === "letters"
      ? GURMUKHI_LETTERS[selectedLetterIndex].gurmukhiName
      : GURMUKHI_NUMBERS[selectedNumberIndex].gurmukhiName;
  const activeExample =
    tracingMode === "letters"
      ? GURMUKHI_LETTERS[selectedLetterIndex]
      : GURMUKHI_NUMBERS[selectedNumberIndex];

  const stopDemo = useCallback(() => {
    if (demoRef.current) {
      cancelAnimationFrame(demoRef.current);
      demoRef.current = null;
    }
    setWatching(false);
    demoTRef.current = 0;
  }, []);

  const brush = (pressure = 0.28) => {
    const minW = 3.5;
    const maxW = 8;
    const t = Math.min(1, Math.max(0.12, pressure)) ** 1.55;
    return minW + (maxW - minW) * t;
  };

  const pressureOf = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pressure <= 0) return 0.26;
    return Math.min(1, e.pressure * 0.72);
  };

  const paint = useCallback(
    (demoOffset?: number) => {
      const canvas = canvasRef.current;
      const ink = inkRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { w, h, dpr } = sizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fffcf6";
      ctx.fillRect(0, 0, w, h);

      ctx.setLineDash([14, 16]);
      drawGlyph(ctx, activeChar, w, h, "stroke", "rgba(201, 120, 32, 0.35)", 10);
      ctx.setLineDash([]);
      drawGlyph(ctx, activeChar, w, h, "fill", "rgba(201, 120, 32, 0.08)", 10);

      if (typeof demoOffset === "number") {
        const peri = Math.max(w, h) * 4;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = glyphFont(h);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = brush(0.3);
        ctx.strokeStyle = crayonRef.current + "99";
        ctx.setLineDash([peri, peri]);
        ctx.lineDashOffset = peri * (1 - demoOffset);
        ctx.strokeText(activeChar, w / 2, h / 2 + h * 0.02);
        ctx.restore();
      }

      if (ink) ctx.drawImage(ink, 0, 0, w, h);
    },
    [activeChar],
  );

  const rebuild = useCallback(() => {
    stopDemo();
    const { w, h } = sizeRef.current;
    if (w < 8 || h < 8) return;
    trackRef.current = buildTrack(w, h, activeChar);
    const ink = document.createElement("canvas");
    ink.width = w;
    ink.height = h;
    inkRef.current = ink;
    drawingRef.current = false;
    lastRef.current = null;
    setDone(false);
    setPraise(null);
    setFill(0);
    setStartPx(trackRef.current.start);
    setHint("Start on the star and color the letter!");
    paint();
  }, [activeChar, paint, stopDemo]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const layout = () => {
      const cssW = Math.min(wrap.clientWidth, 560);
      const cssH = Math.min(Math.max(cssW * 0.92, 300), 520);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: cssW, h: cssH, dpr };
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      rebuild();
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [rebuild]);

  useEffect(() => {
    rebuild();
  }, [activeChar, tracingMode, rebuild]);

  useEffect(() => {
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) rebuild();
    });
    return () => {
      cancelled = true;
    };
  }, [rebuild]);

  useEffect(() => {
    paint();
  }, [crayon, paint]);

  const pointerPos = (e: React.PointerEvent): Pt => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * sizeRef.current.w,
      y: ((e.clientY - rect.top) / rect.height) * sizeRef.current.h,
    };
  };

  const stamp = (from: Pt, to: Pt, pressure = 0.26) => {
    const ink = inkRef.current;
    const track = trackRef.current;
    if (!ink || !track) return;
    const ctx = ink.getContext("2d")!;
    ctx.save();
    ctx.globalAlpha = 0.38 + pressure * 0.22;
    ctx.strokeStyle = crayonRef.current;
    ctx.fillStyle = crayonRef.current;
    ctx.lineWidth = brush(pressure);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(track.sil, 0, 0);
    ctx.restore();
  };

  const checkDone = () => {
    const ink = inkRef.current;
    const track = trackRef.current;
    if (!ink || !track || done) return;
    const pct = coverage(ink, track);
    setFill(pct);
    if (pct >= 0.78) {
      setDone(true);
      setHint("Shabaash!");
      playSuccessChime();
      playCelebration();
      const said = speakPraise();
      setPraise(said.gurmukhi);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 } });
      onTraceCompleted(activeName);
    } else if (pct > 0.2) {
      setHint("Keep going — fill the whole letter!");
    }
  };

  const onDown = (e: React.PointerEvent) => {
    if (done || watching) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const p = pointerPos(e);
    drawingRef.current = true;
    lastRef.current = p;
    stamp(p, p, pressureOf(e));
    playSparkle();
    paint();
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || done || watching) return;
    e.preventDefault();
    const p = pointerPos(e);
    const last = lastRef.current ?? p;
    stamp(last, p, pressureOf(e));
    lastRef.current = p;
    if (Math.random() > 0.86) playSparkle();
    paint();
  };

  const onUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    checkDone();
    paint();
  };

  const playDemo = () => {
    if (watching) {
      stopDemo();
      rebuild();
      return;
    }
    playChime();
    speakPunjabi(`ਵੇਖੋ ਜੀ, ${activeGurmukhiName} ਇੰਜ ਲਿਖੋ।`);
    setWatching(true);
    setHint("Watch the letter…");
    const ink = inkRef.current;
    if (ink) ink.getContext("2d")?.clearRect(0, 0, ink.width, ink.height);
    setFill(0);
    const t0 = performance.now();
    const run = (now: number) => {
      const t = Math.min(1, (now - t0) / 1600);
      demoTRef.current = t;
      paint(t);
      if (t < 1) {
        demoRef.current = requestAnimationFrame(run);
      } else {
        stopDemo();
        setHint("Your turn! Color inside the letter.");
        speakPunjabi("ਹੁਣ ਤੁਸੀਂ ਲਿਖੋ ਜੀ।");
        paint();
      }
    };
    demoRef.current = requestAnimationFrame(run);
  };

  const handleNext = () => {
    playChime();
    if (tracingMode === "letters") {
      setSelectedLetterIndex((prev) => (prev + 1) % GURMUKHI_LETTERS.length);
    } else {
      setSelectedNumberIndex((prev) => (prev + 1) % GURMUKHI_NUMBERS.length);
    }
  };

  const handlePrev = () => {
    playChime();
    if (tracingMode === "letters") {
      setSelectedLetterIndex((prev) => (prev - 1 + GURMUKHI_LETTERS.length) % GURMUKHI_LETTERS.length);
    } else {
      setSelectedNumberIndex((prev) => (prev - 1 + GURMUKHI_NUMBERS.length) % GURMUKHI_NUMBERS.length);
    }
  };

  const items = tracingMode === "letters" ? GURMUKHI_LETTERS : GURMUKHI_NUMBERS;
  const selectedIdx = tracingMode === "letters" ? selectedLetterIndex : selectedNumberIndex;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-card">
          <button
            id="trace-mode-letters-btn"
            onClick={() => {
              playChime();
              setTracingMode("letters");
            }}
            className={`min-h-11 px-4 rounded-xl font-bold text-sm ${
              tracingMode === "letters" ? "bg-saffron text-white" : "text-ink"
            }`}
          >
            Letters
          </button>
          <button
            id="trace-mode-numbers-btn"
            onClick={() => {
              playChime();
              setTracingMode("numbers");
            }}
            className={`min-h-11 px-4 rounded-xl font-bold text-sm ${
              tracingMode === "numbers" ? "bg-saffron text-white" : "text-ink"
            }`}
          >
            Numbers
          </button>
        </div>

        <button
          id="trace-speak-btn"
          onClick={() => {
            if (tracingMode === "letters") {
              speakLetterDetails(GURMUKHI_LETTERS[selectedLetterIndex]);
            } else {
              const n = GURMUKHI_NUMBERS[selectedNumberIndex];
              speakPunjabi(`<slow>${n.name.split(" ")[0]}.</slow>`);
            }
          }}
          className="btn-primary min-h-11 px-4 font-bold flex items-center gap-2 text-sm"
        >
          <Volume2 className="w-4 h-4" />
          Hear {activeChar}
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto p-2 bg-white rounded-2xl shadow-card scrollbar-none">
        {items.map((item, idx) => {
          const char = "letter" in item ? item.letter : item.char;
          const selected = idx === selectedIdx;
          return (
            <button
              key={item.id}
              id={`select-char-btn-${item.id}`}
              onClick={() => {
                playChime();
                if (tracingMode === "letters") setSelectedLetterIndex(idx);
                else setSelectedNumberIndex(idx);
              }}
              className={`shrink-0 min-w-14 h-14 rounded-2xl font-gurmukhi font-black text-2xl ${
                selected ? "bg-saffron text-white" : "bg-paper text-ink"
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-[28px] p-4 sm:p-6 shadow-card relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-paper text-ink font-gurmukhi font-black text-3xl flex items-center justify-center">
              {activeChar}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-bold font-baloo text-ink leading-tight">{activeName}</h3>
              <p className="text-sm font-gurmukhi text-saffron-dark">{activeGurmukhiName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {"exampleEmoji" in activeExample ? activeExample.exampleEmoji : ""}
            </span>
            <div className="w-20 h-2.5 rounded-full bg-paper overflow-hidden" title="How much of the letter is filled">
              <div
                className="h-full bg-saffron transition-[width] duration-200"
                style={{ width: `${Math.min(100, Math.round(fill * 100))}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-center font-bold text-saffron-dark mb-3 min-h-6">{hint}</p>

        <div
          ref={wrapRef}
          className="relative mx-auto touch-none select-none rounded-[24px] overflow-hidden bg-paper"
          style={{ maxWidth: 560 }}
        >
          <canvas
            ref={canvasRef}
            id="trace-canvas"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="block w-full touch-none"
          />

          {startPx && !done && !watching && fill < 0.12 && (
            <div
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ left: startPx.x, top: startPx.y }}
            >
              <div className="relative w-12 h-12">
                <span className="absolute inset-0 rounded-full bg-saffron/30 speaking-pulse" />
                <span className="absolute inset-1 rounded-full bg-saffron text-white flex items-center justify-center font-black text-sm shadow-card">
                  Go
                </span>
              </div>
            </div>
          )}

          {done && (
            <div className="absolute inset-0 bg-paper/85 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Sparkles className="w-10 h-10 text-saffron" />
              <p className="text-3xl font-black font-gurmukhi text-ink">{praise ?? "ਸ਼ਾਬਾਸ਼!"}</p>
              <p className="font-bold text-muted">You traced {activeName}!</p>
              <button id="trace-next-after-win" onClick={handleNext} className="btn-primary min-h-12 px-6 text-base">
                Next letter
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          {CRAYONS.map((c) => (
            <button
              key={c.id}
              title={c.label}
              onClick={() => {
                playChime();
                setCrayon(c.color);
              }}
              className={`w-11 h-11 rounded-full transition-transform duration-150 ${
                crayon === c.color ? "scale-110 ring-4 ring-saffron/30" : ""
              }`}
              style={{ backgroundColor: c.color }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 mt-5 flex-wrap">
          <button
            id="canvas-prev-btn"
            onClick={handlePrev}
            className="btn-secondary min-h-11 px-4 font-bold text-sm flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <div className="flex items-center gap-2">
            <button
              id="clear-canvas-btn"
              onClick={() => {
                playChime();
                rebuild();
              }}
              className="btn-secondary min-h-11 px-4 font-bold text-sm flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
            <button
              id="watch-demo-stroke-btn"
              onClick={playDemo}
              className="btn-success min-h-11 px-4 font-bold text-sm flex items-center gap-1.5"
            >
              {watching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              {watching ? "Stop" : "Watch"}
            </button>
          </div>

          <button
            id="canvas-next-btn"
            onClick={handleNext}
            className="btn-primary min-h-11 px-4 font-bold text-sm flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
