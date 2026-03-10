import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, MessageSquare, Trash2, Settings,
  LogOut, ChevronLeft, ChevronRight, Sparkles, User,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'

/**
 * Sidebar — left navigation panel for the chat layout.
 * Features: new chat, conversation list, settings, user profile.
 */
export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const { conversations, activeConvId, newChat, selectConversation, deleteConversation } = useChat()
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState(null)

  const handleNewChat = () => {
    newChat()
    navigate('/chat')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const formatTime = (ts) => {
    const now = Date.now()
    const diff = now - ts
    if (diff < 60_000) return 'Just now'
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <aside
      className={`
        relative flex flex-col h-full bg-panel border-r border-border sidebar-transition
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between p-4 border-b border-border/60">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-md shadow-accent/30">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-syne font-bold text-sm text-white">
              Aidora<span className="text-accent">AI</span>
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`
            w-7 h-7 rounded-lg bg-surface hover:bg-muted border border-border
            flex items-center justify-center text-silver hover:text-white transition-all
            ${collapsed ? 'mx-auto' : ''}
          `}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* ── New Chat ── */}
      <div className="p-3">
        <button
          onClick={handleNewChat}
          className={`
            w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl
            bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40
            text-accent text-sm font-dm font-medium transition-all duration-200 group
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <Plus size={16} className="flex-shrink-0 group-hover:rotate-90 transition-transform duration-200" />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* ── Conversations ── */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {!collapsed && conversations.length > 0 && (
          <p className="px-2 py-1.5 text-xs font-dm text-ghost uppercase tracking-wider">
            Recents
          </p>
        )}

        {conversations.length === 0 && !collapsed ? (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <MessageSquare size={24} className="text-ghost mb-2" />
            <p className="text-silver text-xs font-dm">No conversations yet</p>
            <p className="text-ghost text-xs font-dm mt-1">Start a new chat above</p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <div
                  className={`
                    relative flex items-center gap-2 px-2 py-2 rounded-xl cursor-pointer
                    transition-all duration-150 group
                    ${activeConvId === conv.id
                      ? 'bg-accent/15 text-white'
                      : 'text-silver hover:bg-surface hover:text-cloud'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  onClick={() => { selectConversation(conv.id); navigate('/chat') }}
                  onMouseEnter={() => setHoveredId(conv.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <MessageSquare
                    size={15}
                    className={`flex-shrink-0 ${activeConvId === conv.id ? 'text-accent' : 'text-ghost group-hover:text-silver'}`}
                  />
                  {!collapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-dm truncate leading-tight">
                          {conv.title || 'Untitled Chat'}
                        </p>
                        <p className="text-xs text-ghost truncate mt-0.5">
                          {formatTime(conv.updatedAt)}
                        </p>
                      </div>
                      {/* Delete button - appears on hover */}
                      {hoveredId === conv.id && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id) }}
                          className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-ghost hover:text-ember hover:bg-ember-dim transition-all"
                          aria-label="Delete conversation"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Footer: Settings + User ── */}
      <div className="border-t border-border/60 p-3 space-y-1">
        {/* Settings */}
        <button
          className={`
            w-full flex items-center gap-2.5 px-3 py-2 rounded-xl
            text-silver hover:text-white hover:bg-surface text-sm font-dm transition-all
            ${collapsed ? 'justify-center' : ''}
          `}
          aria-label="Settings"
        >
          <Settings size={16} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* User profile */}
        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-dm text-white truncate leading-tight">{user?.name ?? 'User'}</p>
              <p className="text-xs text-ghost truncate">{user?.email ?? ''}</p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-ghost hover:text-ember hover:bg-ember-dim transition-all"
              aria-label="Log out"
            >
              <LogOut size={13} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
