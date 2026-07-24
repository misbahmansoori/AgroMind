const formatInline = (text) => {
  // Turn **bold** into <strong>
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const renderAiContent = (text) => {
  const lines = String(text || "")
    .replace(/\r\n/g, "\n")
    .trim()
    .split("\n");

  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-2 space-y-1.5 pl-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex gap-2 text-[15px] leading-6 text-gray-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
            <span>{formatInline(item)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    const bulletMatch = line.match(/^([-*•]|\d+[.)])\s+(.*)$/);
    if (bulletMatch) {
      listItems.push(bulletMatch[2]);
      return;
    }

    flushList();

    const isHeading =
      line.endsWith(":") ||
      (/^[A-Z][\w\s/&-]{2,40}$/.test(line) && line.length < 42);

    if (isHeading && !line.includes("?")) {
      blocks.push(
        <p
          key={`h-${index}`}
          className="mt-3 mb-1 font-[Manrope] text-sm font-bold tracking-wide text-green-800 first:mt-0"
        >
          {formatInline(line.replace(/:$/, ""))}
        </p>,
      );
      return;
    }

    blocks.push(
      <p key={`p-${index}`} className="mb-2 text-[15px] leading-7 text-gray-700 last:mb-0">
        {formatInline(line)}
      </p>,
    );
  });

  flushList();
  return blocks;
};

const ChatBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
          AI
        </div>
      )}

      <div
        className={`max-w-[85%] px-4 py-3 shadow-sm sm:max-w-[75%] ${
          isUser
            ? "rounded-2xl rounded-br-md bg-green-700 text-[15px] leading-6 text-white"
            : "rounded-2xl rounded-bl-md border border-[#dce8dc] bg-white"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="ai-reply">{renderAiContent(text)}</div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
