import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "stagger";

export function useScrollAnimation<T extends HTMLElement>(
  variant: AnimationVariant = "fadeUp",
  options?: { delay?: number; duration?: number; staggerAmount?: number }
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    const delay = options?.delay ?? 0;
    const duration = options?.duration ?? 0.8;

    const animations: Record<AnimationVariant, () => gsap.core.Tween | gsap.core.Timeline> = {
      fadeUp: () =>
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        ),
      fadeLeft: () =>
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        ),
      fadeRight: () =>
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        ),
      scaleIn: () =>
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration,
            delay,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        ),
      stagger: () => {
        const children = el.children;
        return gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: options?.staggerAmount ?? 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      },
    };

    const anim = animations[variant]();

    return () => {
      if ("scrollTrigger" in anim && anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    };
  }, [variant, prefersReducedMotion, options?.delay, options?.duration, options?.staggerAmount]);

  return ref;
}
