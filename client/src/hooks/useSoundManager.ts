import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { asset } from "../utils/assetPath";

interface SoundManagerContextType {
  enabled: boolean;
  toggle: () => void;
  play: (sound: string) => void;
  startMusic: () => void;
}

export const SoundManagerContext = createContext<SoundManagerContextType>({
  enabled: true,
  toggle: () => {},
  play: () => {},
  startMusic: () => {},
});

export function useSoundManagerProvider() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxCacheRef = useRef<Record<string, Howl>>({});

  // Preload background music as a plain HTML5 audio element (no async import needed)
  useEffect(() => {
    const audio = new Audio(asset("/sounds/bg-music.mp3"));
    audio.loop = true;
    audio.volume = 0.15;
    audio.preload = "auto";
    bgMusicRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startMusic = useCallback(() => {
    if (!enabledRef.current) return;
    bgMusicRef.current?.play();
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);

    if (next) {
      bgMusicRef.current?.play();
    } else {
      bgMusicRef.current?.pause();
    }
  }, []);

  const play = useCallback(async (sound: string) => {
    if (!enabledRef.current) return;

    if (sfxCacheRef.current[sound]) {
      sfxCacheRef.current[sound].play();
    } else {
      const { Howl } = await import("howler");
      const newHowl = new Howl({ src: [asset(`/sounds/${sound}.mp3`)], volume: 0.3 });
      sfxCacheRef.current[sound] = newHowl;
      newHowl.play();
    }
  }, []);

  return { enabled, toggle, play, startMusic };
}

export function useSoundManager() {
  return useContext(SoundManagerContext);
}
