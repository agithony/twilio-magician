import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { tricks } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const CARD_EMOJIS = ["\u2660", "\u2665", "\u2666", "\u2663", "\u2660", "\u2665"];
const CARD_VALUES = ["A", "K", "Q", "J", "10", "9"];
const CARD_COLORS = ["#e2e8f0", "#DC2626", "#DC2626", "#e2e8f0", "#e2e8f0", "#DC2626"];

function SparkleExplosion({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: i % 2 === 0 ? "#D97706" : "#7C3AED",
            boxShadow: `0 0 6px ${i % 2 === 0 ? "#D97706" : "#7C3AED"}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 80,
            y: Math.sin((i / 8) * Math.PI * 2) * 80,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function TrickCard({ trick, index }: { trick: (typeof tricks)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [sparkle, setSparkle] = useState(false);
  const [hoverTilt, setHoverTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 700);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setHoverTilt({ x: 0, y: 0 });
  };

  const suit = CARD_EMOJIS[index];
  const value = CARD_VALUES[index];
  const suitColor = CARD_COLORS[index];

  return (
    <div
      ref={cardRef}
      className="relative h-[420px] cursor-pointer group"
      style={{ perspective: "1200px" }}
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      aria-label={`${trick.name} - click to ${flipped ? "see front" : "see details"}`}
    >
      <SparkleExplosion active={sparkle} />

      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg) rotateX(${hoverTilt.x}deg) rotateY(${hoverTilt.y}deg)`,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full glass-card rounded-2xl relative overflow-hidden">
            {/* Card decorative header - playing card style */}
            <div className="relative h-44 bg-gradient-to-br from-magic-deeper via-magic-purple/5 to-magic-deeper overflow-hidden">
              {/* Suit watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[100px] opacity-[0.04]" style={{ color: suitColor }}>
                  {suit}
                </span>
              </div>
              {/* Corner indicators */}
              <div className="absolute top-3 left-4 text-left">
                <div className="text-lg font-bold leading-none" style={{ color: suitColor }}>
                  {value}
                </div>
                <div className="text-sm leading-none mt-0.5" style={{ color: suitColor }}>
                  {suit}
                </div>
              </div>
              <div className="absolute bottom-3 right-4 text-right rotate-180">
                <div className="text-lg font-bold leading-none" style={{ color: suitColor }}>
                  {value}
                </div>
                <div className="text-sm leading-none mt-0.5" style={{ color: suitColor }}>
                  {suit}
                </div>
              </div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl" style={{ color: suitColor, opacity: 0.3 }}>
                  {suit}
                </div>
              </div>
              {/* Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-magic-twilio/30 to-transparent" />
                <span className="text-[10px] font-medium text-magic-twilio tracking-[0.2em] uppercase">
                  {trick.twilioProduct}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-magic-twilio/30 to-transparent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{trick.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{trick.description}</p>
            </div>

            {/* Click to flip hint */}
            <div className="absolute bottom-4 right-5 flex items-center gap-1.5 text-[10px] text-gray-600 group-hover:text-magic-gold/60 transition-colors">
              <span>Flip to reveal</span>
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M2 8h12M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full glass-card-gold rounded-2xl p-8 flex flex-col justify-center relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-magic-gold/[0.03] to-magic-purple/[0.03]" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-magic-gold/5 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-magic-purple/5 to-transparent rounded-tr-full" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-magic-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5" strokeLinecap="round" />
                  <circle cx="15" cy="9" r="3" />
                  <path d="M12 21l-6.5-6.5M3 21l2-2" strokeLinecap="round" />
                </svg>
                <span className="text-[10px] font-medium text-magic-gold tracking-[0.2em] uppercase">
                  Behind the Magic
                </span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">{trick.name}</h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">{trick.techExplanation}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-magic-twilio/10 border border-magic-twilio/20">
                <div className="w-2 h-2 rounded-full bg-magic-twilio animate-pulse" />
                <span className="text-magic-twilio text-xs font-medium">
                  Powered by {trick.twilioProduct}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TricksSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.12 });

  return (
    <SectionWrapper id="tricks">
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[11px] tracking-[0.3em] uppercase">The Collection</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          The Repertoire
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Each trick is a fusion of classical magic and cutting-edge technology.
          Click a card to reveal the Twilio magic behind it.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tricks.map((trick, i) => (
          <TrickCard key={trick.id} trick={trick} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
