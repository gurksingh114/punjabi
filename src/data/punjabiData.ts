import { GurmukhiLetter, VocabCategoryInfo, VocabWord, TracingItem, StickerReward, ToddlerRhyme } from '../types';

/**
 * Complete Gurmukhi Alphabet (35 Akhar + Additional Bindi Letters)
 */
export const GURMUKHI_LETTERS: GurmukhiLetter[] = [
  // First Row (Matra bases & consonants)
  {
    id: 'oora',
    letter: 'ੳ',
    name: 'Oora',
    gurmukhiName: 'ਊੜਾ',
    phoneticSound: 'Oo',
    exampleWord: 'ਊਠ',
    exampleRoman: 'Ooth',
    exampleEnglish: 'Camel',
    exampleEmoji: '🐪',
    category: 'vowel',
    strokeHints: ['Start top loop rightwards', 'Curve down and loop around', 'Finish with open top curve'],
    colorTheme: 'bg-rose-500'
  },
  {
    id: 'aira',
    letter: 'ਅ',
    name: 'Aira',
    gurmukhiName: 'ਐੜਾ',
    phoneticSound: 'Aa',
    exampleWord: 'ਅੰਬ',
    exampleRoman: 'Amb',
    exampleEnglish: 'Mango',
    exampleEmoji: '🥭',
    category: 'vowel',
    strokeHints: ['Top horizontal bar', 'Left curve hook', 'Right stem down'],
    colorTheme: 'bg-amber-500'
  },
  {
    id: 'eeri',
    letter: 'ੲ',
    name: 'Eeri',
    gurmukhiName: 'ਈੜੀ',
    phoneticSound: 'Ee',
    exampleWord: 'ਇੱਟ',
    exampleRoman: 'Itt',
    exampleEnglish: 'Brick',
    exampleEmoji: '🧱',
    category: 'vowel',
    strokeHints: ['Top bar line', 'Stem down to center', 'Small curl base'],
    colorTheme: 'bg-emerald-500'
  },
  {
    id: 'sassa',
    letter: 'ਸ',
    name: 'Sassa',
    gurmukhiName: 'ਸੱਸਾ',
    phoneticSound: 'Sa',
    exampleWord: 'ਸੇਬ',
    exampleRoman: 'Seb',
    exampleEnglish: 'Apple',
    exampleEmoji: '🍎',
    category: 'consonant',
    strokeHints: ['Top line', 'Left curve hook down', 'Center horizontal connector', 'Right vertical stem'],
    colorTheme: 'bg-sky-500'
  },
  {
    id: 'haha',
    letter: 'ਹ',
    name: 'Haha',
    gurmukhiName: 'ਹਾਹਾ',
    phoneticSound: 'Ha',
    exampleWord: 'ਹਾਥੀ',
    exampleRoman: 'Haathi',
    exampleEnglish: 'Elephant',
    exampleEmoji: '🐘',
    category: 'consonant',
    strokeHints: ['Top line', 'Left vertical stem', 'Bottom rounded open hook'],
    colorTheme: 'bg-indigo-500'
  },

  // Second Row (K-varga)
  {
    id: 'kakka',
    letter: 'ਕ',
    name: 'Kakka',
    gurmukhiName: 'ਕੱਕਾ',
    phoneticSound: 'Ka',
    exampleWord: 'ਕਬੂਤਰ',
    exampleRoman: 'Kabootar',
    exampleEnglish: 'Pigeon',
    exampleEmoji: '🕊️',
    category: 'consonant',
    strokeHints: ['Top line', 'Center vertical stem', 'Left and right symmetrical loop curves'],
    colorTheme: 'bg-violet-500'
  },
  {
    id: 'khakha',
    letter: 'ਖ',
    name: 'Khakha',
    gurmukhiName: 'ਖੱਖਾ',
    phoneticSound: 'Kha',
    exampleWord: 'ਖਰਗੋਸ਼',
    exampleRoman: 'Khargosh',
    exampleEnglish: 'Rabbit',
    exampleEmoji: '🐇',
    category: 'consonant',
    strokeHints: ['Top line', 'Left loop curl down', 'Right vertical bar'],
    colorTheme: 'bg-pink-500'
  },
  {
    id: 'gagga',
    letter: 'ਗ',
    name: 'Gagga',
    gurmukhiName: 'ਗੱਗਾ',
    phoneticSound: 'Ga',
    exampleWord: 'ਗਾਂ',
    exampleRoman: 'Gaan',
    exampleEnglish: 'Cow',
    exampleEmoji: '🐄',
    category: 'consonant',
    strokeHints: ['Top line', 'Left inverted J-hook', 'Right straight vertical stem'],
    colorTheme: 'bg-orange-500'
  },
  {
    id: 'ghagha',
    letter: 'ਘ',
    name: 'Ghagha',
    gurmukhiName: 'ਘੱਘਾ',
    phoneticSound: 'Gha',
    exampleWord: 'ਘੜੀ',
    exampleRoman: 'Ghadi',
    exampleEnglish: 'Clock',
    exampleEmoji: '⏰',
    category: 'consonant',
    strokeHints: ['Top line', 'Double bottom curves', 'Right vertical stem'],
    colorTheme: 'bg-teal-500'
  },
  {
    id: 'ngannga',
    letter: 'ਙ',
    name: 'Ngannga',
    gurmukhiName: 'ਙੰਙਾ',
    phoneticSound: 'Nga',
    exampleWord: 'ਙੰਙਾ',
    exampleRoman: 'Ngannga',
    exampleEnglish: 'Nasal Ng',
    exampleEmoji: '🔔',
    category: 'consonant',
    strokeHints: ['Top line', 'Center short stem', 'S-like curve with right arm'],
    colorTheme: 'bg-lime-600'
  },

  // Third Row (Ch-varga)
  {
    id: 'chacha',
    letter: 'ਚ',
    name: 'Chacha',
    gurmukhiName: 'ਚੱਚਾ',
    phoneticSound: 'Cha',
    exampleWord: 'ਚਮਚਾ',
    exampleRoman: 'Chamcha',
    exampleEnglish: 'Spoon',
    exampleEmoji: '🥄',
    category: 'consonant',
    strokeHints: ['Top line', 'Left triangle/hook loop', 'Right vertical stem'],
    colorTheme: 'bg-cyan-500'
  },
  {
    id: 'chhachha',
    letter: 'ਛ',
    name: 'Chhachha',
    gurmukhiName: 'ਛੱਛਾ',
    phoneticSound: 'Chha',
    exampleWord: 'ਛਤਰੀ',
    exampleRoman: 'Chhatri',
    exampleEnglish: 'Umbrella',
    exampleEmoji: '☂️',
    category: 'consonant',
    strokeHints: ['Top line', 'Double rounded belly loop with center tie'],
    colorTheme: 'bg-fuchsia-500'
  },
  {
    id: 'jajja',
    letter: 'ਜ',
    name: 'Jajja',
    gurmukhiName: 'ਜੱਜਾ',
    phoneticSound: 'Ja',
    exampleWord: 'ਜੱਗ',
    exampleRoman: 'Jagg',
    exampleEnglish: 'Jug',
    exampleEmoji: '🥛',
    category: 'consonant',
    strokeHints: ['Top line', 'Left horizontal connector', 'Downward open rounded cup'],
    colorTheme: 'bg-blue-600'
  },
  {
    id: 'jhajha',
    letter: 'ਝ',
    name: 'Jhajha',
    gurmukhiName: 'ਝੱਝਾ',
    phoneticSound: 'Jha',
    exampleWord: 'ਝੰਡਾ',
    exampleRoman: 'Jhanda',
    exampleEnglish: 'Flag',
    exampleEmoji: '🚩',
    category: 'consonant',
    strokeHints: ['Top line', 'Left high loop', 'Right vertical stem'],
    colorTheme: 'bg-amber-600'
  },
  {
    id: 'nyanya',
    letter: 'ਞ',
    name: 'Nyanya',
    gurmukhiName: 'ਞੰਞਾ',
    phoneticSound: 'Nya',
    exampleWord: 'ਞੰਞਾ',
    exampleRoman: 'Nyanya',
    exampleEnglish: 'Nasal Nya',
    exampleEmoji: '🎵',
    category: 'consonant',
    strokeHints: ['Top line', 'Center stem', 'Open right-facing crescent'],
    colorTheme: 'bg-yellow-600'
  },

  // Fourth Row (T-varga retroflex)
  {
    id: 'tainka',
    letter: 'ਟ',
    name: 'Tainka',
    gurmukhiName: 'ਟੈਂਕਾ',
    phoneticSound: 'Ta',
    exampleWord: 'ਟਮਾਟਰ',
    exampleRoman: 'Tamaatar',
    exampleEnglish: 'Tomato',
    exampleEmoji: '🍅',
    category: 'consonant',
    strokeHints: ['Top line', 'Short center stem', 'Large open semicircle bottom'],
    colorTheme: 'bg-red-500'
  },
  {
    id: 'thattha',
    letter: 'ਠ',
    name: 'Thattha',
    gurmukhiName: 'ਠੱਠਾ',
    phoneticSound: 'Tha',
    exampleWord: 'ਠੇਲਾ',
    exampleRoman: 'Thela',
    exampleEnglish: 'Cart',
    exampleEmoji: '🛒',
    category: 'consonant',
    strokeHints: ['Top line', 'Short center stem', 'Complete round closed circle'],
    colorTheme: 'bg-emerald-600'
  },
  {
    id: 'dadda',
    letter: 'ਡ',
    name: 'Dadda',
    gurmukhiName: 'ਡੱਡਾ',
    phoneticSound: 'Da',
    exampleWord: 'ਡੱਡੂ',
    exampleRoman: 'Daddoo',
    exampleEnglish: 'Frog',
    exampleEmoji: '🐸',
    category: 'consonant',
    strokeHints: ['Top line', 'Short stem', 'S-shaped smooth curve'],
    colorTheme: 'bg-green-600'
  },
  {
    id: 'dhadha',
    letter: 'ਢ',
    name: 'Dhadha',
    gurmukhiName: 'ਢੱਢਾ',
    phoneticSound: 'Dha',
    exampleWord: 'ਢੋਲ',
    exampleRoman: 'Dhol',
    exampleEnglish: 'Drum',
    exampleEmoji: '🥁',
    category: 'consonant',
    strokeHints: ['Top line', 'Short stem', 'Rounded loop with small inner curl'],
    colorTheme: 'bg-purple-600'
  },
  {
    id: 'nana',
    letter: 'ਣ',
    name: 'Nana',
    gurmukhiName: 'ਣਾਣਾ',
    phoneticSound: 'Na (retroflex)',
    exampleWord: 'ਬਾਣ',
    exampleRoman: 'Baan',
    exampleEnglish: 'Arrow',
    exampleEmoji: '🏹',
    category: 'consonant',
    strokeHints: ['Top line', 'Left open curve loop', 'Right vertical bar'],
    colorTheme: 'bg-rose-600'
  },

  // Fifth Row (T-varga dental)
  {
    id: 'tatta',
    letter: 'ਤ',
    name: 'Tatta',
    gurmukhiName: 'ਤੱਤਾ',
    phoneticSound: 'Ta',
    exampleWord: 'ਤੋਤਾ',
    exampleRoman: 'Tota',
    exampleEnglish: 'Parrot',
    exampleEmoji: '🦜',
    category: 'consonant',
    strokeHints: ['Top line', 'Downward curved hook splitting in center'],
    colorTheme: 'bg-green-500'
  },
  {
    id: 'thattha_dental',
    letter: 'ਥ',
    name: 'Thattha',
    gurmukhiName: 'ਥੱਥਾ',
    phoneticSound: 'Tha',
    exampleWord: 'ਥਾਲੀ',
    exampleRoman: 'Thaali',
    exampleEnglish: 'Plate',
    exampleEmoji: '🍽️',
    category: 'consonant',
    strokeHints: ['Top open bar', 'Loop top left', 'Drop stem down'],
    colorTheme: 'bg-indigo-600'
  },
  {
    id: 'dada_dental',
    letter: 'ਦ',
    name: 'Dadda',
    gurmukhiName: 'ਦੱਦਾ',
    phoneticSound: 'Da',
    exampleWord: 'ਦੰਦ',
    exampleRoman: 'Dand',
    exampleEnglish: 'Teeth',
    exampleEmoji: '🦷',
    category: 'consonant',
    strokeHints: ['Top line', 'Left curve', 'Downward diagonal tail stroke'],
    colorTheme: 'bg-blue-500'
  },
  {
    id: 'dhadha_dental',
    letter: 'ਧ',
    name: 'Dhadha',
    gurmukhiName: 'ਧੱਧਾ',
    phoneticSound: 'Dha',
    exampleWord: 'ਧਨੁਸ਼',
    exampleRoman: 'Dhanush',
    exampleEnglish: 'Bow',
    exampleEmoji: '🏹',
    category: 'consonant',
    strokeHints: ['Open top gap', 'Left curve loop', 'Right vertical stem'],
    colorTheme: 'bg-teal-600'
  },
  {
    id: 'nanna',
    letter: 'ਨ',
    name: 'Nanna',
    gurmukhiName: 'ਨੱਨਾ',
    phoneticSound: 'Na',
    exampleWord: 'ਨਲਕਾ',
    exampleRoman: 'Nalka',
    exampleEnglish: 'Water Tap',
    exampleEmoji: '🚰',
    category: 'consonant',
    strokeHints: ['Top line', 'Left looped oval', 'Right vertical stem'],
    colorTheme: 'bg-sky-600'
  },

  // Sixth Row (P-varga labial)
  {
    id: 'pappa',
    letter: 'ਪ',
    name: 'Pappa',
    gurmukhiName: 'ਪੱਪਾ',
    phoneticSound: 'Pa',
    exampleWord: 'ਪਤੰਗ',
    exampleRoman: 'Patang',
    exampleEnglish: 'Kite',
    exampleEmoji: '🪁',
    category: 'consonant',
    strokeHints: ['Top line', 'U-shaped left curve', 'Right vertical straight line'],
    colorTheme: 'bg-amber-500'
  },
  {
    id: 'phappha',
    letter: 'ਫ',
    name: 'Phappha',
    gurmukhiName: 'ਫੱਫਾ',
    phoneticSound: 'Pha / Fa',
    exampleWord: 'ਫੁੱਲ',
    exampleRoman: 'Phull',
    exampleEnglish: 'Flower',
    exampleEmoji: '🌸',
    category: 'consonant',
    strokeHints: ['Top line', 'Center loop with right dangling tail'],
    colorTheme: 'bg-pink-600'
  },
  {
    id: 'babba',
    letter: 'ਬ',
    name: 'Babba',
    gurmukhiName: 'ਬੱਬਾ',
    phoneticSound: 'Ba',
    exampleWord: 'ਬਤਖ',
    exampleRoman: 'Batakh',
    exampleEnglish: 'Duck',
    exampleEmoji: '🦆',
    category: 'consonant',
    strokeHints: ['Top line', 'Left rounded belly', 'Right vertical stem'],
    colorTheme: 'bg-yellow-500'
  },
  {
    id: 'bhabha',
    letter: 'ਭ',
    name: 'Bhabha',
    gurmukhiName: 'ਭੱਭਾ',
    phoneticSound: 'Bha',
    exampleWord: 'ਭਾਲੂ',
    exampleRoman: 'Bhaloo',
    exampleEnglish: 'Bear',
    exampleEmoji: '🐻',
    category: 'consonant',
    strokeHints: ['Top line with gap', 'Rounded left loop', 'Right straight line'],
    colorTheme: 'bg-orange-600'
  },
  {
    id: 'mamma',
    letter: 'ਮ',
    name: 'Mamma',
    gurmukhiName: 'ਮੱਮਾ',
    phoneticSound: 'Ma',
    exampleWord: 'ਮੋਰ',
    exampleRoman: 'Mor',
    exampleEnglish: 'Peacock',
    exampleEmoji: '🦚',
    category: 'consonant',
    strokeHints: ['Top line', 'Left corner stem', 'Center horizontal cross', 'Right vertical bar'],
    colorTheme: 'bg-emerald-500'
  },

  // Seventh Row (Semivowels & End Consonants)
  {
    id: 'yayya',
    letter: 'ਯ',
    name: 'Yayya',
    gurmukhiName: 'ਯੱਯਾ',
    phoneticSound: 'Ya',
    exampleWord: 'ਯੱਕਾ',
    exampleRoman: 'Yakka',
    exampleEnglish: 'Ace / Horse Cart',
    exampleEmoji: '🃏',
    category: 'consonant',
    strokeHints: ['Top line', 'Left wave curve', 'Right vertical bar'],
    colorTheme: 'bg-violet-600'
  },
  {
    id: 'rara',
    letter: 'ਰ',
    name: 'Rara',
    gurmukhiName: 'ਰਾਰਾ',
    phoneticSound: 'Ra',
    exampleWord: 'ਰੇਲ',
    exampleRoman: 'Rel',
    exampleEnglish: 'Train',
    exampleEmoji: '🚂',
    category: 'consonant',
    strokeHints: ['Top line', 'Vertical stem down', 'Gentle curve to left'],
    colorTheme: 'bg-red-600'
  },
  {
    id: 'lalla',
    letter: 'ਲ',
    name: 'Lalla',
    gurmukhiName: 'ਲੱਲਾ',
    phoneticSound: 'La',
    exampleWord: 'ਲੱਡੂ',
    exampleRoman: 'Laddoo',
    exampleEnglish: 'Laddoo (Sweet)',
    exampleEmoji: '🟡',
    category: 'consonant',
    strokeHints: ['Top line', 'Left bottom loop up and right curl down'],
    colorTheme: 'bg-yellow-600'
  },
  {
    id: 'vava',
    letter: 'ਵ',
    name: 'Vava',
    gurmukhiName: 'ਵਾਵਾ',
    phoneticSound: 'Va / Wa',
    exampleWord: 'ਵਜਾ',
    exampleRoman: 'Vaja',
    exampleEnglish: 'Musical Instrument',
    exampleEmoji: '🎺',
    category: 'consonant',
    strokeHints: ['Top line', 'Vertical stem down', 'Closed circular bottom belly'],
    colorTheme: 'bg-cyan-600'
  },
  {
    id: 'rharha',
    letter: 'ੜ',
    name: 'Rharha',
    gurmukhiName: 'ੜਾੜਾ',
    phoneticSound: 'Rha (flapped)',
    exampleWord: 'ਪਹਾੜ',
    exampleRoman: 'Pahaad',
    exampleEnglish: 'Mountain',
    exampleEmoji: '⛰️',
    category: 'consonant',
    strokeHints: ['Top line', 'S-shape curve with bottom horizontal underline dot'],
    colorTheme: 'bg-indigo-500'
  },

  // Additional Naveen / Bindi Akhar
  {
    id: 'shasha',
    letter: 'ਸ਼',
    name: 'Shasha (Bindi)',
    gurmukhiName: 'ਸ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Sha',
    exampleWord: 'ਸ਼ੇਰ',
    exampleRoman: 'Sher',
    exampleEnglish: 'Lion',
    exampleEmoji: '🦁',
    category: 'additional',
    strokeHints: ['Draw letter ਸ (Sassa)', 'Add dot underneath in center'],
    colorTheme: 'bg-amber-600'
  },
  {
    id: 'khakha_bindi',
    letter: 'ਖ਼',
    name: 'Khakha (Bindi)',
    gurmukhiName: 'ਖ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Kh (guttural)',
    exampleWord: 'ਖ਼ਰਗੋਸ਼',
    exampleRoman: 'Khargosh',
    exampleEnglish: 'Rabbit',
    exampleEmoji: '🐇',
    category: 'additional',
    strokeHints: ['Draw letter ਖ (Khakha)', 'Add dot underneath'],
    colorTheme: 'bg-pink-600'
  },
  {
    id: 'gaga_bindi',
    letter: 'ਗ਼',
    name: 'Gagga (Bindi)',
    gurmukhiName: 'ਗ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Gh (voiced guttural)',
    exampleWord: 'ਗ਼ੁਬਾਰਾ',
    exampleRoman: 'Gubara',
    exampleEnglish: 'Balloon',
    exampleEmoji: '🎈',
    category: 'additional',
    strokeHints: ['Draw letter ਗ (Gagga)', 'Add dot underneath'],
    colorTheme: 'bg-purple-600'
  },
  {
    id: 'zaza_bindi',
    letter: 'ਜ਼',
    name: 'Zazza',
    gurmukhiName: 'ਜ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Za',
    exampleWord: 'ਜ਼ੈਬਰਾ',
    exampleRoman: 'Zebra',
    exampleEnglish: 'Zebra',
    exampleEmoji: '🦓',
    category: 'additional',
    strokeHints: ['Draw letter ਜ (Jajja)', 'Add dot underneath'],
    colorTheme: 'bg-emerald-600'
  },
  {
    id: 'fafa_bindi',
    letter: 'ਫ਼',
    name: 'Faffa',
    gurmukhiName: 'ਫ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Fa',
    exampleWord: 'ਫ਼ੌਜੀ',
    exampleRoman: 'Fauji',
    exampleEnglish: 'Soldier',
    exampleEmoji: '💂',
    category: 'additional',
    strokeHints: ['Draw letter ਫ (Phappha)', 'Add dot underneath'],
    colorTheme: 'bg-blue-600'
  },
  {
    id: 'lalla_bindi',
    letter: 'ਲ਼',
    name: 'Lalla (Bindi)',
    gurmukhiName: 'ਲ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    phoneticSound: 'Lha (flapped L)',
    exampleWord: 'ਜਲ਼',
    exampleRoman: 'Jall',
    exampleEnglish: 'Pure Water',
    exampleEmoji: '💧',
    category: 'additional',
    strokeHints: ['Draw letter ਲ (Lalla)', 'Add dot underneath'],
    colorTheme: 'bg-teal-600'
  }
];

