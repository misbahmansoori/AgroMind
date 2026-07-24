const ChatInput = ({ value, onChange, onSend, loading }) => {
  return (
    <div className="flex gap-3 mt-5">
      <input
        type="text"
        placeholder="Ask your farming question..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={onSend}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 rounded-xl"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;