import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Award } from 'lucide-react';
import { STICKER_REWARDS } from '../data/punjabiData';
import { StickerReward } from '../types';
import { playChime, playSparkle, speakPunjabi, playPop } from '../utils/audio';

interface StickerBookProps {
  unlockedStickers: string[];
  starsCount: number;
}

interface PlacedSticker {
  instanceId: string;
  emoji: string;
  title: string;
  x: number;
  y: number;
  scale: number;
}

export const StickerBook: React.FC<StickerBookProps> = ({ unlockedStickers, starsCount }) => {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { instanceId: 'init-1', emoji: '🦁', title: 'Brave Lion', x: 25, y: 35, scale: 1.2 },
    { instanceId: 'init-2', emoji: '🚜', title: 'Tractor', x: 65, y: 45, scale: 1.1 },
    { instanceId: 'init-3', emoji: '☀️', title: 'Sun', x: 80, y: 15, scale: 1.3 }
  ]);

  const handlePlaceSticker = (sticker: StickerReward) => {
    if (!unlockedStickers.includes(sticker.id)) {
      speakPunjabi(`ਇਹ ਸਟਿੱਕਰ ਖੇਡ ਕੇ ਖੋਲ੍ਹੋ!`, 1.1, 0.82);
      return;
    }

    playSparkle();
    const newSticker: PlacedSticker = {
      instanceId: `placed-${Date.now()}-${Math.random()}`,
      emoji: sticker.emoji,
      title: sticker.title,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 50,
      scale: 1 + Math.random() * 0.3
    };

    setPlacedStickers((prev) => [...prev, newSticker]);
    speakPunjabi(`${sticker.gurmukhiTitle}!`, 1.15, 0.85);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handleClearCollage = () => {
    playChime();
    setPlacedStickers([]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-5 sm:p-7 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-xs">
            🏆
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-baloo">
              Mera Punjabi Sticker Album (ਮੇਰੇ ਸਟਿੱਕਰ)
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              Collect rewards by tracing Gurmukhi letters, practicing words, and playing games!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/30">
          <span className="text-2xl animate-bounce">⭐</span>
          <div>
            <span className="text-xl font-bold block leading-tight">{starsCount}</span>
            <span className="text-[10px] text-amber-100 uppercase tracking-wider">Total Stars</span>
          </div>
        </div>
      </div>

      {/* Stickers Showcase Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Badge Collection ({unlockedStickers.length} of {STICKER_REWARDS.length} Unlocked)</span>
          </h4>
          <span className="text-xs text-slate-400 font-medium">Tap to place on canvas!</span>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3">
          {STICKER_REWARDS.map((stk) => {
            const isUnlocked = unlockedStickers.includes(stk.id);
            return (
              <button
                key={stk.id}
                id={`sticker-badge-${stk.id}`}
                onClick={() => handlePlaceSticker(stk)}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col items-center justify-between text-center select-none ${
                  isUnlocked
                    ? 'bg-amber-50/50 hover:bg-amber-100/70 border-amber-200 shadow-xs hover:scale-102 cursor-pointer'
                    : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="text-4xl my-1 relative">
                  <span className={isUnlocked ? 'filter-none' : 'grayscale opacity-40'}>
                    {stk.emoji}
                  </span>
                  {!isUnlocked && (
                    <span className="absolute -bottom-1 -right-1 text-xs">🔒</span>
                  )}
                </div>

                <div className="w-full mt-1.5">
                  <span className="text-xs sm:text-sm font-bold font-gurmukhi text-slate-900 block truncate">
                    {stk.gurmukhiTitle}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 font-baloo block truncate">
                    {stk.title}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                    {stk.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toddler Interactive Sticker Collage Playground */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sticker Collage Playground (ਸਟਿੱਕਰ ਬੋਰਡ)</span>
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Tap any unlocked badge above to add stickers here!
            </p>
          </div>

          <button
            id="clear-collage-btn"
            onClick={handleClearCollage}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Collage</span>
          </button>
        </div>

        {/* Scenic Stage Canvas */}
        <div className="relative w-full h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-slate-200 bg-amber-50/30 shadow-inner">
          
          {/* Background Scene Elements */}
          <div className="absolute top-4 right-8 text-5xl opacity-40 select-none pointer-events-none">
            ☀️
          </div>
          <div className="absolute top-8 left-10 text-4xl opacity-30 select-none pointer-events-none">
            ☁️
          </div>
          <div className="absolute bottom-2 left-6 text-5xl opacity-50 select-none pointer-events-none">
            🌾
          </div>
          <div className="absolute bottom-2 right-6 text-5xl opacity-50 select-none pointer-events-none">
            🌾
          </div>

          {/* Placed Interactive Stickers */}
          {placedStickers.map((item) => (
            <div
              key={item.instanceId}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) scale(${item.scale})`
              }}
              onClick={() => {
                playPop();
                speakPunjabi(item.title, 1.15, 0.85);
              }}
              className="absolute cursor-pointer select-none hover:scale-125 active:scale-95 transition-transform duration-150 filter drop-shadow-sm"
              title={`Tap to hear: ${item.title}`}
            >
              <span className="text-5xl sm:text-6xl block">
                {item.emoji}
              </span>
            </div>
          ))}

          {placedStickers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4 pointer-events-none">
              <p className="text-xs sm:text-sm font-semibold text-slate-600 bg-white/90 px-4 py-2 rounded-full border border-slate-200 shadow-xs">
                🎨 Tap unlocked stickers above to create your Punjabi scene!
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
