import { createContext, useContext, useState, useCallback, useRef } from "react";

interface SoundManagerContextType {
  enabled: boolean;
  toggle: () => void;
  play: (sound: string) => void;
}

export const SoundManagerContext = createContext<SoundManagerContextType>({
  enabled: false,
  toggle: () => {},
  play: () => {},
});

export function useSoundManagerProvider() {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const bgMusicRef = useRef<Howl | null>(null);
  const sfxCacheRef = useRef<Record<string, Howl>>({});

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

  return { enabled, toggle, play };
}

export function useSoundManager() {
  return useContext(SoundManagerContext);
}