/**
 * Gurmukhi Numbers (ਗਿਣਤੀ ੧-੧੦)
 */
export const GURMUKHI_NUMBERS: TracingItem[] = [
  {
    id: 'num-1',
    char: '੧',
    name: 'Ik (1)',
    gurmukhiName: 'ਇੱਕ (੧)',
    type: 'number',
    exampleWord: 'ਇੱਕ ਸੂਰਜ',
    exampleEnglish: 'One Sun ☀️',
    exampleEmoji: '☀️',
    guideLines: [{ start: { x: 50, y: 30 }, end: { x: 50, y: 70 }, label: '1' }]
  },
  {
    id: 'num-2',
    char: '੨',
    name: 'Do (2)',
    gurmukhiName: 'ਦੋ (੨)',
    type: 'number',
    exampleWord: 'ਦੋ ਅੱਖਾਂ',
    exampleEnglish: 'Two Eyes 👀',
    exampleEmoji: '👀',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '2' }]
  },
  {
    id: 'num-3',
    char: '੩',
    name: 'Tin (3)',
    gurmukhiName: 'ਤਿੰਨ (੩)',
    type: 'number',
    exampleWord: 'ਤਿੰਨ ਤਾਰੇ',
    exampleEnglish: 'Three Stars ⭐',
    exampleEmoji: '⭐',
    guideLines: [{ start: { x: 40, y: 30 }, end: { x: 60, y: 70 }, label: '3' }]
  },
  {
    id: 'num-4',
    char: '੪',
    name: 'Chaar (4)',
    gurmukhiName: 'ਚਾਰ (੪)',
    type: 'number',
    exampleWord: 'ਚਾਰ ਪਹੀਏ',
    exampleEnglish: 'Four Wheels 🚗',
    exampleEmoji: '🚗',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '4' }]
  },
  {
    id: 'num-5',
    char: '੫',
    name: 'Panj (5)',
    gurmukhiName: 'ਪੰਜ (੫)',
    type: 'number',
    exampleWord: 'ਪੰਜ ਉਂਗਲਾਂ',
    exampleEnglish: 'Five Fingers 🖐️',
    exampleEmoji: '🖐️',
    guideLines: [{ start: { x: 40, y: 30 }, end: { x: 60, y: 70 }, label: '5' }]
  },
  {
    id: 'num-6',
    char: '੬',
    name: 'Chhe (6)',
    gurmukhiName: 'ਛੇ (੬)',
    type: 'number',
    exampleWord: 'ਛੇ ਫੁੱਲ',
    exampleEnglish: 'Six Flowers 🌸',
    exampleEmoji: '🌸',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '6' }]
  },
  {
    id: 'num-7',
    char: '੭',
    name: 'Satt (7)',
    gurmukhiName: 'ਸੱਤ (੭)',
    type: 'number',
    exampleWord: 'ਸੱਤ ਰੰਗ',
    exampleEnglish: 'Seven Colors 🌈',
    exampleEmoji: '🌈',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '7' }]
  },
  {
    id: 'num-8',
    char: '੮',
    name: 'Atth (8)',
    gurmukhiName: 'ਅੱਠ (੮)',
    type: 'number',
    exampleWord: 'ਅੱਠ ਲੱਤਾਂ',
    exampleEnglish: 'Eight Legs (Octopus) 🐙',
    exampleEmoji: '🐙',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '8' }]
  },
  {
    id: 'num-9',
    char: '੯',
    name: 'Nau (9)',
    gurmukhiName: 'ਨੌਂ (੯)',
    type: 'number',
    exampleWord: 'ਨੌਂ ਗੁਬਾਰੇ',
    exampleEnglish: 'Nine Balloons 🎈',
    exampleEmoji: '🎈',
    guideLines: [{ start: { x: 30, y: 30 }, end: { x: 70, y: 70 }, label: '9' }]
  },
  {
    id: 'num-10',
    char: '੧੦',
    name: 'Das (10)',
    gurmukhiName: 'ਦਸ (੧੦)',
    type: 'number',
    exampleWord: 'ਦਸ ਸੇਬ',
    exampleEnglish: 'Ten Apples 🍎',
    exampleEmoji: '🍎',
    guideLines: [{ start: { x: 20, y: 30 }, end: { x: 80, y: 70 }, label: '10' }]
  }
];

