import { Mic, MicOff, SendHorizontal } from "lucide-react";

const ChatInput = ({
  value,
  onChange,
  onSend,
  loading,
  listening = false,
  micSupported = false,
  onMicClick,
}) => {
  return (
    <div className="mt-5">
      {listening && (
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-red-600">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          Listening… speak in Hindi or English
        </p>
      )}

      <div className="flex gap-2 sm:gap-3">
        <input
          type="text"
          placeholder={
            listening
              ? "Listening…"
              : "Ask by voice or type your farming question..."
          }
          value={value}
          disabled={loading || listening}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && !listening) onSend();
          }}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        {micSupported && (
          <button
            type="button"
            onClick={onMicClick}
            disabled={loading}
            title={listening ? "Stop listening" : "Speak your question"}
            aria-label={listening ? "Stop listening" : "Start voice input"}
            className={`inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl transition disabled:cursor-not-allowed disabled:bg-gray-300 ${
              listening
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-green-200 bg-green-50 text-green-800 hover:bg-green-100"
            }`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        )}

        <button
          type="button"
          onClick={onSend}
          disabled={loading || listening || !value.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "..." : (
            <>
              <span className="hidden sm:inline">Send</span>
              <SendHorizontal size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
