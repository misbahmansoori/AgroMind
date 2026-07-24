import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../api/axios";

import ChatBubble from "../../components/Assistant/ChatBubble";
import ChatInput from "../../components/Assistant/ChatInput";
import SuggestedQuestions from "../../components/Assistant/SuggestedQuestion";
import TypingIndicator from "../../components/Assistant/TypingIndicator";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const clearChat = () => {
    if (loading) return;
    setMessages([]);
    setMessage("");
  };

  const sendMessage = async (text = message) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage = {
      sender: "user",
      text: trimmed,
    };

    const historyForApi = [...messages, userMessage].slice(-6);

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/assistant", {
        message: trimmed,
        history: historyForApi,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
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

  return (
    <div className="mx-auto flex h-[90vh] max-w-5xl flex-col p-6 pt-32">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 font-[Manrope] text-3xl font-bold text-green-700">
            AI Farmer Assistant
          </h1>
          <p className="text-gray-500">
            Ask anything about farming in English or Hindi.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 size={16} />
            Clear chat
          </button>
        )}
      </div>

      {messages.length === 0 && (
        <SuggestedQuestions onSelect={(question) => sendMessage(question)} />
      )}

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-[#dce8dc] bg-[#f7faf7] p-4 sm:p-5"
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} text={msg.text} />
        ))}

        {loading && <TypingIndicator />}
        <div ref={chatEndRef} />
      </div>

      <ChatInput
        value={message}
        onChange={setMessage}
        onSend={() => sendMessage()}
        loading={loading}
      />
    </div>
  );
};

export default Assistant;
