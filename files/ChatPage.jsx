import ChatLayout from '../layouts/ChatLayout'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'

/**
 * ChatPage — the main AI chat interface.
 * Composes the layout shell, scrollable message area, and input bar.
 */
export default function ChatPage() {
  return (
    <ChatLayout>
      {/* Fill remaining height with flex column */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Scrollable messages area */}
        <ChatWindow />
        {/* Fixed-height input bar */}
        <ChatInput />
      </div>
    </ChatLayout>
  )
}
