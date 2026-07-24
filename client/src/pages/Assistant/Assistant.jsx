import { useState } from "react";
import api from "../../api/axios";

import ChatBubble from "../../components/Assistant/ChatBubble";
import ChatInput from "../../components/Assistant/ChatInput";
import SuggestedQuestions from "../../components/Assistant/SuggestedQuestion";
import TypingIndicator from "../../components/Assistant/TypingIndicator";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = message) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await api.post("/assistant", {
        message: text,
      });

      const aiMessage = {
        sender: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setMessage("");
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
      <h1 className="mb-2 font-[Manrope] text-3xl font-bold text-green-700">
        AI Farmer Assistant
      </h1>

      <p className="text-gray-500 mb-5">
        Ask anything about farming in English or Hindi.
      </p>

      {messages.length === 0 && (
        <SuggestedQuestions
          onSelect={(question) => sendMessage(question)}
        />
      )}

      <div className="flex-1 overflow-y-auto border rounded-2xl bg-gray-50 p-5">

        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}

        {loading && <TypingIndicator />}

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