/**
 * Vocabulary Categories metadata
 */
export const VOCAB_CATEGORIES: VocabCategoryInfo[] = [
  {
    id: 'animals',
    nameEnglish: 'Animals',
    nameGurmukhi: 'ਜਾਨਵਰ',
    nameRoman: 'Jaanvar',
    emoji: '🦁',
    bgGradient: 'from-amber-400 to-orange-500',
    accentColor: 'border-amber-400 bg-amber-50 text-amber-900'
  },
  {
    id: 'fruits',
    nameEnglish: 'Fruits',
    nameGurmukhi: 'ਫਲ',
    nameRoman: 'Phal',
    emoji: '🥭',
    bgGradient: 'from-rose-400 to-red-500',
    accentColor: 'border-rose-400 bg-rose-50 text-rose-900'
  },
  {
    id: 'vegetables',
    nameEnglish: 'Vegetables',
    nameGurmukhi: 'ਸਬਜ਼ੀਆਂ',
    nameRoman: 'Sabziyan',
    emoji: '🥕',
    bgGradient: 'from-emerald-400 to-green-600',
    accentColor: 'border-emerald-400 bg-emerald-50 text-emerald-900'
  },
  {
    id: 'colors',
    nameEnglish: 'Colors',
    nameGurmukhi: 'ਰੰਗ',
    nameRoman: 'Rang',
    emoji: '🎨',
    bgGradient: 'from-violet-400 to-purple-600',
    accentColor: 'border-purple-400 bg-purple-50 text-purple-900'
  },
  {
    id: 'numbers',
    nameEnglish: 'Counting',
    nameGurmukhi: 'ਗਿਣਤੀ',
    nameRoman: 'Ginti',
    emoji: '🔢',
    bgGradient: 'from-blue-400 to-sky-600',
    accentColor: 'border-sky-400 bg-sky-50 text-sky-900'
  },
  {
    id: 'family',
    nameEnglish: 'Family',
    nameGurmukhi: 'ਪਰਿਵਾਰ',
    nameRoman: 'Parivaar',
    emoji: '👨‍👩‍👧‍👦',
    bgGradient: 'from-pink-400 to-rose-500',
    accentColor: 'border-pink-400 bg-pink-50 text-pink-900'
  },
  {
    id: 'body',
    nameEnglish: 'Body Parts',
    nameGurmukhi: 'ਸਰੀਰ ਦੇ ਅੰਗ',
    nameRoman: 'Sareer de Ang',
    emoji: '👂',
    bgGradient: 'from-teal-400 to-cyan-600',
    accentColor: 'border-cyan-400 bg-cyan-50 text-cyan-900'
  },
  {
    id: 'vehicles',
    nameEnglish: 'Vehicles',
    nameGurmukhi: 'ਵਾਹਨ',
    nameRoman: 'Vaahan',
    emoji: '🚜',
    bgGradient: 'from-yellow-400 to-amber-600',
    accentColor: 'border-yellow-400 bg-yellow-50 text-yellow-900'
  },
  {
    id: 'daily',
    nameEnglish: 'Daily Items',
    nameGurmukhi: 'ਰੋਜ਼ਾਨਾ ਚੀਜ਼ਾਂ',
    nameRoman: 'Rozana Cheezan',
    emoji: '🪁',
    bgGradient: 'from-lime-400 to-emerald-600',
    accentColor: 'border-lime-400 bg-lime-50 text-lime-900'
  }
];

