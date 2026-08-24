/**
 * Audio Synthesis & Toddler Sound Effects Engine
 * Uses Web Audio API for responsive low-latency sound effects
 * and Web Speech API with Punjabi phonetics for voice pronunciations.
 */

// Master sound toggle state
let isSoundMuted = false;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setMuted(muted: boolean) {
  isSoundMuted = muted;
}

export function getMuted(): boolean {
  return isSoundMuted;
}

/**
 * Play a cheerful child-friendly chime tone (e.g., button press)
 */
export function playChime(freq = 587.33) {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignore audio context errors on un-interacted browsers
  }
}

/**
 * Play balloon pop sound effect
 */
export function playPop() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {}
}

/**
 * Play sparkle sound effect for tracing canvas strokes
 */
export function playSparkle() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [784, 987.77, 1174.66, 1567.98];
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {}
}

/**
 * Play gentle cartoon bounce when toddler needs to retry
 */
export function playBoing() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

/**
 * Play happy correct chime (two cheerful notes)
 */
export function playSuccessChime() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Note 1 (E5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Note 2 (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);
  } catch {}
}

/**
 * Play celebration victory fanfare
 */
export function playCelebration() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const melody = [
      { f: 523.25, d: 0.15, delay: 0 },      // C5
      { f: 659.25, d: 0.15, delay: 0.12 },   // E5
      { f: 783.99, d: 0.18, delay: 0.24 },   // G5
      { f: 1046.50, d: 0.45, delay: 0.38 },  // C6
    ];

    const now = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.delay);

      gain.gain.setValueAtTime(0.22, now + note.delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.delay);
      osc.stop(now + note.delay + note.d);
    });
  } catch {}
}

/**
 * Play rhythmic Dhol/drum sound for Punjabi rhymes
 */
export function playDholBeat(type: 'dha' | 'ge' | 'na' = 'dha') {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = type === 'dha' ? 120 : type === 'ge' ? 85 : 240;
    const endFreq = type === 'dha' ? 45 : type === 'ge' ? 35 : 120;
    const duration = type === 'dha' ? 0.25 : 0.18;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

/**
 * Toddler Punjabi Spoken Pronunciation via Web Speech API
 */
const praisePhrases = [
  { gurmukhi: "ਸ਼ਾਬਾਸ਼!", roman: "Shabaash!" },
  { gurmukhi: "ਬਹੁਤ ਵਧੀਆ!", roman: "Bohot Vadiya!" },
  { gurmukhi: "ਕਮਾਲ ਕਰ ਦਿੱਤਾ!", roman: "Kamaal Kar Ditta!" },
  { gurmukhi: "ਬਹੁਤ ਖ਼ੂਬ!", roman: "Bohot Khoob!" },
  { gurmukhi: "ਤੁਸੀਂ ਸੁਪਰ ਸਟਾਰ ਹੋ!", roman: "Tusi Super Star Ho!" },
  { gurmukhi: "ਵਾਹ ਜੀ ਵਾਹ!", roman: "Waah ji Waah!" }
];

export function speakPraise(): { gurmukhi: string; roman: string } {
  const item = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
  speakPunjabi(item.gurmukhi, 1.1, 0.88);
  return item;
}

export function speakPunjabi(text: string, pitch = 1.12, rate = 0.82) {
  if (isSoundMuted) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch; // Slightly higher pitch for child-friendly warmth
    utterance.rate = rate;   // Slower pacing so toddlers can hear phonetic nuances

    const voices = window.speechSynthesis.getVoices();
    
    // Find best Punjabi voice or close Indic voice (pa-IN, pa, hi-IN, etc.)
    const punjabiVoice = voices.find(v => 
      v.lang.startsWith('pa') || 
      v.lang.includes('Punjabi') ||
      v.name.toLowerCase().includes('punjabi')
    ) || voices.find(v => 
      v.lang.startsWith('hi') || 
      v.lang.includes('Hindi')
    ) || voices.find(v => 
      v.lang.startsWith('en-IN')
    );

    if (punjabiVoice) {
      utterance.voice = punjabiVoice;
      utterance.lang = punjabiVoice.lang;
    } else {
      utterance.lang = 'pa-IN';
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}

/**
 * Speak full letter exploration phrase:
 * e.g., "ੳ - ਊੜਾ, ਊਠ" -> "Oora, Ooth!"
 */
export function speakLetterDetails(letter: string, name: string, exampleWord: string) {
  playChime();
  setTimeout(() => {
    // Speak letter name then example
    speakPunjabi(`${letter}, ${name}, ${exampleWord}`, 1.08, 0.78);
  }, 120);
}
