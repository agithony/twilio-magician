import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface MagicDividerProps {
  variant?: "wand" | "cards" | "stars" | "simple";
}

export default function MagicDivider({ variant = "wand" }: MagicDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!dividerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(dividerRef.current);
    return () => observer.disconnect();
  }, []);

  if (variant === "simple") {
    return <div className="magic-divider mx-auto max-w-2xl my-4" />;
  }

  return (
    <div
      ref={dividerRef}
      className="relative flex items-center justify-center py-8 overflow-hidden"
    >
      {/* Left line */}
      <div
        className="h-px flex-1 transition-all duration-1000 ease-out"
        style={{
          background: visible
            ? "linear-gradient(90deg, transparent, rgba(124,58,237,0.4))"
            : "transparent",
          maxWidth: visible ? "100%" : "0%",
        }}
      />

      {/* Center icon */}
      <div className="relative mx-6">
        {variant === "wand" && (
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {/* Wand */}
            <div className="relative">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  className="w-6 h-6 text-magic-gold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M5 27L22 10" strokeLinecap="round" />
                  <path d="M22 10l2-2" strokeLinecap="round" strokeWidth={2.5} />
                  {/* Sparkles at tip */}
                  <path d="M26 4l0-3M26 4l2.5 1M26 4l-2.5 1M26 4l1.5-2.5M26 4l-1.5-2.5" strokeLinecap="round" strokeWidth={1} opacity={0.7} />
                </svg>
              </div>
              {/* Sparkle particles */}
              {!prefersReducedMotion &&
                [0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-magic-gold"
                    style={{
                      top: "50%",
                      left: "50%",
                      animation: visible ? `wandSparkle 1.5s ${i * 0.2}s ease-out infinite` : "none",
                      transformOrigin: `${Math.cos((i / 5) * Math.PI * 2) * 20}px ${Math.sin((i / 5) * Math.PI * 2) * 20}px`,
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        {variant === "cards" && (
          <div
            className={`flex gap-1 transition-all duration-700 delay-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {["\u2660", "\u2665", "\u2666", "\u2663"].map((suit, i) => (
              <span
                key={suit}
                className={`text-lg transition-all duration-500 ${
                  suit === "\u2665" || suit === "\u2666" ? "text-red-500" : "text-gray-300"
                }`}
                style={{
                  transitionDelay: `${400 + i * 100}ms`,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0)",
                  opacity: visible ? 1 : 0,
                }}
              >
                {suit}
              </span>
            ))}
          </div>
        )}

        {variant === "stars" && (
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-180"
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-magic-gold" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
            </svg>
          </div>
        )}
      </div>

      {/* Right line */}
      <div
        className="h-px flex-1 transition-all duration-1000 ease-out"
        style={{
          background: visible
            ? "linear-gradient(90deg, rgba(217,119,6,0.4), transparent)"
            : "transparent",
          maxWidth: visible ? "100%" : "0%",
        }}
      />
    </div>
  );
}
