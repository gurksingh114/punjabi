import React, { useState } from 'react';
import { Volume2, Edit3, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { GURMUKHI_LETTERS } from '../data/punjabiData';
import { GurmukhiLetter } from '../types';
import { speakLetterDetails, playChime, playSuccessChime, speakPraise } from '../utils/audio';

interface AlphabetExplorerProps {
  onStartTracing: (letter: GurmukhiLetter) => void;
  onLetterExplored: () => void;
}

export const AlphabetExplorer: React.FC<AlphabetExplorerProps> = ({
  onStartTracing,
  onLetterExplored
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'vowel' | 'consonant' | 'additional'>('all');
  const [activeLetter, setActiveLetter] = useState<GurmukhiLetter>(GURMUKHI_LETTERS[0]);
  const [praiseMessage, setPraiseMessage] = useState<{ gurmukhi: string; roman: string } | null>(null);

  const filteredLetters = GURMUKHI_LETTERS.filter((l) => {
    if (selectedFilter === 'all') return true;
    return l.category === selectedFilter;
  });

  const handlePlayAudio = (letter: GurmukhiLetter) => {
    setActiveLetter(letter);
    speakLetterDetails(letter.letter, letter.name, letter.exampleWord);
    onLetterExplored();

    // Occasional celebration for toddler encouragement
    if (Math.random() > 0.6) {
      const praise = speakPraise();
      setPraiseMessage(praise);
      setTimeout(() => setPraiseMessage(null), 2500);
    }
  };

  const handleNextLetter = () => {
    const currentIndex = GURMUKHI_LETTERS.findIndex(l => l.id === activeLetter.id);
    const nextIndex = (currentIndex + 1) % GURMUKHI_LETTERS.length;
    const nextLetter = GURMUKHI_LETTERS[nextIndex];
    handlePlayAudio(nextLetter);
  };

  const handlePrevLetter = () => {
    const currentIndex = GURMUKHI_LETTERS.findIndex(l => l.id === activeLetter.id);
    const prevIndex = (currentIndex - 1 + GURMUKHI_LETTERS.length) % GURMUKHI_LETTERS.length;
    const prevLetter = GURMUKHI_LETTERS[prevIndex];
    handlePlayAudio(prevLetter);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Showcase Card for Active Letter */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Background decorative faint Gurmukhi */}
        <div className="absolute -bottom-8 -right-6 opacity-5 text-[160px] sm:text-[200px] font-black text-amber-900 pointer-events-none select-none font-gurmukhi leading-none">
          ੳਅੲ
        </div>

        {praiseMessage && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md animate-bounce z-20 flex items-center gap-1.5">
            <span>🎉</span>
            <span>{praiseMessage.gurmukhi} ({praiseMessage.roman})</span>
          </div>
        )}

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Main Giant Letter & Sound */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
            <button
              id={`hero-letter-btn-${activeLetter.id}`}
              onClick={() => handlePlayAudio(activeLetter)}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center justify-center text-7xl sm:text-8xl font-black font-gurmukhi text-slate-800 hover:scale-105 active:scale-95 transition-all group relative cursor-pointer"
              title="Click to hear pronunciation!"
            >
              <span>{activeLetter.letter}</span>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Volume2 className="w-4 h-4 animate-pulse" />
              </div>
            </button>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-baloo">
                  {activeLetter.name}
                </span>
                <span className="text-lg sm:text-xl font-bold font-gurmukhi text-amber-900 bg-amber-100/80 px-3 py-0.5 rounded-xl border border-amber-200">
                  {activeLetter.gurmukhiName}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-slate-500">Phonetic Sound:</span>
                <span className="font-bold text-slate-800 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                  "{activeLetter.phoneticSound}"
                </span>
              </div>

              {/* Example Word Pill */}
              <div className="mt-3.5 flex items-center justify-center sm:justify-start gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-3xl">{activeLetter.exampleEmoji}</span>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-bold font-gurmukhi text-slate-800 leading-tight">
                    {activeLetter.exampleWord} <span className="text-xs font-baloo font-normal text-slate-500">({activeLetter.exampleRoman})</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Meaning: <span className="font-medium text-slate-700">{activeLetter.exampleEnglish}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for Active Letter */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto">
            <button
              id="hero-speak-again-btn"
              onClick={() => handlePlayAudio(activeLetter)}
              className="flex-1 sm:flex-none btn-primary px-5 py-2.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>Speak</span>
            </button>

            <button
              id="hero-trace-btn"
              onClick={() => {
                playSuccessChime();
                onStartTracing(activeLetter);
              }}
              className="flex-1 sm:flex-none btn-success px-5 py-2.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Edit3 className="w-5 h-5" />
              <span>Trace Letter</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                id="hero-prev-btn"
                onClick={handlePrevLetter}
                title="Previous Letter"
                className="p-2.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                id="hero-next-btn"
                onClick={handleNextLetter}
                title="Next Letter"
                className="p-2.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 text-slate-700 font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="filter-all-btn"
            onClick={() => {
              playChime();
              setSelectedFilter('all');
            }}
            className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            All 35 (ਸਾਰੇ ਅੱਖਰ)
          </button>
          <button
            id="filter-vowels-btn"
            onClick={() => {
              playChime();
              setSelectedFilter('vowel');
            }}
            className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedFilter === 'vowel'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Matra Roots (ੳ, ਅ, ੲ)
          </button>
          <button
            id="filter-consonants-btn"
            onClick={() => {
              playChime();
              setSelectedFilter('consonant');
            }}
            className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedFilter === 'consonant'
                ? 'bg-blue-500 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Consonants (ਵਿਅੰਜਨ)
          </button>
          <button
            id="filter-additional-btn"
            onClick={() => {
              playChime();
              setSelectedFilter('additional');
            }}
            className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              selectedFilter === 'additional'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Bindi Sounds (ਪੈਰ ਬਿੰਦੀ)
          </button>
        </div>

        <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-600">
          {filteredLetters.length} Letters
        </div>
      </div>

      {/* Gurmukhi Letter Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5 sm:gap-3.5">
        {filteredLetters.map((letter) => {
          const isSelected = activeLetter.id === letter.id;

          return (
            <div
              key={letter.id}
              id={`letter-card-${letter.id}`}
              onClick={() => handlePlayAudio(letter)}
              className={`group relative rounded-2xl p-3 sm:p-3.5 text-center cursor-pointer transition-all duration-150 border select-none flex flex-col items-center justify-between ${
                isSelected
                  ? 'bg-amber-50 border-amber-400 shadow-md ring-2 ring-amber-400/20 -translate-y-1'
                  : 'bg-white border-slate-200/90 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5 active:scale-98'
              }`}
            >
              {/* Top Mini Tag */}
              <div className="flex items-center justify-between w-full text-[11px] font-bold text-slate-600 mb-0.5">
                <span className="font-baloo truncate">{letter.name}</span>
                <span className="text-base">{letter.exampleEmoji}</span>
              </div>

              {/* Big Gurmukhi Letter */}
              <div className="my-1.5 text-4xl sm:text-5xl font-black font-gurmukhi text-slate-800 group-hover:scale-105 transition-transform">
                {letter.letter}
              </div>

              {/* Example Word Pill */}
              <div className="w-full bg-slate-50/80 rounded-xl py-1 px-1.5 border border-slate-100 mt-1">
                <p className="text-xs font-bold font-gurmukhi text-slate-800 truncate">
                  {letter.exampleWord}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {letter.exampleEnglish}
                </p>
              </div>

              {/* Quick Audio / Trace Controls */}
              <div className="flex items-center justify-center gap-1 mt-2 w-full pt-1.5 border-t border-slate-100">
                <button
                  id={`play-sound-${letter.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(letter);
                  }}
                  title="Speak Letter"
                  className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
                <button
                  id={`quick-trace-${letter.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSuccessChime();
                    onStartTracing(letter);
                  }}
                  title="Trace on Canvas"
                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trace</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
