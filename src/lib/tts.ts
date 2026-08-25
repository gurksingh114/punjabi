/**
 * xAI TTS for Vite (browser). Set VITE_XAI_API_KEY in .env.local.
 */

const MAX_CHARS = 400;
const VOICE = "ara";
const LANGUAGE = "pa-IN";
const cache = new Map<string, string>();

export async function synthesizeSpeech({ data }: { data: { text: string } }) {
  const text = String(data?.text ?? "")
    .trim()
    .slice(0, MAX_CHARS);
  if (!text) return { ok: false as const, error: "empty" };

  const cached = cache.get(text);
  if (cached) return { ok: true as const, audio: cached };

  const apiKey = import.meta.env.VITE_XAI_API_KEY as string | undefined;
  if (!apiKey) return { ok: false as const, error: "unavailable" };

  const res = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      voice_id: VOICE,
      language: LANGUAGE,
      speed: 0.88,
      output_format: {
        codec: "mp3",
        sample_rate: 24000,
        bit_rate: 96000,
      },
    }),
  });

  if (!res.ok) return { ok: false as const, error: `tts ${res.status}` };

  const buf = await res.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const audio = btoa(binary);
  cache.set(text, audio);
  return { ok: true as const, audio };
}
