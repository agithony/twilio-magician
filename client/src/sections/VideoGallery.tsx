import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { videos } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function getThumbnail(embedUrl: string, thumbnail: string): string | null {
  if (thumbnail) return thumbnail;

  // YouTube: extract video ID and use maxresdefault
  const ytMatch = embedUrl.match(/youtube\.com\/embed\/([^?&]+)/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;

  // Google Drive: extract file ID and use direct export URL
  const driveMatch = embedUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://lh3.googleusercontent.com/d/${driveMatch[1]}=s640`;

  return null;
}

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.2 });

  return (
    <SectionWrapper id="videos">
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">The Show</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          See the Magic
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Watch the Twilio Magician in action. Every performance is a blend of wonder and technology.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="glass-card rounded-2xl overflow-hidden group cursor-pointer relative"
            onClick={() => setActiveVideo(video.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveVideo(video.id)}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
            {/* Thumbnail area - stage aesthetic */}
            <div className="relative aspect-video bg-gradient-to-br from-magic-deeper via-magic-dark to-magic-deeper overflow-hidden">
              {/* Thumbnail image */}
              {getThumbnail(video.embedUrl, video.thumbnail) && (
                <img
                  src={getThumbnail(video.embedUrl, video.thumbnail)!}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              )}
              {/* Mini curtain accents */}
              <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-magic-purple/10 to-transparent z-10" />
              <div className="absolute top-0 right-0 w-6 h-full bg-gradient-to-l from-magic-purple/10 to-transparent z-10" />
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-magic-purple/15 to-transparent z-10" />

              {/* Stage lights */}
              <div className="absolute top-0 left-1/4 w-20 h-20 bg-gradient-to-b from-magic-gold/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-1/4 w-20 h-20 bg-gradient-to-b from-magic-purple/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                  className="w-16 h-16 rounded-full bg-magic-gold/10 backdrop-blur-sm border border-magic-gold/30 flex items-center justify-center group-hover:bg-magic-gold/20 group-hover:border-magic-gold/50 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  style={{
                    boxShadow: "0 0 30px rgba(217,119,6,0.1)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-magic-gold-light ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/90 via-transparent to-transparent" />
            </div>

            <div className="p-5 relative">
              <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-magic-gold-light transition-colors duration-300">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{video.description}</p>

              {/* Watch indicator */}
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-600 group-hover:text-magic-gold/60 transition-colors">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M8 3v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="6" />
                </svg>
                <span>Watch now</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video overlay - theater experience */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/97 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            {/* Stage curtain accents */}
            <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-magic-purple/5 to-transparent" />
            <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-magic-purple/5 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-magic-purple/10 to-transparent" />

            {/* Spotlight effects */}
            <div className="absolute top-0 left-1/3 w-40 h-40 bg-gradient-to-b from-magic-gold/3 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-0 right-1/3 w-40 h-40 bg-gradient-to-b from-magic-purple/3 to-transparent rounded-full blur-3xl" />

            <button
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white transition-colors"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-5xl aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow border */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-magic-purple/20 via-magic-gold/10 to-magic-purple/20 blur-sm" />
              <iframe
                src={videos.find((v) => v.id === activeVideo)?.embedUrl}
                className="relative w-full h-full rounded-xl bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video player"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
