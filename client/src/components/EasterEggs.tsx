import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami code: up up down down left right left right b a
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [showPickCard, setShowPickCard] = useState(false);
  const [pickedCard, setPickedCard] = useState<{ suit: string; value: string; color: string } | null>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const konamiIndex = useRef(0);
  const sparkleId = useRef(0);
  const clickCount = useRef(0);
  const clickTimer = useRef<number>(0);

  // Konami code listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          setKonamiActive(true);
          konamiIndex.current = 0;
          setTimeout(() => setKonamiActive(false), 8000);
        }
      } else {
        konamiIndex.current = 0;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Triple-click anywhere triggers "pick a card"
  useEffect(() => {
    const handleClick = () => {
      clickCount.current++;
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
      clickTimer.current = window.setTimeout(() => {
        clickCount.current = 0;
      }, 500);

      if (clickCount.current >= 3) {
        clickCount.current = 0;
        setShowPickCard(true);
        setPickedCard(null);
        setCardRevealed(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Sparkle trail on double-click
  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      const colors = ["#D97706", "#7C3AED", "#F59E0B", "#F22F46", "#FBBF24"];
      const newSparkles: Sparkle[] = Array.from({ length: 12 }, () => ({
        id: sparkleId.current++,
        x: e.clientX + (Math.random() - 0.5) * 80,
        y: e.clientY + (Math.random() - 0.5) * 80,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setSparkles((prev) => [...prev, ...newSparkles]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s)));
      }, 1000);
    };
    document.addEventListener("dblclick", handleDblClick);
    return () => document.removeEventListener("dblclick", handleDblClick);
  }, []);

  const pickRandomCard = useCallback(() => {
    const suits = [
      { symbol: "\u2660", name: "Spades", color: "#e2e8f0" },
      { symbol: "\u2665", name: "Hearts", color: "#DC2626" },
      { symbol: "\u2666", name: "Diamonds", color: "#DC2626" },
      { symbol: "\u2663", name: "Clubs", color: "#e2e8f0" },
    ];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suit = suits[Math.floor(Math.random() * 4)];
    const value = values[Math.floor(Math.random() * 13)];
    setPickedCard({ suit: suit.symbol, value, color: suit.color });
    setTimeout(() => setCardRevealed(true), 300);
  }, []);

  return (
    <>
      {/* Konami Code Reward */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          >
            {/* Firework sparkles everywhere */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["#D97706", "#7C3AED", "#F22F46", "#F59E0B", "#FBBF24"][i % 5],
                  boxShadow: `0 0 10px ${["#D97706", "#7C3AED", "#F22F46", "#F59E0B", "#FBBF24"][i % 5]}`,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                  y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: 3,
                  repeatDelay: 0.5,
                }}
              />
            ))}
            {/* Secret message */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="glass-card rounded-2xl p-8 text-center magic-glow-intense"
            >
              <p className="text-4xl mb-3">✨🎩✨</p>
              <p className="font-display text-2xl magic-text-gradient mb-2">You Found the Secret!</p>
              <p className="text-gray-400 text-sm">A true magician never reveals their secrets...</p>
              <p className="text-gray-500 text-xs mt-2">...but you clearly know the magic code.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pick a Card Modal */}
      <AnimatePresence>
        {showPickCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setShowPickCard(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              {!pickedCard ? (
                <div className="text-center">
                  <motion.p
                    className="font-display text-3xl md:text-4xl magic-text-gradient mb-8"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Pick a Card...
                  </motion.p>

                  {/* Card fan */}
                  <div className="relative w-64 h-40 mx-auto mb-8">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute bottom-0 left-1/2 w-[70px] h-[98px] rounded-lg card-back-ornate border border-magic-purple/40 cursor-pointer"
                        style={{
                          transformOrigin: "bottom center",
                        }}
                        initial={{ rotate: 0, x: "-50%" }}
                        animate={{
                          rotate: (i - 2) * 12,
                          x: "-50%",
                        }}
                        whileHover={{
                          y: -20,
                          scale: 1.1,
                          boxShadow: "0 0 30px rgba(217,119,6,0.4)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={pickRandomCard}
                      >
                        {/* Card back ornament */}
                        <div className="absolute inset-2 rounded border border-magic-gold/20 flex items-center justify-center">
                          <span className="text-magic-gold/40 text-2xl font-display">T</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-gray-500 text-sm">Click any card to pick</p>
                </div>
              ) : (
                <div className="text-center">
                  <motion.p
                    className="font-display text-2xl magic-text-gradient mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Your Card Is...
                  </motion.p>

                  {/* Revealed card */}
                  <div className="relative mx-auto" style={{ perspective: "600px" }}>
                    <motion.div
                      className="w-[140px] h-[196px] mx-auto relative"
                      style={{ transformStyle: "preserve-3d" }}
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: cardRevealed ? 0 : 180 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      {/* Card front */}
                      <div
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#12101f] border-2 border-magic-gold/40 flex flex-col items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <span className="text-lg font-bold absolute top-3 left-4" style={{ color: pickedCard.color }}>
                          {pickedCard.value}
                        </span>
                        <span className="text-sm absolute top-7 left-4" style={{ color: pickedCard.color }}>
                          {pickedCard.suit}
                        </span>
                        <span className="text-5xl" style={{ color: pickedCard.color }}>
                          {pickedCard.suit}
                        </span>
                        <span className="text-lg font-bold absolute bottom-3 right-4 rotate-180" style={{ color: pickedCard.color }}>
                          {pickedCard.value}
                        </span>
                      </div>

                      {/* Card back */}
                      <div
                        className="absolute inset-0 rounded-xl card-back-ornate border-2 border-magic-purple/40"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                      />
                    </motion.div>
                  </div>

                  {cardRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <p className="text-magic-gold font-heading text-lg">
                        The {pickedCard.value} of {pickedCard.suit === "\u2660" ? "Spades" : pickedCard.suit === "\u2665" ? "Hearts" : pickedCard.suit === "\u2666" ? "Diamonds" : "Clubs"}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">Was that your card? Of course it was.</p>
                    </motion.div>
                  )}

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-6 px-6 py-2 text-sm text-gray-400 hover:text-magic-gold border border-gray-700 hover:border-magic-gold/50 rounded-full transition-all"
                    onClick={() => {
                      setPickedCard(null);
                      setCardRevealed(false);
                    }}
                  >
                    Pick Another
                  </motion.button>
                </div>
              )}

              <button
                className="absolute -top-2 -right-2 text-gray-500 hover:text-white text-xl w-8 h-8 flex items-center justify-center"
                onClick={() => setShowPickCard(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Double-click sparkles */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <AnimatePresence>
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute rounded-full"
              style={{
                left: sparkle.x,
                top: sparkle.y,
                width: sparkle.size,
                height: sparkle.size,
                background: sparkle.color,
                boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
