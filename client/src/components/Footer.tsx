import type { ReactNode } from "react";
import { siteConfig, socialLinks } from "../data/portfolio";
import { useEasterEggTracker } from "../hooks/useEasterEggTracker";

const socialIcons: Record<string, ReactNode> = {
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

export default function Footer() {
  const { foundCount, total } = useEasterEggTracker();

  const secretsText =
    foundCount === 0
      ? `${total} secrets are hidden in this site. Can you find them all?`
      : foundCount === total
        ? `You found all ${total} secrets. A true magician.`
        : `${foundCount} of ${total} secrets discovered. Keep looking...`;

  return (
    <footer className="relative bg-magic-dark overflow-hidden">
      {/* Top decorative divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-magic-purple/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-magic-gold" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M12.2 11.8L11 13M12.2 6.2L11 5" strokeLinecap="round" />
                <circle cx="15" cy="9" r="3" />
                <path d="M12 21l-6.5-6.5M3 21l2-2" strokeLinecap="round" />
              </svg>
              <h3 className="font-display text-xl magic-text-gradient">{siteConfig.name}</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Twilio Magic 3.0
            </p>
          </div>

          {/* Quick links */}
          <div className="md:text-center">
            <h4 className="text-xs text-gray-400 tracking-[0.2em] uppercase mb-4">Explore</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:inline-grid">
              {["About", "Tricks", "Videos", "Gallery", "Book Me", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  className="text-sm text-gray-500 hover:text-magic-gold-light transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="#secrets"
            className="text-xs text-gray-600 hover:text-magic-gold transition-colors cursor-pointer"
          >
            ✨ {secretsText}
          </a>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-magic-purple/[0.02] rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
