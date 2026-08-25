import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { RotateCcw, Volume2, Sparkles } from "lucide-react";
import { GURMUKHI_LETTERS } from "../data/punjabiData";
import { GurmukhiLetter } from "../types";
import { playChime, playCelebration, playBoing, playSparkle, speakPunjabi, speakPraise, speakLetterDetails } from "../utils/audio";
import { recognizeLetter, type Pt } from "../utils/gesture";

interface DrawGuessGameProps {
  onGameCompleted: (gameName: string, starsEarned: number) => void;
}

export function DrawGuessGame({ onGameCompleted }: DrawGuessGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const sizeRef = useRef({ w: 360, h: 360, dpr: 1 });
  const strokesRef = useRef<Pt[][]>([]);
  const currentRef = useRef<Pt[]>([]);
  const drawingRef = useRef(false);

  const [target, setTarget] = useState<GurmukhiLetter>(GURMUKHI_LETTERS[0]);
  const [guess, setGuess] = useState<{ char: string; name: string; score: number; win: boolean } | null>(
    null,
  );
  const [hint, setHint] = useState("Draw the letter with your finger");

  const pickTarget = useCallback(() => {
    const pool = GURMUKHI_LETTERS.slice(0, 20);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setTarget(next);
    setGuess(null);
    setHint("Draw the letter with your finger");
    strokesRef.current = [];
    currentRef.current = [];
    speakLetterDetails(next);
  }, []);

  useEffect(() => {
    pickTarget();
  }, [pickTarget]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fffcf6";
    ctx.fillRect(0, 0, w, h);

    ctx.font = `900 ${Math.floor(h * 0.58)}px "Noto Sans Gurmukhi", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(201, 120, 32, 0.07)";
    ctx.fillText(target.letter, w / 2, h / 2 + 6);

    const draw = (pts: Pt[]) => {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = "#c97820";
      ctx.lineWidth = Math.max(16, Math.min(w, h) * 0.07);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };
    strokesRef.current.forEach(draw);
    draw(currentRef.current);
  }, [target.letter]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const layout = () => {
      const cssW = Math.min(wrap.clientWidth, 520);
      const cssH = Math.min(Math.max(cssW * 0.9, 280), 480);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: cssW, h: cssH, dpr };
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      paint();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [paint]);

  useEffect(() => {
    paint();
  }, [target, paint]);

  const pos = (e: React.PointerEvent): Pt => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * sizeRef.current.w,
      y: ((e.clientY - rect.top) / rect.height) * sizeRef.current.h,
    };
  };

  const onDown = (e: React.PointerEvent) => {
    if (guess?.win) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    currentRef.current = [pos(e)];
    setGuess(null);
    playSparkle();
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const p = pos(e);
    const last = currentRef.current[currentRef.current.length - 1];
    if (last && Math.hypot(last.x - p.x, last.y - p.y) < 1.5) return;
    currentRef.current = [...currentRef.current, p];
    paint();
  };

  const onUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (currentRef.current.length > 2) {
      strokesRef.current = [...strokesRef.current, currentRef.current];
    }
    currentRef.current = [];
    paint();
  };

  const readDrawing = () => {
    playChime();
    const ranked = recognizeLetter(strokesRef.current);
    if (!ranked.length) {
      setHint("Draw a bigger letter first!");
      playBoing();
      return;
    }
    const top = ranked[0];
    const againstTarget = ranked.find((g) => g.char === target.letter);
    const win = top.char === target.letter || (againstTarget?.score ?? 0) >= 0.72;
    if (win) {
      setGuess({ char: target.letter, name: target.name, score: againstTarget?.score ?? top.score, win: true });
      setHint("The app read your drawing!");
      playCelebration();
      speakPraise();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.55 } });
      onGameCompleted("Draw & Guess", 1);
    } else {
      setGuess({ char: top.char, name: top.name, score: top.score, win: false });
      setHint(`Looks like ${top.gurmukhiName}. Try ${target.gurmukhiName}!`);
      playBoing();
      speakPunjabi(`ਇਹ ${top.gurmukhiName} ਵਰਗਾ ਲੱਗਦਾ ਏ।`);
    }
  };

  const clear = () => {
    playChime();
    strokesRef.current = [];
    currentRef.current = [];
    setGuess(null);
    setHint("Draw the letter with your finger");
    paint();
  };

  return (
    <div className="bg-white rounded-[28px] p-4 sm:p-6 shadow-card">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Draw this letter</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-5xl font-black font-gurmukhi text-ink leading-none">{target.letter}</span>
            <div>
              <p className="font-baloo font-bold text-xl text-ink">{target.name}</p>
              <p className="font-gurmukhi text-saffron-dark">{target.gurmukhiName}</p>
            </div>
          </div>
        </div>
        <button
          id="draw-guess-speak-btn"
          onClick={() => speakLetterDetails(target)}
          className="btn-primary min-h-11 px-4 font-bold text-sm flex items-center gap-2"
        >
          <Volume2 className="w-4 h-4" />
          Hear it
        </button>
      </div>

      <p className="text-center font-bold text-saffron-dark mb-3 min-h-6">{hint}</p>

      <div ref={wrapRef} className="relative mx-auto touch-none rounded-[24px] overflow-hidden bg-paper" style={{ maxWidth: 520 }}>
        <canvas
          id="draw-guess-canvas"
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="block w-full touch-none"
        />
        {guess?.win && (
          <div className="absolute inset-0 bg-paper/85 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Sparkles className="w-9 h-9 text-saffron" />
            <p className="text-3xl font-black font-gurmukhi text-ink">ਸ਼ਾਬਾਸ਼!</p>
            <p className="font-bold text-muted">It recognized {target.gurmukhiName}</p>
            <button id="draw-guess-next-btn" onClick={pickTarget} className="btn-primary min-h-12 px-6">
              Draw another
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button id="draw-guess-check-btn" onClick={readDrawing} className="btn-primary min-h-11 px-4 font-bold text-sm">
          Read my drawing
        </button>
        <button id="draw-guess-clear-btn" onClick={clear} className="btn-secondary min-h-11 px-4 font-bold text-sm flex items-center gap-1.5">
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
        <button id="draw-guess-skip-btn" onClick={pickTarget} className="btn-success min-h-11 px-4 font-bold text-sm">
          New letter
        </button>
      </div>
    </div>
  );
}
