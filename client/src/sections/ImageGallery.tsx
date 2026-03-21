import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import Lightbox from "../components/Lightbox";
import { galleryImages } from "../data/portfolio";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function ImageGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const headerRef = useScrollAnimation<HTMLDivElement>("fadeUp");
  const gridRef = useScrollAnimation<HTMLDivElement>("stagger", { staggerAmount: 0.1 });

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const onNext = useCallback(
    () => setCurrentIndex((i) => (i + 1) % galleryImages.length),
    []
  );
  const onPrev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    []
  );

  return (
    <SectionWrapper id="gallery" dark>
      <div ref={headerRef} className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-magic-gold/30" />
          <span className="text-magic-gold/50 text-[10px] tracking-[0.3em] uppercase">Captured Moments</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-magic-gold/30" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl magic-text-gradient mb-6">
          Gallery
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Moments captured from live performances around the world.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            {/* Placeholder gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-magic-purple/15 to-magic-gold/10" />
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover overlay with magic effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/80 via-magic-dark/0 to-magic-dark/0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end">
              <div className="p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-white text-sm font-medium">{img.event}</p>
                <p className="text-magic-gold/60 text-[10px] tracking-wider uppercase mt-1">View</p>
              </div>
            </div>

            {/* Corner accents on hover */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-magic-gold/0 group-hover:border-magic-gold/40 transition-all duration-500" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-magic-gold/0 group-hover:border-magic-gold/40 transition-all duration-500" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-magic-gold/0 group-hover:border-magic-gold/40 transition-all duration-500" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-magic-gold/0 group-hover:border-magic-gold/40 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={onNext}
        onPrev={onPrev}
      />
    </SectionWrapper>
  );
}
