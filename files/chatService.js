import api from './api'

/**
 * chatService — handles all AI chat API communication.
 *
 * Expected backend endpoint:
 *   POST /api/chat/message → { message: string }
 *   Body: { message: string, history: Array<{ role, content }> }
 */
export const chatService = {
  /**
   * Send a message with conversation history.
   * Returns the AI's response string.
   */
  async sendMessage(message, history = []) {
    // ── Mock mode when no backend is configured ──────────────────
    if (import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL) {
      return mockResponse(message)
    }

    const { data } = await api.post('/chat/message', { message, history })
    // Normalise: backend may return { message } or { response } or a plain string
    return data?.message ?? data?.response ?? data ?? 'No response from server.'
  },

  /**
   * Fetch conversation history from the server (optional feature).
   */
  async getHistory(conversationId) {
    const { data } = await api.get(`/chat/history/${conversationId}`)
    return data?.messages ?? []
  },
}

// ── Realistic mock responses for development ─────────────────────────────────
const MOCK_RESPONSES = [
  "That's a fascinating question! Let me think through this carefully.\n\nBased on what you've asked, I'd approach this by breaking it into key components. First, it's important to consider the foundational principles at play here. Then we can build up to a more nuanced answer that addresses your specific needs.\n\nIs there a particular aspect you'd like me to dive deeper into?",
  "Great point. Here's how I'd look at it:\n\n**Key insight:** The core of this topic hinges on a few critical factors that are often overlooked.\n\n1. **Context matters** — the answer changes significantly depending on your situation.\n2. **Trade-offs exist** — every approach has pros and cons worth weighing.\n3. **Iteration helps** — start simple, then refine as you gather more information.\n\nLet me know if you'd like a deeper breakdown of any of these!",
  "I can help with that! Here's a concise breakdown:\n\nThe concept you're asking about has evolved significantly over time. At its core, it represents a shift in how we think about the underlying problem.\n\nFrom a practical standpoint, the most effective approach is to start with the fundamentals and work outward. This ensures you have a solid foundation before tackling more complex scenarios.\n\nWould you like me to walk through a specific example?",
  "Absolutely! This is one of my favorite topics to explore.\n\nThe short answer is: it depends on what you're optimizing for. But let me give you a more nuanced take:\n\n- If you prioritize **speed**, approach A is your best bet.\n- If you prioritize **scalability**, approach B offers more headroom.\n- If you need a **balanced solution**, a hybrid of both tends to work well in practice.\n\nWhat's your primary constraint?",
  "Good question. Let me break this down step by step.\n\nFirst, it's worth understanding *why* this matters. The root cause often traces back to how the system was originally designed — optimized for earlier constraints that no longer apply.\n\nThe modern solution addresses this by:\n1. Rethinking the initial assumptions\n2. Applying updated best practices\n3. Building in flexibility for future changes\n\nHappy to elaborate on any of these steps!",
]

let mockIdx = 0
async function mockResponse(message) {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))

  // Acknowledge the user's message
  const lc = message.toLowerCase()
  if (lc.includes('hello') || lc.includes('hi') || lc.includes('hey')) {
    return "Hey there! 👋 I'm Aidora, your AI assistant. I'm here to help you think through problems, answer questions, write code, draft content, and much more. What's on your mind?"
  }
  if (lc.includes('who are you') || lc.includes('what are you')) {
    return "I'm **Aidora** — an intelligent AI assistant built to help you work smarter. I can help with research, writing, coding, analysis, brainstorming, and complex reasoning tasks.\n\nThink of me as a knowledgeable collaborator available 24/7. What would you like to explore together?"
  }
  if (lc.includes('thank')) {
    return "You're very welcome! That's what I'm here for. Is there anything else I can help you with? 😊"
  }

  const response = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length]
  mockIdx++
  return response
}
