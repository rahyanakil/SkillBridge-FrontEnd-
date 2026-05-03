"use client";

import { Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AISearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AISearchBox({ value, onChange, placeholder = "Search courses..." }: AISearchBoxProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch AI suggestions with debounce
  useEffect(() => {
    if (value.trim().length < 2) { setSuggestions([]); return; }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoadingSuggestions(true);
      try {
        const res = await fetch("/api/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: value }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (Array.isArray(data)) setSuggestions(data);
      } catch {
        // abort or error — ignore
      } finally {
        setLoadingSuggestions(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [value]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative flex-1">
      {/* Input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setShowSuggestions(true); }}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-10 rounded-2xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 text-sm text-slate-800 bg-white placeholder-slate-300 focus:outline-none transition-all"
          suppressHydrationWarning
        />
        {value && (
          <button
            onClick={() => { onChange(""); setSuggestions([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {loadingSuggestions && !value.length && (
          <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-400 animate-pulse" />
        )}
      </div>

      {/* Suggestion dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-black/10 z-50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-50">
            <Sparkles className="w-3 h-3 text-violet-500" />
            <span className="text-[10px] font-black text-violet-500 uppercase tracking-wider">AI Suggestions</span>
          </div>
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onMouseDown={(e) => { e.preventDefault(); onChange(suggestion); setShowSuggestions(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