/**
 * 100+ Punjabi Toddler Vocabulary Words
 */
export const VOCABULARY_WORDS: VocabWord[] = [
  // 1. Animals (ਜਾਨਵਰ)
  { id: 'a1', category: 'animals', gurmukhi: 'ਸ਼ੇਰ', roman: 'Sher', english: 'Lion', emoji: '🦁', soundEffect: 'animal', funFact: 'ਜੰਗਲ ਦਾ ਰਾਜਾ (King of the Jungle)' },
  { id: 'a2', category: 'animals', gurmukhi: 'ਹਾਥੀ', roman: 'Haathi', english: 'Elephant', emoji: '🐘', soundEffect: 'animal', funFact: 'ਵੱਡੇ ਵੱਡੇ ਕੰਨ (Big floppy ears)' },
  { id: 'a3', category: 'animals', gurmukhi: 'ਘੋੜਾ', roman: 'Ghora', english: 'Horse', emoji: '🐎', soundEffect: 'animal', funFact: 'ਤੇਜ਼ ਦੌੜਦਾ ਹੈ (Runs very fast)' },
  { id: 'a4', category: 'animals', gurmukhi: 'ਕੁੱਤਾ', roman: 'Kutta', english: 'Dog', emoji: '🐶', soundEffect: 'animal', funFact: 'ਭੌਂ ਭੌਂ ਕਰਦਾ ਹੈ (Says Woof Woof)' },
  { id: 'a5', category: 'animals', gurmukhi: 'ਬਿੱਲੀ', roman: 'Billi', english: 'Cat', emoji: '🐱', soundEffect: 'animal', funFact: 'ਮਿਆਊਂ ਮਿਆਊਂ (Says Meow Meow)' },
  { id: 'a6', category: 'animals', gurmukhi: 'ਮੋਰ', roman: 'Mor', english: 'Peacock', emoji: '🦚', soundEffect: 'animal', funFact: 'ਪੰਜਾਬ ਦਾ ਸੋਹਣਾ ਪੰਛੀ (Beautiful dancer)' },
  { id: 'a7', category: 'animals', gurmukhi: 'ਗਾਂ', roman: 'Gaan', english: 'Cow', emoji: '🐄', soundEffect: 'animal', funFact: 'ਮੀਠਾ ਦੁੱਧ ਦਿੰਦੀ ਹੈ (Gives sweet milk)' },
  { id: 'a8', category: 'animals', gurmukhi: 'ਤੋਤਾ', roman: 'Tota', english: 'Parrot', emoji: '🦜', soundEffect: 'animal', funFact: 'ਹਰਾ ਤੋਤਾ ਲਾਲ ਚੁੰਝ (Green body, red beak)' },
  { id: 'a9', category: 'animals', gurmukhi: 'ਖਰਗੋਸ਼', roman: 'Khargosh', english: 'Rabbit', emoji: '🐇', soundEffect: 'animal', funFact: 'ਚਿੱਟਾ ਨਰਮ ਖਰਗੋਸ਼ (Fluffy soft bunny)' },
  { id: 'a10', category: 'animals', gurmukhi: 'ਬਾਂਦਰ', roman: 'Baandar', english: 'Monkey', emoji: '🐒', soundEffect: 'animal', funFact: 'ਛਾਲਾਂ ਮਾਰਦਾ (Jumping around)' },
  { id: 'a11', category: 'animals', gurmukhi: 'ਊਠ', roman: 'Ooth', english: 'Camel', emoji: '🐪', soundEffect: 'animal', funFact: 'ਲੰਮੀ ਧੌਣ ਵਾਲਾ (Tall neck friend)' },
  { id: 'a12', category: 'animals', gurmukhi: 'ਬਤਖ', roman: 'Batakh', english: 'Duck', emoji: '🦆', soundEffect: 'animal', funFact: 'ਕੁਐਕ ਕੁਐਕ (Quack quack in water)' },

  // 2. Fruits (ਫਲ)
  { id: 'f1', category: 'fruits', gurmukhi: 'ਅੰਬ', roman: 'Amb', english: 'Mango', emoji: '🥭', funFact: 'ਫਲਾਂ ਦਾ ਰਾਜਾ (King of Fruits)' },
  { id: 'f2', category: 'fruits', gurmukhi: 'ਸੇਬ', roman: 'Seb', english: 'Apple', emoji: '🍎', funFact: 'ਲਾਲ ਮਿੱਠਾ ਸੇਬ (Sweet red apple)' },
  { id: 'f3', category: 'fruits', gurmukhi: 'ਕੇਲਾ', roman: 'Kela', english: 'Banana', emoji: '🍌', funFact: 'ਪੀਲਾ ਕੇਲਾ ਛਿੱਲ ਕੇ ਖਾਓ (Peel and eat)' },
  { id: 'f4', category: 'fruits', gurmukhi: 'ਸੰਤਰਾ', roman: 'Santra', english: 'Orange', emoji: '🍊', funFact: 'ਖੱਟਾ-ਮਿੱਠਾ ਰਸੀਲਾ (Juicy orange)' },
  { id: 'f5', category: 'fruits', gurmukhi: 'ਅੰਗੂਰ', roman: 'Angoor', english: 'Grapes', emoji: '🍇', funFact: 'ਗੁੱਛੇਦਾਰ ਅੰਗੂਰ (Bunch of grapes)' },
  { id: 'f6', category: 'fruits', gurmukhi: 'ਤਰਬੂਜ਼', roman: 'Tarbooz', english: 'Watermelon', emoji: '🍉', funFact: 'ਹਰਾ ਬਾਹਰੋਂ ਲਾਲ ਅੰਦਰੋਂ (Green outside, red inside)' },
  { id: 'f7', category: 'fruits', gurmukhi: 'ਅਨਾਰ', roman: 'Anaar', english: 'Pomegranate', emoji: '🍎', funFact: 'ਲਾਲ ਲਾਲ ਦਾਣੇ (Red jewel seeds)' },
  { id: 'f8', category: 'fruits', gurmukhi: 'ਅਮਰੂਦ', roman: 'Amrood', english: 'Guava', emoji: '🍈', funFact: 'ਮਿੱਠਾ ਅਮਰੂਦ (Crunchy sweet guava)' },
  { id: 'f9', category: 'fruits', gurmukhi: 'ਪਪੀਤਾ', roman: 'Papita', english: 'Papaya', emoji: '🍈', funFact: 'ਸਿਹਤਮੰਦ ਪਪੀਤਾ (Healthy papaya)' },
  { id: 'f10', category: 'fruits', gurmukhi: 'ਸਟ੍ਰਾਬੇਰੀ', roman: 'Strawberry', english: 'Strawberry', emoji: '🍓', funFact: 'ਨਿੱਕੀ ਲਾਲ ਸਟ੍ਰਾਬੇਰੀ (Yummy berry)' },

  // 3. Vegetables (ਸਬਜ਼ੀਆਂ)
  { id: 'v1', category: 'vegetables', gurmukhi: 'ਆਲੂ', roman: 'Aloo', english: 'Potato', emoji: '🥔', funFact: 'ਸਭ ਦਾ ਪਿਆਰਾ ਆਲੂ (Everyone\'s favorite potato)' },
  { id: 'v2', category: 'vegetables', gurmukhi: 'ਟਮਾਟਰ', roman: 'Tamaatar', english: 'Tomato', emoji: '🍅', funFact: 'ਗੋਲ ਮਟੋਲ ਲਾਲ ਟਮਾਟਰ (Round red tomato)' },
  { id: 'v3', category: 'vegetables', gurmukhi: 'ਗਾਜਰ', roman: 'Gaajar', english: 'Carrot', emoji: '🥕', funFact: 'ਖਰਗੋਸ਼ ਦੀ ਪਸੰਦ (Bunny\'s favorite treat)' },
  { id: 'v4', category: 'vegetables', gurmukhi: 'ਮਟਰ', roman: 'Matar', english: 'Peas', emoji: '🟢', funFact: 'ਹਰੇ ਹਰੇ ਮੋਤੀ (Green little peas)' },
  { id: 'v5', category: 'vegetables', gurmukhi: 'ਪਿਆਜ਼', roman: 'Pyaaz', english: 'Onion', emoji: '🧅', funFact: 'ਤੜਕੇ ਦਾ ਸਵਾਦ (Flavor of tadka)' },
  { id: 'v6', category: 'vegetables', gurmukhi: 'ਭਿੰਡੀ', roman: 'Bhindi', english: 'Okra / Ladyfinger', emoji: '🥬', funFact: 'ਕਰੰਚੀ ਭਿੰਡੀ (Crispy ladyfinger)' },
  { id: 'v7', category: 'vegetables', gurmukhi: 'ਬੈਂਗਣ', roman: 'Baingan', english: 'Eggplant / Brinjal', emoji: '🍆', funFact: 'ਤਾਜ ਵਾਲਾ ਬੈਂਗਣ (Veggie with a crown)' },
  { id: 'v8', category: 'vegetables', gurmukhi: 'ਮੱਕੀ', roman: 'Makki', english: 'Corn', emoji: '🌽', funFact: 'ਮੱਕੀ ਦੀ ਰੋਟੀ (Famous Punjabi corn bread)' },

  // 4. Colors (ਰੰਗ)
  { id: 'c1', category: 'colors', gurmukhi: 'ਲਾਲ', roman: 'Laal', english: 'Red', emoji: '🔴', color: '#ef4444' },
  { id: 'c2', category: 'colors', gurmukhi: 'ਪੀਲਾ', roman: 'Peela', english: 'Yellow', emoji: '🟡', color: '#eab308' },
  { id: 'c3', category: 'colors', gurmukhi: 'ਨੀਲਾ', roman: 'Neela', english: 'Blue', emoji: '🔵', color: '#3b82f6' },
  { id: 'c4', category: 'colors', gurmukhi: 'ਹਰਾ', roman: 'Hara', english: 'Green', emoji: '🟢', color: '#22c55e' },
  { id: 'c5', category: 'colors', gurmukhi: 'ਸੰਤਰੀ', roman: 'Santri', english: 'Orange', emoji: '🟠', color: '#f97316' },
  { id: 'c6', category: 'colors', gurmukhi: 'ਗੁਲਾਬੀ', roman: 'Gulaabi', english: 'Pink', emoji: '🌸', color: '#ec4899' },
  { id: 'c7', category: 'colors', gurmukhi: 'ਜਾਮਣੀ', roman: 'Jaamni', english: 'Purple', emoji: '🟣', color: '#a855f7' },
  { id: 'c8', category: 'colors', gurmukhi: 'ਚਿੱਟਾ', roman: 'Chitta', english: 'White', emoji: '⚪', color: '#ffffff' },
  { id: 'c9', category: 'colors', gurmukhi: 'ਕਾਲਾ', roman: 'Kaala', english: 'Black', emoji: '⚫', color: '#18181b' },
  { id: 'c10', category: 'colors', gurmukhi: 'ਸੁਨਹਿਰੀ', roman: 'Sunehri', english: 'Golden', emoji: '✨', color: '#f59e0b' },

  // 5. Numbers (ਗਿਣਤੀ)
  { id: 'n1', category: 'numbers', gurmukhi: 'ਇੱਕ (੧)', roman: 'Ik', english: 'One (1)', emoji: '1️⃣', funFact: 'ਇੱਕ ਸੂਰਜ (One Sun)' },
  { id: 'n2', category: 'numbers', gurmukhi: 'ਦੋ (੨)', roman: 'Do', english: 'Two (2)', emoji: '2️⃣', funFact: 'ਦੋ ਅੱਖਾਂ (Two eyes)' },
  { id: 'n3', category: 'numbers', gurmukhi: 'ਤਿੰਨ (੩)', roman: 'Tin', english: 'Three (3)', emoji: '3️⃣', funFact: 'ਤਿੰਨ ਰੰਗ ਝੰਡੇ ਦੇ (3 colors of flag)' },
  { id: 'n4', category: 'numbers', gurmukhi: 'ਚਾਰ (੪)', roman: 'Chaar', english: 'Four (4)', emoji: '4️⃣', funFact: 'ਚਾਰ ਪਹੀਏ ਗੱਡੀ ਦੇ (4 wheels)' },
  { id: 'n5', category: 'numbers', gurmukhi: 'ਪੰਜ (੫)', roman: 'Panj', english: 'Five (5)', emoji: '5️⃣', funFact: 'ਪੰਜ ਦਰਿਆਵਾਂ ਦੀ ਧਰਤੀ (5 rivers of Punjab)' },
  { id: 'n6', category: 'numbers', gurmukhi: 'ਛੇ (੬)', roman: 'Chhe', english: 'Six (6)', emoji: '6️⃣', funFact: 'ਛੇ ਤਾਰੇ (6 twinkling stars)' },
  { id: 'n7', category: 'numbers', gurmukhi: 'ਸੱਤ (੭)', roman: 'Satt', english: 'Seven (7)', emoji: '7️⃣', funFact: 'ਸੱਤ ਰੰਗ ਸਤਰੰਗੀ ਪੀਂਘ (7 colors of rainbow)' },
  { id: 'n8', category: 'numbers', gurmukhi: 'ਅੱਠ (੮)', roman: 'Atth', english: 'Eight (8)', emoji: '8️⃣', funFact: 'ਅੱਠ ਲੱਤਾਂ ਮੱਕੜੀ ਦੀਆਂ (8 spider legs)' },
  { id: 'n9', category: 'numbers', gurmukhi: 'ਨੌਂ (੯)', roman: 'Nau', english: 'Nine (9)', emoji: '9️⃣', funFact: 'ਨੌਂ ਗੁਬਾਰੇ (9 balloons)' },
  { id: 'n10', category: 'numbers', gurmukhi: 'ਦਸ (੧੦)', roman: 'Das', english: 'Ten (10)', emoji: '🔟', funFact: 'ਦਸ ਉਂਗਲਾਂ ਹੱਥਾਂ ਦੀਆਂ (10 little fingers)' },

  // 6. Family (ਪਰਿਵਾਰ)
  { id: 'fam1', category: 'family', gurmukhi: 'ਮੰਮੀ / ਮਾਂ', roman: 'Mummy / Maa', english: 'Mother', emoji: '👩', funFact: 'ਪਿਆਰੀ ਮਾਂ (Sweetest mom)' },
  { id: 'fam2', category: 'family', gurmukhi: 'ਪਾਪਾ / ਪਿਤਾ', roman: 'Papa / Pita', english: 'Father', emoji: '👨', funFact: 'ਸਾਡੇ ਪਾਪਾ ਸੁਪਰ ਹੀਰੋ (Our superhero dad)' },
  { id: 'fam3', category: 'family', gurmukhi: 'ਦਾਦਾ ਜੀ', roman: 'Daada Ji', english: 'Paternal Grandfather', emoji: '👴', funFact: 'ਕਹਾਣੀਆਂ ਸੁਣਾਉਂਦੇ ਨੇ (Tells great bedtime stories)' },
  { id: 'fam4', category: 'family', gurmukhi: 'ਦਾਦੀ ਜੀ', roman: 'Daadi Ji', english: 'Paternal Grandmother', emoji: '👵', funFact: 'ਮਿੱਠਾ ਪਿਆਰ ਤੇ ਲੱਡੂ (Sweet love and sweets)' },
  { id: 'fam5', category: 'family', gurmukhi: 'ਨਾਨਾ ਜੀ', roman: 'Naana Ji', english: 'Maternal Grandfather', emoji: '👳', funFact: 'ਨਾਨਕੇ ਘਰ ਦਾ ਮੇਲਾ (Grandpa love)' },
  { id: 'fam6', category: 'family', gurmukhi: 'ਨਾਨੀ ਜੀ', roman: 'Naani Ji', english: 'Maternal Grandmother', emoji: '👵', funFact: 'ਨਾਨੀ ਦੀਆਂ ਮਿੱਠੀਆਂ ਲੋਰੀਆਂ (Sweetest lullabies)' },
  { id: 'fam7', category: 'family', gurmukhi: 'ਵੀਰ / ਭਰਾ', roman: 'Veer / Bhra', english: 'Brother', emoji: '👦', funFact: 'ਮੇਰਾ ਪਿਆਰਾ ਵੀਰ (My playful brother)' },
  { id: 'fam8', category: 'family', gurmukhi: 'ਭੈਣ', roman: 'Bhain', english: 'Sister', emoji: '👧', funFact: 'ਮੇਰੀ ਲਾਡਲੀ ਭੈਣ (My loving sister)' },
  { id: 'fam9', category: 'family', gurmukhi: 'ਬੇਬੀ / ਬੱਚਾ', roman: 'Baby / Bacha', english: 'Toddler / Baby', emoji: '👶', funFact: 'ਨਿੱਕਾ ਮੁਸਕੁਰਾਉਂਦਾ ਬੱਚਾ (Cute smiling toddler)' },

  // 7. Body Parts (ਸਰੀਰ ਦੇ ਅੰਗ)
  { id: 'b1', category: 'body', gurmukhi: 'ਅੱਖਾਂ', roman: 'Akhaan', english: 'Eyes', emoji: '👀', funFact: 'ਦੁਨੀਆਂ ਵੇਖਣ ਲਈ (To see the colorful world)' },
  { id: 'b2', category: 'body', gurmukhi: 'ਕੰਨ', roman: 'Kann', english: 'Ears', emoji: '👂', funFact: 'ਮਿੱਠੀ ਬੋਲੀ ਸੁਣਨ ਲਈ (To hear sweet music)' },
  { id: 'b3', category: 'body', gurmukhi: 'ਨੱਕ', roman: 'Nakk', english: 'Nose', emoji: '👃', funFact: 'ਫੁੱਲਾਂ ਦੀ ਖੁਸ਼ਬੂ ਲਈ (To smell sweet flowers)' },
  { id: 'b4', category: 'body', gurmukhi: 'ਮੂੰਹ', roman: 'Moonh', english: 'Mouth', emoji: '👄', funFact: 'ਹੱਸਣ ਅਤੇ ਬੋਲਣ ਲਈ (To laugh and speak)' },
  { id: 'b5', category: 'body', gurmukhi: 'ਦੰਦ', roman: 'Dand', english: 'Teeth', emoji: '🦷', funFact: 'ਚਮਕੀਲੇ ਚਿੱਟੇ ਦੰਦ (Sparkling white teeth)' },
  { id: 'b6', category: 'body', gurmukhi: 'ਹੱਥ', roman: 'Hath', english: 'Hands', emoji: '🖐️', funFact: 'ਤਾੜੀ ਮਾਰਨ ਲਈ (To clap along)' },
  { id: 'b7', category: 'body', gurmukhi: 'ਪੈਰ', roman: 'Pair', english: 'Feet', emoji: '🦶', funFact: 'ਟੱਪਣ ਅਤੇ ਭੱਜਣ ਲਈ (To hop and run)' },
  { id: 'b8', category: 'body', gurmukhi: 'ਵਾਲ਼', roman: 'Vaall', english: 'Hair', emoji: '💇', funFact: 'ਸੋਹਣੇ ਵਾਲ (Soft shiny hair)' },

  // 8. Vehicles (ਵਾਹਨ)
  { id: 'vh1', category: 'vehicles', gurmukhi: 'ਟਰੈਕਟਰ', roman: 'Tractor', english: 'Tractor', emoji: '🚜', soundEffect: 'vehicle', funFact: 'ਪੰਜਾਬ ਦੇ ਖੇਤਾਂ ਦਾ ਹੀਰੋ (Hero of Punjab farm fields)' },
  { id: 'vh2', category: 'vehicles', gurmukhi: 'ਗੱਡੀ / ਕਾਰ', roman: 'Gaddi / Car', english: 'Car', emoji: '🚗', soundEffect: 'vehicle', funFact: 'ਪੀਂ ਪੀਂ ਹਾਰਨ (Honk honk)' },
  { id: 'vh3', category: 'vehicles', gurmukhi: 'ਰੇਲ ਗੱਡੀ', roman: 'Rel Gaddi', english: 'Train', emoji: '🚂', soundEffect: 'vehicle', funFact: 'ਛੁੱਕ ਛੁੱਕ ਛੁੱਕ ਛੁੱਕ (Chuk chuk chuk train)' },
  { id: 'vh4', category: 'vehicles', gurmukhi: 'ਹਵਾਈ ਜਹਾਜ਼', roman: 'Hawai Jahaaz', english: 'Aeroplane', emoji: '✈️', soundEffect: 'vehicle', funFact: 'ਅਸਮਾਨ ਵਿੱਚ ਉੱਡਦਾ (Flying high in clouds)' },
  { id: 'vh5', category: 'vehicles', gurmukhi: 'ਸਾਈਕਲ', roman: 'Cycle', english: 'Bicycle', emoji: '🚲', soundEffect: 'vehicle', funFact: 'ਟ੍ਰਿੰਗ ਟ੍ਰਿੰਗ ਘੰਟੀ (Tring tring bell)' },
  { id: 'vh6', category: 'vehicles', gurmukhi: 'ਬੱਸ', roman: 'Bus', english: 'Bus', emoji: '🚌', soundEffect: 'vehicle', funFact: 'ਸਾਰੇ ਬੱਚਿਆਂ ਦੀ ਸਕੂਲ ਬੱਸ (Big yellow school bus)' },
  { id: 'vh7', category: 'vehicles', gurmukhi: 'ਬੇੜੀ / ਕਿਸ਼ਤੀ', roman: 'Bedi / Kishti', english: 'Boat', emoji: '⛵', soundEffect: 'vehicle', funFact: 'ਪਾਣੀ ਵਿੱਚ ਤਰਦੀ (Floating on water)' },

  // 9. Daily Items & Culture (ਰੋਜ਼ਾਨਾ ਚੀਜ਼ਾਂ)
  { id: 'd1', category: 'daily', gurmukhi: 'ਪਤੰਗ', roman: 'Patang', english: 'Kite', emoji: '🪁', funFact: 'ਲੋਹੜੀ ਤੇ ਬਸੰਤ ਦੀ ਸ਼ਾਨ (Flies high in Basant)' },
  { id: 'd2', category: 'daily', gurmukhi: 'ਢੋਲ', roman: 'Dhol', english: 'Dhol / Drum', emoji: '🥁', funFact: 'ਢਮ ਢਮ ਵੱਜਦਾ (Bhangra beat drum)' },
  { id: 'd3', category: 'daily', gurmukhi: 'ਦਸਤਾਰ / ਪੱਗ', roman: 'Dastaar / Pagg', english: 'Turban', emoji: '👳', funFact: 'ਪੰਜਾਬ ਦੀ ਸ਼ਾਨ ਤੇ ਤਾਜ (Pride of Punjab)' },
  { id: 'd4', category: 'daily', gurmukhi: 'ਸੂਰਜ', roman: 'Sooraj', english: 'Sun', emoji: '☀️', funFact: 'ਸਵੇਰੇ ਚੜ੍ਹਦਾ ਸੂਰਜ (Bright morning sun)' },
  { id: 'd5', category: 'daily', gurmukhi: 'ਚੰਨ / ਚੰਦਾ ਮਾਮਾ', roman: 'Chann / Chanda', english: 'Moon', emoji: '🌙', funFact: 'ਰਾਤ ਨੂੰ ਚਮਕਦਾ (Twinkling night moon)' },
  { id: 'd6', category: 'daily', gurmukhi: 'ਤਾਰੇ', roman: 'Taare', english: 'Stars', emoji: '⭐', funFact: 'ਟਿਮ ਟਿਮ ਕਰਦੇ ਤਾਰੇ (Twinkling little stars)' },
  { id: 'd7', category: 'daily', gurmukhi: 'ਜਲੇਬੀ', roman: 'Jalebi', english: 'Jalebi (Sweet)', emoji: '🥨', funFact: 'ਗਰਮਾ-ਗਰਮ ਮਿੱਠੀ ਜਲੇਬੀ (Sweet curly delight)' },
  { id: 'd8', category: 'daily', gurmukhi: 'ਕਿਤਾਬ', roman: 'Kitaab', english: 'Book', emoji: '📖', funFact: 'ਨਵੀਆਂ ਗੱਲਾਂ ਸਿੱਖੋ (Read & explore)' }
];

