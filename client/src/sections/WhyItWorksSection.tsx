import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { whyItWorks } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const reasonIcons = [
  // Engagement - connected nodes
  <svg key="eng" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M12 8v3M9.5 16.5l-2.5 1M14.5 16.5l2.5 1" strokeLinecap="round" />
    <circle cx="12" cy="13" r="2" />
  </svg>,
  // Memorability - brain/star
  <svg key="mem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M12 2l2.4 4.8L20 8l-4 3.9.9 5.6L12 14.7l-4.9 2.8.9-5.6L4 8l5.6-1.2z" strokeLinejoin="round" />
  </svg>,
  // Education - lightbulb
  <svg key="edu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M9 21h6M12 3a6 6 0 014 10.5V17H8v-3.5A6 6 0 0112 3z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 17h4" strokeLinecap="round" />
  </svg>,
  // Versatility - expand
  <svg key="ver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function WhyItWorksSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.15 });

  return (
    <SectionWrapper id="why" dark>
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">The Secret</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          {whyItWorks.headline}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">{whyItWorks.description}</p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {whyItWorks.reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            className="glass-card rounded-2xl p-8 group relative overflow-hidden"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-magic-purple/[0.03] to-transparent rounded-bl-full group-hover:from-magic-purple/[0.06] transition-all duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-magic-gold/[0.02] to-transparent rounded-tr-full" />

            {/* Top line accent */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-magic-purple/0 to-transparent group-hover:via-magic-purple/30 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-magic-purple/10 border border-magic-purple/20 flex items-center justify-center text-magic-gold group-hover:bg-magic-purple/15 group-hover:border-magic-gold/30 transition-all duration-300">
                  {reasonIcons[i]}
                </div>
                <div>
                  <span className="text-[10px] text-magic-gold/40 tracking-[0.2em] uppercase">0{i + 1}</span>
                  <h3 className="text-xl font-heading font-bold text-white">{reason.title}</h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed ml-16">{reason.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
