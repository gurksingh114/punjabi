import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Palette, 
  CheckCircle2,
  Play,
  Pause,
  Layers,
  HelpCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { GURMUKHI_LETTERS, GURMUKHI_NUMBERS } from '../data/punjabiData';
import { GurmukhiLetter, StrokeDirectionStep } from '../types';
import { getStrokeDataForChar } from '../data/strokeDirections';
import { 
  playSparkle, 
  playSuccessChime, 
  playCelebration, 
  speakPunjabi, 
  playChime, 
  speakPraise 
} from '../utils/audio';

interface TracingCanvasProps {
  initialLetter?: GurmukhiLetter | null;
  onTraceCompleted: (charName: string) => void;
}

const BRUSH_COLORS = [
  { name: 'Amber Gold', color: '#f59e0b', bg: 'bg-amber-500' },
  { name: 'Berry Pink', color: '#ec4899', bg: 'bg-pink-500' },
  { name: 'Ocean Blue', color: '#3b82f6', bg: 'bg-blue-500' },
  { name: 'Emerald Green', color: '#10b981', bg: 'bg-emerald-500' },
  { name: 'Purple Star', color: '#8b5cf6', bg: 'bg-purple-500' },
  { name: 'Coral Red', color: '#ef4444', bg: 'bg-red-500' },
  { name: 'Rainbow Sparkle', color: 'rainbow', bg: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500' }
];

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  initialLetter,
  onTraceCompleted
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tracingMode, setTracingMode] = useState<'letters' | 'numbers'>('letters');
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number>(0);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState<number>(0);
  
  const [brushColor, setBrushColor] = useState<string>('#f59e0b');
  const [brushSize, setBrushSize] = useState<number>(24);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const [drawnStrokeCount, setDrawnStrokeCount] = useState<number>(0);
  
  // Direction & Number Guides States
  const [showNumberGuides, setShowNumberGuides] = useState<boolean>(true);
  const [showGuideLines, setShowGuideLines] = useState<boolean>(true);
  const [activeStepFilter, setActiveStepFilter] = useState<number | 'all'>('all');
  
  // Animation / Demo Mode States
  const [isAnimatingDemo, setIsAnimatingDemo] = useState<boolean>(false);
  const [demoProgress, setDemoProgress] = useState<{ x: number; y: number; stepNumber: number } | null>(null);
  const demoAnimRef = useRef<number | null>(null);

  const [celebrationPraise, setCelebrationPraise] = useState<string | null>(null);

  // Set initial letter if passed
  useEffect(() => {
    if (initialLetter) {
      const idx = GURMUKHI_LETTERS.findIndex(l => l.id === initialLetter.id);
      if (idx !== -1) {
        setTracingMode('letters');
        setSelectedLetterIndex(idx);
      }
    }
  }, [initialLetter]);

  const activeChar = tracingMode === 'letters' 
    ? GURMUKHI_LETTERS[selectedLetterIndex].letter 
    : GURMUKHI_NUMBERS[selectedNumberIndex].char;

  const activeName = tracingMode === 'letters' 
    ? GURMUKHI_LETTERS[selectedLetterIndex].name 
    : GURMUKHI_NUMBERS[selectedNumberIndex].name;

  const activeGurmukhiName = tracingMode === 'letters' 
    ? GURMUKHI_LETTERS[selectedLetterIndex].gurmukhiName 
    : GURMUKHI_NUMBERS[selectedNumberIndex].gurmukhiName;

  const activeExample = tracingMode === 'letters' 
    ? GURMUKHI_LETTERS[selectedLetterIndex] 
    : GURMUKHI_NUMBERS[selectedNumberIndex];

  // Retrieve stroke direction dataset for active character
  const strokeData = getStrokeDataForChar(activeChar, activeName, activeGurmukhiName);

  // Draw background template letter on canvas
  const drawTemplate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background clean white canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Guide lines (top, midline, baseline)
    if (showGuideLines) {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);

      // Top line
      ctx.beginPath();
      ctx.moveTo(30, canvas.height * 0.22);
      ctx.lineTo(canvas.width - 30, canvas.height * 0.22);
      ctx.stroke();

      // Middle line
      ctx.beginPath();
      ctx.moveTo(30, canvas.height * 0.52);
      ctx.lineTo(canvas.width - 30, canvas.height * 0.52);
      ctx.stroke();

      // Baseline
      ctx.beginPath();
      ctx.moveTo(30, canvas.height * 0.82);
      ctx.lineTo(canvas.width - 30, canvas.height * 0.82);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Draw giant guide letter
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${canvas.height * 0.58}px "Noto Sans Gurmukhi", "Baloo Paaji 2", sans-serif`;

    // Outer faint dotted stroke
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 16;
    ctx.setLineDash([10, 10]);
    ctx.strokeText(activeChar, canvas.width / 2, canvas.height / 2 + 10);
    ctx.setLineDash([]);

    // Soft gray fill
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(activeChar, canvas.width / 2, canvas.height / 2 + 10);

    // Centered guide dots for toddler to trace along
    ctx.fillStyle = '#94a3b8';
    ctx.font = `900 ${canvas.height * 0.58}px "Noto Sans Gurmukhi", "Baloo Paaji 2", sans-serif`;
    ctx.fillText(activeChar, canvas.width / 2, canvas.height / 2 + 10);

    setDrawnStrokeCount(0);
    setHasCompleted(false);
  }, [activeChar, showGuideLines]);

  // Re-draw when letter changes
  useEffect(() => {
    // Cancel any running animation
    if (demoAnimRef.current) {
      cancelAnimationFrame(demoAnimRef.current);
      demoAnimRef.current = null;
    }
    setIsAnimatingDemo(false);
    setDemoProgress(null);
    setActiveStepFilter('all');

    drawTemplate();
    speakPunjabi(`${activeChar}, ${activeName}`, 1.08, 0.8);
  }, [drawTemplate, activeChar, activeName]);

  // Handle Resize of canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = Math.min(parent.clientWidth - 10, 520);
    const height = Math.min(width * 0.95, 480);

    canvas.width = width;
    canvas.height = height;
    drawTemplate();
  }, [drawTemplate]);

  // Touch & Mouse Drawing Handlers
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isAnimatingDemo) stopDemoAnimation();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);

    playSparkle();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    // Rainbow brush effect or solid color
    if (brushColor === 'rainbow') {
      const hue = (Date.now() / 8) % 360;
      ctx.strokeStyle = `hsl(${hue}, 90%, 55%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 65%)`;
      ctx.shadowBlur = 8;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.shadowColor = brushColor;
      ctx.shadowBlur = 6;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();

    setDrawnStrokeCount((prev) => prev + 1);

    if (Math.random() > 0.85) {
      playSparkle();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // If toddler has drawn a significant amount, check completion
    if (drawnStrokeCount > 25 && !hasCompleted) {
      triggerSuccessCelebration();
    }
  };

  const triggerSuccessCelebration = () => {
    setHasCompleted(true);
    playSuccessChime();
    playCelebration();

    const praise = speakPraise();
    setCelebrationPraise(`${praise.gurmukhi} (${praise.roman})`);
    setTimeout(() => setCelebrationPraise(null), 3000);

    // Confetti shower
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    onTraceCompleted(activeName);
  };

  const handleNext = () => {
    playChime();
    if (tracingMode === 'letters') {
      setSelectedLetterIndex((prev) => (prev + 1) % GURMUKHI_LETTERS.length);
    } else {
      setSelectedNumberIndex((prev) => (prev + 1) % GURMUKHI_NUMBERS.length);
    }
  };

  const handlePrev = () => {
    playChime();
    if (tracingMode === 'letters') {
      setSelectedLetterIndex((prev) => (prev - 1 + GURMUKHI_LETTERS.length) % GURMUKHI_LETTERS.length);
    } else {
      setSelectedNumberIndex((prev) => (prev - 1 + GURMUKHI_NUMBERS.length) % GURMUKHI_NUMBERS.length);
    }
  };

  // Demo Animated Stroke Order
  const startDemoAnimation = () => {
    if (isAnimatingDemo) {
      stopDemoAnimation();
      return;
    }

    playChime();
    drawTemplate();
    setIsAnimatingDemo(true);

    const strokes = strokeData.strokes;
    if (strokes.length === 0) return;

    let currentStrokeIdx = 0;
    let currentPointIdx = 0;
    let t = 0; // interpolation 0..1 between path points

    speakPunjabi(`${activeChar}. ਦੇਖੋ ਕਿਵੇਂ ਲਿਖਣਾ ਹੈ`, 1.0, 0.9);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const currentStroke = strokes[currentStrokeIdx];
      const points = currentStroke.pathPoints;

      if (currentPointIdx < points.length - 1) {
        const p1 = points[currentPointIdx];
        const p2 = points[currentPointIdx + 1];

        // Interpolate position
        const curX = (p1.x + (p2.x - p1.x) * t) * (canvas.width / 100);
        const curY = (p1.y + (p2.y - p1.y) * t) * (canvas.height / 100);

        setDemoProgress({
          x: curX,
          y: curY,
          stepNumber: currentStroke.stepNumber
        });

        // Draw smooth animated demonstration brush line
        ctx.strokeStyle = currentStroke.color;
        ctx.shadowColor = currentStroke.color;
        ctx.shadowBlur = 8;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (t === 0 && currentPointIdx === 0) {
          ctx.beginPath();
          ctx.moveTo(curX, curY);
        } else {
          ctx.lineTo(curX, curY);
          ctx.stroke();
        }

        t += 0.04;
        if (t >= 1) {
          t = 0;
          currentPointIdx++;
        }
        demoAnimRef.current = requestAnimationFrame(animate);
      } else {
        // Move to next stroke after short pause
        currentStrokeIdx++;
        currentPointIdx = 0;
        t = 0;

        if (currentStrokeIdx < strokes.length) {
          setTimeout(() => {
            if (ctx) {
              const nextStart = strokes[currentStrokeIdx].pathPoints[0];
              ctx.beginPath();
              ctx.moveTo(nextStart.x * (canvas.width / 100), nextStart.y * (canvas.height / 100));
            }
            demoAnimRef.current = requestAnimationFrame(animate);
          }, 350);
        } else {
          // Finished all strokes!
          setTimeout(() => {
            setIsAnimatingDemo(false);
            setDemoProgress(null);
            playSparkle();
          }, 500);
        }
      }
    };

    demoAnimRef.current = requestAnimationFrame(animate);
  };

  const stopDemoAnimation = () => {
    if (demoAnimRef.current) {
      cancelAnimationFrame(demoAnimRef.current);
      demoAnimRef.current = null;
    }
    setIsAnimatingDemo(false);
    setDemoProgress(null);
  };

  // Convert percentage points to SVG path d attribute
  const getSvgPathFromPoints = (points: { x: number; y: number }[], width: number, height: number) => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      const px = (pt.x * width) / 100;
      const py = (pt.y * height) / 100;
      return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
    }, '');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      
      {/* Top Mode Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            id="trace-mode-letters-btn"
            onClick={() => {
              playChime();
              setTracingMode('letters');
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              tracingMode === 'letters'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <span>🔤</span>
            <span>Letters (ੳ ਅ ੲ)</span>
          </button>

          <button
            id="trace-mode-numbers-btn"
            onClick={() => {
              playChime();
              setTracingMode('numbers');
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              tracingMode === 'numbers'
                ? 'bg-blue-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <span>🔢</span>
            <span>Numbers (੧ ੨ ੩)</span>
          </button>
        </div>

        {/* Pronunciation & Speak Action */}
        <button
          id="trace-speak-btn"
          onClick={() => speakPunjabi(`${activeChar}, ${activeName}`, 1.08, 0.8)}
          className="btn-primary px-4 py-2 rounded-2xl font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Speak "{activeChar}"</span>
        </button>
      </div>

      {/* Item Carousel Selector */}
      <div className="flex items-center gap-2 overflow-x-auto p-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs scrollbar-none">
        {(tracingMode === 'letters' ? GURMUKHI_LETTERS : GURMUKHI_NUMBERS).map((item, idx) => {
          const isSelected = tracingMode === 'letters' 
            ? selectedLetterIndex === idx 
            : selectedNumberIndex === idx;
          const char = 'letter' in item ? item.letter : item.char;

          return (
            <button
              key={item.id}
              id={`select-char-btn-${item.id}`}
              onClick={() => {
                playChime();
                if (tracingMode === 'letters') {
                  setSelectedLetterIndex(idx);
                } else {
                  setSelectedNumberIndex(idx);
                }
              }}
              className={`min-w-[44px] h-11 rounded-xl font-gurmukhi font-bold text-xl transition-all flex items-center justify-center flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-xs scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      {/* Main Tracing Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Side: Drawing Canvas & Visual Direction Indicators */}
        <div className="lg:col-span-8 flex flex-col items-center bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm relative">
          
          {/* Header Info of Current Letter */}
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-900 border border-amber-200 rounded-2xl flex items-center justify-center text-3xl font-black font-gurmukhi shadow-xs">
                {activeChar}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-baloo leading-tight">
                  {activeName}
                </h3>
                <p className="text-xs font-bold text-amber-700 font-gurmukhi">
                  {activeGurmukhiName}
                </p>
              </div>
            </div>

            {/* Stroke Order Demo Button & Quick Controls */}
            <div className="flex items-center gap-2">
              <button
                id="watch-demo-stroke-btn"
                onClick={startDemoAnimation}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                  isAnimatingDemo
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
                title="Watch animated stroke order demonstration"
              >
                {isAnimatingDemo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isAnimatingDemo ? 'Stop Demo' : 'Watch Order ▶'}</span>
              </button>

              {/* Example Picture Pill */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <span className="text-2xl">
                  {'exampleEmoji' in activeExample ? activeExample.exampleEmoji : '⭐'}
                </span>
                <div className="text-right">
                  <span className="text-xs font-bold font-gurmukhi text-slate-800 block leading-tight">
                    {'exampleWord' in activeExample ? activeExample.exampleWord : ''}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {'exampleEnglish' in activeExample ? activeExample.exampleEnglish : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Celebration Banner */}
          {celebrationPraise && (
            <div className="absolute top-20 bg-emerald-500 text-white font-bold text-base px-5 py-2 rounded-full shadow-lg animate-bounce z-30 flex items-center gap-2">
              <span>🌟</span>
              <span>{celebrationPraise}</span>
              <span>🎉</span>
            </div>
          )}

          {/* Interactive HTML5 Canvas with Direction & Number Overlays */}
          <div className="relative touch-none select-none rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-white shadow-xs w-full flex items-center justify-center">
            
            {/* Base HTML5 Canvas for User Drawing */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="cursor-crosshair block max-w-full"
            />

            {/* SVG Direction & Numbered Stroke Guides Overlay */}
            {showNumberGuides && canvasRef.current && (
              <svg
                className="absolute inset-0 pointer-events-none w-full h-full"
                viewBox={`0 0 ${canvasRef.current.width} ${canvasRef.current.height}`}
              >
                <defs>
                  {/* Glowing marker definitions for arrows */}
                  {strokeData.strokes.map((stroke) => (
                    <marker
                      key={`marker-${stroke.stepNumber}`}
                      id={`arrowhead-${stroke.stepNumber}`}
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={stroke.color} />
                    </marker>
                  ))}
                </defs>

                {/* Draw Each Stroke Line with Animated Directional Dashes */}
                {strokeData.strokes.map((stroke) => {
                  const isVisible = activeStepFilter === 'all' || activeStepFilter === stroke.stepNumber;
                  if (!isVisible) return null;

                  const width = canvasRef.current?.width || 480;
                  const height = canvasRef.current?.height || 440;
                  const pathD = getSvgPathFromPoints(stroke.pathPoints, width, height);

                  return (
                    <g key={`stroke-guide-${stroke.stepNumber}`} className="transition-opacity duration-300">
                      
                      {/* Stroke Background Glow Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={stroke.color}
                        strokeWidth="6"
                        strokeOpacity="0.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Directional Flowing Dashed Arrow Line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={stroke.color}
                        strokeWidth="3.5"
                        strokeDasharray="6, 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        markerEnd={`url(#arrowhead-${stroke.stepNumber})`}
                        className="animate-pulse"
                      />

                      {/* START POINT Numbered Badge Circle */}
                      <g
                        transform={`translate(${(stroke.startPoint.x * width) / 100}, ${(stroke.startPoint.y * height) / 100})`}
                        className="drop-shadow-md"
                      >
                        {/* Outer Pulse Ring */}
                        <circle
                          r="15"
                          fill={stroke.color}
                          fillOpacity="0.25"
                          className="animate-ping"
                        />
                        {/* Solid Numbered Badge */}
                        <circle
                          r="12"
                          fill={stroke.color}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                        {/* Stroke Number Text */}
                        <text
                          x="0"
                          y="1"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="900"
                          fontFamily="sans-serif"
                        >
                          {stroke.stepNumber}
                        </text>
                      </g>

                      {/* Direction Icon Tag along the stroke */}
                      <g
                        transform={`translate(${((stroke.startPoint.x + stroke.endPoint.x) / 2 * width) / 100}, ${((stroke.startPoint.y + stroke.endPoint.y) / 2 * height) / 100 - 12})`}
                      >
                        <rect
                          x="-10"
                          y="-10"
                          width="20"
                          height="20"
                          rx="6"
                          fill="#ffffff"
                          stroke={stroke.color}
                          strokeWidth="1.5"
                          className="drop-shadow-xs"
                        />
                        <text
                          x="0"
                          y="1"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="11"
                        >
                          {stroke.arrowIcon}
                        </text>
                      </g>

                    </g>
                  );
                })}
              </svg>
            )}

            {/* Live Animated Pen/Hand Indicator during Demo */}
            {isAnimatingDemo && demoProgress && (
              <div 
                className="absolute pointer-events-none -translate-x-3 -translate-y-8 transition-transform z-20"
                style={{
                  left: `${demoProgress.x}px`,
                  top: `${demoProgress.y}px`
                }}
              >
                <div className="flex items-center gap-1 bg-slate-900/90 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-lg border border-amber-400">
                  <span>✏️</span>
                  <span>Step {demoProgress.stepNumber}</span>
                </div>
              </div>
            )}

            {/* Prompt Helper Overlay */}
            {drawnStrokeCount === 0 && !isAnimatingDemo && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-xs font-medium px-4 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Follow numbers ① ➔ ② ➔ ③ with the arrows!</span>
              </div>
            )}
          </div>

          {/* Canvas Bottom Controls & Step Filter Toggles */}
          <div className="w-full flex items-center justify-between mt-4 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              
              {/* Clear / Erase Button */}
              <button
                id="clear-canvas-btn"
                onClick={() => {
                  playChime();
                  drawTemplate();
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 transition-all flex items-center gap-1.5 text-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>

              {/* Number Direction Overlay Toggle */}
              <button
                id="toggle-number-directions-btn"
                onClick={() => {
                  playChime();
                  setShowNumberGuides(!showNumberGuides);
                }}
                className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  showNumberGuides
                    ? 'bg-amber-100 text-amber-900 border-amber-200 shadow-2xs'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title="Toggle visual stroke numbers and direction arrows"
              >
                {showNumberGuides ? <Eye className="w-3.5 h-3.5 text-amber-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                <span>{showNumberGuides ? 'Numbers & Arrows: ON' : 'Numbers & Arrows: OFF'}</span>
              </button>

              {/* Guide Lines Toggle */}
              <button
                id="toggle-guidelines-btn"
                onClick={() => {
                  playChime();
                  setShowGuideLines(!showGuideLines);
                }}
                className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  showGuideLines
                    ? 'bg-slate-100 text-slate-800 border-slate-300'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Lines</span>
              </button>
            </div>

            {/* Check Completion Button */}
            <button
              id="complete-trace-btn"
              onClick={triggerSuccessCelebration}
              className="btn-success px-4 py-2 rounded-xl font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Done / Shabash!</span>
            </button>
          </div>

          {/* Step-by-Step Directional Cards Row for Toddler & Parent */}
          <div className="w-full mt-4 pt-3.5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>📍</span>
                <span>Stroke Direction Order (ਕ੍ਰਮ ਅਨੁਸਾਰ ਲਿਖੋ)</span>
              </span>

              {/* Step Filter Tabs */}
              <div className="flex items-center gap-1">
                <button
                  id="step-filter-all"
                  onClick={() => {
                    playChime();
                    setActiveStepFilter('all');
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    activeStepFilter === 'all'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Steps
                </button>
                {strokeData.strokes.map((s) => (
                  <button
                    key={`step-filter-btn-${s.stepNumber}`}
                    id={`step-filter-${s.stepNumber}`}
                    onClick={() => {
                      playChime();
                      setActiveStepFilter(s.stepNumber);
                    }}
                    className={`w-5 h-5 rounded-lg text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                      activeStepFilter === s.stepNumber
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s.stepNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Numbered Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {strokeData.strokes.map((stroke) => {
                const isSelected = activeStepFilter === 'all' || activeStepFilter === stroke.stepNumber;
                return (
                  <div
                    key={`step-card-${stroke.stepNumber}`}
                    onClick={() => {
                      playChime();
                      setActiveStepFilter(activeStepFilter === stroke.stepNumber ? 'all' : stroke.stepNumber);
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-slate-50/80 border-slate-300 shadow-2xs'
                        : 'opacity-40 bg-white border-slate-200'
                    }`}
                  >
                    {/* Circle Number Badge */}
                    <div
                      style={{ backgroundColor: stroke.color }}
                      className="w-7 h-7 rounded-xl text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs"
                    >
                      {stroke.stepNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-slate-800 font-bold text-xs leading-tight">
                        <span>{stroke.arrowIcon}</span>
                        <span className="truncate">{stroke.instructionEn}</span>
                      </div>
                      <p className="text-[11px] font-gurmukhi text-slate-600 mt-0.5 leading-tight truncate">
                        {stroke.instructionPa}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls (Prev / Next) */}
          <div className="w-full flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100">
            <button
              id="canvas-prev-btn"
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center gap-1 text-xs sm:text-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {tracingMode === 'letters'
                ? `${selectedLetterIndex + 1} of ${GURMUKHI_LETTERS.length}`
                : `${selectedNumberIndex + 1} of ${GURMUKHI_NUMBERS.length}`}
            </span>

            <button
              id="canvas-next-btn"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center gap-1 text-xs sm:text-sm cursor-pointer shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Side: Magic Colors Palette & Stroke Sizes */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Colors Palette Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3 text-slate-800">
              <Palette className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm">Brush Colors</h4>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {BRUSH_COLORS.map((bc) => {
                const isSelected = brushColor === bc.color;
                return (
                  <button
                    key={bc.name}
                    id={`brush-color-${bc.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      playChime();
                      setBrushColor(bc.color);
                    }}
                    title={bc.name}
                    className={`h-10 rounded-xl ${bc.bg} flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-offset-2 ring-slate-800 scale-105 shadow-xs'
                        : 'opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    {isSelected && <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brush Thickness Card */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm text-slate-800">
            <h4 className="font-bold text-sm mb-2.5">
              Brush Size
            </h4>

            <div className="flex items-center gap-2">
              {[
                { label: 'Thin', size: 14 },
                { label: 'Medium', size: 24 },
                { label: 'Chunky', size: 36 }
              ].map((b) => (
                <button
                  key={b.label}
                  id={`brush-size-${b.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    playChime();
                    setBrushSize(b.size);
                  }}
                  className={`flex-1 py-2 px-2 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
                    brushSize === b.size
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Writing Rule Tip Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-4 sm:p-5 border border-amber-200/80 text-amber-950">
            <div className="flex items-center gap-1.5 mb-2 font-bold text-xs sm:text-sm text-amber-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>How to Write Gurmukhi</span>
            </div>
            
            {strokeData.overallTipEn && (
              <p className="text-xs font-semibold text-amber-900 mb-2 bg-white/80 p-2 rounded-xl border border-amber-200/60">
                💡 {strokeData.overallTipEn}
              </p>
            )}

            <ul className="text-xs space-y-1.5 font-medium text-amber-900/90">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">1.</span>
                <span>Look at numbered circle ① for where to place your finger first.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">2.</span>
                <span>Drag along the dashed arrow towards the arrow tip.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">3.</span>
                <span>Proceed to step ②, then ③ until complete!</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
