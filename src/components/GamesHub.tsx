import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Volume2
} from 'lucide-react';
import { GURMUKHI_LETTERS, VOCABULARY_WORDS, GURMUKHI_NUMBERS } from '../data/punjabiData';
import { GameType, GurmukhiLetter, VocabWord } from '../types';
import { 
  playPop, 
  playSuccessChime, 
  playCelebration, 
  playBoing, 
  speakPunjabi, 
  speakPraise, 
  playChime 
} from '../utils/audio';

interface GamesHubProps {
  onGameCompleted: (gameName: string, starsEarned: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onGameCompleted }) => {
  const [selectedGame, setSelectedGame] = useState<GameType>('balloon-pop');
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // ----------------------------------------------------
  // GAME 1: BALLOON POP (ਗੁਬਾਰੇ ਫੋੜੋ)
  // ----------------------------------------------------
  interface BalloonItem {
    id: string;
    letter: GurmukhiLetter;
    color: string;
    bgClass: string;
    isTarget: boolean;
    popped: boolean;
  }

  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [targetLetter, setTargetLetter] = useState<GurmukhiLetter>(GURMUKHI_LETTERS[0]);

  const setupBalloonGame = useCallback(() => {
    const shuffled = [...GURMUKHI_LETTERS].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const distractors = shuffled.slice(1, 4);
    const pool = [target, ...distractors].sort(() => 0.5 - Math.random());

    const colors = [
      'bg-rose-500',
      'bg-amber-500',
      'bg-emerald-500',
      'bg-sky-500',
      'bg-purple-500'
    ];

    const balloonList: BalloonItem[] = pool.map((item, idx) => ({
      id: `balloon-${item.id}-${idx}`,
      letter: item,
      color: colors[idx % colors.length],
      bgClass: colors[idx % colors.length],
      isTarget: item.id === target.id,
      popped: false
    }));

    setTargetLetter(target);
    setBalloons(balloonList);
    setFeedback(null);

    setTimeout(() => {
      speakPunjabi(`ਲੱਭੋ ਅੱਖਰ ${target.letter}, ${target.name}`, 1.1, 0.82);
    }, 200);
  }, []);

  const handlePopBalloon = (balloon: BalloonItem) => {
    if (balloon.popped) return;
    playPop();

    setBalloons((prev) =>
      prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b))
    );

    if (balloon.isTarget) {
      playSuccessChime();
      setScore((s) => s + 10);
      const praise = speakPraise();
      setFeedback({ isCorrect: true, message: `${praise.gurmukhi} (${praise.roman})` });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      onGameCompleted('Balloon Pop', 1);

      setTimeout(() => {
        setupBalloonGame();
      }, 1600);
    } else {
      playBoing();
      speakPunjabi(`ਇਹ ${balloon.letter.letter} ਹੈ, ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ`, 1.05, 0.85);
      setFeedback({ isCorrect: false, message: `Try again! That was ${balloon.letter.letter} (${balloon.letter.name})` });
    }
  };

  // ----------------------------------------------------
  // GAME 2: MEMORY MATCH CARDS (ਜੋੜੇ ਮਿਲਾਓ)
  // ----------------------------------------------------
  interface MemoryCard {
    uniqueId: string;
    matchId: string;
    content: string;
    label: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const setupMemoryGame = useCallback(() => {
    const letters = [...GURMUKHI_LETTERS].sort(() => 0.5 - Math.random()).slice(0, 3);
    const cardPairs: MemoryCard[] = [];

    letters.forEach((l) => {
      cardPairs.push({
        uniqueId: `card-letter-${l.id}`,
        matchId: l.id,
        content: l.letter,
        label: l.name,
        isFlipped: false,
        isMatched: false
      });
      cardPairs.push({
        uniqueId: `card-emoji-${l.id}`,
        matchId: l.id,
        content: l.exampleEmoji,
        label: l.exampleWord,
        isFlipped: false,
        isMatched: false
      });
    });

    setMemoryCards(cardPairs.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setFeedback(null);
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return;
    if (memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    playChime();

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = updated[newFlipped[0]];
      const card2 = updated[newFlipped[1]];

      if (card1.matchId === card2.matchId) {
        playSuccessChime();
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.matchId === card1.matchId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setScore((s) => s + 20);
          speakPraise();

          const remaining = updated.filter((c) => !c.isMatched && c.matchId !== card1.matchId);
          if (remaining.length === 0) {
            playCelebration();
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
            onGameCompleted('Memory Match', 2);
          }
        }, 600);
      } else {
        playBoing();
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c, i) =>
              newFlipped.includes(i) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  // ----------------------------------------------------
  // GAME 3: FIND THE OBJECT (QUIZ)
  // ----------------------------------------------------
  const [quizWord, setQuizWord] = useState<VocabWord>(VOCABULARY_WORDS[0]);
  const [quizOptions, setQuizOptions] = useState<VocabWord[]>([]);

  const setupQuizGame = useCallback(() => {
    const shuffled = [...VOCABULARY_WORDS].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const distractors = shuffled.slice(1, 4);
    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setQuizWord(target);
    setQuizOptions(options);
    setFeedback(null);

    setTimeout(() => {
      speakPunjabi(`ਕਿੱਥੇ ਹੈ ${target.gurmukhi}, ${target.roman}?`, 1.1, 0.82);
    }, 200);
  }, []);

  const handleQuizAnswer = (option: VocabWord) => {
    playChime();
    if (option.id === quizWord.id) {
      playSuccessChime();
      setScore((s) => s + 15);
      const praise = speakPraise();
      setFeedback({ isCorrect: true, message: `${praise.gurmukhi} (${praise.roman}) - Great Job!` });

      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      onGameCompleted('Find the Object', 1);

      setTimeout(() => {
        setupQuizGame();
      }, 1800);
    } else {
      playBoing();
      speakPunjabi(`ਇਹ ${option.gurmukhi} ਹੈ। ਦੁਬਾਰਾ ਲੱਭੋ!`, 1.05, 0.85);
      setFeedback({ isCorrect: false, message: `That was ${option.gurmukhi} (${option.english}). Try again!` });
    }
  };

  // ----------------------------------------------------
  // GAME 4: GINTI SAFARI (COUNTING)
  // ----------------------------------------------------
  const [targetCount, setTargetCount] = useState<number>(4);
  const [currentCounted, setCurrentCounted] = useState<number>(0);
  const [safariEmoji, setSafariEmoji] = useState<string>('🚜');

  const setupCountingGame = useCallback(() => {
    const counts = [2, 3, 4, 5, 6, 7];
    const count = counts[Math.floor(Math.random() * counts.length)];
    const emojis = ['🚜', '🦚', '🦁', '🥭', '🎈', '🥁', '🦆'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    setTargetCount(count);
    setCurrentCounted(0);
    setSafariEmoji(emoji);
    setFeedback(null);

    setTimeout(() => {
      speakPunjabi(`ਚਲੋ ਗਿਣਤੀ ਕਰੀਏ: ${count}`, 1.1, 0.82);
    }, 200);
  }, []);

  const handleTapSafariItem = (index: number) => {
    if (index !== currentCounted) return;

    const nextCount = currentCounted + 1;
    setCurrentCounted(nextCount);

    const numberItem = GURMUKHI_NUMBERS[nextCount - 1];
    playPop();
    speakPunjabi(`${numberItem.char} (${numberItem.name})`, 1.15, 0.85);

    if (nextCount === targetCount) {
      setTimeout(() => {
        playCelebration();
        setScore((s) => s + 25);
        const praise = speakPraise();
        setFeedback({ isCorrect: true, message: `${praise.gurmukhi} You counted all ${targetCount}!` });
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        onGameCompleted('Ginti Safari', 2);
      }, 500);

      setTimeout(() => {
        setupCountingGame();
      }, 2500);
    }
  };

  // Initialize selected game
  useEffect(() => {
    if (selectedGame === 'balloon-pop') setupBalloonGame();
    if (selectedGame === 'memory-match') setupMemoryGame();
    if (selectedGame === 'find-object') setupQuizGame();
    if (selectedGame === 'counting-safari') setupCountingGame();
  }, [selectedGame, setupBalloonGame, setupMemoryGame, setupQuizGame, setupCountingGame]);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      
      {/* Game Selector Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
            Choose Mini-Game (ਖੇਡ ਚੁਣੋ)
          </span>

          {/* Game Score Badge */}
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 font-bold px-3 py-1 rounded-full text-xs sm:text-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Score: {score}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'balloon-pop', label: 'Balloon Pop', gurmukhi: 'ਗੁਬਾਰੇ ਫੋੜੋ', icon: '🎈', activeColor: 'bg-rose-500 text-white' },
            { id: 'find-object', label: 'Find Object', gurmukhi: 'ਲੱਭੋ', icon: '🔍', activeColor: 'bg-amber-500 text-white' },
            { id: 'memory-match', label: 'Match Pairs', gurmukhi: 'ਜੋੜੇ ਮਿਲਾਓ', icon: '🃏', activeColor: 'bg-emerald-500 text-white' },
            { id: 'counting-safari', label: 'Ginti Safari', gurmukhi: 'ਗਿਣਤੀ ੧-੧੦', icon: '🔢', activeColor: 'bg-blue-500 text-white' },
          ].map((g) => {
            const isSelected = selectedGame === g.id;
            return (
              <button
                key={g.id}
                id={`game-tab-${g.id}`}
                onClick={() => {
                  playChime();
                  setSelectedGame(g.id as GameType);
                }}
                className={`p-2.5 rounded-2xl font-bold transition-all flex flex-col items-center justify-center gap-0.5 text-center select-none cursor-pointer ${
                  isSelected
                    ? `${g.activeColor} shadow-xs scale-102`
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span className="text-2xl">{g.icon}</span>
                <span className="text-xs sm:text-sm font-bold">{g.label}</span>
                <span className={`text-[10px] font-gurmukhi ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {g.gurmukhi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Toast Notification */}
      {feedback && (
        <div
          className={`py-2 px-4 rounded-full font-bold text-center text-xs sm:text-sm animate-bounce shadow-md flex items-center justify-center gap-1.5 max-w-md mx-auto ${
            feedback.isCorrect
              ? 'bg-emerald-500 text-white'
              : 'bg-amber-500 text-white'
          }`}
        >
          <span>{feedback.isCorrect ? '🎉' : '🤔'}</span>
          <span>{feedback.message}</span>
        </div>
      )}

      {/* ----------------------------------------------------
          GAME 1 VIEW: BALLOON POP
      ---------------------------------------------------- */}
      {selectedGame === 'balloon-pop' && (
        <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50/30 rounded-3xl p-6 sm:p-8 border border-sky-200/80 shadow-sm text-center relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Target Letter Prompt Box */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs inline-block mx-auto max-w-md w-full">
            <p className="text-xs font-semibold text-slate-500">
              Pop the balloon with this Punjabi letter:
            </p>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="text-4xl sm:text-5xl font-black font-gurmukhi text-slate-900">
                {targetLetter.letter}
              </span>
              <div className="text-left">
                <span className="text-lg sm:text-xl font-bold text-slate-800 font-baloo block">
                  {targetLetter.name}
                </span>
                <span className="text-xs font-semibold text-amber-700 font-gurmukhi block">
                  {targetLetter.gurmukhiName}
                </span>
              </div>
            </div>
            
            <button
              id="repeat-balloon-audio-btn"
              onClick={() => speakPunjabi(`ਲੱਭੋ ਅੱਖਰ ${targetLetter.letter}, ${targetLetter.name}`, 1.1, 0.82)}
              className="mt-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear sound again</span>
            </button>
          </div>

          {/* Floating Balloons Arena */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 my-6 items-center justify-center">
            {balloons.map((balloon) => (
              <div key={balloon.id} className="flex justify-center">
                {balloon.popped ? (
                  <div className="w-20 h-24 sm:w-24 sm:h-32 flex items-center justify-center text-4xl animate-ping opacity-60">
                    💥
                  </div>
                ) : (
                  <button
                    id={`balloon-btn-${balloon.id}`}
                    onClick={() => handlePopBalloon(balloon)}
                    className={`w-20 h-28 sm:w-24 sm:h-34 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] ${balloon.bgClass} text-white shadow-sm flex flex-col items-center justify-center font-black font-gurmukhi text-3xl sm:text-4xl hover:scale-105 active:scale-95 transition-transform relative cursor-pointer select-none animate-float-slow`}
                  >
                    <div className="absolute top-2 left-3 w-3 h-4 bg-white/30 rounded-full rotate-[-20deg]" />
                    <span>{balloon.letter.letter}</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-xs font-medium text-slate-500 bg-white/80 py-1 px-3 rounded-full border border-slate-200 inline-block mx-auto">
            🎈 Tap the matching balloon to POP it!
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          GAME 2: MEMORY MATCH PAIRS
      ---------------------------------------------------- */}
      {selectedGame === 'memory-match' && (
        <div className="bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm text-center space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-baloo">
                Match Letter to Picture (ਜੋੜੇ ਮਿਲਾਓ)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Flip two cards to match Gurmukhi letters with picture examples!
              </p>
            </div>

            <button
              id="reset-memory-game-btn"
              onClick={() => {
                playChime();
                setupMemoryGame();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle / Reset</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-3.5 max-w-3xl mx-auto">
            {memoryCards.map((card, idx) => (
              <button
                key={card.uniqueId}
                id={`mem-card-${idx}`}
                onClick={() => handleCardClick(idx)}
                className={`h-24 sm:h-32 rounded-2xl font-bold transition-all duration-200 flex flex-col items-center justify-center p-2 border cursor-pointer select-none ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white border-emerald-300 shadow-sm scale-100'
                    : 'bg-amber-100 hover:bg-amber-200/80 border-amber-200 text-amber-900 shadow-xs'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-gurmukhi text-slate-800">
                      {card.content}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 font-baloo mt-1 truncate">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl">❓</span>
                    <span className="text-[10px] font-bold text-amber-800/70 font-gurmukhi mt-0.5">
                      ਪੰਜਾਬੀ
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          GAME 3: FIND THE OBJECT (QUIZ)
      ---------------------------------------------------- */}
      {selectedGame === 'find-object' && (
        <div className="bg-gradient-to-b from-amber-50/80 via-white to-orange-50/30 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm text-center space-y-6">
          
          {/* Question Banner */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs inline-block max-w-lg w-full">
            <p className="text-xs font-semibold text-slate-500">
              Audio Quiz: Which one is...
            </p>
            <div className="my-1.5">
              <span className="text-3xl sm:text-5xl font-black font-gurmukhi text-slate-900 block">
                {quizWord.gurmukhi}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-700 font-baloo">
                "{quizWord.roman}" ({quizWord.english})
              </span>
            </div>

            <button
              id="repeat-quiz-prompt-btn"
              onClick={() => speakPunjabi(`ਕਿੱਥੇ ਹੈ ${quizWord.gurmukhi}, ${quizWord.roman}?`, 1.1, 0.82)}
              className="mt-1 btn-primary px-4 py-1.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen again</span>
            </button>
          </div>

          {/* 4 Large Picture Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                id={`quiz-opt-${opt.id}`}
                onClick={() => handleQuizAnswer(opt)}
                className="bg-white hover:bg-amber-50/50 rounded-2xl p-4 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-98 transition-all flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl my-1 group-hover:scale-105 transition-transform">
                  {opt.emoji}
                </div>

                <div>
                  <span className="text-lg sm:text-xl font-bold font-gurmukhi text-slate-900 block truncate">
                    {opt.gurmukhi}
                  </span>
                  <span className="text-xs text-slate-500 block truncate">
                    {opt.english}
                  </span>
                </div>
              </button>
            ))}
          </div>

        </div>
      )}

      {/* ----------------------------------------------------
          GAME 4: GINTI SAFARI (COUNTING)
      ---------------------------------------------------- */}
      {selectedGame === 'counting-safari' && (
        <div className="bg-gradient-to-b from-purple-50 via-white to-purple-50/30 rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm text-center space-y-6">
          
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs inline-block max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-baloo">
              Count: <span className="font-gurmukhi text-xl text-purple-700">{targetCount} ({GURMUKHI_NUMBERS[targetCount - 1]?.gurmukhiName})</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tap the items one-by-one to count along in Punjabi!
            </p>

            <div className="flex items-center justify-center gap-2 mt-2.5">
              <span className="text-sm font-bold font-gurmukhi text-purple-900 bg-purple-100 px-3.5 py-1 rounded-full">
                Counted: {currentCounted} / {targetCount}
              </span>
            </div>
          </div>

          {/* Safari Animals / Items Field */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-2 max-w-2xl mx-auto">
            {Array.from({ length: targetCount }).map((_, idx) => {
              const isTapped = idx < currentCounted;
              const isNextToTap = idx === currentCounted;

              return (
                <button
                  key={idx}
                  id={`safari-item-${idx}`}
                  onClick={() => handleTapSafariItem(idx)}
                  disabled={isTapped || !isNextToTap}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center relative select-none ${
                    isTapped
                      ? 'bg-emerald-50 border-emerald-300 shadow-xs opacity-90'
                      : isNextToTap
                      ? 'bg-white border-purple-300 shadow-md scale-105 animate-pulse cursor-pointer ring-2 ring-purple-400/30'
                      : 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl">{safariEmoji}</span>
                  
                  {isTapped && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white w-6 h-6 rounded-full font-bold font-gurmukhi text-xs flex items-center justify-center shadow-xs">
                      {GURMUKHI_NUMBERS[idx]?.char}
                    </div>
                  )}

                  {isNextToTap && (
                    <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded-full mt-1">
                      Tap!
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
