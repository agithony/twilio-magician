import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

function drawWand(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  // Position wand so the tip is at cursor point
  // Wand is angled ~-35deg (upper-left to lower-right)
  ctx.translate(x, y);
  ctx.rotate(-0.6);

  // Wand shaft
  const gradient = ctx.createLinearGradient(0, 0, 0, 32);
  gradient.addColorStop(0, "#1a1a2e");
  gradient.addColorStop(0.5, "#2d2d4a");
  gradient.addColorStop(1, "#1a1a2e");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(-2.5, 2, 5, 30, 1);
  ctx.fill();

  // White tip
  const tipGrad = ctx.createLinearGradient(0, -2, 0, 6);
  tipGrad.addColorStop(0, "#ffffff");
  tipGrad.addColorStop(1, "#c4b5fd");
  ctx.fillStyle = tipGrad;
  ctx.beginPath();
  ctx.roundRect(-2.5, -2, 5, 8, [2, 2, 0, 0]);
  ctx.fill();

  // Gold band between tip and shaft
  ctx.fillStyle = "#d97706";
  ctx.fillRect(-3, 5, 6, 3);

  // Second gold band accent
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(-2.5, 5.5, 5, 2);

  // Sparkle star at tip
  ctx.fillStyle = "#fbbf24";
  ctx.globalAlpha = 0.9;
  const starSize = 3 + Math.sin(Date.now() * 0.005) * 1;
  drawStar(ctx, 0, -3, starSize, 4);
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  points: number,
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * 0.35;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

export default function MagicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");

  const addSparkle = useCallback((x: number, y: number) => {
    if (sparklesRef.current.length >= 25) return;
    sparklesRef.current.push({
      x,
      y,
      life: 1,
      maxLife: 30 + Math.random() * 15,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      size: 1.5 + Math.random() * 2,
      hue: Math.random() > 0.5 ? 45 : 270,
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (Math.random() > 0.7) {
        addSparkle(e.clientX, e.clientY);
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;

        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;
        const size = s.size * (1 - progress * 0.5);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsla(${s.hue}, 80%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        return s.life < s.maxLife;
      });

      // Draw wand cursor
      ctx.globalAlpha = 1;
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0) {
        drawWand(ctx, x, y);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, isTouch, addSparkle]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
}
