import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { TODDLER_RHYMES } from '../data/punjabiData';
import { ToddlerRhyme } from '../types';
import { speakPunjabi, playDholBeat, playChime, playCelebration } from '../utils/audio';

interface RhymesSingAlongProps {
  onRhymeCompleted: () => void;
}

export const RhymesSingAlong: React.FC<RhymesSingAlongProps> = ({ onRhymeCompleted }) => {
  const [selectedRhyme, setSelectedRhyme] = useState<ToddlerRhyme>(TODDLER_RHYMES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopPlayback = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const playLine = (index: number) => {
    if (index >= selectedRhyme.lines.length) {
      setIsPlaying(false);
      playCelebration();
      onRhymeCompleted();
      return;
    }

    setCurrentLineIndex(index);
    const line = selectedRhyme.lines[index];

    playDholBeat('dha');
    setTimeout(() => playDholBeat('ge'), 350);

    speakPunjabi(line.gurmukhi, 1.15, 0.78);

    timerRef.current = setTimeout(() => {
      playLine(index + 1);
    }, line.durationMs || 3200);
  };

  const handleStartRhyme = () => {
    playChime();
    setIsPlaying(true);
    playLine(0);
  };

  const handlePause = () => {
    stopPlayback();
  };

  const handleReset = () => {
    stopPlayback();
    setCurrentLineIndex(0);
  };

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [selectedRhyme]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Rhyme Selector Cards */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 block">
          Select a Punjabi Rhyme (ਕਵਿਤਾ ਚੁਣੋ)
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TODDLER_RHYMES.map((rhyme) => {
            const isSelected = selectedRhyme.id === rhyme.id;
            return (
              <button
                key={rhyme.id}
                id={`rhyme-card-${rhyme.id}`}
                onClick={() => {
                  stopPlayback();
                  setSelectedRhyme(rhyme);
                  setCurrentLineIndex(0);
                }}
                className={`p-2.5 rounded-2xl font-bold transition-all flex flex-col items-center justify-center text-center gap-0.5 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span className="text-2xl">{rhyme.emoji}</span>
                <span className="text-xs sm:text-sm font-bold font-gurmukhi truncate w-full">
                  {rhyme.titleGurmukhi}
                </span>
                <span className={`text-[10px] truncate w-full ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {rhyme.titleRoman}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sing-Along Stage */}
      <div className="bg-gradient-to-b from-orange-50/80 via-white to-amber-50/30 rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-sm relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-orange-200 flex items-center justify-center text-3xl shadow-xs">
              {selectedRhyme.emoji}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-gurmukhi text-slate-900">
                {selectedRhyme.titleGurmukhi}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 font-baloo">
                {selectedRhyme.titleRoman} • {selectedRhyme.titleEnglish}
              </p>
            </div>
          </div>

          {/* Sing Along Controls */}
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                id="start-rhyme-btn"
                onClick={handleStartRhyme}
                className="btn-primary px-5 py-2.5 rounded-2xl font-bold text-white flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Sing Along!</span>
              </button>
            ) : (
              <button
                id="pause-rhyme-btn"
                onClick={handlePause}
                className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center gap-2 text-sm shadow-xs cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </button>
            )}

            <button
              id="reset-rhyme-btn"
              onClick={handleReset}
              title="Reset Song"
              className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bouncing Karaoke Lines Arena */}
        <div className="space-y-2.5 my-5">
          {selectedRhyme.lines.map((line, idx) => {
            const isCurrent = isPlaying && currentLineIndex === idx;
            return (
              <div
                key={idx}
                id={`karaoke-line-${idx}`}
                onClick={() => {
                  stopPlayback();
                  setCurrentLineIndex(idx);
                  speakPunjabi(line.gurmukhi, 1.15, 0.78);
                  playDholBeat('dha');
                }}
                className={`rounded-2xl p-3.5 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer border ${
                  isCurrent
                    ? 'bg-amber-100/90 border-amber-300 shadow-sm scale-101'
                    : 'bg-white border-slate-200/80 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${isCurrent ? 'animate-bounce' : ''}`}>
                    {line.emoji || '🎵'}
                  </span>
                  <div>
                    <p className="text-lg sm:text-xl font-bold font-gurmukhi text-slate-900">
                      {line.gurmukhi}
                    </p>
                    <p className="text-xs font-semibold font-baloo text-slate-700">
                      {line.roman}
                    </p>
                    <p className="text-[11px] text-slate-400 italic">
                      "{line.english}"
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-slate-100 text-slate-600">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Punjabi Dhol Drum Playpad for Toddler */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-center sm:text-left">
            <span className="font-bold text-xs sm:text-sm text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
              <span>🥁</span>
              <span>Tap to Play Dhol Beats (ਢੋਲ ਵਜਾਓ):</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <button
              id="dhol-beat-dha"
              onClick={() => playDholBeat('dha')}
              className="py-2.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>🥁</span>
              <span>Dha! (ਧਾ)</span>
            </button>
            <button
              id="dhol-beat-ge"
              onClick={() => playDholBeat('ge')}
              className="py-2.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 font-bold transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>🥁</span>
              <span>Ge! (ਗੇ)</span>
            </button>
            <button
              id="dhol-beat-na"
              onClick={() => playDholBeat('na')}
              className="py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>🥁</span>
              <span>Na! (ਨਾ)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
