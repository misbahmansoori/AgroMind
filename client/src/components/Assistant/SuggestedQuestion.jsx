const suggestions = [
  "Why are tomato leaves turning yellow?",
  "गेहूं में कौन सी खाद डालनी चाहिए?",
  "Best organic fertilizer for rice?",
  "How to control pests naturally?",
];

const SuggestedQuestions = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {suggestions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="px-4 py-2 rounded-full border border-green-300 bg-green-50 hover:bg-green-100 transition text-sm"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;