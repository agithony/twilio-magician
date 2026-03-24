import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { aboutContent } from "../data/portfolio";
import { asset } from "../utils/assetPath";
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

const CARD_SUITS = [
  { symbol: "\u2665", name: "Hearts", color: "text-red-700", bgColor: "bg-red-700", borderColor: "border-red-700" },
  { symbol: "\u2660", name: "Spades", color: "text-gray-800", bgColor: "bg-gray-800", borderColor: "border-gray-800" },
  { symbol: "\u2666", name: "Diamonds", color: "text-red-700", bgColor: "bg-red-700", borderColor: "border-red-700" },
  { symbol: "\u2663", name: "Clubs", color: "text-gray-800", bgColor: "bg-gray-800", borderColor: "border-gray-800" },
];

const CARD_VALUES = ["K", "A", "Q", "J"];

export default function AboutSection() {
  const leftRef = useScrollAnimation<HTMLDivElement>("fadeLeft");
  const rightRef = useScrollAnimation<HTMLDivElement>("fadeRight", { delay: 0.2 });
  const [suitIndex, setSuitIndex] = useState(0);
  const [valueIndex, setValueIndex] = useState(0);
  const portraitClicks = useRef(0);
  const portraitTimer = useRef<number>(0);

  const handlePortraitClick = useCallback(() => {
    portraitClicks.current++;
    if (portraitTimer.current) window.clearTimeout(portraitTimer.current);
    portraitTimer.current = window.setTimeout(() => { portraitClicks.current = 0; }, 800);

    if (portraitClicks.current >= 3) {
      portraitClicks.current = 0;
      setSuitIndex((prev) => (prev + 1) % CARD_SUITS.length);
      setValueIndex((prev) => (prev + 1) % CARD_VALUES.length);
      window.dispatchEvent(new Event("portrait-easter-egg"));
    }
  }, []);

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image side — playing card design */}
        <div ref={leftRef} className="relative flex justify-center">
          <div
            className="relative aspect-[3/4] w-full max-w-sm rounded-xl overflow-visible group"
            style={{ perspective: "800px" }}
            onClick={handlePortraitClick}
          >
            {/* Glow border effect */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-magic-purple/30 via-magic-gold/20 to-magic-purple/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div
              className="absolute inset-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#f5f0e8] to-[#ebe5d9] transition-transform duration-700 ease-out group-hover:[transform:rotateY(8deg)_rotateX(-3deg)_scale(1.02)] shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Outer border band */}
              <div className="absolute inset-0 rounded-xl border-[3px] border-red-700/20 pointer-events-none z-20" />

              {/* Ornate inner border */}
              <div className="absolute inset-[10px] rounded-lg border-2 border-red-700/15 pointer-events-none z-20" />
              <div className="absolute inset-[13px] rounded-lg border border-red-700/10 pointer-events-none z-20" />

              {/* Corner filigree dots */}
              <div className="absolute top-[18px] left-[18px] w-1.5 h-1.5 rounded-full bg-red-700/20 z-20" />
              <div className="absolute top-[18px] right-[18px] w-1.5 h-1.5 rounded-full bg-red-700/20 z-20" />
              <div className="absolute bottom-[18px] left-[18px] w-1.5 h-1.5 rounded-full bg-red-700/20 z-20" />
              <div className="absolute bottom-[18px] right-[18px] w-1.5 h-1.5 rounded-full bg-red-700/20 z-20" />

              {/* Top-left corner: value + suit */}
              <div className="absolute top-4 left-5 z-10 flex items-center gap-1 leading-none transition-all duration-300">
                <span className={`text-4xl font-serif font-bold ${CARD_SUITS[suitIndex].color}`}>{CARD_VALUES[valueIndex]}</span>
                <span className={`text-4xl ${CARD_SUITS[suitIndex].color}`}>{CARD_SUITS[suitIndex].symbol}</span>
              </div>

              {/* Top-right small suit */}
              <div className="absolute top-6 right-5 z-10">
                <span className={`text-sm ${CARD_SUITS[suitIndex].color} opacity-30`}>{CARD_SUITS[suitIndex].symbol}</span>
              </div>

              {/* Bottom-left small suit */}
              <div className="absolute bottom-6 left-5 z-10 rotate-180">
                <span className={`text-sm ${CARD_SUITS[suitIndex].color} opacity-30`}>{CARD_SUITS[suitIndex].symbol}</span>
              </div>

              {/* Bottom-right corner: value + suit (rotated) */}
              <div className="absolute bottom-4 right-5 z-10 flex items-center gap-1 leading-none rotate-180 transition-all duration-300">
                <span className={`text-4xl font-serif font-bold ${CARD_SUITS[suitIndex].color}`}>{CARD_VALUES[valueIndex]}</span>
                <span className={`text-4xl ${CARD_SUITS[suitIndex].color}`}>{CARD_SUITS[suitIndex].symbol}</span>
              </div>

              {/* Photo area — inset with ornate border */}
              <div className="absolute inset-x-[42px] top-[110px] bottom-[110px] overflow-hidden z-10">
                <div className="absolute -inset-[2px] border-2 border-red-700/20 rounded-sm pointer-events-none z-10" />
                <picture>
                  <source srcSet={asset("/images/magician-portrait.png")} type="image/png" />
                  <source srcSet={asset("/images/magician-portrait.jpg")} type="image/jpeg" />
                  <source srcSet={asset("/images/magician-portrait.jpeg")} type="image/jpeg" />
                  <img
                    src={asset("/images/magician-portrait.png")}
                    alt="The Twilio Magician"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
                {/* Subtle vignette over photo */}
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] pointer-events-none" />
              </div>

              {/* Decorative center suit watermark behind photo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03] transition-all duration-300">
                <span className={`text-[200px] ${CARD_SUITS[suitIndex].color}`}>{CARD_SUITS[suitIndex].symbol}</span>
              </div>

              {/* Subtle card texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='1'/%3E%3C/svg%3E\")" }}
              />

              {/* Shine sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30" />
            </div>
          </div>


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
