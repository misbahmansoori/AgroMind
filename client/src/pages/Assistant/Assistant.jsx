import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, Volume2, VolumeX } from "lucide-react";
import api from "../../api/axios";

import ChatBubble from "../../components/Assistant/ChatBubble";
import ChatInput from "../../components/Assistant/ChatInput";
import SuggestedQuestions from "../../components/Assistant/SuggestedQuestion";
import TypingIndicator from "../../components/Assistant/TypingIndicator";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";
import { detectSpeechLang } from "../../utils/speech";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speechLang, setSpeechLang] = useState("en-IN");
  const [activeSpeakIndex, setActiveSpeakIndex] = useState(null);
  const [voiceError, setVoiceError] = useState("");
  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const finalSpeechRef = useRef("");
  const sendMessageRef = useRef(null);

  const {
    supported: ttsSupported,
    speaking,
    enabled: voiceRepliesOn,
    toggleEnabled,
    speak,
    cancel: cancelSpeech,
  } = useSpeechSynthesis();

  const handleSpeechResult = useCallback(({ interim, final }) => {
    if (final) {
      finalSpeechRef.current = `${finalSpeechRef.current} ${final}`.trim();
      setMessage(finalSpeechRef.current);
      setSpeechLang(detectSpeechLang(finalSpeechRef.current));
      return;
    }
    if (interim) {
      const live = `${finalSpeechRef.current} ${interim}`.trim();
      setMessage(live);
    }
  }, []);

  const handleSpeechError = useCallback((error) => {
    if (error === "not-allowed") {
      setVoiceError("Mic permission blocked. Allow microphone in the browser.");
    } else {
      setVoiceError("Voice input failed. Try again or type your question.");
    }
  }, []);

  const {
    supported: micSupported,
    listening,
    start: startListening,
    stop: stopListening,
    abort: abortListening,
  } = useSpeechRecognition({
    lang: speechLang,
    continuous: false,
    onResult: handleSpeechResult,
    onError: handleSpeechError,
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!speaking) setActiveSpeakIndex(null);
  }, [speaking]);

  const clearChat = () => {
    if (loading) return;
    abortListening();
    cancelSpeech();
    setMessages([]);
    setMessage("");
    setActiveSpeakIndex(null);
    setVoiceError("");
  };

  const speakReply = useCallback(
    (text, index) => {
      if (!ttsSupported || !text) return;
      const lang = detectSpeechLang(text);
      setActiveSpeakIndex(index ?? null);
      speak(text, lang);
    },
    [speak, ttsSupported],
  );

  const sendMessage = async (text = message) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    abortListening();
    cancelSpeech();
    setVoiceError("");

    const lang = detectSpeechLang(trimmed);
    setSpeechLang(lang);

    const userMessage = {
      sender: "user",
      text: trimmed,
    };

    const historyForApi = [...messages, userMessage].slice(-6);

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    finalSpeechRef.current = "";
    setLoading(true);

    try {
      const res = await api.post("/assistant", {
        message: trimmed,
        history: historyForApi,
      });

      const reply = res.data.reply;
      const aiMessage = {
        sender: "ai",
        text: reply,
      };

      setMessages((prev) => {
        const next = [...prev, aiMessage];
        if (voiceRepliesOn && ttsSupported) {
          // Speak after state update using next length
          queueMicrotask(() => speakReply(reply, next.length - 1));
        }
        return next;
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  sendMessageRef.current = sendMessage;

  // When recognition ends with a final transcript, auto-send
  useEffect(() => {
    if (listening) return;
    const spoken = finalSpeechRef.current.trim();
    if (!spoken) return;

    const timer = setTimeout(() => {
      const text = finalSpeechRef.current.trim();
      if (!text || loading) return;
      finalSpeechRef.current = "";
      sendMessageRef.current?.(text);
    }, 350);

    return () => clearTimeout(timer);
  }, [listening, loading]);

  const handleMicClick = () => {
    setVoiceError("");
    if (listening) {
      // Keep interim transcript if browser never marked a "final" chunk
      if (!finalSpeechRef.current.trim() && message.trim()) {
        finalSpeechRef.current = message.trim();
      }
      stopListening();
      return;
    }

    cancelSpeech();
    finalSpeechRef.current = "";
    setMessage("");
    startListening();
  };

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-4 pb-6 pt-28 sm:h-[90vh] sm:min-h-0 sm:p-6 sm:pt-32">
      <div className="mb-4 flex flex-col gap-4 sm:mb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 font-[Manrope] text-2xl font-bold text-green-700 sm:text-3xl">
            AI Farmer Assistant
          </h1>
          <p className="text-sm text-gray-500 sm:text-base">
            Ask by voice or text — in English or Hindi. AgroMind can reply out
            loud.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {ttsSupported && (
            <button
              type="button"
              onClick={toggleEnabled}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition sm:px-4 sm:py-2.5 ${
                voiceRepliesOn
                  ? "border-green-200 bg-green-50 text-green-800 hover:bg-green-100"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              title={
                voiceRepliesOn
                  ? "Mute spoken replies"
                  : "Enable spoken replies"
              }
            >
              {voiceRepliesOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="sm:inline">{voiceRepliesOn ? "Voice on" : "Voice off"}</span>
            </button>
          )}

          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 sm:px-4 sm:py-2.5"
            >
              <Trash2 size={16} />
              <span className="hidden xs:inline sm:inline">Clear chat</span>
              <span className="sm:hidden">Clear</span>
            </button>
          )}
        </div>
      </div>

      {voiceError && (
        <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {voiceError}
        </div>
      )}

      {!micSupported && (
        <div className="mb-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
          Voice input needs Chrome or Edge. You can still type questions.
        </div>
      )}

      {messages.length === 0 && (
        <SuggestedQuestions onSelect={(question) => sendMessage(question)} />
      )}

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-[#dce8dc] bg-[#f7faf7] p-4 sm:p-5"
      >
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            onSpeak={
              msg.sender === "ai" && ttsSupported
                ? () => speakReply(msg.text, index)
                : undefined
            }
            speaking={speaking && activeSpeakIndex === index}
          />
        ))}

        {loading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => sendMessage()}
        loading={loading}
        listening={listening}
        micSupported={micSupported}
        onMicClick={handleMicClick}
      />
    </div>
  );
};

export default Assistant;
