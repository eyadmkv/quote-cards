import { motion } from "framer-motion";
import type {
  CardConfig,
  FontFamily,
  TextAlign,
  AspectRatio,
  BackgroundType,
  Direction,
  Locale,
} from "../types";
import { t } from "../i18n";

interface ControlsProps {
  config: CardConfig;
  onChange: (updates: Partial<CardConfig>) => void;
  onRandomize: () => void;
  onDownload: () => void;
  isLoading: boolean;
  onClose?: () => void;
}

const LATIN_FONTS: { label: string; value: FontFamily }[] = [
  { label: "System Serif", value: "serif" },
  { label: "System Sans", value: "sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Lora", value: "'Lora', serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Pacifico", value: "'Pacifico', cursive" },
];

const ARABIC_FONTS: { label: string; value: FontFamily }[] = [
  { label: "أميري — Amiri", value: "'Amiri', serif" },
  { label: "القاهرة — Cairo", value: "'Cairo', sans-serif" },
  { label: "تجوال — Tajawal", value: "'Tajawal', sans-serif" },
  { label: "شهرزاد — Scheherazade New", value: "'Scheherazade New', serif" },
  { label: "نسخ — Noto Naskh Arabic", value: "'Noto Naskh Arabic', serif" },
  { label: "ريم كوفي — Reem Kufi", value: "'Reem Kufi', sans-serif" },
];

const GRADIENTS = [
  { label: "Midnight", from: "#0f0c29", to: "#302b63", direction: "135deg" },
  { label: "Sunset", from: "#f7971e", to: "#ffd200", direction: "135deg" },
  { label: "Ocean", from: "#1a1a2e", to: "#16213e", direction: "135deg" },
  { label: "Rose", from: "#f43b47", to: "#453a94", direction: "135deg" },
  { label: "Forest", from: "#134e5e", to: "#71b280", direction: "135deg" },
  { label: "Dusk", from: "#2c3e50", to: "#fd746c", direction: "135deg" },
  { label: "Aurora", from: "#00c3ff", to: "#ffff1c", direction: "135deg" },
];

const ASPECT_RATIOS: {
  key: "ratioSquare" | "ratioLandscape" | "ratioPortrait" | "ratioStory";
  value: AspectRatio;
}[] = [
  { key: "ratioSquare", value: "1/1" },
  { key: "ratioLandscape", value: "16/9" },
  { key: "ratioPortrait", value: "4/5" },
  { key: "ratioStory", value: "9/16" },
];

const GRADIENT_DIRECTIONS: {
  key:
    | "gradDirDiagonalDown"
    | "gradDirHorizontal"
    | "gradDirVertical"
    | "gradDirDiagonalUp";
  value: string;
}[] = [
  { key: "gradDirDiagonalDown", value: "135deg" },
  { key: "gradDirHorizontal", value: "90deg" },
  { key: "gradDirVertical", value: "180deg" },
  { key: "gradDirDiagonalUp", value: "45deg" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.045, duration: 0.3, ease: "easeOut" as const },
  }),
};

function section(i: number, children: React.ReactNode) {
  return (
    <motion.section
      className="control-section"
      custom={i}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.section>
  );
}

