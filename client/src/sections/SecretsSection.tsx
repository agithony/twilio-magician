import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useEasterEggTracker, EGG_IDS } from "../hooks/useEasterEggTracker";

const HINTS: Record<string, string> = {
  abracadabra: "Speak the word every magician knows...",
  "52": "How many cards in a full deck?",
  crystalball: "Gaze into the crystal long enough...",
  portrait: "The King isn't always who he seems...",
  tripleclick: "Three knocks open the hidden door...",
  doubleclick: "Two taps summon the stars...",
  rightclick: "Even magicians have boundaries...",
  copytext: "Some tricks can't be copied...",
  idle: "Patience reveals what haste cannot...",
};

export default function SecretsSection() {
  const { found, foundCount, total } = useEasterEggTracker();
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.1 });

  return (
    <SectionWrapper id="secrets">
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">Hidden</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          The Magician's Journal
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Every great magician leaves clues. Can you uncover all the secrets?
        </p>
      </div>

      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {EGG_IDS.map((id) => {
          const isFound = !!found[id];
          return (
            <motion.div
              key={id}
              className={`relative rounded-xl border p-5 transition-all duration-500 ${
                isFound
                  ? "border-magic-gold/40 bg-magic-gold/[0.04]"
                  : "border-white/5 bg-white/[0.01]"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Glow when found */}
              {isFound && (
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-magic-gold/10 via-transparent to-magic-purple/10 pointer-events-none" />
              )}

              <div className="relative flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    isFound
                      ? "bg-magic-gold/20 text-magic-gold"
                      : "bg-white/5 text-gray-600"
                  }`}
                >
                  {isFound ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Hint text */}
                <p
                  className={`text-sm leading-relaxed italic ${
                    isFound ? "text-magic-gold-light" : "text-gray-500"
                  }`}
                >
                  {HINTS[id]}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Counter */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-500">
          <span className="text-magic-gold font-display text-lg">{foundCount}</span>
          <span className="text-gray-600"> of </span>
          <span className="text-magic-gold font-display text-lg">{total}</span>
          <span className="text-gray-600"> secrets discovered</span>
        </p>
        {foundCount === total && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-magic-gold mt-3 font-heading text-lg"
          >
            You found them all. A true magician.
          </motion.p>
        )}
      </div>
    </SectionWrapper>
  );
}
