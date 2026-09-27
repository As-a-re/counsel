import { useCallback, useEffect, useState } from "react";

/** Strips citation markers like【1】before speaking — they're visual, not spoken content. */
export function cleanForSpeech(text: string) {
  return text.replace(/【\d+】/g, "").replace(/\s+/g, " ").trim();
}

export function useSpeechSynthesis(lang: string) {
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = useCallback(
    (id: string, text: string) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanForSpeech(text));
      utterance.lang = lang;
      utterance.rate = 0.98;
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang.toLowerCase().startsWith(lang.split("-")[0].toLowerCase()));
      if (match) utterance.voice = match;
      utterance.onstart = () => setSpeakingId(id);
      utterance.onend = () => setSpeakingId((cur) => (cur === id ? null : cur));
      utterance.onerror = () => setSpeakingId((cur) => (cur === id ? null : cur));
      window.speechSynthesis.speak(utterance);
    },
    [lang, supported]
  );

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supported]);

  return { supported, speakingId, speak, stop };
}
