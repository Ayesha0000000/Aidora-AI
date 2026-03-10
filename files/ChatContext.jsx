import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { chatService } from '../services/chatService'

const ChatContext = createContext(null)

/** Helper: load conversations from localStorage */
const loadConversations = () => {
  try {
    const raw = localStorage.getItem('aidora_conversations')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Helper: persist conversations */
const saveConversations = (convs) => {
  try {
    // Keep only last 50 conversations to avoid storage bloat
    const trimmed = convs.slice(-50)
    localStorage.setItem('aidora_conversations', JSON.stringify(trimmed))
  } catch {/* storage full — silently skip */ }
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(loadConversations)
  const [activeConvId, setActiveConvId] = useState(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  /** Active conversation object */
  const activeConversation = conversations.find(c => c.id === activeConvId) ?? null

  /** Messages of active conversation */
  const messages = activeConversation?.messages ?? []

  /** Upsert a conversation and persist */
  const upsertConversation = useCallback((conv) => {
    setConversations(prev => {
      const idx = prev.findIndex(c => c.id === conv.id)
      const next = idx === -1
        ? [conv, ...prev]
        : prev.map(c => c.id === conv.id ? conv : c)
      saveConversations(next)
      return next
    })
  }, [])

  /** Create a brand new conversation and set it as active */
  const newChat = useCallback(() => {
    const conv = {
      id: uuid(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    upsertConversation(conv)
    setActiveConvId(conv.id)
    setError(null)
    return conv.id
  }, [upsertConversation])

  /** Switch to an existing conversation */
  const selectConversation = useCallback((id) => {
    setActiveConvId(id)
    setError(null)
  }, [])

  /** Delete a conversation */
  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const next = prev.filter(c => c.id !== id)
      saveConversations(next)
      return next
    })
    setActiveConvId(prev => prev === id ? null : prev)
  }, [])

  /**
   * Send a message in the current (or new) conversation.
   * Handles optimistic UI, API call, and streaming placeholder.
   */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || streaming) return
    setError(null)

    // Ensure there's an active conversation
    let convId = activeConvId
    if (!convId) {
      convId = uuid()
    }

    const userMsg = {
      id: uuid(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    const aiMsgId = uuid()
    const aiMsg = {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      loading: true,
    }

    // Optimistic update
    setConversations(prev => {
      const existing = prev.find(c => c.id === convId)
      const currentMessages = existing?.messages ?? []
      const conv = {
        id: convId,
        title: existing?.title ?? text.slice(0, 40),
        messages: [...currentMessages, userMsg, aiMsg],
        createdAt: existing?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
      }
      const idx = prev.findIndex(c => c.id === convId)
      const next = idx === -1 ? [conv, ...prev] : prev.map(c => c.id === convId ? conv : c)
      saveConversations(next)
      return next
    })
    setActiveConvId(convId)
    setStreaming(true)

    try {
      // Build history for context
      const history = (activeConversation?.messages ?? []).map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await chatService.sendMessage(text, history)

      // Replace loading placeholder with real response
      setConversations(prev => {
        const conv = prev.find(c => c.id === convId)
        if (!conv) return prev
        const next = prev.map(c => {
          if (c.id !== convId) return c
          return {
            ...c,
            updatedAt: Date.now(),
            messages: c.messages.map(m =>
              m.id === aiMsgId
                ? { ...m, content: response, loading: false }
                : m
            ),
          }
        })
        saveConversations(next)
        return next
      })
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message ?? 'Something went wrong. Please try again.')
      // Remove the loading AI bubble on error
      setConversations(prev => {
        const next = prev.map(c => {
          if (c.id !== convId) return c
          return { ...c, messages: c.messages.filter(m => m.id !== aiMsgId) }
        })
        saveConversations(next)
        return next
      })
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }, [activeConvId, activeConversation, streaming])

  /** Abort in-flight request */
  const cancelStream = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const value = {
    conversations,
    activeConvId,
    activeConversation,
    messages,
    streaming,
    error,
    newChat,
    selectConversation,
    deleteConversation,
    sendMessage,
    cancelStream,
    setError,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
