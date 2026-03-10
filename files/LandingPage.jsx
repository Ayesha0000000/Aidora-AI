import { useNavigate } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Zap, Shield, Globe,
  Brain, MessageSquare, Code2, ChevronRight
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  {
    icon: Brain,
    title: 'Deep Reasoning',
    desc: 'Handles complex multi-step problems with nuanced, contextual understanding.',
    color: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
  {
    icon: Code2,
    title: 'Code Generation',
    desc: 'Write, debug, and explain code across 50+ programming languages.',
    color: 'from-blue-500/15 to-blue-500/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    desc: 'Communicate fluently in over 100 languages with cultural sensitivity.',
    color: 'from-green-500/15 to-green-500/5',
    iconColor: 'text-green-400',
  },
  {
    icon: Shield,
    title: 'Private & Safe',
    desc: 'Your conversations are secure. We never share your data with third parties.',
    color: 'from-ember/15 to-ember/5',
    iconColor: 'text-ember',
  },
]

const STATS = [
  { value: '10M+', label: 'Queries answered' },
  { value: '99.9%', label: 'Uptime' },
  { value: '50+', label: 'Languages' },
  { value: '< 1s', label: 'Response time' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleStart = () => navigate(isAuthenticated ? '/chat' : '/signup')

  return (
    <div className="min-h-screen mesh-bg noise text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        {/* Ambient glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />
        <div className="absolute top-2/3 left-1/4 w-64 h-64 rounded-full bg-ember/5 blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-dm mb-8">
          <Sparkles size={14} />
          <span>Next-generation AI assistant</span>
          <ChevronRight size={13} />
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100 font-syne text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl mb-6">
          Think smarter with{' '}
          <span className="grad-text glow-text">Aidora AI</span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up delay-200 text-silver font-dm text-lg md:text-xl max-w-xl leading-relaxed mb-10">
          An intelligent AI assistant that understands context, reasons through complexity,
          and helps you create — faster than ever before.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={handleStart}
            className="
              group flex items-center gap-2.5 px-8 py-4 rounded-2xl
              bg-accent hover:bg-accent-light text-white font-dm font-semibold text-base
              transition-all duration-300 shadow-2xl shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1
              glow-accent
            "
          >
            Start for free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="
              flex items-center gap-2 px-6 py-4 rounded-2xl
              border border-border hover:border-muted bg-transparent text-silver hover:text-white
              font-dm text-base transition-all duration-200
            "
          >
            Sign in
          </button>
        </div>

        {/* Chat preview card */}
        <div className="animate-fade-up delay-400 w-full max-w-2xl mx-auto">
          <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Fake window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-ember/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs text-ghost font-dm">Aidora AI — Chat</span>
            </div>
            {/* Preview messages */}
            <div className="p-5 space-y-4">
              <div className="flex justify-end">
                <div className="bg-accent text-white text-sm font-dm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">
                  Can you help me write a Python function to parse JSON?
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={13} className="text-accent" />
                </div>
                <div className="bg-surface border border-border/60 text-sm font-dm text-cloud px-4 py-3 rounded-2xl rounded-tl-sm max-w-sm">
                  Of course! Here's a clean and safe approach:
                  <pre className="mt-2 text-xs bg-ink rounded-lg p-3 text-green-300 overflow-x-auto">
{`import json

def parse_json(data: str) -> dict:
    try:
        return json.loads(data)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON: {e}")`}
                  </pre>
                </div>
              </div>
              {/* Typing indicator */}
              <div className="flex gap-3 items-center">
                <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={13} className="text-accent" />
                </div>
                <div className="bg-surface border border-border/60 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-syne text-4xl font-bold text-white mb-1">{value}</p>
              <p className="text-silver text-sm font-dm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne text-4xl font-bold text-white mb-3">
              Built for <span className="grad-text">every task</span>
            </h2>
            <p className="text-silver font-dm max-w-lg mx-auto">
              From quick answers to deep research — Aidora adapts to what you need.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-panel border border-border hover:border-muted transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <h3 className="font-syne text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-silver text-sm font-dm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-accent/15 via-panel to-panel border border-accent/20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <Sparkles size={36} className="text-accent mx-auto mb-4" />
            <h2 className="font-syne text-4xl font-bold text-white mb-4">
              Ready to think smarter?
            </h2>
            <p className="text-silver font-dm mb-8">
              Join thousands of people using Aidora to work, learn, and create.
            </p>
            <button
              onClick={handleStart}
              className="
                group inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                bg-accent hover:bg-accent-light text-white font-dm font-semibold
                transition-all duration-200 shadow-xl shadow-accent/30
                hover:shadow-accent/50 hover:-translate-y-px
              "
            >
              Get started — it's free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-ghost text-sm font-dm">
          © {new Date().getFullYear()} Aidora AI. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