/**
 * Collectible Sticker Rewards for Toddlers
 */
export const STICKER_REWARDS: StickerReward[] = [
  {
    id: 'stk-sher',
    title: 'Brave Lion',
    gurmukhiTitle: 'ਬੱਬਰ ਸ਼ੇਰ',
    emoji: '🦁',
    description: 'Master of Gurmukhi Letters!',
    unlocked: true, // initial starter gift
    category: 'letters',
    sparkleColor: '#f59e0b'
  },
  {
    id: 'stk-tractor',
    title: 'Speedy Tractor',
    gurmukhiTitle: 'ਸੋਹਣਾ ਟਰੈਕਟਰ',
    emoji: '🚜',
    description: 'Trace 3 letters successfully!',
    unlocked: false,
    category: 'tracing',
    sparkleColor: '#22c55e'
  },
  {
    id: 'stk-dhol',
    title: 'Bhangra Dhol',
    gurmukhiTitle: 'ਮਸਤੀ ਢੋਲ',
    emoji: '🥁',
    description: 'Play your first toddler mini-game!',
    unlocked: false,
    category: 'games',
    sparkleColor: '#ec4899'
  },
  {
    id: 'stk-amb',
    title: 'Sweet Mango',
    gurmukhiTitle: 'ਰਸੀਲਾ ਅੰਬ',
    emoji: '🥭',
    description: 'Listen to 10 vocabulary words!',
    unlocked: false,
    category: 'words',
    sparkleColor: '#eab308'
  },
  {
    id: 'stk-mor',
    title: 'Royal Peacock',
    gurmukhiTitle: 'ਨਾਚਾ ਮੋਰ',
    emoji: '🦚',
    description: 'Complete Gurmukhi counting ੧-੧੦!',
    unlocked: false,
    category: 'master',
    sparkleColor: '#06b6d4'
  },
  {
    id: 'stk-patang',
    title: 'Basant Kite',
    gurmukhiTitle: 'ਉੱਡਦੀ ਪਤੰਗ',
    emoji: '🪁',
    description: 'Pop 10 balloons in Balloon Game!',
    unlocked: false,
    category: 'games',
    sparkleColor: '#8b5cf6'
  },
  {
    id: 'stk-jalebi',
    title: 'Hot Jalebi',
    gurmukhiTitle: 'ਮਿੱਠੀ ਜਲੇਬੀ',
    emoji: '🥨',
    description: 'Sing along to a Punjabi Rhyme!',
    unlocked: false,
    category: 'master',
    sparkleColor: '#f97316'
  },
  {
    id: 'stk-star',
    title: 'Golden Star',
    gurmukhiTitle: 'ਚਮਕੀਲਾ ਤਾਰਾ',
    emoji: '⭐',
    description: 'Super Punjabi Learner Badge!',
    unlocked: false,
    category: 'master',
    sparkleColor: '#eab308'
  }
];

