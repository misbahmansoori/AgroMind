const HINDI_RE = /[\u0900-\u097F]/;

export function detectSpeechLang(text = "") {
  return HINDI_RE.test(text) ? "hi-IN" : "en-IN";
}

export function stripMarkdownForSpeech(text = "") {
  return String(text)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^[-*•]\s+/gm, "")
    .replace(/^\d+[.)]\s+/gm, "")
    .replace(/[#*_`~]/g, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .trim();
}
