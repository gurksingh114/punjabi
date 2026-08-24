import { CharacterStrokeData, StrokeDirectionStep } from '../types';

export const STROKE_COLORS = [
  '#f43f5e', // Rose / Red (Step 1)
  '#3b82f6', // Blue (Step 2)
  '#10b981', // Emerald / Green (Step 3)
  '#f59e0b', // Amber / Orange (Step 4)
  '#8b5cf6', // Purple (Step 5)
  '#06b6d4', // Cyan (Step 6)
];

/**
 * Standard stroke order mapping for all 41 Gurmukhi Letters and 10 Numbers
 */
export const GURMUKHI_STROKE_DIRECTIONS: Record<string, CharacterStrokeData> = {
  // ----------------------------------------------------
  // VOWELS & CORE 35
  // ----------------------------------------------------
  'ੳ': {
    char: 'ੳ',
    name: 'Oora',
    gurmukhiName: 'ਊੜਾ',
    overallTipEn: 'Starts with an open top curve and loops down to bottom bowl.',
    overallTipPa: 'ਉੱਪਰੋਂ ਸ਼ੁਰੂ ਕਰਕੇ ਗੋਲਾਈ ਵਿੱਚ ਹੇਠਾਂ ਵੱਲ ਲੈ ਜਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Start at top left and loop rightwards',
        instructionPa: 'ਉੱਪਰਲੇ ਖੱਬੇ ਪਾਸੇ ਤੋਂ ਸ਼ੁਰੂ ਕਰਕੇ ਸੱਜੇ ਵੱਲ ਘੁਮਾਓ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '🔄',
        color: STROKE_COLORS[0],
        startPoint: { x: 36, y: 32 },
        endPoint: { x: 66, y: 46 },
        pathPoints: [{ x: 36, y: 32 }, { x: 66, y: 32 }, { x: 66, y: 46 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Curve down to form the lower bowl',
        instructionPa: 'ਹੇਠਾਂ ਵੱਲ ਗੋਲਾਈ ਵਿੱਚ ਲਿਆਓ',
        arrowDirection: 'curve-counter',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 66, y: 46 },
        endPoint: { x: 64, y: 72 },
        pathPoints: [{ x: 66, y: 46 }, { x: 35, y: 64 }, { x: 64, y: 72 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Sweep the tail up and leave top open',
        instructionPa: 'ਪੂਛ ਉੱਪਰ ਵੱਲ ਖੁੱਲ੍ਹੀ ਛੱਡੋ',
        arrowDirection: 'up',
        arrowIcon: '⤴️',
        color: STROKE_COLORS[2],
        startPoint: { x: 64, y: 72 },
        endPoint: { x: 68, y: 42 },
        pathPoints: [{ x: 64, y: 72 }, { x: 68, y: 42 }]
      }
    ]
  },

  'ਅ': {
    char: 'ਅ',
    name: 'Aira',
    gurmukhiName: 'ਐੜਾ',
    overallTipEn: 'Left double arches, middle connector, then right vertical line.',
    overallTipPa: 'ਖੱਬੇ ਦੋ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Upper left rounded arch',
        instructionPa: 'ਉੱਪਰਲਾ ਖੱਬਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '↘️',
        color: STROKE_COLORS[0],
        startPoint: { x: 34, y: 34 },
        endPoint: { x: 48, y: 48 },
        pathPoints: [{ x: 34, y: 34 }, { x: 48, y: 48 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Lower left rounded arch',
        instructionPa: 'ਹੇਠਲਾ ਖੱਬਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[1],
        startPoint: { x: 48, y: 48 },
        endPoint: { x: 32, y: 68 },
        pathPoints: [{ x: 48, y: 48 }, { x: 32, y: 68 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector bar to the right',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਲੇਟਵਾਂ ਜੋੜ ਸੱਜੇ ਵੱਲ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 46, y: 52 },
        endPoint: { x: 66, y: 52 },
        pathPoints: [{ x: 46, y: 52 }, { x: 66, y: 52 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem straight down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      },
      {
        stepNumber: 5,
        instructionEn: 'Top bar over the stem',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[4],
        startPoint: { x: 54, y: 28 },
        endPoint: { x: 76, y: 28 },
        pathPoints: [{ x: 54, y: 28 }, { x: 76, y: 28 }]
      }
    ]
  },

  'ੲ': {
    char: 'ੲ',
    name: 'Eeri',
    gurmukhiName: 'ਈੜੀ',
    overallTipEn: 'Top line, center down stem, then a bottom right loop.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਵਿਚਕਾਰਲਾ ਡੰਡਾ, ਅਤੇ ਹੇਠਾਂ ਗੋਲ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line left to right',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ ਖੱਬੇ ਤੋਂ ਸੱਜੇ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Center vertical stem down',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 50 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 50 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom curl curving back to left',
        instructionPa: 'ਹੇਠਾਂ ਸੱਜਿਓਂ ਖੱਬੇ ਘੁਮਾਓਦਾਰ ਮੋੜ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 50 },
        endPoint: { x: 38, y: 74 },
        pathPoints: [{ x: 50, y: 50 }, { x: 66, y: 62 }, { x: 38, y: 74 }]
      }
    ]
  },

  'ਸ': {
    char: 'ਸ',
    name: 'Sassa',
    gurmukhiName: 'ਸੱਸਾ',
    overallTipEn: 'Top bar, left hook, middle cross, and right vertical stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਹੁੱਕ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left hook downwards',
        instructionPa: 'ਖੱਬਾ ਹੁੱਕ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 48, y: 74 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 54 }, { x: 48, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector line',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਲੇਟਵਾਂ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 38, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਹ': {
    char: 'ਹ',
    name: 'Haha',
    gurmukhiName: 'ਹਾਹਾ',
    overallTipEn: 'Top line, left stem, and an open bottom hook.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਡੰਡਾ, ਅਤੇ ਹੇਠਾਂ ਖੁੱਲ੍ਹਾ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left vertical stem down',
        instructionPa: 'ਖੱਬਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 42, y: 58 },
        pathPoints: [{ x: 42, y: 28 }, { x: 42, y: 58 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom open hook to the right',
        instructionPa: 'ਹੇਠਾਂ ਸੱਜੇ ਵੱਲ ਖੁੱਲ੍ਹਾ ਮੋੜ',
        arrowDirection: 'right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 42, y: 58 },
        endPoint: { x: 65, y: 72 },
        pathPoints: [{ x: 42, y: 58 }, { x: 54, y: 74 }, { x: 65, y: 72 }]
      }
    ]
  },

  'ਕ': {
    char: 'ਕ',
    name: 'Kakka',
    gurmukhiName: 'ਕੱਕਾ',
    overallTipEn: 'Top line, center stem, then left and right loop wings.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਵਿਚਕਾਰਲਾ ਡੰਡਾ, ਅਤੇ ਦੋਵੇਂ ਪਾਸੇ ਗੋਲ ਲੂਪ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Center vertical stem down',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 78 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 78 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Left curved wing loop',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 46 },
        endPoint: { x: 50, y: 66 },
        pathPoints: [{ x: 50, y: 46 }, { x: 30, y: 56 }, { x: 50, y: 66 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right curved wing loop',
        instructionPa: 'ਸੱਜਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '🔄',
        color: STROKE_COLORS[3],
        startPoint: { x: 50, y: 46 },
        endPoint: { x: 50, y: 66 },
        pathPoints: [{ x: 50, y: 46 }, { x: 70, y: 56 }, { x: 50, y: 66 }]
      }
    ]
  },

  'ਖ': {
    char: 'ਖ',
    name: 'Khakha',
    gurmukhiName: 'ਖੱਖਾ',
    overallTipEn: 'Top line, left loop down, middle bar, and right vertical stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left loop down and drop',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਮੋੜ ਹੇਠਾਂ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 36, y: 76 },
        pathPoints: [{ x: 38, y: 28 }, { x: 48, y: 52 }, { x: 36, y: 76 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Center horizontal cross',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 52 },
        endPoint: { x: 66, y: 52 },
        pathPoints: [{ x: 38, y: 52 }, { x: 66, y: 52 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਗ': {
    char: 'ਗ',
    name: 'Gagga',
    gurmukhiName: 'ਗੱਗਾ',
    overallTipEn: 'Top line, left inverted J-hook, and right straight vertical stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਹੁੱਕ, ਅਤੇ ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 74, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 74, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left stem down and curl inward',
        instructionPa: 'ਖੱਬਾ ਡੰਡਾ ਹੇਠਾਂ ਅਤੇ ਅੰਦਰੂਨੀ ਮੋੜ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 28 },
        endPoint: { x: 32, y: 58 },
        pathPoints: [{ x: 40, y: 28 }, { x: 40, y: 68 }, { x: 32, y: 58 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right long vertical stem straight down',
        instructionPa: 'ਸੱਜਾ ਲੰਮਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਘ': {
    char: 'ਘ',
    name: 'Ghagha',
    gurmukhiName: 'ਘੱਘਾ',
    overallTipEn: 'Top line, double curved bellies, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਦੋ ਗੋਲ ਮੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 74, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 74, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Upper curved belly',
        instructionPa: 'ਉੱਪਰਲਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 28 },
        endPoint: { x: 48, y: 52 },
        pathPoints: [{ x: 40, y: 28 }, { x: 34, y: 48 }, { x: 48, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Lower curved belly sweep to stem',
        instructionPa: 'ਹੇਠਲਾ ਗੋਲ ਮੋੜ ਸੱਜੇ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 48, y: 52 },
        endPoint: { x: 66, y: 74 },
        pathPoints: [{ x: 48, y: 52 }, { x: 38, y: 74 }, { x: 66, y: 74 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਙ': {
    char: 'ਙ',
    name: 'Ngannga',
    gurmukhiName: 'ਙੰਙਾ',
    overallTipEn: 'Top line, S-curve body, and a right arm.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਐੱਸ-ਆਕਾਰ ਦਾ ਮੋੜ, ਅਤੇ ਸੱਜੀ ਬਾਹੀ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Center stem with S-curve body',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਐੱਸ-ਆਕਾਰ ਦਾ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 54, y: 74 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 42 }, { x: 38, y: 56 }, { x: 54, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right side arm bar',
        instructionPa: 'ਸੱਜੀ ਨਿੱਕੀ ਬਾਹੀ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 54, y: 56 },
        endPoint: { x: 68, y: 56 },
        pathPoints: [{ x: 54, y: 56 }, { x: 68, y: 56 }]
      }
    ]
  },

  'ਚ': {
    char: 'ਚ',
    name: 'Chacha',
    gurmukhiName: 'ਚੱਚਾ',
    overallTipEn: 'Top line, left loop, and right vertical stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਗੋਲ ਲੂਪ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left loop rounding to middle stem',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਮੋੜ ਸੱਜੇ ਡੰਡੇ ਵੱਲ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 64, y: 52 },
        pathPoints: [{ x: 42, y: 28 }, { x: 34, y: 52 }, { x: 64, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 64, y: 28 },
        endPoint: { x: 64, y: 78 },
        pathPoints: [{ x: 64, y: 28 }, { x: 64, y: 78 }]
      }
    ]
  },

  'ਛ': {
    char: 'ਛ',
    name: 'Chhachha',
    gurmukhiName: 'ਛੱਛਾ',
    overallTipEn: 'Top line, double loops with bottom knot, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਦੋ ਲੂਪ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left upper curved arch',
        instructionPa: 'ਖੱਬਾ ਉੱਪਰਲਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 28 },
        endPoint: { x: 50, y: 52 },
        pathPoints: [{ x: 40, y: 28 }, { x: 34, y: 48 }, { x: 50, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom closed loop',
        instructionPa: 'ਹੇਠਲਾ ਬੰਦ ਗੋਲ ਲੂਪ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 52 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 50, y: 52 }, { x: 40, y: 74 }, { x: 64, y: 74 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 64, y: 28 },
        endPoint: { x: 64, y: 78 },
        pathPoints: [{ x: 64, y: 28 }, { x: 64, y: 78 }]
      }
    ]
  },

  'ਜ': {
    char: 'ਜ',
    name: 'Jajja',
    gurmukhiName: 'ਜੱਜਾ',
    overallTipEn: 'Top line, followed by a continuous flowing center loop.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਅਤੇ ਵਿਚਕਾਰਲਾ ਲਹਿਰਦਾਰ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Flowing center loop and curve down right',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਮੋੜ ਹੇਠਾਂ ਸੱਜੇ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 66, y: 74 },
        pathPoints: [{ x: 50, y: 28 }, { x: 36, y: 52 }, { x: 66, y: 74 }]
      }
    ]
  },

  'ਝ': {
    char: 'ਝ',
    name: 'Jhajha',
    gurmukhiName: 'ਝੱਝਾ',
    overallTipEn: 'Top line, left dual curves, middle connector, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬੇ ਦੋ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Upper left loop',
        instructionPa: 'ਖੱਬਾ ਉੱਪਰਲਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 28 },
        endPoint: { x: 50, y: 52 },
        pathPoints: [{ x: 40, y: 28 }, { x: 34, y: 48 }, { x: 50, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Lower left loop',
        instructionPa: 'ਖੱਬਾ ਹੇਠਲਾ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 52 },
        endPoint: { x: 52, y: 74 },
        pathPoints: [{ x: 50, y: 52 }, { x: 36, y: 74 }, { x: 52, y: 74 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Middle connector',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[3],
        startPoint: { x: 50, y: 52 },
        endPoint: { x: 66, y: 52 },
        pathPoints: [{ x: 50, y: 52 }, { x: 66, y: 52 }]
      },
      {
        stepNumber: 5,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[4],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਞ': {
    char: 'ਞ',
    name: 'Njanja',
    gurmukhiName: 'ਞੰਞਾ',
    overallTipEn: 'Top line, hook body, and center cross bar.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਮੋੜ, ਅਤੇ ਵਿਚਕਾਰਲੀ ਲਕੀਰ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Main curved loop down and right',
        instructionPa: 'ਮੁੱਖ ਘੁਮਾਓਦਾਰ ਮੋੜ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 42, y: 28 }, { x: 36, y: 54 }, { x: 64, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Center horizontal cross',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 52 },
        endPoint: { x: 58, y: 52 },
        pathPoints: [{ x: 38, y: 52 }, { x: 58, y: 52 }]
      }
    ]
  },

  'ਟ': {
    char: 'ਟ',
    name: 'Tainka',
    gurmukhiName: 'ਟੈਂਕਾ',
    overallTipEn: 'Top line, short center stem, and a big open C-bowl.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਵੱਡਾ ਗੋਲ ਕਟੋਰਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short center stem down',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 46 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 46 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Big rounded open bottom bowl',
        instructionPa: 'ਹੇਠਲਾ ਵੱਡਾ ਗੋਲ ਕਟੋਰਾ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 46 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 50, y: 46 }, { x: 34, y: 60 }, { x: 64, y: 74 }]
      }
    ]
  },

  'ਠ': {
    char: 'ਠ',
    name: 'Thttha',
    gurmukhiName: 'ਠੱਠਾ',
    overallTipEn: 'Top line, short stem, and a complete closed circle.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਪੂਰਾ ਗੋਲ ਚੱਕਰ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short center stem down',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 44 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 44 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Complete round circular loop',
        instructionPa: 'ਪੂਰਾ ਗੋਲ ਚੱਕਰ ਬਣਾਓ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 44 },
        endPoint: { x: 50, y: 44 },
        pathPoints: [{ x: 50, y: 44 }, { x: 32, y: 60 }, { x: 50, y: 76 }, { x: 68, y: 60 }, { x: 50, y: 44 }]
      }
    ]
  },

  'ਡ': {
    char: 'ਡ',
    name: 'Dadda',
    gurmukhiName: 'ਡੱਡਾ',
    overallTipEn: 'Top line, short stem, and a smooth S-curve.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਐੱਸ-ਆਕਾਰ ਦਾ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short center stem down',
        instructionPa: 'ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 44 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 44 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Curved S-shape body',
        instructionPa: 'ਘੁਮਾਓਦਾਰ ਐੱਸ-ਆਕਾਰ ਦਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 44 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 50, y: 44 }, { x: 36, y: 56 }, { x: 64, y: 74 }]
      }
    ]
  },

  'ਢ': {
    char: 'ਢ',
    name: 'Dhadha',
    gurmukhiName: 'ਢੱਡਾ',
    overallTipEn: 'Top line, short stem, and bottom curve with inner loop knot.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਅੰਦਰੂਨੀ ਗੰਢ ਵਾਲਾ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short stem down',
        instructionPa: 'ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 44 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 44 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Round curve and knot inside',
        instructionPa: 'ਗੋਲ ਮੋੜ ਅਤੇ ਅੰਦਰ ਗੰਢ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 44 },
        endPoint: { x: 52, y: 62 },
        pathPoints: [{ x: 50, y: 44 }, { x: 34, y: 60 }, { x: 62, y: 72 }, { x: 52, y: 62 }]
      }
    ]
  },

  'ਣ': {
    char: 'ਣ',
    name: 'Nana',
    gurmukhiName: 'ਣਾਣਾ',
    overallTipEn: 'Top line, left U-shaped bowl, and right vertical stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਯੂ-ਮੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 74, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 74, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left U-shaped rounded bowl',
        instructionPa: 'ਖੱਬਾ ਯੂ-ਆਕਾਰ ਦਾ ਕਟੋਰਾ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 52, y: 28 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 62 }, { x: 52, y: 62 }, { x: 52, y: 28 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right straight vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 68, y: 28 },
        endPoint: { x: 68, y: 78 },
        pathPoints: [{ x: 68, y: 28 }, { x: 68, y: 78 }]
      }
    ]
  },

  'ਤ': {
    char: 'ਤ',
    name: 'Tatta',
    gurmukhiName: 'ਤੱਤਾ',
    overallTipEn: 'Top line, then double bottom arches down.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਅਤੇ ਦੋਹਰੇ ਹੇਠਲੇ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left and right double arches',
        instructionPa: 'ਖੱਬਾ ਅਤੇ ਸੱਜਾ ਦੋਹਰਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 36, y: 28 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 36, y: 28 }, { x: 36, y: 54 }, { x: 50, y: 54 }, { x: 50, y: 74 }, { x: 64, y: 74 }]
      }
    ]
  },

  'ਥ': {
    char: 'ਥ',
    name: 'Thatha',
    gurmukhiName: 'ਥੱਥਾ',
    overallTipEn: 'Open top header, left loop, middle bar, and right stem.',
    overallTipPa: 'ਖੁੱਲ੍ਹੀ ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਲੂਪ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top line with center open gap',
        instructionPa: 'ਵਿਚਕਾਰੋਂ ਖੁੱਲ੍ਹੀ ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 44, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left loop and curve down',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਲੂਪ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 30 },
        endPoint: { x: 48, y: 74 },
        pathPoints: [{ x: 40, y: 30 }, { x: 34, y: 54 }, { x: 48, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector cross bar',
        instructionPa: 'ਵਿਚਕਾਰਲੀ ਲੇਟਵੀਂ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 38, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem straight down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਦ': {
    char: 'ਦ',
    name: 'Dada',
    gurmukhiName: 'ਦੱਦਾ',
    overallTipEn: 'Top line, short left stem, curved belly and tail down.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਪੂਛ ਵਾਲਾ ਗੋਲ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short left stem down',
        instructionPa: 'ਖੱਬਾ ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 42, y: 46 },
        pathPoints: [{ x: 42, y: 28 }, { x: 42, y: 46 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Curved belly with hanging tail',
        instructionPa: 'ਗੋਲ ਢਿੱਡ ਅਤੇ ਹੇਠਾਂ ਪੂਛ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 42, y: 46 },
        endPoint: { x: 40, y: 74 },
        pathPoints: [{ x: 42, y: 46 }, { x: 62, y: 56 }, { x: 40, y: 74 }]
      }
    ]
  },

  'ਧ': {
    char: 'ਧ',
    name: 'Dhadha Dental',
    gurmukhiName: 'ਧੱਧਾ',
    overallTipEn: 'Open top header, double left bellies, and right stem.',
    overallTipPa: 'ਖੁੱਲ੍ਹੀ ਲਕੀਰ, ਦੋ ਖੱਬੇ ਮੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top line with open middle gap',
        instructionPa: 'ਵਿਚਕਾਰੋਂ ਖੁੱਲ੍ਹੀ ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 44, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Double left bellies sweeping down',
        instructionPa: 'ਖੱਬੇ ਦੋਹਰੇ ਮੋੜ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 30 },
        endPoint: { x: 66, y: 74 },
        pathPoints: [{ x: 40, y: 30 }, { x: 34, y: 50 }, { x: 48, y: 52 }, { x: 38, y: 74 }, { x: 66, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਨ': {
    char: 'ਨ',
    name: 'Nanna',
    gurmukhiName: 'ਨੱਨਾ',
    overallTipEn: 'Top line, center stem, and left/right branching arches.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਵਿਚਕਾਰਲਾ ਡੰਡਾ, ਅਤੇ ਦੋਵੇਂ ਪਾਸੇ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Center vertical stem down',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 54 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 54 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Left bottom curved arch',
        instructionPa: 'ਖੱਬਾ ਹੇਠਲਾ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 54 },
        endPoint: { x: 34, y: 74 },
        pathPoints: [{ x: 50, y: 54 }, { x: 34, y: 74 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right bottom curved arch',
        instructionPa: 'ਸੱਜਾ ਹੇਠਲਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '↘️',
        color: STROKE_COLORS[3],
        startPoint: { x: 50, y: 54 },
        endPoint: { x: 66, y: 74 },
        pathPoints: [{ x: 50, y: 54 }, { x: 66, y: 74 }]
      }
    ]
  },

  'ਪ': {
    char: 'ਪ',
    name: 'Pappa',
    gurmukhiName: 'ਪੱਪਾ',
    overallTipEn: 'Top line, left open U-curve, middle connector, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਯੂ-ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left open U-curve',
        instructionPa: 'ਖੱਬਾ ਯੂ-ਆਕਾਰ ਦਾ ਮੋੜ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 54, y: 52 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 66 }, { x: 54, y: 66 }, { x: 54, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector cross bar',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 54, y: 52 },
        endPoint: { x: 66, y: 52 },
        pathPoints: [{ x: 54, y: 52 }, { x: 66, y: 52 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem straight down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਫ': {
    char: 'ਫ',
    name: 'Phappha',
    gurmukhiName: 'ਫੱਫਾ',
    overallTipEn: 'Top line, left loop, and right descending tail.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਲੂਪ, ਅਤੇ ਸੱਜੀ ਲਟਕਦੀ ਪੂਛ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left rounded loop to center',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਲੂਪ ਵਿਚਕਾਰ ਤੱਕ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 54, y: 52 },
        pathPoints: [{ x: 42, y: 28 }, { x: 34, y: 52 }, { x: 54, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right loop and descending tail',
        instructionPa: 'ਸੱਜਾ ਮੋੜ ਅਤੇ ਲਟਕਦੀ ਪੂਛ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 54, y: 52 },
        endPoint: { x: 58, y: 76 },
        pathPoints: [{ x: 54, y: 52 }, { x: 68, y: 64 }, { x: 58, y: 76 }]
      }
    ]
  },

  'ਬ': {
    char: 'ਬ',
    name: 'Babba',
    gurmukhiName: 'ਬੱਬਾ',
    overallTipEn: 'Top line, left rounded box belly, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਚੌਖਟਾ ਮੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left rounded box belly',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਚੌਖਟਾ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 54, y: 28 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 74 }, { x: 54, y: 74 }, { x: 54, y: 28 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਭ': {
    char: 'ਭ',
    name: 'Bhabha',
    gurmukhiName: 'ਭੱਭਾ',
    overallTipEn: 'Open top header, left loop, middle bar, and right stem.',
    overallTipPa: 'ਖੁੱਲ੍ਹੀ ਲਕੀਰ, ਖੱਬਾ ਲੂਪ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top line with open middle gap',
        instructionPa: 'ਵਿਚਕਾਰੋਂ ਖੁੱਲ੍ਹੀ ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 44, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left loop down diagonally',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਲੂਪ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 30 },
        endPoint: { x: 50, y: 74 },
        pathPoints: [{ x: 40, y: 30 }, { x: 34, y: 52 }, { x: 50, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector bar',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 44, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 44, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਮ': {
    char: 'ਮ',
    name: 'Mamma',
    gurmukhiName: 'ਮੱਮਾ',
    overallTipEn: 'Top line, left stem with corner loop, middle bar, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬੀ ਗੰਢ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left vertical stem with corner knot',
        instructionPa: 'ਖੱਬਾ ਡੰਡਾ ਅਤੇ ਹੇਠਲੀ ਗੰਢ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 44, y: 54 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 64 }, { x: 44, y: 74 }, { x: 44, y: 54 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector bar',
        instructionPa: 'ਵਿਚਕਾਰਲੀ ਲੇਟਵੀਂ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 44, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 44, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਯ': {
    char: 'ਯ',
    name: 'Yayya',
    gurmukhiName: 'ਯੱਯਾ',
    overallTipEn: 'Top line, left wavy hook, middle bar, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬਾ ਲਹਿਰਦਾਰ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left wavy hook and inner curve',
        instructionPa: 'ਖੱਬਾ ਲਹਿਰਦਾਰ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 48, y: 54 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 52 }, { x: 50, y: 60 }, { x: 40, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 48, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 48, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਰ': {
    char: 'ਰ',
    name: 'Rara',
    gurmukhiName: 'ਰਾਰਾ',
    overallTipEn: 'Top line, followed by a left stem that curves smoothly to the right.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਅਤੇ ਖੱਬਾ ਡੰਡਾ ਜੋ ਹੇਠਾਂ ਸੱਜੇ ਵੱਲ ਮੁੜਦਾ ਹੈ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left vertical stem curving down and right',
        instructionPa: 'ਖੱਬਾ ਡੰਡਾ ਹੇਠਾਂ ਅਤੇ ਸੱਜੇ ਵੱਲ ਗੋਲਾਈ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 54, y: 74 },
        pathPoints: [{ x: 42, y: 28 }, { x: 42, y: 54 }, { x: 54, y: 74 }]
      }
    ]
  },

  'ਲ': {
    char: 'ਲ',
    name: 'Lalla',
    gurmukhiName: 'ਲੱਲਾ',
    overallTipEn: 'Top line, left dual descending loops, middle bar, and right stem.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਖੱਬੇ ਦੋਹਰੇ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਜੋੜ, ਅਤੇ ਸੱਜਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left descending double curves',
        instructionPa: 'ਖੱਬੇ ਦੋਹਰੇ ਗੋਲ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 40, y: 74 },
        pathPoints: [{ x: 38, y: 28 }, { x: 32, y: 54 }, { x: 48, y: 54 }, { x: 40, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector cross bar',
        instructionPa: 'ਵਿਚਕਾਰਲੀ ਲੇਟਵੀਂ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 44, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 44, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      }
    ]
  },

  'ਵ': {
    char: 'ਵ',
    name: 'Vava',
    gurmukhiName: 'ਵਾਵਾ',
    overallTipEn: 'Top line, short stem, and rounded bottom bowl.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਹੇਠਲਾ ਗੋਲ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short left stem down',
        instructionPa: 'ਖੱਬਾ ਛੋਟਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 42, y: 48 },
        pathPoints: [{ x: 42, y: 28 }, { x: 42, y: 48 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom round bowl loop',
        instructionPa: 'ਹੇਠਲਾ ਗੋਲ ਕਟੋਰਾ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 42, y: 48 },
        endPoint: { x: 44, y: 74 },
        pathPoints: [{ x: 42, y: 48 }, { x: 64, y: 58 }, { x: 44, y: 74 }]
      }
    ]
  },

  'ੜ': {
    char: 'ੜ',
    name: 'Rhada',
    gurmukhiName: 'ੜਾੜਾ',
    overallTipEn: 'Top line, short stem, S-curve body, and a bottom horizontal foot line.',
    overallTipPa: 'ਸਿਰ ਦੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਐੱਸ-ਮੋੜ, ਅਤੇ ਹੇਠਲੀ ਪੈਰ ਲਕੀਰ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short stem down with S-curve',
        instructionPa: 'ਛੋਟਾ ਡੰਡਾ ਅਤੇ ਐੱਸ-ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 64, y: 74 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 44 }, { x: 36, y: 56 }, { x: 64, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom foot horizontal underline',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 82 },
        endPoint: { x: 62, y: 82 },
        pathPoints: [{ x: 38, y: 82 }, { x: 62, y: 82 }]
      }
    ]
  },

  // ----------------------------------------------------
  // BINDI AKHAR (ਨਵੀਨ ਧੁਨੀਆਂ)
  // ----------------------------------------------------
  'ਸ਼': {
    char: 'ਸ਼',
    name: 'Shasha',
    gurmukhiName: 'ਸ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਸ (Sassa) then add a dot at the bottom center.',
    overallTipPa: 'ਸੱਸਾ (ਸ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਵਿਚਕਾਰ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left hook downwards',
        instructionPa: 'ਖੱਬਾ ਹੁੱਕ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 48, y: 74 },
        pathPoints: [{ x: 38, y: 28 }, { x: 38, y: 54 }, { x: 48, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector line',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਲੇਟਵਾਂ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 38, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      },
      {
        stepNumber: 5,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[4],
        startPoint: { x: 52, y: 84 },
        endPoint: { x: 52, y: 84 },
        pathPoints: [{ x: 52, y: 84 }]
      }
    ]
  },

  'ਖ਼': {
    char: 'ਖ਼',
    name: 'Khakha (Bindi)',
    gurmukhiName: 'ਖ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਖ (Khakha) then add a foot dot.',
    overallTipPa: 'ਖੱਖਾ (ਖ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left loop down',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਮੋੜ ਹੇਠਾਂ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 36, y: 76 },
        pathPoints: [{ x: 38, y: 28 }, { x: 48, y: 52 }, { x: 36, y: 76 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Center horizontal cross',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 52 },
        endPoint: { x: 66, y: 52 },
        pathPoints: [{ x: 38, y: 52 }, { x: 66, y: 52 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      },
      {
        stepNumber: 5,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[4],
        startPoint: { x: 52, y: 84 },
        endPoint: { x: 52, y: 84 },
        pathPoints: [{ x: 52, y: 84 }]
      }
    ]
  },

  'ਗ਼': {
    char: 'ਗ਼',
    name: 'Gagga (Bindi)',
    gurmukhiName: 'ਗ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਗ (Gagga) then add a foot dot.',
    overallTipPa: 'ਗੱਗਾ (ਗ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 74, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 74, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left hook down and inward',
        instructionPa: 'ਖੱਬਾ ਹੁੱਕ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 40, y: 28 },
        endPoint: { x: 32, y: 58 },
        pathPoints: [{ x: 40, y: 28 }, { x: 40, y: 68 }, { x: 32, y: 58 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right vertical stem',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[3],
        startPoint: { x: 52, y: 84 },
        endPoint: { x: 52, y: 84 },
        pathPoints: [{ x: 52, y: 84 }]
      }
    ]
  },

  'ਜ਼': {
    char: 'ਜ਼',
    name: 'Zazza',
    gurmukhiName: 'ਜ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਜ (Jajja) then add a foot dot.',
    overallTipPa: 'ਜੱਜਾ (ਜ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Flowing center loop',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 66, y: 74 },
        pathPoints: [{ x: 50, y: 28 }, { x: 36, y: 52 }, { x: 66, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[2],
        startPoint: { x: 50, y: 84 },
        endPoint: { x: 50, y: 84 },
        pathPoints: [{ x: 50, y: 84 }]
      }
    ]
  },

  'ਫ਼': {
    char: 'ਫ਼',
    name: 'Faffa',
    gurmukhiName: 'ਫ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਫ (Phappha) then add a foot dot.',
    overallTipPa: 'ਫੱਫਾ (ਫ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left rounded loop',
        instructionPa: 'ਖੱਬਾ ਗੋਲ ਲੂਪ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 42, y: 28 },
        endPoint: { x: 54, y: 52 },
        pathPoints: [{ x: 42, y: 28 }, { x: 34, y: 52 }, { x: 54, y: 52 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Right loop and hanging tail',
        instructionPa: 'ਸੱਜੀ ਲਟਕਦੀ ਪੂਛ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 54, y: 52 },
        endPoint: { x: 58, y: 76 },
        pathPoints: [{ x: 54, y: 52 }, { x: 68, y: 64 }, { x: 58, y: 76 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[3],
        startPoint: { x: 54, y: 84 },
        endPoint: { x: 54, y: 84 },
        pathPoints: [{ x: 54, y: 84 }]
      }
    ]
  },

  'ਲ਼': {
    char: 'ਲ਼',
    name: 'Lalla (Bindi)',
    gurmukhiName: 'ਲ਼ੇ ਪੈਰ ਬਿੰਦੀ',
    overallTipEn: 'Draw letter ਲ (Lalla) then add a foot dot.',
    overallTipPa: 'ਲੱਲਾ (ਲ) ਲਿਖੋ ਅਤੇ ਹੇਠਾਂ ਬਿੰਦੀ ਲਗਾਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Left descending double curves',
        instructionPa: 'ਖੱਬੇ ਦੋਹਰੇ ਗੋਲ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 28 },
        endPoint: { x: 40, y: 74 },
        pathPoints: [{ x: 38, y: 28 }, { x: 32, y: 54 }, { x: 48, y: 54 }, { x: 40, y: 74 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Middle connector cross bar',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਜੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[2],
        startPoint: { x: 44, y: 54 },
        endPoint: { x: 66, y: 54 },
        pathPoints: [{ x: 44, y: 54 }, { x: 66, y: 54 }]
      },
      {
        stepNumber: 4,
        instructionEn: 'Right vertical stem down',
        instructionPa: 'ਸੱਜਾ ਸਿੱਧਾ ਡੰਡਾ ਹੇਠਾਂ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[3],
        startPoint: { x: 66, y: 28 },
        endPoint: { x: 66, y: 78 },
        pathPoints: [{ x: 66, y: 28 }, { x: 66, y: 78 }]
      },
      {
        stepNumber: 5,
        instructionEn: 'Bottom foot dot (Bindi)',
        instructionPa: 'ਹੇਠਲੀ ਪੈਰ ਬਿੰਦੀ',
        arrowDirection: 'dot',
        arrowIcon: '⏺️',
        color: STROKE_COLORS[4],
        startPoint: { x: 52, y: 84 },
        endPoint: { x: 52, y: 84 },
        pathPoints: [{ x: 52, y: 84 }]
      }
    ]
  },

  // ----------------------------------------------------
  // GURMUKHI NUMBERS (ਗਿਣਤੀ ੧-੧੦)
  // ----------------------------------------------------
  '੧': {
    char: '੧',
    name: 'Ik (1)',
    gurmukhiName: 'ਇੱਕ (੧)',
    overallTipEn: 'Start at top-left curl, loop up and curve down right.',
    overallTipPa: 'ਉੱਪਰਲੇ ਖੱਬੇ ਪਾਸਿਓਂ ਘੁਮਾ ਕੇ ਹੇਠਾਂ ਪੂਛ ਲਿਆਓ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Loop from top-left up, round to right, and curve down',
        instructionPa: 'ਖੱਬਿਓਂ ਉੱਪਰ ਘੁਮਾ ਕੇ ਹੇਠਾਂ ਵੱਲ ਲਿਆਓ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[0],
        startPoint: { x: 34, y: 40 },
        endPoint: { x: 50, y: 74 },
        pathPoints: [{ x: 34, y: 40 }, { x: 50, y: 28 }, { x: 66, y: 42 }, { x: 50, y: 74 }]
      }
    ]
  },

  '੨': {
    char: '੨',
    name: 'Do (2)',
    gurmukhiName: 'ਦੋ (੨)',
    overallTipEn: 'Top rounded arch and a sweeping lower tail.',
    overallTipPa: 'ਉੱਪਰਲਾ ਗੋਲ ਮੋੜ ਅਤੇ ਹੇਠਲੀ ਪੂਛ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Upper rounded arch curve',
        instructionPa: 'ਉੱਪਰਲਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[0],
        startPoint: { x: 34, y: 38 },
        endPoint: { x: 66, y: 44 },
        pathPoints: [{ x: 34, y: 38 }, { x: 52, y: 28 }, { x: 66, y: 44 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Diagonal sweep and bottom tail',
        instructionPa: 'ਤਿਰਛੀ ਲਕੀਰ ਅਤੇ ਹੇਠਲੀ ਪੂਛ',
        arrowDirection: 'down-right',
        arrowIcon: '↘️',
        color: STROKE_COLORS[1],
        startPoint: { x: 66, y: 44 },
        endPoint: { x: 68, y: 72 },
        pathPoints: [{ x: 66, y: 44 }, { x: 36, y: 68 }, { x: 68, y: 72 }]
      }
    ]
  },

  '੩': {
    char: '੩',
    name: 'Tin (3)',
    gurmukhiName: 'ਤਿੰਨ (੩)',
    overallTipEn: 'Top curve, inward center dip, and bottom bowl.',
    overallTipPa: 'ਉੱਪਰਲਾ ਮੋੜ, ਵਿਚਕਾਰਲਾ ਮੋੜ, ਅਤੇ ਹੇਠਲਾ ਕਟੋਰਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal arch curve',
        instructionPa: 'ਉੱਪਰਲਾ ਗੋਲ ਮੋੜ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 36, y: 32 },
        endPoint: { x: 64, y: 32 },
        pathPoints: [{ x: 36, y: 32 }, { x: 64, y: 32 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Middle inward dip',
        instructionPa: 'ਵਿਚਕਾਰਲਾ ਅੰਦਰੂਨੀ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[1],
        startPoint: { x: 64, y: 32 },
        endPoint: { x: 48, y: 50 },
        pathPoints: [{ x: 64, y: 32 }, { x: 48, y: 50 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Bottom rounded belly and tail',
        instructionPa: 'ਹੇਠਲਾ ਗੋਲ ਕਟੋਰਾ ਅਤੇ ਪੂਛ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[2],
        startPoint: { x: 48, y: 50 },
        endPoint: { x: 42, y: 76 },
        pathPoints: [{ x: 48, y: 50 }, { x: 68, y: 64 }, { x: 42, y: 76 }]
      }
    ]
  },

  '੪': {
    char: '੪',
    name: 'Chaar (4)',
    gurmukhiName: 'ਚਾਰ (੪)',
    overallTipEn: 'Slanted drop, flat bottom line, and vertical cutting stem.',
    overallTipPa: 'ਤਿਰਛੀ ਲਕੀਰ, ਲੇਟਵੀਂ ਲਕੀਰ, ਅਤੇ ਸਿੱਧਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Slant down left',
        instructionPa: 'ਤਿਰਛਾ ਹੇਠਾਂ ਵੱਲ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[0],
        startPoint: { x: 54, y: 30 },
        endPoint: { x: 34, y: 56 },
        pathPoints: [{ x: 54, y: 30 }, { x: 34, y: 56 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Horizontal bottom line to the right',
        instructionPa: 'ਸਿੱਧੀ ਲੇਟਵੀਂ ਲਕੀਰ ਸੱਜੇ ਵੱਲ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[1],
        startPoint: { x: 34, y: 56 },
        endPoint: { x: 68, y: 56 },
        pathPoints: [{ x: 34, y: 56 }, { x: 68, y: 56 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Vertical straight cutting stem',
        instructionPa: 'ਵਿਚਕਾਰੋਂ ਕੱਟਦਾ ਸਿੱਧਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[2],
        startPoint: { x: 58, y: 32 },
        endPoint: { x: 58, y: 76 },
        pathPoints: [{ x: 58, y: 32 }, { x: 58, y: 76 }]
      }
    ]
  },

  '੫': {
    char: '੫',
    name: 'Panj (5)',
    gurmukhiName: 'ਪੰਜ (੫)',
    overallTipEn: 'Top line, short stem, and a big bottom bowl.',
    overallTipPa: 'ਉੱਪਰਲੀ ਲਕੀਰ, ਛੋਟਾ ਡੰਡਾ, ਅਤੇ ਵੱਡਾ ਗੋਲ ਮੋੜ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਉੱਪਰਲੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 34, y: 32 },
        endPoint: { x: 66, y: 32 },
        pathPoints: [{ x: 34, y: 32 }, { x: 66, y: 32 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Short left stem down',
        instructionPa: 'ਖੱਬਾ ਛੋਟਾ ਡੰਡਾ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 38, y: 32 },
        endPoint: { x: 38, y: 50 },
        pathPoints: [{ x: 38, y: 32 }, { x: 38, y: 50 }]
      },
      {
        stepNumber: 3,
        instructionEn: 'Big bottom curved bowl',
        instructionPa: 'ਹੇਠਲਾ ਵੱਡਾ ਗੋਲ ਕਟੋਰਾ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[2],
        startPoint: { x: 38, y: 50 },
        endPoint: { x: 36, y: 74 },
        pathPoints: [{ x: 38, y: 50 }, { x: 66, y: 58 }, { x: 36, y: 74 }]
      }
    ]
  },

  '੬': {
    char: '੬',
    name: 'Chhe (6)',
    gurmukhiName: 'ਛੇ (੬)',
    overallTipEn: 'Top-left loop rounding into a bottom circle.',
    overallTipPa: 'ਉੱਪਰਲਾ ਮੋੜ ਅਤੇ ਹੇਠਲਾ ਗੋਲ ਚੱਕਰ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top-left loop arch',
        instructionPa: 'ਉੱਪਰਲਾ ਖੱਬਾ ਮੋੜ',
        arrowDirection: 'down-right',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[0],
        startPoint: { x: 42, y: 32 },
        endPoint: { x: 52, y: 60 },
        pathPoints: [{ x: 42, y: 32 }, { x: 34, y: 48 }, { x: 52, y: 60 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Full bottom closed circle loop',
        instructionPa: 'ਹੇਠਲਾ ਪੂਰਾ ਗੋਲ ਚੱਕਰ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 52, y: 60 },
        endPoint: { x: 52, y: 60 },
        pathPoints: [{ x: 52, y: 60 }, { x: 68, y: 68 }, { x: 50, y: 78 }, { x: 36, y: 68 }, { x: 52, y: 60 }]
      }
    ]
  },

  '੭': {
    char: '੭',
    name: 'Satt (7)',
    gurmukhiName: 'ਸੱਤ (੭)',
    overallTipEn: 'Top bar and diagonal stem down to bottom-left.',
    overallTipPa: 'ਸਿੱਧੀ ਉੱਪਰਲੀ ਲਕੀਰ ਅਤੇ ਖੱਬੇ ਵੱਲ ਤਿਰਛਾ ਡੰਡਾ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal bar',
        instructionPa: 'ਸਿੱਧੀ ਉੱਪਰਲੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 32, y: 32 },
        endPoint: { x: 68, y: 32 },
        pathPoints: [{ x: 32, y: 32 }, { x: 68, y: 32 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Diagonal stem down to bottom-left',
        instructionPa: 'ਖੱਬੇ ਵੱਲ ਤਿਰਛਾ ਡੰਡਾ',
        arrowDirection: 'down-left',
        arrowIcon: '↙️',
        color: STROKE_COLORS[1],
        startPoint: { x: 68, y: 32 },
        endPoint: { x: 38, y: 76 },
        pathPoints: [{ x: 68, y: 32 }, { x: 38, y: 76 }]
      }
    ]
  },

  '੮': {
    char: '੮',
    name: 'Atth (8)',
    gurmukhiName: 'ਅੱਠ (੮)',
    overallTipEn: 'Continuous figure-8 double loops.',
    overallTipPa: 'ਲਗਾਤਾਰ ਅੱਠ-ਆਕਾਰ ਦੇ ਦੋ ਲੂਪ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Upper S-curve loop',
        instructionPa: 'ਉੱਪਰਲਾ ਐੱਸ-ਮੋੜ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[0],
        startPoint: { x: 50, y: 32 },
        endPoint: { x: 64, y: 54 },
        pathPoints: [{ x: 50, y: 32 }, { x: 36, y: 42 }, { x: 64, y: 54 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Lower loop crossing back up',
        instructionPa: 'ਹੇਠਲਾ ਲੂਪ ਅਤੇ ਵਾਪਸੀ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 64, y: 54 },
        endPoint: { x: 50, y: 54 },
        pathPoints: [{ x: 64, y: 54 }, { x: 36, y: 66 }, { x: 50, y: 76 }, { x: 64, y: 66 }, { x: 50, y: 54 }]
      }
    ]
  },

  '੯': {
    char: '੯',
    name: 'Nau (9)',
    gurmukhiName: 'ਨੌਂ (੯)',
    overallTipEn: 'Top closed circle balloon and right stem curving down.',
    overallTipPa: 'ਉੱਪਰਲਾ ਗੋਲ ਚੱਕਰ ਅਤੇ ਸੱਜਾ ਡੰਡਾ ਹੇਠਾਂ ਵੱਲ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Complete upper circular loop',
        instructionPa: 'ਉੱਪਰਲਾ ਪੂਰਾ ਗੋਲ ਚੱਕਰ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[0],
        startPoint: { x: 50, y: 48 },
        endPoint: { x: 50, y: 48 },
        pathPoints: [{ x: 50, y: 48 }, { x: 34, y: 38 }, { x: 50, y: 28 }, { x: 66, y: 38 }, { x: 50, y: 48 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Right stem curving down with hook',
        instructionPa: 'ਸੱਜਾ ਡੰਡਾ ਹੇਠਾਂ ਵੱਲ ਮੋੜ',
        arrowDirection: 'down-left',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[1],
        startPoint: { x: 66, y: 38 },
        endPoint: { x: 44, y: 76 },
        pathPoints: [{ x: 66, y: 38 }, { x: 66, y: 72 }, { x: 44, y: 76 }]
      }
    ]
  },

  '੧੦': {
    char: '੧੦',
    name: 'Das (10)',
    gurmukhiName: 'ਦਸ (੧੦)',
    overallTipEn: 'Write digit ੧ (Ik) followed by digit ੦ (Sifar).',
    overallTipPa: 'ਪਹਿਲਾਂ ਅੰਕ ੧ (ਇੱਕ) ਲਿਖੋ ਅਤੇ ਫਿਰ ਅੰਕ ੦ (ਸਿਫ਼ਰ)।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Digit ੧: Top loop and curved tail',
        instructionPa: 'ਅੰਕ ੧: ਉੱਪਰੋਂ ਘੁਮਾ ਕੇ ਹੇਠਾਂ ਪੂਛ',
        arrowDirection: 'curve-clockwise',
        arrowIcon: '⤵️',
        color: STROKE_COLORS[0],
        startPoint: { x: 36, y: 40 },
        endPoint: { x: 46, y: 74 },
        pathPoints: [{ x: 36, y: 40 }, { x: 48, y: 30 }, { x: 56, y: 42 }, { x: 46, y: 74 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Digit ੦: Complete round zero circle',
        instructionPa: 'ਅੰਕ ੦: ਪੂਰਾ ਗੋਲ ਸਿਫ਼ਰ ਚੱਕਰ',
        arrowDirection: 'curve-counter',
        arrowIcon: '🔄',
        color: STROKE_COLORS[1],
        startPoint: { x: 70, y: 34 },
        endPoint: { x: 70, y: 34 },
        pathPoints: [{ x: 70, y: 34 }, { x: 58, y: 52 }, { x: 70, y: 72 }, { x: 82, y: 52 }, { x: 70, y: 34 }]
      }
    ]
  }
};

/**
 * Safe fallback generator if an unlisted character is requested
 */
export function getStrokeDataForChar(char: string, name: string, gurmukhiName: string): CharacterStrokeData {
  if (GURMUKHI_STROKE_DIRECTIONS[char]) {
    return GURMUKHI_STROKE_DIRECTIONS[char];
  }

  // Generic fallback with standard top bar + vertical stem
  return {
    char,
    name,
    gurmukhiName,
    overallTipEn: 'Trace from top to bottom following numbered direction arrows.',
    overallTipPa: 'ਨੰਬਰਾਂ ਅਤੇ ਤੀਰਾਂ ਦੇ ਮੁਤਾਬਕ ਉੱਪਰੋਂ ਹੇਠਾਂ ਵੱਲ ਲਿਖੋ।',
    strokes: [
      {
        stepNumber: 1,
        instructionEn: 'Top horizontal line',
        instructionPa: 'ਸਿਰ ਦੀ ਲਕੀਰ',
        arrowDirection: 'right',
        arrowIcon: '➡️',
        color: STROKE_COLORS[0],
        startPoint: { x: 28, y: 28 },
        endPoint: { x: 72, y: 28 },
        pathPoints: [{ x: 28, y: 28 }, { x: 72, y: 28 }]
      },
      {
        stepNumber: 2,
        instructionEn: 'Main vertical and curved body',
        instructionPa: 'ਮੁੱਖ ਡੰਡਾ ਅਤੇ ਮੋੜ',
        arrowDirection: 'down',
        arrowIcon: '⬇️',
        color: STROKE_COLORS[1],
        startPoint: { x: 50, y: 28 },
        endPoint: { x: 50, y: 76 },
        pathPoints: [{ x: 50, y: 28 }, { x: 50, y: 76 }]
      }
    ]
  };
}
