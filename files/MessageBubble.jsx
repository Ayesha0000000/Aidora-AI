import { useState } from 'react'
import { Copy, Check, Sparkles, User } from 'lucide-react'
import Loader from '../common/Loader'

/**
 * MessageBubble — renders a single chat message.
 * Handles: user messages, AI responses, loading state, copy-to-clipboard.
 */
export default function MessageBubble({ message }) {
  const { role, content, loading } = message
  const isUser = role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }

  /** Simple Markdown-like renderer for AI responses */
  const renderContent = (text) => {
    if (!text) return null
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g)
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const lines = part.slice(3).split('\n')
        const lang = lines[0]
        const code = lines.slice(1, -1).join('\n')
        return (
          <pre key={i} className="my-3 rounded-xl bg-ink border border-border overflow-x-auto">
            {lang && (
              <div className="px-4 py-1.5 border-b border-border text-xs text-ghost font-mono">
                {lang}
              </div>
            )}
            <code className="block px-4 py-3 text-sm text-cloud font-mono leading-relaxed">{code}</code>
          </pre>
        )
      }
      // Inline formatting
      return (
        <span key={i}>
          {part.split('\n').map((line, j, arr) => {
            const formatted = line
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`(.*?)`/g, '<code class="bg-ink border border-border/50 rounded px-1 py-0.5 text-accent text-sm font-mono">$1</code>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')

            const isListItem = line.match(/^[-•]\s/)
            const isNumberedItem = line.match(/^\d+\.\s/)

            return (
              <span key={j}>
                {isListItem || isNumberedItem
                  ? <span className="flex gap-2 my-0.5">
                      <span className="text-accent mt-0.5 flex-shrink-0">
                        {isListItem ? '·' : line.match(/^(\d+)\./)?.[1] + '.'}
                      </span>
                      <span dangerouslySetInnerHTML={{
                        __html: line.replace(/^[-•]\s|^\d+\.\s/, '')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/`(.*?)`/g, '<code class="bg-ink border border-border/50 rounded px-1 py-0.5 text-accent text-sm font-mono">$1</code>')
                      }} />
                    </span>
                  : <span dangerouslySetInnerHTML={{ __html: formatted }} />
                }
                {j < arr.length - 1 && !isListItem && !isNumberedItem && <br />}
              </span>
            )
          })}
        </span>
      )
    })
  }

  if (isUser) {
    return (
      <div className="flex justify-end px-4 md:px-8 animate-fade-up">
        <div className="max-w-[75%] md:max-w-[60%]">
          <div className="bg-accent text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-lg shadow-accent/10">
            <p className="text-sm font-dm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      </div>
    )
  }

  // AI message
  return (
    <div className="flex gap-3 px-4 md:px-8 animate-fade-up group">
      {/* AI Avatar */}
      <div className="flex-shrink-0 mt-1">
        <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center">
          <Sparkles size={13} className="text-accent" />
        </div>
      </div>

      {/* Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-dm font-medium text-accent">Aidora</span>
        </div>

        <div className="bg-surface border border-border/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          {loading ? (
            <div className="flex items-center gap-2 py-1">
              <Loader variant="dots" />
              <span className="text-xs text-ghost font-dm">Thinking…</span>
            </div>
          ) : (
            <div className="text-sm font-dm text-cloud leading-relaxed">
              {renderContent(content)}
            </div>
          )}
        </div>

        {/* Copy button — visible on hover */}
        {!loading && content && (
          <div className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-ghost hover:text-silver hover:bg-surface text-xs font-dm transition-all"
              aria-label="Copy message"
            >
              {copied
                ? <><Check size={11} className="text-green-400" /> Copied</>
                : <><Copy size={11} /> Copy</>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