/**
 * Punjabi Toddler Nursery Rhymes & Sing-Along Songs
 */
export const TODDLER_RHYMES: ToddlerRhyme[] = [
  {
    id: 'rhyme-titli',
    titleGurmukhi: 'ਤਿਤਲੀ ਉੱਡੀ',
    titleRoman: 'Titli Udi',
    titleEnglish: 'The Butterfly Flew',
    emoji: '🦋',
    bgClass: 'from-pink-500 to-rose-400',
    lines: [
      {
        gurmukhi: 'ਤਿਤਲੀ ਉੱਡੀ, ਬੱਸ ਤੇ ਚੜ੍ਹੀ,',
        roman: 'Titli udi, bus te charhi,',
        english: 'The butterfly flew and boarded a bus,',
        emoji: '🚌',
        durationMs: 3200
      },
      {
        gurmukhi: 'ਸੀਟ ਨਾ ਮਿਲੀ ਤਾਂ ਰੋਣ ਲੱਗੀ!',
        roman: 'Seat na mili taan ron laggi!',
        english: 'She did not get a seat so started crying!',
        emoji: '😢',
        durationMs: 3200
      },
      {
        gurmukhi: 'ਡਰਾਈਵਰ ਨੇ ਕਿਹਾ, ਆਜਾ ਮੇਰੇ ਕੋਲ,',
        roman: 'Driver ne keha, aaja mere kol,',
        english: 'The driver said, come sit by me,',
        emoji: '👮',
        durationMs: 3200
      },
      {
        gurmukhi: 'ਤਿਤਲੀ ਬੋਲੀ— ਨਾ ਬਾਬਾ ਨਾ!',
        roman: 'Titli boli— Naa Baba Naa!',
        english: 'Butterfly replied— No mister, no!',
        emoji: '🦋',
        durationMs: 3400
      }
    ]
  },
  {
    id: 'rhyme-amb',
    titleGurmukhi: 'ਅੰਬ ਫਲਾਂ ਦਾ ਰਾਜਾ',
    titleRoman: 'Amb Phalan Da Raja',
    titleEnglish: 'Mango, King of Fruits',
    emoji: '🥭',
    bgClass: 'from-amber-500 to-yellow-400',
    lines: [
      {
        gurmukhi: 'ਦੇਖੋ ਦੇਖੋ ਕਿੰਨਾ ਤਾਜ਼ਾ,',
        roman: 'Dekho dekho kinna taaza,',
        english: 'Look how sweet and fresh it is,',
        emoji: '✨',
        durationMs: 3000
      },
      {
        gurmukhi: 'ਅੰਬ ਹੈ ਸਾਰੇ ਫਲਾਂ ਦਾ ਰਾਜਾ!',
        roman: 'Amb hai saare phalan da raja!',
        english: 'Mango is indeed the king of fruits!',
        emoji: '👑',
        durationMs: 3200
      },
      {
        gurmukhi: 'ਪੀਲਾ ਪੀਲਾ ਮਿੱਠਾ ਮਿੱਠਾ,',
        roman: 'Peela peela meetha meetha,',
        english: 'Bright yellow, honey sweet,',
        emoji: '🍯',
        durationMs: 3000
      },
      {
        gurmukhi: 'ਚੂਪ ਕੇ ਖਾਓ ਰਸ ਦਾ ਪਿਆਲਾ!',
        roman: 'Choop ke khao ras da pyaala!',
        english: 'Enjoy the delicious cup of juice!',
        emoji: '😋',
        durationMs: 3400
      }
    ]
  },
  {
    id: 'rhyme-ginti',
    titleGurmukhi: 'ਇੱਕ ਦੋ ਤਿੰਨ ਗਿਣਤੀ ਗੀਤ',
    titleRoman: 'Ik Do Tin Ginti Geet',
    titleEnglish: 'One Two Three Counting Song',
    emoji: '🔢',
    bgClass: 'from-sky-500 to-indigo-500',
    lines: [
      {
        gurmukhi: 'ਇੱਕ, ਦੋ, ਤਿੰਨ — ਬੱਲੇ ਬੱਲੇ ਬਈ!',
        roman: 'Ik, Do, Tin — Balle Balle Bai!',
        english: 'One, Two, Three — Hurrah cheer!',
        emoji: '🎉',
        durationMs: 2800
      },
      {
        gurmukhi: 'ਚਾਰ, ਪੰਜ, ਛੇ — ਨੱਚੋ ਸਾਰੇ ਵੇਖ!',
        roman: 'Chaar, Panj, Chhe — Nacho saare vekh!',
        english: 'Four, Five, Six — Dance together!',
        emoji: '💃',
        durationMs: 2800
      },
      {
        gurmukhi: 'ਸੱਤ, ਅੱਠ, ਨੌਂ, ਦਸ — ਖਿੜ-ਖਿੜ ਕੇ ਹੱਸ!',
        roman: 'Satt, Atth, Nau, Das — Khid-khid ke hass!',
        english: 'Seven, Eight, Nine, Ten — Laugh with big joy!',
        emoji: '😄',
        durationMs: 3400
      }
    ]
  },
  {
    id: 'rhyme-chanda',
    titleGurmukhi: 'ਚੰਦਾ ਮਾਮਾ ਦੂਰ ਕੇ',
    titleRoman: 'Chanda Mama Door Ke',
    titleEnglish: 'Uncle Moon High in the Sky',
    emoji: '🌙',
    bgClass: 'from-violet-600 to-indigo-700',
    lines: [
      {
        gurmukhi: 'ਚੰਦਾ ਮਾਮਾ ਦੂਰ ਦੇ,',
        roman: 'Chanda Mama door de,',
        english: 'Dearest Uncle Moon in the sky,',
        emoji: '🌌',
        durationMs: 3000
      },
      {
        gurmukhi: 'ਪੂਏ ਪਕਾਉਂਦੇ ਬੂਰ ਦੇ!',
        roman: 'Pooye pakaunde boor de!',
        english: 'Baking sweet treats up high!',
        emoji: '🥞',
        durationMs: 3000
      },
      {
        gurmukhi: 'ਆਪ ਖਾਣ ਥਾਲੀ ਵਿੱਚ,',
        roman: 'Aap khaan thaali vich,',
        english: 'Eating from silver plate,',
        emoji: '🍽️',
        durationMs: 2800
      },
      {
        gurmukhi: 'ਬੱਚਿਆਂ ਨੂੰ ਦੇਣ ਪਿਆਲੀ ਵਿੱਚ!',
        roman: 'Bachiyan nu den pyaali vich!',
        english: 'Giving sweet love to all children!',
        emoji: '☕',
        durationMs: 3400
      }
    ]
  }
];
