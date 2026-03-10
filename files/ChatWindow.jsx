import { Sparkles, Zap, Code2, Lightbulb, BookOpen } from 'lucide-react'
import MessageBubble from './MessageBubble'
import { useScrollToBottom } from '../../hooks/useScrollToBottom'
import { useChat } from '../../context/ChatContext'

/** Suggested starter prompts shown on an empty chat */
const SUGGESTIONS = [
  { icon: Zap, label: 'Explain quantum computing', color: 'text-yellow-400' },
  { icon: Code2, label: 'Write a React useDebounce hook', color: 'text-blue-400' },
  { icon: Lightbulb, label: 'Brainstorm startup ideas in AI', color: 'text-accent' },
  { icon: BookOpen, label: 'Summarize the Roman Empire', color: 'text-green-400' },
]

/**
 * ChatWindow — renders the scrollable message list, empty state, and
 * auto-scrolls to the bottom on new messages.
 */
export default function ChatWindow() {
  const { messages, sendMessage, streaming } = useChat()
  const { containerRef } = useScrollToBottom([messages.length, streaming])

  const isEmpty = messages.length === 0

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {isEmpty ? (
        <EmptyState onSuggest={(text) => sendMessage(text)} />
      ) : (
        <div className="max-w-3xl mx-auto py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {/* Bottom padding so last message isn't hidden behind input */}
          <div className="h-4" />
        </div>
      )}
    </div>
  )
}

/** ── Empty state with greeting and suggestion chips ── */
function EmptyState({ onSuggest }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center animate-fade-in">
      {/* Orb */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent via-accent to-ember/60 flex items-center justify-center shadow-2xl shadow-accent/30 animate-float">
          <Sparkles size={32} className="text-white" />
        </div>
        {/* Orbit ring */}
        <div className="absolute inset-0 rounded-3xl border border-accent/20 scale-125 animate-orbit" style={{ animationDuration: '8s' }} />
      </div>

      <h2 className="font-syne text-3xl font-bold text-white mb-2 glow-text">
        Hello, I'm Aidora
      </h2>
      <p className="text-silver font-dm text-base max-w-sm leading-relaxed mb-10">
        Your intelligent AI assistant. Ask me anything — from complex code to creative writing.
      </p>

      {/* Suggestion chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {SUGGESTIONS.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            onClick={() => onSuggest(label)}
            className="
              flex items-center gap-3 px-4 py-3.5 rounded-xl text-left
              bg-surface hover:bg-muted border border-border hover:border-accent/30
              text-silver hover:text-white transition-all duration-200 group
            "
          >
            <Icon size={16} className={`flex-shrink-0 ${color} group-hover:scale-110 transition-transform`} />
            <span className="text-sm font-dm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
