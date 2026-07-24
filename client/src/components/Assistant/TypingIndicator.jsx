const TypingIndicator = () => {
  return (
    <div className="mb-4 flex justify-start">
      <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
        AI
      </div>
      <div className="rounded-2xl rounded-bl-md border border-[#dce8dc] bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-green-600" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
