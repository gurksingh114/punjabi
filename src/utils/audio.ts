/**
 * Toddler SFX (Web Audio) + natural teacher voice (xAI TTS, cached).
 */

import { synthesizeSpeech } from "../lib/tts";

let isSoundMuted = false;
let audioCtx: AudioContext | null = null;
let currentAudio: HTMLAudioElement | null = null;
let playGen = 0;
const blobCache = new Map<string, string>();
const speakingListeners = new Set<(speaking: boolean) => void>();
let speaking = false;

function setSpeaking(next: boolean) {
  if (speaking === next) return;
  speaking = next;
  speakingListeners.forEach((fn) => fn(next));
}

export function subscribeSpeaking(fn: (speaking: boolean) => void) {
  speakingListeners.add(fn);
  fn(speaking);
  return () => {
    speakingListeners.delete(fn);
  };
}

export function isSpeaking() {
  return speaking;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setMuted(muted: boolean) {
  isSoundMuted = muted;
  if (muted) stopVoice();
}

export function getMuted(): boolean {
  return isSoundMuted;
}

export function playChime(freq = 587.33) {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    /* ignore */
  }
}

export function playPop() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    /* ignore */
  }
}

export function playSparkle() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [784, 987.77, 1174.66, 1567.98];
    const note = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    /* ignore */
  }
}

export function playBoing() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    /* ignore */
  }
}

export function playSuccessChime() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);
  } catch {
    /* ignore */
  }
}

export function playCelebration() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const melody = [
      { f: 523.25, d: 0.15, delay: 0 },
      { f: 659.25, d: 0.15, delay: 0.12 },
      { f: 783.99, d: 0.18, delay: 0.24 },
      { f: 1046.5, d: 0.45, delay: 0.38 },
    ];

    const now = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.f, now + note.delay);

      gain.gain.setValueAtTime(0.22, now + note.delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.delay);
      osc.stop(now + note.delay + note.d);
    });
  } catch {
    /* ignore */
  }
}

export function playDholBeat(type: "dha" | "ge" | "na" = "dha") {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = type === "dha" ? 120 : type === "ge" ? 85 : 240;
    const endFreq = type === "dha" ? 45 : type === "ge" ? 35 : 120;
    const duration = type === "dha" ? 0.25 : 0.18;

    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* ignore */
  }
}

const praisePhrases = [
  { gurmukhi: "ਸ਼ਾਬਾਸ਼!", roman: "Shabaash!", spoken: "ਸ਼ਾਬਾਸ਼ ਜੀ!" },
  { gurmukhi: "ਬੜਾ ਵਧੀਆ!", roman: "Bada Vadiya!", spoken: "ਬੜਾ ਵਧੀਆ ਜੀ!" },
  { gurmukhi: "ਵਾਹ ਜੀ ਵਾਹ!", roman: "Waah ji Waah!", spoken: "ਵਾਹ ਜੀ ਵਾਹ!" },
  { gurmukhi: "ਖਰਾ ਸੋਹਣਾ!", roman: "Khara Sohna!", spoken: "ਖਰਾ ਸੋਹਣਾ ਜੀ!" },
  { gurmukhi: "ਲਾਜਵਾਬ!", roman: "Laajawaab!", spoken: "ਲਾਜਵਾਬ ਜੀ!" },
  { gurmukhi: "ਤੁਸੀਂ ਯਾਰ ਓ!", roman: "Tusi Yaar O!", spoken: "ਤੁਸੀਂ ਯਾਰ ਓ!" },
];

