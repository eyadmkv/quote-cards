import { useState, useEffect, useRef } from "react";
import type { CardConfig } from "../types";

const STORAGE_KEY = "quote-cards-config-v1";
const DEBOUNCE_MS = 600;

function loadConfig(defaults: CardConfig): CardConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    // Merge so new fields added in future versions always have a default
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function saveConfig(config: CardConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Silently ignore quota errors
  }
}

export function usePersistedConfig(defaults: CardConfig) {
  const [config, setConfig] = useState<CardConfig>(() => loadConfig(defaults));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveConfig(config), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [config]);

  return [config, setConfig] as const;
}
