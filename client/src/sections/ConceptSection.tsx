import { useState, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { conceptContent } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const icons: Record<string, ReactNode> = {
  wand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5" strokeLinecap="round" />
      <path d="M15 12a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M12 21l-6.5-6.5" strokeLinecap="round" />
      <path d="M3 21l2-2" strokeLinecap="round" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" strokeLinejoin="round" />
      <path d="M19 15l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z" strokeLinejoin="round" />
    </svg>
  ),
};

function FeatureCard({ feature, index }: { feature: typeof conceptContent.features[0]; index: number }) {
  const [hoverTilt, setHoverTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoverTilt({ x: y * -6, y: x * 6 });
  };

  const handleMouseLeave = () => setHoverTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="group"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="glass-card rounded-2xl p-8 text-center h-full relative overflow-hidden transition-all duration-200"
        style={{
          transform: `rotateX(${hoverTilt.x}deg) rotateY(${hoverTilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background accent on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/0 to-magic-gold/0 group-hover:from-magic-purple/5 group-hover:to-magic-gold/5 transition-all duration-500" />

        {/* Top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-magic-gold/0 to-transparent group-hover:via-magic-gold/40 transition-all duration-500" />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-magic-purple/10 border border-magic-purple/20 flex items-center justify-center text-magic-gold group-hover:bg-magic-purple/20 group-hover:border-magic-gold/30 transition-all duration-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icons[feature.icon]}
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-white mb-4">{feature.title}</h3>
          <p className="text-gray-400 leading-relaxed">{feature.description}</p>
        </div>

        {/* Number indicator */}
        <div className="absolute bottom-4 right-4 text-[80px] font-display font-bold text-white/[0.02] leading-none">
          {index + 1}
        </div>
      </div>
    </div>
  );
}

export default function ConceptSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.2 });

  return (
    <SectionWrapper id="concept" dark>
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">The Concept</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          {conceptContent.headline}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{conceptContent.description}</p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
        {conceptContent.features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
