import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import MagicCursor from "./components/MagicCursor";
import ParticleField from "./components/ParticleField";
import MagicDivider from "./components/MagicDivider";
import EasterEggs from "./components/EasterEggs";
import CreatorSignature from "./components/CreatorSignature";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ConceptSection from "./sections/ConceptSection";
import TricksSection from "./sections/TricksSection";
import WhyItWorksSection from "./sections/WhyItWorksSection";
import VideoGallery from "./sections/VideoGallery";
import ImageGallery from "./sections/ImageGallery";
import BookingSection from "./sections/BookingSection";
import ContactSection from "./sections/ContactSection";
import SecretsSection from "./sections/SecretsSection";
import { SoundManagerContext, useSoundManagerProvider } from "./hooks/useSoundManager";
import { EasterEggTrackerContext, useEasterEggTrackerProvider } from "./hooks/useEasterEggTracker";

export default function App() {
  const [loading, setLoading] = useState(true);
  const soundManager = useSoundManagerProvider();
  const easterEggTracker = useEasterEggTrackerProvider();
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
    <EasterEggTrackerContext.Provider value={easterEggTracker}>
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
          <div className="creator-signature-position">
            <CreatorSignature />
          </div>
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
            <MagicDivider variant="stars" />
            <SecretsSection />
            <MagicDivider variant="simple" />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </SoundManagerContext.Provider>
    </EasterEggTrackerContext.Provider>
  );
}
