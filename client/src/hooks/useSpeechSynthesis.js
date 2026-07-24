import { useCallback, useEffect, useRef, useState } from "react";
import { stripMarkdownForSpeech } from "../utils/speech";

function pickVoice(lang = "en-IN") {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const primary = lang.slice(0, 2).toLowerCase();
  return (
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(primary)) ||
    voices.find((v) => v.lang?.toLowerCase().includes(primary)) ||
    voices[0]
  );
}

/**
 * Browser text-to-speech for AI replies.
 */
export function useSpeechSynthesis() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const ok =
      typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    if (!ok) return undefined;

    // Chrome loads voices async
    const warm = () => window.speechSynthesis.getVoices();
    warm();
    window.speechSynthesis.addEventListener("voiceschanged", warm);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", warm);
      window.speechSynthesis.cancel();
    };
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text, lang = "en-IN") => {
      if (!supported || !enabled || !text) return;

      const clean = stripMarkdownForSpeech(text);
      if (!clean) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      const voice = pickVoice(lang);
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        utteranceRef.current = null;
      };
      utterance.onerror = () => {
        setSpeaking(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [enabled, supported],
  );

  const toggleEnabled = useCallback(() => {
    setEnabled((prev) => {
      if (prev) {
        window.speechSynthesis?.cancel();
        setSpeaking(false);
      }
      return !prev;
    });
  }, []);

  return {
    supported,
    speaking,
    enabled,
    setEnabled,
    toggleEnabled,
    speak,
    cancel,
  };
}
