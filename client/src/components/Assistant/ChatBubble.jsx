const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm whitespace-pre-wrap
          ${
            isUser
              ? "bg-green-600 text-white rounded-br-md"
              : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;