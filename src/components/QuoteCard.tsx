import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CardConfig } from "../types";
import { t } from "../i18n";

interface QuoteCardProps {
  config: CardConfig;
}

const aspectRatioMap: Record<string, string> = {
  "1/1": "100%",
  "16/9": "56.25%",
  "4/5": "125%",
  "9/16": "177.78%",
};

const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(
  ({ config }, ref) => {
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

    const isRTL = direction === "rtl";

    const background =
      backgroundType === "gradient"
        ? `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.to})`
        : solidColor;

    const paddingBottom = aspectRatioMap[aspectRatio] ?? "100%";

    const placeholderText = t(locale).cardPlaceholder;

    return (
      <motion.div
        className="card-wrapper"
        style={{ paddingBottom }}
        layout
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          ref={ref}
          className="quote-card"
          dir={direction}
          style={{ background, color: textColor, fontFamily: font, textAlign }}
          layout
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Opening quote mark */}
          <span
            className="quote-mark open-quote"
            style={{ color: textColor, alignSelf: "flex-start" }}
          >
            {"\u201C"}
          </span>

          {/* Quote body */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quote.slice(0, 30)}
              className="quote-text"
              style={{ fontSize: `${fontSize}px` }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {quote || placeholderText}
            </motion.blockquote>
          </AnimatePresence>

          {/* Closing quote mark */}
          <span
            className="quote-mark close-quote"
            style={{ color: textColor, alignSelf: "flex-end" }}
          >
            {"\u201D"}
          </span>

          {/* Author */}
          <AnimatePresence>
            {author && (
              <motion.p
                className="quote-author"
                style={{ textAlign, fontSize: `${authorFontSize}px` }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {isRTL ? `${author} —` : `— ${author}`}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  },
);

QuoteCard.displayName = "QuoteCard";

export default QuoteCard;
