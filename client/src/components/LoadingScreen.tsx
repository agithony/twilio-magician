import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

type Phase = "curtains" | "loading" | "done";

const LOADING_DURATION = 4500; // ms for progress bar to fill

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>("curtains");
  const hasTriggered = useRef(false);

  const triggerOpen = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setPhase("loading");
  }, []);

  // Dismiss after loading progress completes
  useEffect(() => {
    if (phase === "loading") {
      const t = window.setTimeout(() => {
        setPhase("done");
        onComplete();
      }, LOADING_DURATION);
      return () => window.clearTimeout(t);
    }
  }, [phase, onComplete]);

  const curtainsOpen = phase === "loading" || phase === "done";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-magic-dark"
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Center content — appears as curtains open */}
      <AnimatePresence>
        {curtainsOpen && phase !== "done" && (
          <motion.div
            className="relative h-full flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative flex flex-col items-center gap-8">
              {/* Animated card stack */}
              <div className="relative w-24 h-32">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-lg border border-magic-gold/30 bg-gradient-to-br from-magic-deeper to-magic-dark overflow-hidden"
                    initial={{ rotate: 0, y: 0, opacity: 0, scale: 0.8 }}
                    animate={{
                      rotate: [0, (i - 2) * 18, 0],
                      y: [0, -30 + i * 3, 0],
                      opacity: [0, 1, 0.8],
                      scale: [0.8, 1, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-2 flex items-center justify-center">
                      <span className="text-magic-gold text-2xl font-display">
                        {["A", "K", "Q", "J", "10"][i]}
                      </span>
                    </div>
                    <div className="absolute top-1 left-1.5 text-magic-gold/50 text-[10px]">
                      {["\u2660", "\u2665", "\u2666", "\u2663", "\u2660"][i]}
                    </div>
                    <div className="absolute inset-0 rounded-lg border border-magic-gold/10" />
                  </motion.div>
                ))}
              </div>

              {/* Loading text */}
              <motion.div className="text-center">
                <motion.h2
                  className="font-display text-2xl md:text-3xl magic-text-shimmer tracking-widest mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  The Twilio Magician
                </motion.h2>
                <motion.p
                  className="text-gray-500 text-sm tracking-[0.3em] uppercase"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Preparing the Stage...
                </motion.p>
              </motion.div>

              {/* Progress sparkle line */}
              <div className="w-56 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-magic-purple via-magic-gold to-magic-twilio rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: LOADING_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                  style={{ boxShadow: "0 0 10px #F59E0B, 0 0 20px #7C3AED" }}
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: LOADING_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CURTAINS ===== */}

      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 curtain-left z-20"
        initial={{ x: 0 }}
        animate={curtainsOpen ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-y-0"
              style={{
                left: `${i * 25}%`,
                width: "25%",
                background: `linear-gradient(90deg, rgba(0,0,0,${0.1 + i * 0.05}), transparent, rgba(0,0,0,${0.1 + i * 0.05}))`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 w-4 h-24 bg-gradient-to-b from-magic-gold/40 to-transparent" />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 curtain-right z-20"
        initial={{ x: 0 }}
        animate={curtainsOpen ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-y-0"
              style={{
                left: `${i * 25}%`,
                width: "25%",
                background: `linear-gradient(90deg, rgba(0,0,0,${0.1 + i * 0.05}), transparent, rgba(0,0,0,${0.1 + i * 0.05}))`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-4 h-24 bg-gradient-to-b from-magic-gold/40 to-transparent" />
      </motion.div>

      {/* Top valance */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-8 z-30"
        style={{
          background: "linear-gradient(180deg, #2d1052, #1a0a2e)",
          borderBottom: "2px solid rgba(217, 119, 6, 0.3)",
        }}
        animate={curtainsOpen ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
          <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,0 Q5,10 10,0 Q15,10 20,0 Q25,10 30,0 Q35,10 40,0 Q45,10 50,0 Q55,10 60,0 Q65,10 70,0 Q75,10 80,0 Q85,10 90,0 Q95,10 100,0"
              fill="none"
              stroke="rgba(217,119,6,0.3)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </motion.div>

      {/* ===== CENTER HOVER ZONE + VISUAL CUE ===== */}
      {phase === "curtains" && (
        <div
          className="absolute inset-y-0 z-30 flex items-center justify-center cursor-pointer"
          style={{ left: "calc(50% - 60px)", width: "120px" }}
          onMouseEnter={triggerOpen}
          onClick={triggerOpen}
          role="button"
          tabIndex={0}
          aria-label="Open the curtains"
          onKeyDown={(e) => e.key === "Enter" && triggerOpen()}
        >
          {/* Pulsing golden glow line at the seam */}
          <motion.div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px]"
            style={{
              background: "linear-gradient(180deg, transparent 5%, rgba(217,119,6,0.5) 30%, rgba(251,191,36,0.7) 50%, rgba(217,119,6,0.5) 70%, transparent 95%)",
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              boxShadow: [
                "0 0 8px rgba(217,119,6,0.3), 0 0 20px rgba(217,119,6,0.1)",
                "0 0 16px rgba(217,119,6,0.6), 0 0 40px rgba(217,119,6,0.3)",
                "0 0 8px rgba(217,119,6,0.3), 0 0 20px rgba(217,119,6,0.1)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Wand icon + hint text */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3 pointer-events-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Wand SVG */}
            <svg
              viewBox="0 0 32 32"
              className="w-8 h-8 text-magic-gold drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M5 27L22 10" strokeLinecap="round" />
              <path d="M22 10l2-2" strokeLinecap="round" strokeWidth={2.5} />
              <path d="M26 4l0-3M26 4l2.5 1M26 4l-2.5 1M26 4l1.5-2.5M26 4l-1.5-2.5" strokeLinecap="round" strokeWidth={1} opacity={0.7} />
            </svg>

            {/* Hint text */}
            <motion.span
              className="text-magic-gold/70 text-[11px] tracking-[0.25em] uppercase font-body whitespace-nowrap"
              style={{ textShadow: "0 0 12px rgba(217,119,6,0.4)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Wave to Begin
            </motion.span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