export default function Controls({
  config,
  onChange,
  onRandomize,
  onDownload,
  isLoading,
  onClose,
}: ControlsProps) {
  const {
    quote,
    author,
    backgroundType,
    solidColor,
    gradient,
    textColor,
    font,
    textAlign,
    direction,
    aspectRatio,
    fontSize,
    authorFontSize,
    locale,
  } = config;

  const s = t(locale);
  const isRTL = direction === "rtl";
  const isArabicUI = locale === "ar-EG";

  const handleGradientPreset = (preset: (typeof GRADIENTS)[0]) => {
    onChange({
      gradient: {
        ...gradient,
        from: preset.from,
        to: preset.to,
        direction: preset.direction,
      },
    });
  };

  return (
    <aside className="controls" dir={isArabicUI ? "rtl" : "ltr"}>
      {/* ── Header ── */}
      <div className="controls-header">
        <div className="controls-header-row">
          <div className="controls-brand">
            <img src="/favicon.svg" alt="" className="controls-logo" />
            <h1>{s.appName}</h1>
          </div>
          <div className="controls-header-actions">
            {/* Locale toggle */}
            <div className="tab-group locale-toggle">
              <button
                className={`tab-btn ${locale === "en" ? "active" : ""}`}
                onClick={() => onChange({ locale: "en" as Locale })}
              >
                EN
              </button>
              <button
                className={`tab-btn ${locale === "ar-EG" ? "active" : ""}`}
                onClick={() => onChange({ locale: "ar-EG" as Locale })}
              >
                عربي
              </button>
            </div>
            {onClose && (
              <button
                className="btn btn-ghost controls-close"
                onClick={onClose}
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Quote ── */}
      {section(
        0,
        <>
          <label className="control-label">{s.labelQuote}</label>
          <textarea
            className="control-textarea"
            placeholder={s.placeholderQuote}
            value={quote}
            rows={4}
            dir={direction}
            onChange={(e) => onChange({ quote: e.target.value })}
            style={{ textAlign: isRTL ? "right" : "left" }}
          />
          <motion.button
            className="btn btn-secondary randomize-btn"
            onClick={onRandomize}
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
          >
            {isLoading ? (
              <span className="spinner" />
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
            )}
            {isLoading ? s.btnFetching : s.btnRandomQuote}
          </motion.button>
        </>,
      )}

      {/* ── Author ── */}
      {section(
        1,
        <>
          <label className="control-label">{s.labelAuthor}</label>
          <input
            className="control-input"
            placeholder={s.placeholderAuthor}
            value={author}
            dir={direction}
            onChange={(e) => onChange({ author: e.target.value })}
            style={{ textAlign: isRTL ? "right" : "left" }}
          />
          <label className="control-label">
            {s.labelAuthorFontSize}{" "}
            <span className="control-value">{authorFontSize}px</span>
          </label>
          <input
            type="range"
            className="control-range"
            min={10}
            max={32}
            value={authorFontSize}
            onChange={(e) =>
              onChange({ authorFontSize: Number(e.target.value) })
            }
          />
        </>,
      )}

      {/* ── Font ── */}
      {section(
        2,
        <>
          <label className="control-label">{s.labelFont}</label>
          <select
            className="control-select"
            value={font}
            onChange={(e) => onChange({ font: e.target.value as FontFamily })}
          >
            <optgroup label={s.fontGroupLatin}>
              {LATIN_FONTS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </optgroup>
            <optgroup label={s.fontGroupArabic}>
              {ARABIC_FONTS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </optgroup>
          </select>
        </>,
      )}

      {/* ── Quote Font Size ── */}
      {section(
        3,
        <>
          <label className="control-label">
            {s.labelQuoteFontSize}{" "}
            <span className="control-value">{fontSize}px</span>
          </label>
          <input
            type="range"
            className="control-range"
            min={12}
            max={48}
            value={fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          />
        </>,
      )}

      {/* ── Direction & Alignment ── */}
      {section(
        4,
        <>
          <label className="control-label">{s.labelDirectionAlignment}</label>
          <div className="dir-align-row">
            <div className="tab-group dir-toggle">
              <button
                className={`tab-btn ${!isRTL ? "active" : ""}`}
                onClick={() => onChange({ direction: "ltr" as Direction })}
              >
                {s.btnLtr}
              </button>
              <button
                className={`tab-btn ${isRTL ? "active" : ""}`}
                onClick={() => onChange({ direction: "rtl" as Direction })}
              >
                {s.btnRtl}
              </button>
            </div>
            <div className="align-group">
              {(["left", "center", "right"] as TextAlign[]).map((a) => (
                <motion.button
                  key={a}
                  className={`align-btn ${textAlign === a ? "active" : ""}`}
                  onClick={() => onChange({ textAlign: a })}
                  title={a}
                  whileTap={{ scale: 0.9 }}
                >
                  {a === "left" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="15" y2="12" />
                      <line x1="3" y1="18" x2="18" y2="18" />
                    </svg>
                  )}
                  {a === "center" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="6" y1="12" x2="18" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                  )}
                  {a === "right" && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="9" y1="12" x2="21" y2="12" />
                      <line x1="6" y1="18" x2="21" y2="18" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </>,
      )}

      {/* ── Card Size ── */}
      {section(
        5,
        <>
          <label className="control-label">{s.labelCardSize}</label>
          <div className="ratio-group">
            {ASPECT_RATIOS.map((r) => (
              <motion.button
                key={r.value}
                className={`ratio-btn ${aspectRatio === r.value ? "active" : ""}`}
                onClick={() =>
                  onChange({ aspectRatio: r.value as AspectRatio })
                }
                whileTap={{ scale: 0.97 }}
              >
                {s[r.key]}
              </motion.button>
            ))}
          </div>
        </>,
      )}

      {/* ── Background ── */}
      {section(
        6,
        <>
          <label className="control-label">{s.labelBackground}</label>
          <div className="tab-group">
            <button
              className={`tab-btn ${backgroundType === "solid" ? "active" : ""}`}
              onClick={() =>
                onChange({ backgroundType: "solid" as BackgroundType })
              }
            >
              {s.btnSolid}
            </button>
            <button
              className={`tab-btn ${backgroundType === "gradient" ? "active" : ""}`}
              onClick={() =>
                onChange({ backgroundType: "gradient" as BackgroundType })
              }
            >
              {s.btnGradient}
            </button>
          </div>

          {backgroundType === "solid" ? (
            <div className="color-row">
              <input
                type="color"
                className="color-swatch"
                value={solidColor}
                onChange={(e) => onChange({ solidColor: e.target.value })}
              />
              <span className="color-hex">{solidColor}</span>
            </div>
          ) : (
            <div className="gradient-controls">
              <div className="gradient-presets">
                {GRADIENTS.map((g) => (
                  <motion.button
                    key={g.label}
                    className="gradient-preset"
                    title={g.label}
                    style={{
                      background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                    }}
                    onClick={() => handleGradientPreset(g)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
              <div className="color-row">
                <label className="mini-label">{s.gradientFrom}</label>
                <input
                  type="color"
                  className="color-swatch"
                  value={gradient.from || "#000000"}
                  onChange={(e) =>
                    onChange({
                      gradient: { ...gradient, from: e.target.value },
                    })
                  }
                />
                <label className="mini-label">{s.gradientTo}</label>
                <input
                  type="color"
                  className="color-swatch"
                  value={gradient.to || "#ffffff"}
                  onChange={(e) =>
                    onChange({ gradient: { ...gradient, to: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="mini-label">{s.gradientDirection}</label>
                <select
                  className="control-select"
                  value={gradient.direction}
                  onChange={(e) =>
                    onChange({
                      gradient: { ...gradient, direction: e.target.value },
                    })
                  }
                >
                  {GRADIENT_DIRECTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {s[d.key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>,
      )}

      {/* ── Text Color ── */}
      {section(
        7,
        <>
          <label className="control-label">{s.labelTextColor}</label>
          <div className="color-row">
            <input
              type="color"
              className="color-swatch"
              value={textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
            />
            <span className="color-hex">{textColor}</span>
            <button
              className="btn btn-ghost"
              onClick={() => onChange({ textColor: "#ffffff" })}
            >
              {s.btnWhite}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => onChange({ textColor: "#111827" })}
            >
              {s.btnDark}
            </button>
          </div>
        </>,
      )}

      {/* ── Download ── */}
      <motion.section
        className="control-section download-section"
        custom={8}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="btn btn-primary"
          onClick={onDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
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
      </motion.section>
    </aside>
  );
}
