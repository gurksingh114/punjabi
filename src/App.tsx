/**
 * Punjabi Toddler Learning App - Main Application
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AlphabetExplorer } from './components/AlphabetExplorer';
import { TracingCanvas } from './components/TracingCanvas';
import { VocabularyFlashcards } from './components/VocabularyFlashcards';
import { GamesHub } from './components/GamesHub';
import { RhymesSingAlong } from './components/RhymesSingAlong';
import { StickerBook } from './components/StickerBook';
import { ParentGuideModal } from './components/ParentGuideModal';
import { AppSection, GurmukhiLetter, VocabWord } from './types';
import { setMuted, getMuted, playCelebration } from './utils/audio';

export default function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('alphabet');
  const [selectedLetterForTracing, setSelectedLetterForTracing] = useState<GurmukhiLetter | null>(null);
  const [isParentGuideOpen, setIsParentGuideOpen] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // Gamification & Rewards State (Persisted in localStorage)
  const [starsCount, setStarsCount] = useState<number>(() => {
    const saved = localStorage.getItem('punjabi_toddler_stars');
    return saved ? parseInt(saved, 10) : 10; // Start with 10 welcome stars!
  });

  const [unlockedStickers, setUnlockedStickers] = useState<string[]>(() => {
    const saved = localStorage.getItem('punjabi_toddler_stickers');
    return saved ? JSON.parse(saved) : ['stk-sher']; // Start with lion badge
  });

  // Save stars to localStorage
  useEffect(() => {
    localStorage.setItem('punjabi_toddler_stars', starsCount.toString());
  }, [starsCount]);

  // Save stickers to localStorage
  useEffect(() => {
    localStorage.setItem('punjabi_toddler_stickers', JSON.stringify(unlockedStickers));
  }, [unlockedStickers]);

  // Helper to award stars & check sticker unlocks
  const awardStars = (count: number) => {
    setStarsCount((prev) => {
      const updated = prev + count;
      if (updated >= 50 && !unlockedStickers.includes('stk-star')) {
        unlockSticker('stk-star');
      }
      return updated;
    });
  };

  const unlockSticker = (stickerId: string) => {
    if (!unlockedStickers.includes(stickerId)) {
      setUnlockedStickers((prev) => [...prev, stickerId]);
      playCelebration();
    }
  };

  // Event handlers from components
  const handleStartTracing = (letter: GurmukhiLetter) => {
    setSelectedLetterForTracing(letter);
    setCurrentSection('tracing');
  };

  const handleLetterExplored = () => {
    awardStars(1);
  };

  const handleTraceCompleted = (charName: string) => {
    awardStars(5);
    unlockSticker('stk-tractor');
  };

  const handleWordExplored = (word: VocabWord) => {
    awardStars(1);
    unlockSticker('stk-amb');
  };

  const handleGameCompleted = (gameName: string, starsEarned: number) => {
    awardStars(starsEarned * 5);
    unlockSticker('stk-dhol');
    if (gameName === 'Balloon Pop') {
      unlockSticker('stk-patang');
    } else if (gameName === 'Ginti Safari') {
      unlockSticker('stk-mor');
    }
  };

  const handleRhymeCompleted = () => {
    awardStars(10);
    unlockSticker('stk-jalebi');
  };

  const handleToggleMute = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    setMuted(nextState);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-['Fredoka',sans-serif]">
      
      {/* Top Header Navigation */}
      <Header
        currentSection={currentSection}
        onSelectSection={(section) => {
          setCurrentSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        starsCount={starsCount}
        isMuted={isSoundMuted}
        onToggleMute={handleToggleMute}
        onOpenParentGuide={() => setIsParentGuideOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* SECTION 1: Alphabet Varnamala Explorer */}
        {currentSection === 'alphabet' && (
          <AlphabetExplorer
            onStartTracing={handleStartTracing}
            onLetterExplored={handleLetterExplored}
          />
        )}

        {/* SECTION 2: Tracing Canvas (Gurmukhi Akhar & Numbers) */}
        {currentSection === 'tracing' && (
          <TracingCanvas
            initialLetter={selectedLetterForTracing}
            onTraceCompleted={handleTraceCompleted}
          />
        )}

        {/* SECTION 3: Vocabulary Flashcards & Audio Soundboard */}
        {currentSection === 'vocabulary' && (
          <VocabularyFlashcards
            onWordExplored={handleWordExplored}
          />
        )}

        {/* SECTION 4: Toddler Educational Mini-Games */}
        {currentSection === 'games' && (
          <GamesHub
            onGameCompleted={handleGameCompleted}
          />
        )}

        {/* SECTION 5: Punjabi Nursery Rhymes & Sing-Along */}
        {currentSection === 'rhymes' && (
          <RhymesSingAlong
            onRhymeCompleted={handleRhymeCompleted}
          />
        )}

        {/* SECTION 6: Reward Sticker Book & Collage Playground */}
        {currentSection === 'stickers' && (
          <StickerBook
            unlockedStickers={unlockedStickers}
            starsCount={starsCount}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-slate-600 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center text-lg">
              🦁
            </div>
            <span className="font-bold text-base text-slate-800 font-baloo">
              Punjabi Pathshala
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ • Joyful Punjabi Learning for Toddlers & Early Learners
          </p>

          <button
            id="footer-parent-guide-link"
            onClick={() => setIsParentGuideOpen(true)}
            className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-bold text-xs transition-colors cursor-pointer"
          >
            Parents & Educator Guide
          </button>
        </div>
      </footer>

      {/* Parent Guide Modal */}
      <ParentGuideModal
        isOpen={isParentGuideOpen}
        onClose={() => setIsParentGuideOpen(false)}
      />

    </div>
  );
}
