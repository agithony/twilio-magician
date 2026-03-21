import { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "twilio-magician-secrets";
const TOTAL = 9;

export const EGG_IDS = [
  "abracadabra",
  "52",
  "crystalball",
  "portrait",
  "tripleclick",
  "doubleclick",
  "rightclick",
  "copytext",
  "idle",
] as const;

export type EggId = (typeof EGG_IDS)[number];

interface EasterEggTrackerContextType {
  found: Record<string, boolean>;
  markFound: (id: EggId) => void;
  foundCount: number;
  total: number;
}

function loadFound(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export const EasterEggTrackerContext = createContext<EasterEggTrackerContextType>({
  found: {},
  markFound: () => {},
  foundCount: 0,
  total: TOTAL,
});

export function useEasterEggTrackerProvider() {
  const [found, setFound] = useState<Record<string, boolean>>(loadFound);

  const markFound = useCallback((id: EggId) => {
    setFound((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const foundCount = Object.values(found).filter(Boolean).length;

  return { found, markFound, foundCount, total: TOTAL };
}

export function useEasterEggTracker() {
  return useContext(EasterEggTrackerContext);
}
