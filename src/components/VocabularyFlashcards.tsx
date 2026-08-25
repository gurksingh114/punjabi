import React, { useState } from 'react';
import { 
  Volume2, 
  Volume1, 
  ArrowLeft, 
  ArrowRight, 
  LayoutGrid, 
  Layers
} from 'lucide-react';
import { VOCAB_CATEGORIES, VOCABULARY_WORDS } from '../data/punjabiData';
import { VocabCategory, VocabWord } from '../types';
import { 
  speakWord, 
  playChime, 
  speakPraise 
} from '../utils/audio';

interface VocabularyFlashcardsProps {
  onWordExplored: (word: VocabWord) => void;
}

export const VocabularyFlashcards: React.FC<VocabularyFlashcardsProps> = ({
  onWordExplored
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory>('animals');
  const [viewMode, setViewMode] = useState<'flashcard' | 'soundboard'>('flashcard');
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [praiseText, setPraiseText] = useState<string | null>(null);

  // Filter words by category
  const categoryWords = VOCABULARY_WORDS.filter(w => w.category === selectedCategory);
  const activeWord = categoryWords[activeWordIndex] || categoryWords[0];
  const categoryInfo = VOCAB_CATEGORIES.find(c => c.id === selectedCategory)!;

  const handleSpeakWord = (word: VocabWord, isSlow = false) => {
    playChime();
    void speakWord(word, true);
    onWordExplored(word);

    if (Math.random() > 0.65) {
      setTimeout(() => {
        const praise = speakPraise();
        setPraiseText(`${praise.gurmukhi} (${praise.roman})`);
        setTimeout(() => setPraiseText(null), 2500);
      }, 900);
    }
  };

  const handleNextWord = () => {
    playChime();
    setActiveWordIndex((prev) => (prev + 1) % categoryWords.length);
  };

  const handlePrevWord = () => {
    playChime();
    setActiveWordIndex((prev) => (prev - 1 + categoryWords.length) % categoryWords.length);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Category Selection Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
            Choose Category (ਵਿਸ਼ਾ ਚੁਣੋ)
          </span>

          {/* Switch View (Card vs Soundboard) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              id="view-flashcard-mode-btn"
              onClick={() => {
                playChime();
                setViewMode('flashcard');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'flashcard'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Big Card</span>
            </button>
            <button
              id="view-soundboard-mode-btn"
              onClick={() => {
                playChime();
                setViewMode('soundboard');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'soundboard'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Sound Board</span>
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {VOCAB_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => {
                  playChime();
                  setSelectedCategory(cat.id);
                  setActiveWordIndex(0);
                }}
                className={`min-w-[95px] sm:min-w-[115px] p-2.5 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-1 select-none flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs scale-102'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-xs">{cat.nameEnglish}</span>
                <span className={`text-[10px] font-gurmukhi ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {cat.nameGurmukhi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Praise Toast Banner */}
      {praiseText && (
        <div className="bg-emerald-500 text-white font-bold text-center py-2 px-5 rounded-full shadow-md animate-bounce text-xs sm:text-sm flex items-center justify-center gap-2">
          <span>🌟</span>
          <span>{praiseText}</span>
          <span>🎉</span>
        </div>
      )}

      {/* MODE 1: Giant Flashcard with Audio */}
      {viewMode === 'flashcard' && activeWord && (
        <div className="space-y-4">
          
          {/* Main Interactive Flashcard */}
          <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-sm relative min-h-[360px] sm:min-h-[400px] flex flex-col items-center justify-between text-center overflow-hidden">
            
            {/* Top Indicator */}
            <div className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
              <span className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                {categoryInfo.emoji} {categoryInfo.nameEnglish} ({categoryInfo.nameGurmukhi})
              </span>
              <span className="bg-white px-2.5 py-1 rounded-full border border-slate-200 text-xs">
                Word {activeWordIndex + 1} of {categoryWords.length}
              </span>
            </div>

            {/* Giant Emoji Button */}
            <div className="my-3 sm:my-4 flex flex-col items-center">
              <button
                id={`flashcard-emoji-btn-${activeWord.id}`}
                onClick={() => handleSpeakWord(activeWord)}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center justify-center text-7xl sm:text-8xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                title="Tap to hear pronunciation!"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {activeWord.emoji}
                </span>
              </button>
            </div>

            {/* Gurmukhi & English Details */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-4xl sm:text-6xl font-black font-gurmukhi text-slate-900 tracking-wide">
                  {activeWord.gurmukhi}
                </h3>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-800 font-baloo">
                  {activeWord.roman}
                </span>
                <span className="text-lg sm:text-xl text-slate-500 font-normal">
                  • {activeWord.english}
                </span>
              </div>

              {activeWord.funFact && (
                <p className="text-xs font-medium text-amber-900 bg-amber-100/70 px-3.5 py-1 rounded-full inline-block mt-2 border border-amber-200 font-gurmukhi">
                  💡 {activeWord.funFact}
                </p>
              )}
            </div>

            {/* Audio Pronunciation Controls */}
            <div className="flex items-center justify-center gap-2.5 mt-5 flex-wrap">
              <button
                id="speak-normal-speed-btn"
                onClick={() => handleSpeakWord(activeWord, false)}
                className="btn-primary px-5 py-2.5 rounded-2xl font-bold text-white flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>Hear Punjabi Voice</span>
              </button>

              <button
                id="speak-slow-speed-btn"
                onClick={() => handleSpeakWord(activeWord, true)}
                className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold transition-all flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-xs"
                title="Speak slowly so toddler can repeat"
              >
                <Volume1 className="w-4 h-4" />
                <span>Slow Speed (ਹੌਲੀ)</span>
              </button>
            </div>

          </div>

          {/* Navigation Controls (Prev / Next Word) */}
          <div className="flex items-center justify-between gap-3">
            <button
              id="vocab-prev-btn"
              onClick={handlePrevWord}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Word</span>
            </button>

            <button
              id="vocab-next-btn"
              onClick={handleNextWord}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              <span>Next Word</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* MODE 2: Toddler Interactive Sound Board Grid */}
      {viewMode === 'soundboard' && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>👇 Tap any card below to hear instant Punjabi voice!</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">{categoryWords.length} Words</span>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3.5">
            {categoryWords.map((word) => (
              <button
                key={word.id}
                id={`soundboard-item-${word.id}`}
                onClick={() => handleSpeakWord(word)}
                className="bg-white hover:bg-amber-50/50 rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 hover:border-amber-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all text-center flex flex-col items-center justify-between min-h-[140px] sm:min-h-[155px] group cursor-pointer"
              >
                <div className="w-full flex justify-end">
                  <div className="p-1 rounded-full bg-amber-100 text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Volume2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl my-1 group-hover:scale-105 transition-transform">
                  {word.emoji}
                </div>

                <div className="w-full">
                  <div className="text-lg sm:text-xl font-bold font-gurmukhi text-slate-900 truncate">
                    {word.gurmukhi}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 font-baloo truncate">
                    {word.roman}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {word.english}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
