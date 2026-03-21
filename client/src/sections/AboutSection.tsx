import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { aboutContent } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useReducedMotion } from "../hooks/useReducedMotion";

function FloatingCard({ value, suit, color, delay, className }: {
  value: string;
  suit: string;
  color: string;
  delay: number;
  className: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute w-16 h-22 rounded-lg bg-gradient-to-br from-magic-deeper to-magic-dark border border-magic-gold/20 flex flex-col items-center justify-center shadow-xl z-20 ${className}`}
      animate={prefersReducedMotion ? {} : {
        y: [0, -12, 0],
        rotate: [0, 3, -2, 0],
      }}
      transition={{
        duration: 4 + delay * 0.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span className="text-xs font-bold absolute top-1 left-1.5" style={{ color }}>{value}</span>
      <span className="text-lg" style={{ color }}>{suit}</span>
      <span className="text-xs font-bold absolute bottom-1 right-1.5 rotate-180" style={{ color }}>{value}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  const leftRef = useScrollAnimation<HTMLDivElement>("fadeLeft");
  const rightRef = useScrollAnimation<HTMLDivElement>("fadeRight", { delay: 0.2 });

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image side */}
        <div ref={leftRef} className="relative">
          <div
            className="relative aspect-[4/5] rounded-2xl overflow-visible group"
            style={{ perspective: "800px" }}
          >
            {/* Glow border effect */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-magic-purple/30 via-magic-gold/20 to-magic-purple/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div
              className="absolute inset-[1px] rounded-2xl overflow-hidden bg-magic-dark transition-transform duration-700 ease-out group-hover:[transform:rotateY(8deg)_rotateX(-3deg)_scale(1.02)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/10 to-magic-gold/10" />
              <img
                src={aboutContent.image}
                alt="The Twilio Magician"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/40 to-transparent" />
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          {/* Floating card decorations */}
          <FloatingCard value="A" suit={"\u2660"} color="#e2e8f0" delay={0} className="-bottom-4 -right-4" />
          <FloatingCard value="K" suit={"\u2665"} color="#DC2626" delay={0.8} className="-top-3 -left-3 hidden md:flex" />

          {/* Background accent */}
          <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 rounded-full bg-magic-purple/5 blur-3xl" />
          <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 rounded-full bg-magic-gold/5 blur-3xl" />
        </div>

        {/* Text side */}
        <div ref={rightRef}>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-magic-gold/30" />
            <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">About</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl magic-text-gradient mb-8">
            {aboutContent.headline}
          </h2>
          <div className="space-y-5">
            {aboutContent.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-300 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Stats or highlights */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/5">
            {[
              { value: "20+", label: "Events" },
              { value: "10k+", label: "Audience" },
              { value: "10k+", label: "Minds Blown" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl md:text-3xl magic-text-gradient">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
