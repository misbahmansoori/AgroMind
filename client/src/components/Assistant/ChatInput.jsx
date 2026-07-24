const ChatInput = ({ value, onChange, onSend, loading }) => {
  return (
    <div className="mt-5 flex gap-3">
      <input
        type="text"
        placeholder="Ask your farming question..."
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) onSend();
        }}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
      />

      <button
        type="button"
        onClick={onSend}
        disabled={loading || !value.trim()}
        className="rounded-xl bg-green-600 px-6 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