/** Keep sentence TTS in Majhi Punjabi (ਏ not Hindi ਹੈ). */
export function majhi(text: string): string {
  return text
    .replace(/ਇਸ ਤਰ੍ਹਾਂ/g, "ਇੰਜ")
    .replace(/ਤਰ੍ਹਾਂ/g, "ਤਰਾਂ")
    .replace(/ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ/g, "ਫੇਰ ਕਰ ਕੇ ਵੇਖੋ")
    .replace(/ਦੁਬਾਰਾ/g, "ਫੇਰ")
    .replace(/ਕੋਸ਼ਿਸ਼ ਕਰੋ/g, "ਕਰ ਕੇ ਵੇਖੋ")
    .replace(/ਚਲੋ ਗਿਣਤੀ ਕਰੀਏ/g, "ਆਓ ਗਿਣੀਏ ਜੀ")
    .replace(/ਬਹੁਤ ਵਧੀਆ/g, "ਬੜਾ ਵਧੀਆ")
    .replace(/ਬਹੁਤ ਖ਼ੂਬ/g, "ਖਰਾ ਸੋਹਣਾ")
    .replace(/ਬਹੁਤ /g, "ਬੜਾ ")
    .replace(/ਲੱਗਦਾ ਹੈ/g, "ਲੱਗਦਾ ਏ")
    .replace(/ਦਿੰਦੀ ਹੈ/g, "ਦਿੰਦੀ ਏ")
    .replace(/ਕਰਦਾ ਹੈ/g, "ਕਰਦਾ ਏ")
    .replace(/ਦੌੜਦਾ ਹੈ/g, "ਦੌੜਦਾ ਏ")
    .replace(/ਕਿੱਥੇ ਹੈ/g, "ਕਿੱਥੇ ਏ")
    .replace(/ਹੈ ਸਾਰੇ/g, "ਏ ਸਾਰੇ")
    .replace(/ ਹੈ।/g, " ਏ।")
    .replace(/ ਹੈ!/g, " ਏ!")
    .replace(/ ਹੈ\?/g, " ਏ?")
    .replace(/ ਹੈ,/g, " ਏ,")
    .replace(/ ਹੈ /g, " ਏ ");
}

function stripSpeechMarkup(text: string) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]+\]/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stopVoice() {
  playGen += 1;
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  setSpeaking(false);
}

function playUrl(url: string, gen: number): Promise<void> {
  return new Promise((resolve) => {
    if (gen !== playGen) {
      resolve();
      return;
    }
    const el = new Audio(url);
    currentAudio = el;
    const done = () => {
      el.removeEventListener("ended", done);
      el.removeEventListener("error", done);
      if (currentAudio === el) currentAudio = null;
      if (gen === playGen) setSpeaking(false);
      resolve();
    };
    el.addEventListener("ended", done);
    el.addEventListener("error", done);
    const t = window.setTimeout(done, 12000);
    el.addEventListener("ended", () => window.clearTimeout(t));
    el.play().catch(() => {
      window.clearTimeout(t);
      done();
    });
  });
}

function speakFallback(script: string, gen: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || gen !== playGen) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(stripSpeechMarkup(script));
    utterance.pitch = 1.05;
    utterance.rate = 0.86;
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith("pa")) ||
      voices.find((v) => v.lang.toLowerCase().includes("punjabi"));
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "pa-IN";
    }
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export async function speakNatural(script: string): Promise<void> {
  const text = majhi(script.trim());
  if (!text || isSoundMuted || typeof window === "undefined") return;

  const gen = ++playGen;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = "";
    currentAudio = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();

  setSpeaking(true);

  const cached = blobCache.get(text);
  if (cached) {
    await playUrl(cached, gen);
    return;
  }

  try {
    const result = await synthesizeSpeech({ data: { text } });
    if (gen !== playGen) return;
    if (result.ok && result.audio) {
      const bin = atob(result.audio);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([bytes], { type: "audio/mpeg" }));
      blobCache.set(text, url);
      await playUrl(url, gen);
      return;
    }
  } catch {
    /* fall through */
  }

  if (gen !== playGen) return;
  await speakFallback(text, gen);
  if (gen === playGen) setSpeaking(false);
}

export function speakPunjabi(text: string, _pitch = 1.12, rate = 0.82): Promise<void> {
  const cleaned = text.trim();
  if (!cleaned) return Promise.resolve();
  const script = rate < 0.75 ? `<slow>${cleaned}</slow>` : cleaned;
  return speakNatural(script);
}

/** Primer chant: "Haha haathi", "Kakka kabootar". */
export function speakLetterDetails(letter: {
  name: string;
  exampleRoman: string;
}) {
  playChime();
  const chant = `${letter.name} ${letter.exampleRoman.toLowerCase()}`;
  void speakNatural(`<slow>${chant}.</slow>`);
}

export function speakWord(word: { gurmukhi?: string; roman?: string }, slow = true): Promise<void> {
  const said = (word.roman || word.gurmukhi || "").trim();
  if (!said) return Promise.resolve();
  const script = slow ? `<slow>${said}.</slow>` : `${said}.`;
  return speakNatural(script);
}

export function speakPraise(): { gurmukhi: string; roman: string } {
  const item = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
  void speakNatural(item.spoken);
  return item;
}
