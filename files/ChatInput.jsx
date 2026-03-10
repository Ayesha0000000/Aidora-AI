import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Square, Paperclip, Mic } from 'lucide-react'
import { useChat } from '../../context/ChatContext'

/**
 * ChatInput — the message composition bar at the bottom of the chat.
 * Features: auto-grow textarea, keyboard shortcut (Enter to send),
 * disabled state during streaming, stop-generation button.
 */
export default function ChatInput() {
  const { sendMessage, streaming, cancelStream, error } = useChat()
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  // Auto-focus on mount
  useEffect(() => { textareaRef.current?.focus() }, [])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }, [text])

  const handleSend = useCallback(async () => {
    const trimmed = text.trim()
    if (!trimmed || streaming) return
    setText('')
    await sendMessage(trimmed)
  }, [text, streaming, sendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = text.trim().length > 0 && !streaming

  return (
    <div className="px-4 md:px-8 pb-6 pt-2">
      {/* Error banner */}
      {error && (
        <div className="mb-3 px-4 py-2.5 rounded-xl bg-ember-dim border border-ember/20 text-ember text-sm font-dm animate-fade-in">
          {error}
        </div>
      )}

      {/* Input container */}
      <div className="relative flex items-end gap-3 bg-surface border border-border hover:border-muted focus-within:border-accent/50 rounded-2xl px-4 py-3 transition-all duration-200 shadow-xl shadow-black/20">
        {/* Attachment button (placeholder) */}
        <button
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-ghost hover:text-silver hover:bg-muted transition-all mb-0.5"
          aria-label="Attach file"
          type="button"
        >
          <Paperclip size={16} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Aidora anything…"
          rows={1}
          className="
            flex-1 bg-transparent text-white placeholder-ghost text-sm font-dm
            resize-none outline-none leading-relaxed
            min-h-[24px] max-h-[180px] py-1
          "
          disabled={streaming}
          aria-label="Message input"
        />

        {/* Voice button (placeholder) */}
        <button
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-ghost hover:text-silver hover:bg-muted transition-all mb-0.5"
          aria-label="Voice input"
          type="button"
        >
          <Mic size={16} />
        </button>

        {/* Send / Stop button */}
        <button
          onClick={streaming ? cancelStream : handleSend}
          disabled={!canSend && !streaming}
          className={`
            flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
            transition-all duration-200 mb-0.5
            ${streaming
              ? 'bg-ember/15 hover:bg-ember/25 text-ember border border-ember/20'
              : canSend
                ? 'bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-px'
                : 'bg-muted text-ghost cursor-not-allowed'
            }
          `}
          aria-label={streaming ? 'Stop generation' : 'Send message'}
          type="button"
        >
          {streaming
            ? <Square size={14} fill="currentColor" />
            : <Send size={15} />
          }
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-xs text-ghost font-dm mt-2">
        Press <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-ghost text-[10px]">Enter</kbd> to send,{' '}
        <kbd className="px-1 py-0.5 rounded bg-surface border border-border text-ghost text-[10px]">Shift+Enter</kbd> for newline
      </p>
    </div>
  )
}
