"use client";

import { askAITutor } from "@/services/ai.service";
import { BotMessageSquare, Clock, Loader2, LogIn, Minimize2, Send, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const COOLDOWN_SECONDS = 5;

const WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm your AI Tutor on SkillBridge. Ask me anything — I'll guide you step-by-step.",
};

const GUEST_WELCOME: Message = {
  role: "assistant",
  content: "Hi! I'm your AI Tutor. Sign in to start asking me anything about your courses and learning goals.",
};

function Avatar() {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
      <BotMessageSquare className="w-3.5 h-3.5 text-white" />
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Avatar />}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-violet-600 text-white rounded-br-sm"
            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 justify-start">
      <Avatar />
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-3.5 py-3 shadow-sm">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}

function GuestPrompt() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-8 bg-slate-50 dark:bg-slate-950">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 flex items-center justify-center">
        <BotMessageSquare className="w-8 h-8 text-violet-600" />
      </div>
      <div className="text-center space-y-1.5">
        <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Sign in to chat</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Get personalised tutoring, step-by-step guidance, and instant answers — powered by Llama 3.3.
        </p>
      </div>
      <Link
        href="/login"
        className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-violet-500/25"
      >
        <LogIn className="w-3.5 h-3.5" />
        Sign in to continue
      </Link>
    </div>
  );
}

export default function AIChatbot({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([isLoggedIn ? WELCOME : GUEST_WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  useEffect(() => {
    if (open && isLoggedIn) inputRef.current?.focus();
  }, [open, isLoggedIn]);

  const startCooldown = useCallback(() => {
    setCooldown(COOLDOWN_SECONDS);
    cooldownRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => { if (cooldownRef.current) clearInterval(cooldownRef.current); }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading || cooldown > 0) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAITutor(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      startCooldown();
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const canSend = input.trim().length > 0 && !loading && cooldown === 0;

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex flex-col w-[360px] sm:w-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          style={{ height: 520, animation: "chatSlideUp 0.22s ease-out both" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <BotMessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">AI Tutor</p>
              <p className="text-violet-200 text-[10px]">
                {loading ? "Thinking…" : "Powered by Llama 3.3 · SkillBridge"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Minimise"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {!isLoggedIn ? (
            <GuestPrompt />
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50 dark:bg-slate-950">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} />
                ))}
                {loading && <TypingIndicator />}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-3 py-3 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 shrink-0 space-y-2">
                {cooldown > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-semibold px-1">
                    <Clock className="w-3 h-3" />
                    Next message in {cooldown}s…
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder={cooldown > 0 ? `Please wait ${cooldown}s…` : "Ask your tutor anything…"}
                    disabled={loading || cooldown > 0}
                    suppressHydrationWarning
                    className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400 disabled:opacity-60 transition-colors"
                  />
                  <button
                    onClick={send}
                    disabled={!canSend}
                    aria-label="Send"
                    className="w-9 h-9 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
                  >
                    {loading ? (
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                    ) : cooldown > 0 ? (
                      <Clock className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle button — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI Tutor" : "Open AI Tutor"}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-500/40 flex items-center justify-center transition-all active:scale-95 relative"
      >
        {open ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <>
            <BotMessageSquare className="w-6 h-6 text-white" />
            <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
          </>
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body,
  );
}
