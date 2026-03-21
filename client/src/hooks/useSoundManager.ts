import { createContext, useContext, useState, useCallback, useRef } from "react";

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
  const bgMusicRef = useRef<Howl | null>(null);
  const sfxCacheRef = useRef<Record<string, Howl>>({});

  const startMusic = useCallback(async () => {
    if (!enabledRef.current) return;
    if (bgMusicRef.current) {
      bgMusicRef.current.play();
      return;
    }
    const { Howl } = await import("howler");
    const music = new Howl({
      src: ["/sounds/bg-music.mp3"],
      volume: 0.15,
      loop: true,
      html5: true,
    });
    bgMusicRef.current = music;
    music.play();
  }, []);

  const toggle = useCallback(async () => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);

    if (next) {
      if (bgMusicRef.current) {
        bgMusicRef.current.play();
      } else {
        const { Howl } = await import("howler");
        const music = new Howl({
          src: ["/sounds/bg-music.mp3"],
          volume: 0.15,
          loop: true,
          html5: true,
        });
        bgMusicRef.current = music;
        music.play();
      }
    } else {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    }
  }, []);

  const play = useCallback(async (sound: string) => {
    if (!enabledRef.current) return;

    if (sfxCacheRef.current[sound]) {
      sfxCacheRef.current[sound].play();
    } else {
      const { Howl } = await import("howler");
      const newHowl = new Howl({ src: [`/sounds/${sound}.mp3`], volume: 0.3 });
      sfxCacheRef.current[sound] = newHowl;
      newHowl.play();
    }
  }, []);

  return { enabled, toggle, play, startMusic };
}

export function useSoundManager() {
  return useContext(SoundManagerContext);
}
