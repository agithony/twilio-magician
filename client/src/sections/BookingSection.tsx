import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { siteConfig } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useReducedMotion } from "../hooks/useReducedMotion";

function RitualCircle() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer circle */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full border border-magic-purple/10"
        style={{
          animation: prefersReducedMotion ? "none" : "ritualSpin 30s linear infinite",
        }}
      >
        {/* Symbols around the circle */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          const symbols = ["\u2660", "\u2605", "\u2665", "\u2736", "\u2666", "\u2606", "\u2663", "\u2737"];
          return (
            <span
              key={i}
              className="absolute text-magic-gold/15 text-lg"
              style={{
                left: `${50 + Math.cos(angle) * 48}%`,
                top: `${50 + Math.sin(angle) * 48}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {symbols[i]}
            </span>
          );
        })}
      </div>

      {/* Middle circle */}
      <div
        className="absolute w-[350px] h-[350px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-magic-gold/10"
        style={{
          animation: prefersReducedMotion ? "none" : "ritualSpin 20s linear infinite reverse",
        }}
      />

      {/* Inner circle */}
      <div
        className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border border-magic-purple/15"
        style={{
          animation: prefersReducedMotion ? "none" : "ritualSpin 15s linear infinite",
        }}
      />

      {/* Center glow */}
      <div className="absolute w-32 h-32 rounded-full bg-magic-purple/5 blur-xl" />
    </div>
  );
}

function FloatingElement({ delay, x, y, children }: { delay: number; x: string; y: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute text-2xl opacity-20"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function BookingSection() {
  const contentRef = useScrollAnimation<HTMLDivElement>("scaleIn");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionWrapper id="booking">
      <div className="relative">
        {/* Ritual circle background */}
        <RitualCircle />

        {/* Floating decorative elements */}
        <FloatingElement delay={0} x="5%" y="20%">{"\u2660"}</FloatingElement>
        <FloatingElement delay={0.5} x="90%" y="15%">{"\u2665"}</FloatingElement>
        <FloatingElement delay={1} x="8%" y="75%">{"\u2666"}</FloatingElement>
        <FloatingElement delay={1.5} x="88%" y="70%">{"\u2663"}</FloatingElement>
        <FloatingElement delay={0.8} x="15%" y="45%">{"\u2605"}</FloatingElement>
        <FloatingElement delay={1.2} x="85%" y="50%">{"\u2606"}</FloatingElement>

        <div ref={contentRef} className="relative max-w-3xl mx-auto text-center z-10">
          {/* Decorative glow behind card */}
          <div className="absolute inset-0 -m-12 rounded-[40px] bg-gradient-to-br from-magic-purple/5 via-transparent to-magic-gold/5 blur-2xl" />

          <div className="relative glass-card rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div className="absolute top-4 left-4 w-8 h-px bg-gradient-to-r from-magic-gold/40 to-transparent" />
              <div className="absolute top-4 left-4 w-px h-8 bg-gradient-to-b from-magic-gold/40 to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20">
              <div className="absolute top-4 right-4 w-8 h-px bg-gradient-to-l from-magic-gold/40 to-transparent" />
              <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-magic-gold/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20">
              <div className="absolute bottom-4 left-4 w-8 h-px bg-gradient-to-r from-magic-gold/40 to-transparent" />
              <div className="absolute bottom-4 left-4 w-px h-8 bg-gradient-to-t from-magic-gold/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <div className="absolute bottom-4 right-4 w-8 h-px bg-gradient-to-l from-magic-gold/40 to-transparent" />
              <div className="absolute bottom-4 right-4 w-px h-8 bg-gradient-to-t from-magic-gold/40 to-transparent" />
            </div>

            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-magic-gold/[0.02] via-transparent to-magic-purple/[0.02]" />

            {/* Hat & wand icon */}
            <div className="relative mb-8">
              <motion.div
                className="inline-block"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative">
                  <svg viewBox="0 0 80 80" className="w-20 h-20 mx-auto" fill="none">
                    {/* Top hat */}
                    <rect x="22" y="20" width="36" height="30" rx="2" fill="url(#hatGrad)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
                    <rect x="16" y="48" width="48" height="6" rx="3" fill="url(#hatGrad)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
                    <rect x="22" y="45" width="36" height="5" rx="1" fill="rgba(217,119,6,0.3)" />
                    {/* Wand */}
                    <line x1="56" y1="30" x2="72" y2="14" stroke="rgba(226,232,240,0.6)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="68" y1="18" x2="72" y2="14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    {/* Sparkles from wand */}
                    <circle cx="74" cy="10" r="1.5" fill="#F59E0B" opacity="0.8" />
                    <circle cx="70" cy="8" r="1" fill="#7C3AED" opacity="0.6" />
                    <circle cx="76" cy="14" r="1" fill="#F59E0B" opacity="0.6" />
                    {/* Stars */}
                    <path d="M30 25l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3L26 28h3z" fill="rgba(217,119,6,0.3)" />
                    <defs>
                      <linearGradient id="hatGrad" x1="22" y1="20" x2="58" y2="54">
                        <stop offset="0%" stopColor="#1a103a" />
                        <stop offset="100%" stopColor="#12101f" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-magic-gold/30" />
              <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">Summon the Magician</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-magic-gold/30" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl magic-text-gradient mb-6">
              Book the Show
            </h2>

            <p className="text-lg text-gray-300 mb-3 max-w-xl mx-auto leading-relaxed">
              Bring the magic to your next event. From intimate private
              gatherings to massive conferences like SIGNAL.
            </p>

            <p className="text-gray-500 mb-10 text-sm">
              Fill out the booking form and I&apos;ll get back to you to discuss
              how we can make your event unforgettable.
            </p>

            {/* CTA Button with extra magic */}
            <div className="relative inline-block">
              <motion.a
                href={siteConfig.airtableFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-magic-gold to-magic-gold-light text-magic-dark font-bold text-lg rounded-full transition-all duration-300 overflow-hidden group"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(217,119,6,0.4), 0 0 80px rgba(217,119,6,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Request My Services</span>
                <svg viewBox="0 0 20 20" className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.a>

              {/* Sparkle particles around button on hover */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-magic-gold"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          y: [0, -20 - Math.random() * 20],
                          x: [(Math.random() - 0.5) * 30],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
              {["Corporate Events", "Conferences", "Trade Shows", "Private Gatherings"].map((type) => (
                <span key={type} className="text-xs text-gray-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-magic-gold/40" />
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

