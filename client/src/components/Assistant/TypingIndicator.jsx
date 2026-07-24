const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <span className="animate-pulse text-gray-500">
          AgroMind AI is thinking...
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;