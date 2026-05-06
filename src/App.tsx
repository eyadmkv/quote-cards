import { useState, useRef, useCallback } from "react";
import * as htmlToImage from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import Controls from "./components/Controls";
import QuoteCard from "./components/QuoteCard";
import Toast from "./components/Toast";
import { usePersistedConfig } from "./hooks/usePersistedConfig";
import { randomQuote } from "./quotes";
import type { CardConfig, FontFamily, Locale } from "./types";
import type { ToastMessage } from "./components/Toast";
import { t } from "./i18n";

const ARABIC_FONTS: FontFamily[] = [
  "'Amiri', serif",
  "'Cairo', sans-serif",
  "'Tajawal', sans-serif",
  "'Scheherazade New', serif",
  "'Noto Naskh Arabic', serif",
  "'Reem Kufi', sans-serif",
];

function containsArabic(text: string) {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

/** Extract a plain font-family name from a CSS font-family string, e.g. "'Playfair Display', serif" → "Playfair Display" */
function parseFontName(fontFamily: string): string | null {
  const m = fontFamily.match(/['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

/**
 * Pre-load the active Google Font into the document so html-to-image can
 * rasterise it correctly. Returns a promise that resolves once the font is
 * ready (or immediately if it's a system font / already loaded).
 */
async function ensureFontLoaded(fontFamily: string): Promise<void> {
  const name = parseFontName(fontFamily);
  if (!name) return; // system font — nothing to do

  // Build a Google Fonts CSS URL and inject it as a <link> if not already present
  const id = `gf-${name.replace(/\s+/g, "-").toLowerCase()}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }

  // Wait for the font to actually be available
  try {
    await document.fonts.load(`16px "${name}"`);
    await document.fonts.ready;
  } catch {
    // Non-fatal — carry on anyway
  }
}

const DEFAULT_CONFIG: CardConfig = {
  quote: "",
  author: "",
  backgroundType: "gradient",
  solidColor: "#111827",
  gradient: { from: "#0f0c29", to: "#302b63", direction: "135deg" },
  textColor: "#ffffff",
  font: "'Playfair Display', serif",
  textAlign: "center",
  direction: "ltr",
  aspectRatio: "1/1",
  fontSize: 22,
  authorFontSize: 14,
  locale: "en" as Locale,
};

let toastCounter = 0;

export default function App() {
  const [config, setConfig] = usePersistedConfig(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const addToast = useCallback(
    (message: string, type: ToastMessage["type"] = "info") => {
      const id = ++toastCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
    },
    [],
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = useCallback(
    (updates: Partial<CardConfig>) => {
      setConfig((prev) => {
        const next = { ...prev, ...updates };
        if (updates.font && ARABIC_FONTS.includes(updates.font)) {
          next.direction = "rtl";
          if (next.textAlign === "left") next.textAlign = "right";
        }
        if (updates.font && !ARABIC_FONTS.includes(updates.font)) {
          next.direction = "ltr";
          if (next.textAlign === "right") next.textAlign = "left";
        }
        if (updates.quote !== undefined) {
          const isArabic = containsArabic(updates.quote);
          next.direction = isArabic ? "rtl" : "ltr";
          if (next.textAlign !== "center") {
            next.textAlign = isArabic ? "right" : "left";
          }
          if (updates.locale === undefined) {
            next.locale = isArabic ? "ar-EG" : "en";
          }
        }
        return next;
      });
    },
    [setConfig],
  );

  const handleRandomize = useCallback(() => {
    setIsLoading(true);
    // Pick a quote in the language matching the current UI locale
    const lang = config.locale === "ar-EG" ? "ar" : "en";
    const pick = randomQuote(lang);
    const isArabic = pick.lang === "ar";

    // Small delay so the spinner is visible
    setTimeout(() => {
      setConfig((prev) => ({
        ...prev,
        quote: pick.quote,
        author: pick.author,
        direction: isArabic ? "rtl" : "ltr",
        locale: isArabic ? ("ar-EG" as Locale) : ("en" as Locale),
        textAlign:
          prev.textAlign === "center" ? "center" : isArabic ? "right" : "left",
      }));
      setIsLoading(false);
    }, 280);
  }, [config.locale, setConfig]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    const s = t(config.locale);
    try {
      // Ensure the active font is loaded before rasterising
      await ensureFontLoaded(config.font);

      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2,
        // Embed fonts from the document so html-to-image can find them
        fontEmbedCSS: Array.from(document.styleSheets)
          .flatMap((ss) => {
            try {
              return Array.from(ss.cssRules).map((r) => r.cssText);
            } catch {
              return [];
            }
          })
          .join("\n"),
      });

      const link = document.createElement("a");
      link.download = `quote-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      addToast(s.toastDownloadSuccess, "success");
    } catch (err) {
      console.error("Download failed:", err);
      addToast(s.toastDownloadError, "error");
    }
  }, [config.font, config.locale, addToast]);

  const s = t(config.locale);

  return (
    <div className="app">
      {/* ── Desktop sidebar ── */}
      <motion.div
        className="controls-wrapper desktop-only"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Controls
          config={config}
          onChange={handleChange}
          onRandomize={handleRandomize}
          onDownload={handleDownload}
          isLoading={isLoading}
        />
      </motion.div>

      {/* ── Main preview ── */}
      <main className="preview-area">
        {/* Mobile top bar */}
        <div className="mobile-topbar">
          <div className="mobile-topbar-brand">
            <img src="/favicon.svg" alt="" className="mobile-logo" />
            <span>{s.appName}</span>
          </div>
          <button
            className="btn btn-secondary mobile-menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open controls"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {s.btnCustomize}
          </button>
        </div>

        <motion.div
          className="preview-container"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <QuoteCard ref={cardRef} config={config} />
        </motion.div>

        <motion.div
          className="preview-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <p className="preview-hint">{s.previewHint}</p>
          <div className="preview-links">
            <a
              href="https://github.com/eyadmkv"
              target="_blank"
              rel="noopener noreferrer"
              className="preview-link"
              aria-label="GitHub"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              eyadmkv
            </a>
            <a
              href="https://eyadmkv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="preview-link"
              aria-label="Portfolio"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              My Portfolio
            </a>
          </div>
        </motion.div>

        {/* Mobile download shortcut */}
        <motion.button
          className="btn btn-primary mobile-download-btn"
          onClick={handleDownload}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileTap={{ scale: 0.96 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {s.btnDownload}
        </motion.button>
      </main>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="drawer-handle-bar" />
              <Controls
                config={config}
                onChange={handleChange}
                onRandomize={handleRandomize}
                onDownload={() => {
                  handleDownload();
                  setDrawerOpen(false);
                }}
                isLoading={isLoading}
                onClose={() => setDrawerOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Toasts ── */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
