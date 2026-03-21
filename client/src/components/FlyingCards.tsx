import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Card {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  vx: number;
  vy: number;
  vr: number;
  suit: string;
  value: string;
  color: string;
  phase: "entering" | "floating" | "exiting";
  life: number;
  maxLife: number;
}

const SUITS = ["\u2660", "\u2665", "\u2666", "\u2663"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const CARD_W = 60;
const CARD_H = 84;

export default function FlyingCards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<Card[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const maxCards = isMobile ? 3 : 7;
    let spawnTimer = 0;

    const spawnCard = () => {
      if (cardsRef.current.length >= maxCards) return;

      const side = Math.random();
      const suit = SUITS[Math.floor(Math.random() * 4)];
      const value = VALUES[Math.floor(Math.random() * 13)];
      const isRed = suit === "\u2665" || suit === "\u2666";

      let x: number, y: number, vx: number, vy: number;

      if (side < 0.25) {
        x = -CARD_W;
        y = Math.random() * canvas.height;
        vx = 0.3 + Math.random() * 0.8;
        vy = (Math.random() - 0.5) * 0.3;
      } else if (side < 0.5) {
        x = canvas.width + CARD_W;
        y = Math.random() * canvas.height;
        vx = -(0.3 + Math.random() * 0.8);
        vy = (Math.random() - 0.5) * 0.3;
      } else if (side < 0.75) {
        x = Math.random() * canvas.width;
        y = -CARD_H;
        vx = (Math.random() - 0.5) * 0.3;
        vy = 0.3 + Math.random() * 0.6;
      } else {
        x = Math.random() * canvas.width;
        y = canvas.height + CARD_H;
        vx = (Math.random() - 0.5) * 0.3;
        vy = -(0.3 + Math.random() * 0.6);
      }

      cardsRef.current.push({
        x,
        y,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.5,
        opacity: 0,
        vx,
        vy,
        vr: (Math.random() - 0.5) * 0.8,
        suit,
        value,
        color: isRed ? "#DC2626" : "#e2e8f0",
        phase: "entering",
        life: 0,
        maxLife: 500 + Math.random() * 400,
      });
    };

    const drawCard = (card: Card) => {
      ctx.save();
      ctx.translate(card.x, card.y);
      ctx.rotate((card.rotation * Math.PI) / 180);
      ctx.scale(card.scale, card.scale);
      ctx.globalAlpha = card.opacity;

      const w = CARD_W;
      const h = CARD_H;

      // Card body — no shadowBlur for performance
      ctx.fillStyle = "rgba(18, 16, 31, 0.85)";
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 6);
      ctx.fill();

      // Border
      ctx.strokeStyle = "rgba(124, 58, 237, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner border
      ctx.strokeStyle = "rgba(217, 119, 6, 0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.roundRect(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 3);
      ctx.stroke();

      // Value + suit (top-left)
      ctx.fillStyle = card.color;
      ctx.font = "bold 12px 'DM Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(card.value, -w / 2 + 7, -h / 2 + 18);
      ctx.font = "11px sans-serif";
      ctx.fillText(card.suit, -w / 2 + 7, -h / 2 + 30);

      // Center suit
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(card.suit, 0, 8);

      // Bottom-right (rotated)
      ctx.save();
      ctx.rotate(Math.PI);
      ctx.font = "bold 12px 'DM Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(card.value, -w / 2 + 7, -h / 2 + 18);
      ctx.font = "11px sans-serif";
      ctx.fillText(card.suit, -w / 2 + 7, -h / 2 + 30);
      ctx.restore();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer > (isMobile ? 120 : 80)) {
        spawnCard();
        spawnTimer = 0;
      }

      cardsRef.current = cardsRef.current.filter((card) => {
        card.life++;
        card.x += card.vx;
        card.y += card.vy;
        card.rotation += card.vr;

        // Gentle sine wave motion
        card.x += Math.sin(card.life * 0.008) * 0.2;
        card.y += Math.cos(card.life * 0.01) * 0.15;

        if (card.phase === "entering") {
          card.opacity = Math.min(card.opacity + 0.005, 0.25);
          if (card.opacity >= 0.25) card.phase = "floating";
        } else if (card.phase === "floating" && card.life > card.maxLife * 0.7) {
          card.phase = "exiting";
        } else if (card.phase === "exiting") {
          card.opacity -= 0.003;
        }

        drawCard(card);

        return card.opacity > 0.001;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Spawn a few initial cards with stagger
    for (let i = 0; i < (isMobile ? 2 : 4); i++) {
      setTimeout(() => spawnCard(), i * 400);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, isMobile]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
