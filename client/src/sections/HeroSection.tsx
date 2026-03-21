import { useEffect, useRef, lazy, Suspense, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { siteConfig } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import HeroFallback from "../three/HeroFallback";
import FlyingCards from "../components/FlyingCards";

const CrystalBallScene = lazy(() => import("../three/CrystalBallScene"));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sceneParallaxRef = useRef<HTMLDivElement>(null);
  const contentParallaxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    if (!isMobile && !prefersReducedMotion && navigator.hardwareConcurrency > 4) {
      setUse3D(true);
    }
  }, [isMobile, prefersReducedMotion]);

  // Parallax on mouse move — uses refs + rAF to avoid React re-renders
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 120;
      targetY = (e.clientY / window.innerHeight - 0.5) * 80;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (sceneParallaxRef.current) {
            sceneParallaxRef.current.style.transform =
              `translate(${targetX * 0.3}px, ${targetY * 0.3}px)`;
          }
          if (contentParallaxRef.current) {
            contentParallaxRef.current.style.transform =
              `translate(${targetX * -0.5}px, ${targetY * -0.3}px)`;
          }
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.3 });

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { opacity: 0, y: 100, rotateX: -90, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: "back.out(1.7)",
        }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }

    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.children;
      tl.fromTo(
        buttons,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.4)" },
        "-=0.2"
      );
    }

    return () => { tl.kill(); };
  }, [prefersReducedMotion]);

  const titleText = siteConfig.name;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-magic-dark"
    >
      {/* Deep background gradient layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-magic-deeper via-magic-dark to-magic-dark" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse at 70% 60%, rgba(217,119,6,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Flying cards layer */}
      <FlyingCards />

      {/* 3D Scene or Fallback */}
      <div
        ref={sceneParallaxRef}
        className="absolute inset-0 opacity-70"
        style={{ transition: "transform 0.3s ease-out", willChange: "transform" }}
        onMouseEnter={() => {
          const timer = window.setTimeout(() => {
            window.dispatchEvent(new Event("crystalball-fortune"));
          }, 5000);
          (sceneParallaxRef.current as any).__fortuneTimer = timer;
        }}
        onMouseLeave={() => {
          if (sceneParallaxRef.current) {
            window.clearTimeout((sceneParallaxRef.current as any).__fortuneTimer);
          }
        }}
      >
        {use3D ? (
          <Suspense fallback={<HeroFallback />}>
            <CrystalBallScene />
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Smoke layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-48 smoke-layer"
          style={{ opacity: 0.4 }}
        />
      </div>

      {/* Content overlay */}
      <div
        ref={contentParallaxRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}
      >
        {/* Pre-title decoration */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-magic-gold/50" />
          <span className="text-magic-gold/60 text-sm tracking-[0.4em] uppercase font-body">
            Welcome to the Show
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-magic-gold/50" />
        </motion.div>

        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold mb-4 leading-[1.1]"
          style={{ perspective: "800px" }}
        >
          {titleText.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="char inline-block magic-text-shimmer"
                  style={{ textShadow: "0 0 40px rgba(217,119,6,0.3)" }}
                >
                  {char}
                </span>
              ))}
              {wi < titleText.split(" ").length - 1 && (
                <span className="char inline">&nbsp;</span>
              )}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="font-heading italic text-xl md:text-2xl text-magic-purple/80 mb-4"
        >
          Anthony, Developer Evangelist
        </p>

        <p
          ref={taglineRef}
          className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Where stage magic meets Twilio and AI. Every trick is powered by
          APIs and tech — turning audience phones into portals of wonder.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#tricks"
            className="group relative px-10 py-4 bg-gradient-to-r from-magic-purple to-magic-sapphire text-white font-medium rounded-full text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            <span className="relative z-10">Witness the Magic</span>
            <div className="absolute inset-0 bg-gradient-to-r from-magic-sapphire to-magic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </a>
          <a
            href="#booking"
            className="group px-10 py-4 border border-magic-gold/40 text-magic-gold-light font-medium rounded-full hover:bg-magic-gold/10 hover:border-magic-gold/60 transition-all duration-300 text-lg relative overflow-hidden"
          >
            <span className="relative z-10">Book a Show</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-magic-gold/10 to-transparent" />
          </a>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-magic-dark to-transparent z-[5]" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5">
            <motion.div
              className="w-1 h-1.5 bg-magic-gold/70 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
