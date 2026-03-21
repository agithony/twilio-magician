import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEasterEggTracker } from "../hooks/useEasterEggTracker";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const FORTUNES = [
  "You will ship code that works on the first try... just kidding.",
  "A mysterious API call is in your future.",
  "The card you're thinking of is... the Ace of Spades. No? Okay, the other one.",
  "You will attend a conference and be amazed.",
  "Something magical is about to happen in your terminal.",
  "Twilio sees all. Twilio knows all. Twilio sends all.",
  "The bug you've been chasing? Check line 42.",
  "A great refactor is coming. Embrace it.",
];

export default function EasterEggs() {
  const { markFound } = useEasterEggTracker();

  // --- Typed word detection ---
  const [abracadabraActive, setAbracadabraActive] = useState(false);
  const [fiftyTwoActive, setFiftyTwoActive] = useState(false);
  const typedKeys = useRef("");

  // --- Triple-click card picker ---
  const [showPickCard, setShowPickCard] = useState(false);
  const [pickedCard, setPickedCard] = useState<{ suit: string; value: string; color: string } | null>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<number>(0);

  // --- Double-click sparkles ---
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleId = useRef(0);

  // --- Right-click message ---
  const [showRightClick, setShowRightClick] = useState(false);

  // --- Copy/highlight message ---
  const [showCopyMsg, setShowCopyMsg] = useState(false);

  // --- Idle card ---
  const [showIdleCard, setShowIdleCard] = useState(false);
  const idleTimer = useRef<number>(0);
  const idleCardSuit = useRef({ suit: "\u2660", value: "A", color: "#e2e8f0" });

  // --- Fortune (crystal ball hover) ---
  const [fortune, setFortune] = useState<string | null>(null);

  // --- 52-card cascade ---
  const [cascadeCards, setCascadeCards] = useState<{ suit: string; value: string; color: string; x: number; delay: number }[]>([]);

  // Typed word detection: "abracadabra" and "52"
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      typedKeys.current += e.key.toLowerCase();
      // Keep buffer short
      if (typedKeys.current.length > 20) {
        typedKeys.current = typedKeys.current.slice(-20);
      }
      if (typedKeys.current.endsWith("abracadabra")) {
        typedKeys.current = "";
        setAbracadabraActive(true);
        markFound("abracadabra");
        setTimeout(() => setAbracadabraActive(false), 5000);
      }
      if (typedKeys.current.endsWith("52")) {
        typedKeys.current = "";
        markFound("52");
        triggerCascade();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Triple-click card picker
  useEffect(() => {
    const handleClick = () => {
      clickCount.current++;
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
      clickTimer.current = window.setTimeout(() => {
        clickCount.current = 0;
      }, 500);

      if (clickCount.current >= 3) {
        clickCount.current = 0;
        markFound("tripleclick");
        setShowPickCard(true);
        setPickedCard(null);
        setCardRevealed(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Double-click sparkles
  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      markFound("doubleclick");
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

  // Right-click message
  useEffect(() => {
    const handleContext = (_e: MouseEvent) => {
      markFound("rightclick");
      setShowRightClick(true);
      setTimeout(() => setShowRightClick(false), 2500);
    };
    document.addEventListener("contextmenu", handleContext);
    return () => document.removeEventListener("contextmenu", handleContext);
  }, []);

  // Copy/select text message
  useEffect(() => {
    const handleCopy = () => {
      markFound("copytext");
      setShowCopyMsg(true);
      setTimeout(() => setShowCopyMsg(false), 2500);
    };
    let selectDebounce = 0;
    const handleMouseUp = () => {
      if (selectDebounce) window.clearTimeout(selectDebounce);
      selectDebounce = window.setTimeout(() => {
        const sel = window.getSelection();
        if (sel && sel.toString().trim().length > 2) {
          markFound("copytext");
          setShowCopyMsg(true);
          setTimeout(() => setShowCopyMsg(false), 2500);
        }
      }, 100);
    };
    document.addEventListener("copy", handleCopy);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("mouseup", handleMouseUp);
      if (selectDebounce) window.clearTimeout(selectDebounce);
    };
  }, []);

  // Idle timer — 30 seconds of no interaction
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      setShowIdleCard(false);
      idleTimer.current = window.setTimeout(() => {
        const suits = [
          { suit: "\u2660", color: "#e2e8f0" },
          { suit: "\u2665", color: "#DC2626" },
          { suit: "\u2666", color: "#DC2626" },
          { suit: "\u2663", color: "#e2e8f0" },
        ];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const s = suits[Math.floor(Math.random() * 4)];
        const v = values[Math.floor(Math.random() * 13)];
        idleCardSuit.current = { suit: s.suit, value: v, color: s.color };
        markFound("idle");
        setShowIdleCard(true);
      }, 15000);
    };
    resetIdle();
    window.addEventListener("mousemove", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("touchstart", resetIdle, { passive: true });
    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
    };
  }, []);

  // Portrait click — listen for custom event from AboutSection
  useEffect(() => {
    const handler = () => markFound("portrait");
    window.addEventListener("portrait-easter-egg", handler);
    return () => window.removeEventListener("portrait-easter-egg", handler);
  }, [markFound]);

  // Crystal ball fortune — listen for custom event dispatched from HeroSection
  useEffect(() => {
    const handleFortune = () => {
      markFound("crystalball");
      setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
      setTimeout(() => setFortune(null), 4000);
    };
    window.addEventListener("crystalball-fortune", handleFortune);
    return () => window.removeEventListener("crystalball-fortune", handleFortune);
  }, []);

  // 52 card cascade
  const triggerCascade = useCallback(() => {
    const suits = [
      { symbol: "\u2660", color: "#e2e8f0" },
      { symbol: "\u2665", color: "#DC2626" },
      { symbol: "\u2666", color: "#DC2626" },
      { symbol: "\u2663", color: "#e2e8f0" },
    ];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const cards = suits.flatMap((s) =>
      values.map((v) => ({
        suit: s.symbol,
        value: v,
        color: s.color,
        x: Math.random() * 90 + 5,
        delay: Math.random() * 2,
      }))
    );
    setCascadeCards(cards);
    setFiftyTwoActive(true);
    setTimeout(() => {
      setFiftyTwoActive(false);
      setCascadeCards([]);
    }, 5000);
  }, []);

  // Pick a card
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
      {/* === ABRACADABRA === */}
      <AnimatePresence>
        {abracadabraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          >
            {/* Dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0.95, 0] }}
              transition={{ duration: 5, times: [0, 0.1, 0.85, 1] }}
            />
            {/* Top hat & message */}
            <motion.div
              className="relative z-10 text-center"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: [0, 1.2, 1], y: [50, -10, 0] }}
              exit={{ scale: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <div className="text-8xl mb-4">🎩</div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="font-display text-3xl magic-text-gradient mb-2">Abracadabra!</p>
                <p className="text-gray-400 text-sm">You said the magic word.</p>
              </motion.div>
              {/* Sparkle burst */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ["#D97706", "#7C3AED", "#F22F46", "#F59E0B", "#FBBF24"][i % 5],
                    left: "50%",
                    top: "30%",
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1.5, delay: 0.3 + Math.random() * 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === 52-CARD CASCADE === */}
      <AnimatePresence>
        {fiftyTwoActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          >
            {cascadeCards.map((card, i) => (
              <motion.div
                key={i}
                className="absolute w-[50px] h-[70px] rounded-md border border-magic-gold/30 bg-gradient-to-br from-[#1a1a2e] to-[#12101f] flex flex-col items-center justify-center shadow-lg"
                style={{ left: `${card.x}%` }}
                initial={{ y: -100, rotate: Math.random() * 360 - 180, opacity: 0 }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 720 - 360,
                  opacity: [0, 1, 1, 0.5],
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  delay: card.delay,
                  ease: "easeIn",
                }}
              >
                <span className="text-[8px] font-bold absolute top-0.5 left-1" style={{ color: card.color }}>{card.value}</span>
                <span className="text-base" style={{ color: card.color }}>{card.suit}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === CRYSTAL BALL FORTUNE === */}
      <AnimatePresence>
        {fortune && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] glass-card rounded-2xl px-8 py-5 max-w-md text-center magic-glow"
          >
            <p className="text-magic-gold text-xs tracking-[0.3em] uppercase mb-2">The Crystal Ball Reveals...</p>
            <p className="text-gray-300 text-sm italic leading-relaxed">{fortune}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === RIGHT-CLICK MESSAGE === */}
      <AnimatePresence>
        {showRightClick && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] glass-card rounded-2xl px-10 py-5 pointer-events-none"
          >
            <p className="text-lg text-gray-300 whitespace-nowrap">
              <span className="text-magic-gold text-xl">🪄</span> A magician never reveals their source code.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === COPY TEXT MESSAGE === */}
      <AnimatePresence>
        {showCopyMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] glass-card rounded-2xl px-10 py-5 pointer-events-none"
          >
            <p className="text-lg text-gray-300 whitespace-nowrap">
              <span className="text-magic-gold text-xl">✨</span> Nice try... that trick's copyrighted.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === IDLE CARD === */}
      <AnimatePresence>
        {showIdleCard && (
          <motion.div
            initial={{ x: -120 }}
            animate={{ x: 0 }}
            exit={{ x: -120 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] cursor-pointer"
            onClick={() => setShowIdleCard(false)}
          >
            <div className="w-[120px] h-[168px] rounded-r-xl border border-l-0 border-magic-gold/30 bg-gradient-to-br from-[#1a1a2e] to-[#12101f] flex flex-col items-center justify-center shadow-2xl relative">
              <span className="text-sm font-bold absolute top-3 left-4" style={{ color: idleCardSuit.current.color }}>
                {idleCardSuit.current.value}
              </span>
              <span className="text-4xl" style={{ color: idleCardSuit.current.color }}>
                {idleCardSuit.current.suit}
              </span>
              <span className="text-xs text-gray-500 mt-4 px-3 text-center leading-tight">
                Still here?
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PICK A CARD MODAL (triple-click) === */}
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
                      <p className="text-gray-500 text-sm mt-2">Was that your card? ...yeah I have no idea, I'm a website not a magician.</p>
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
