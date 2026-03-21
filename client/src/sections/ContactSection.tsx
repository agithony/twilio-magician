import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { siteConfig, socialLinks } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const SLACK_HANDLE = "Anthony Dellavecchia";

const socialIcons: Record<string, ReactNode> = {
  slack: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.163 0a2.528 2.528 0 012.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.163 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 01-2.52-2.523 2.527 2.527 0 012.52-2.52h6.315A2.528 2.528 0 0124 15.163a2.528 2.528 0 01-2.522 2.523h-6.315z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

export default function ContactSection() {
  const contentRef = useScrollAnimation<HTMLDivElement>("fadeUp");

  return (
    <SectionWrapper id="contact" dark>
      <div ref={contentRef} className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">Connect</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl magic-text-gradient mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-400 mb-8">
          Have questions? Want to discuss your event? I'd love to hear from you.
        </p>

        <div className="flex flex-col items-center gap-4 mb-12 w-full max-w-md mx-auto">
          {/* Email pill */}
          <motion.a
            href={`mailto:${siteConfig.email}`}
            className="block w-full group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="glass-card rounded-full px-10 py-5 flex items-center gap-4 group-hover:border-magic-gold/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-magic-purple/10 border border-magic-purple/20 flex items-center justify-center group-hover:bg-magic-purple/20 transition-all shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-magic-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-heading text-white group-hover:text-magic-gold-light transition-colors">
                {siteConfig.email}
              </span>
            </div>
          </motion.a>

          {/* Slack pill */}
          <motion.div
            className="block w-full group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="glass-card rounded-full px-10 py-5 flex items-center gap-4 group-hover:border-magic-gold/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-magic-purple/10 border border-magic-purple/20 flex items-center justify-center group-hover:bg-magic-purple/20 transition-all shrink-0 text-magic-gold">
                {socialIcons.slack}
              </div>
              <span className="text-xl font-heading text-white group-hover:text-magic-gold-light transition-colors">
                {SLACK_HANDLE}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-magic-gold-light hover:border-magic-gold/30 transition-all duration-300"
              aria-label={link.platform}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              {socialIcons[link.icon]}
            </motion.a>
          ))}

        </div>
      </div>
    </SectionWrapper>
  );
}
