import React from 'react';
import { Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { AppSection } from '../types';
import { playChime } from '../utils/audio';

interface HeaderProps {
  currentSection: AppSection;
  onSelectSection: (section: AppSection) => void;
  starsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenParentGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onSelectSection,
  starsCount,
  isMuted,
  onToggleMute,
  onOpenParentGuide
}) => {
  const navItems: { id: AppSection; label: string; gurmukhi: string; icon: string; activeColor: string }[] = [
    { id: 'alphabet', label: 'Alphabet', gurmukhi: 'ਅੱਖਰ', icon: '🔤', activeColor: 'bg-amber-500 text-white shadow-amber-200' },
    { id: 'tracing', label: 'Trace & Draw', gurmukhi: 'ਲਿਖੋ', icon: '✏️', activeColor: 'bg-emerald-500 text-white shadow-emerald-200' },
    { id: 'vocabulary', label: 'Words & Audio', gurmukhi: 'ਸ਼ਬਦ', icon: '🗣️', activeColor: 'bg-rose-500 text-white shadow-rose-200' },
    { id: 'games', label: 'Play Games', gurmukhi: 'ਖੇਡੋ', icon: '🎮', activeColor: 'bg-blue-500 text-white shadow-blue-200' },
    { id: 'rhymes', label: 'Sing Rhymes', gurmukhi: 'ਕਵਿਤਾਵਾਂ', icon: '🎵', activeColor: 'bg-purple-500 text-white shadow-purple-200' },
    { id: 'stickers', label: 'Stickers', gurmukhi: 'ਸਟਿੱਕਰ', icon: '⭐', activeColor: 'bg-amber-500 text-white shadow-amber-200' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <button 
            id="brand-home-btn"
            onClick={() => {
              playChime();
              onSelectSection('alphabet');
            }}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-amber-100 text-amber-900 border border-amber-200 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black font-gurmukhi shadow-xs group-hover:scale-105 transition-transform">
              ੳ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 font-baloo tracking-tight">
                  Punjabi <span className="text-amber-600">Pathshala</span>
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-slate-500 hidden sm:block">
                Joyful Gurmukhi Alphabet, Words & Play for Toddlers
              </p>
            </div>
          </button>

          {/* Right Action Bar (Stars, Sound, Info) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Stars Collected Counter */}
            <button
              id="header-stars-badge"
              onClick={() => {
                playChime();
                onSelectSection('stickers');
              }}
              title="View your collected stars & stickers"
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full transition-all cursor-pointer"
            >
              <span className="text-base sm:text-lg animate-bounce">⭐</span>
              <span className="font-extrabold">{starsCount.toLocaleString()}</span>
              <span className="hidden sm:inline text-xs font-semibold text-amber-700">Stars</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={() => {
                playChime();
                onToggleMute();
              }}
              title={isMuted ? 'Unmute Sound & Voice' : 'Mute Sound'}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                isMuted
                  ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Parent Guide Modal Button */}
            <button
              id="parent-guide-btn"
              onClick={() => {
                playChime();
                onOpenParentGuide();
              }}
              title="Parents Guide & Pronunciation Tips"
              className="px-3 sm:px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Guide</span>
            </button>
          </div>
        </div>

        {/* Clean Navigation Bar */}
        <nav className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => {
                  playChime();
                  onSelectSection(item.id);
                }}
                className={`flex-1 min-w-[85px] sm:min-w-[120px] py-2 px-2.5 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center select-none cursor-pointer ${
                  isActive
                    ? `${item.activeColor} shadow-md scale-102`
                    : 'bg-slate-100/70 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-transparent'
                }`}
              >
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <div className="flex flex-col items-center sm:items-start leading-tight">
                  <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                  <span className={`text-[10px] font-gurmukhi hidden xs:block ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    {item.gurmukhi}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
