/**
 * Punjabi Toddler Learning App - Core Type Definitions
 */

export type AppSection = 
  | 'alphabet'      // ੳ ਅ ੲ Varnamala exploration
  | 'tracing'       // Letter & Number tracing canvas
  | 'vocabulary'    // Picture flashcards & audio soundboard
  | 'games'         // Toddler mini-games (Balloon pop, Match, Quiz, Counting)
  | 'rhymes'        // Interactive toddler Punjabi rhymes & songs
  | 'stickers';     // Reward sticker album

export type GameType = 
  | 'balloon-pop'
  | 'memory-match'
  | 'find-object'
  | 'counting-safari'
  | 'draw-guess';

export interface GurmukhiLetter {
  id: string;
  letter: string;           // ੳ, ਅ, ੲ, etc.
  name: string;             // Oora, Aira, Eeri, etc.
  gurmukhiName: string;     // ੳੂੜਾ, ਐੜਾ, ਈੜੀ, etc.
  phoneticSound: string;    // "oo", "aa", "ee", "sa", "ha", etc.
  exampleWord: string;      // ਊਠ
  exampleRoman: string;     // Ooth
  exampleEnglish: string;   // Camel
  exampleEmoji: string;     // 🐪
  category: 'vowel' | 'consonant' | 'additional';
  strokeHints: string[];    // Educational guidance for tracing
  colorTheme: string;       // Hex or Tailwind color class
}

export type VocabCategory = 
  | 'animals'     // ਜਾਨਵਰ
  | 'fruits'      // ਫਲ
  | 'vegetables'  // ਸਬਜ਼ੀਆਂ
  | 'colors'      // ਰੰਗ
  | 'numbers'     // ਗਿਣਤੀ
  | 'family'      // ਪਰਿਵਾਰ
  | 'body'        // ਸਰੀਰ ਦੇ ਅੰਗ
  | 'vehicles'    // ਵਾਹਨ
  | 'daily';      // ਰੋਜ਼ਾਨਾ ਚੀਜ਼ਾਂ

export interface VocabCategoryInfo {
  id: VocabCategory;
  nameEnglish: string;
  nameGurmukhi: string;
  nameRoman: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
}

export interface VocabWord {
  id: string;
  category: VocabCategory;
  gurmukhi: string;         // e.g. ਸੇਬ
  roman: string;            // e.g. Seb
  english: string;          // e.g. Apple
  emoji: string;            // 🍎
  audioPhonetic?: string;   // Speech synthesis hint
  funFact?: string;         // Toddler-friendly detail
  color?: string;
  soundEffect?: 'animal' | 'vehicle' | 'cheer' | 'crunch' | 'ding';
}

export interface StrokePoint {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface StrokeDirectionStep {
  stepNumber: number;
  instructionEn: string;
  instructionPa: string;
  arrowDirection: 'right' | 'left' | 'down' | 'up' | 'down-right' | 'down-left' | 'curve-clockwise' | 'curve-counter' | 'loop' | 'dot';
  arrowIcon: string;
  startPoint: StrokePoint;
  endPoint: StrokePoint;
  pathPoints: StrokePoint[];
  color: string;
}

export interface CharacterStrokeData {
  char: string;
  name: string;
  gurmukhiName: string;
  strokes: StrokeDirectionStep[];
  overallTipEn?: string;
  overallTipPa?: string;
}

export interface TracingItem {
  id: string;
  char: string;
  name: string;
  gurmukhiName: string;
  type: 'letter' | 'number';
  exampleWord: string;
  exampleEnglish: string;
  exampleEmoji: string;
  guideLines: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    label?: string;
  }[];
}

export interface StickerReward {
  id: string;
  title: string;
  gurmukhiTitle: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'letters' | 'words' | 'games' | 'tracing' | 'master';
  sparkleColor: string;
}

export interface ToddlerRhyme {
  id: string;
  titleGurmukhi: string;
  titleRoman: string;
  titleEnglish: string;
  emoji: string;
  bgClass: string;
  lines: {
    gurmukhi: string;
    roman: string;
    english: string;
    emoji?: string;
    durationMs: number;
  }[];
}
