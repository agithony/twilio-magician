import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import MagicCursor from "./components/MagicCursor";
import ParticleField from "./components/ParticleField";
import MagicDivider from "./components/MagicDivider";
import EasterEggs from "./components/EasterEggs";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ConceptSection from "./sections/ConceptSection";
import TricksSection from "./sections/TricksSection";
import WhyItWorksSection from "./sections/WhyItWorksSection";
import VideoGallery from "./sections/VideoGallery";
import ImageGallery from "./sections/ImageGallery";
import BookingSection from "./sections/BookingSection";
import ContactSection from "./sections/ContactSection";
import { SoundManagerContext, useSoundManagerProvider } from "./hooks/useSoundManager";

export default function App() {
  const [loading, setLoading] = useState(true);
  const soundManager = useSoundManagerProvider();
  const musicStarted = useRef(false);

  useEffect(() => {
    const handler = () => {
      if (!musicStarted.current) {
        musicStarted.current = true;
        soundManager.startMusic();
      }
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [soundManager]);

  return (
    <SoundManagerContext.Provider value={soundManager}>
      <MagicCursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleField />
          <EasterEggs />
          <Navbar />
          <main>
            <HeroSection />
            <MagicDivider variant="wand" />
            <AboutSection />
            <MagicDivider variant="cards" />
            <ConceptSection />
            <MagicDivider variant="stars" />
            <TricksSection />
            <MagicDivider variant="wand" />
            <WhyItWorksSection />
            <MagicDivider variant="cards" />
            <VideoGallery />
            <MagicDivider variant="stars" />
            <ImageGallery />
            <MagicDivider variant="wand" />
            <BookingSection />
            <MagicDivider variant="simple" />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </SoundManagerContext.Provider>
  );
}
