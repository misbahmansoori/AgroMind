const suggestions = [
  "Why are tomato leaves turning yellow?",
  "गेहूं में कौन सी खाद डालनी चाहिए?",
  "Best organic fertilizer for rice?",
  "How to control pests naturally?",
];

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="mb-5 flex flex-wrap gap-2 sm:gap-3">
      {suggestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="max-w-full rounded-full border border-green-300 bg-green-50 px-3 py-2 text-left text-xs transition hover:bg-green-100 sm:px-4 sm:text-sm"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;