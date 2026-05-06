# Quote Cards

A PWA for creating beautiful, shareable quote cards — with full Arabic/RTL support, Google Fonts, gradient backgrounds, and 2× resolution PNG export.

**Built by [Eyad](https://eyadmkv.vercel.app) · [GitHub](https://github.com/eyadmkv)**

---

## Features

### Card Customization
- **Quote & author text** — free-form input with live preview
- **14 fonts** — 8 Latin (Playfair Display, Lora, Montserrat, Raleway, Dancing Script, Pacifico, System Serif/Sans) and 6 Arabic (Amiri, Cairo, Tajawal, Scheherazade New, Noto Naskh Arabic, Reem Kufi)
- **Independent font sizes** — separate sliders for quote text (12–48 px) and author name (10–32 px)
- **Text alignment** — Left, Center, Right
- **4 aspect ratios** — Square 1:1, Landscape 16:9, Portrait 4:5, Story 9:16
- **Backgrounds** — solid color picker or gradient (7 presets + custom from/to colors + 4 directions)
- **Text color** — full color picker with White/Dark quick-set buttons

### Arabic & RTL Support
- **6 Arabic Google Fonts** served from a dedicated font group in the picker
- **Auto-detection** — typing Arabic characters instantly switches the card to RTL layout and right-alignment
- **Selecting an Arabic font** auto-enables RTL; switching back to a Latin font reverts to LTR
- **Manual LTR / RTL toggle** to override at any time
- **Egyptian Arabic UI locale (عربي)** — every sidebar label, button, placeholder, and card placeholder translates to Egyptian dialect (عامية مصرية)
- **EN / عربي toggle** in the sidebar header

### Random Quote
- **80+ curated quotes** — 50 English (from Roosevelt to Mandela) and 30 Arabic (Quran, Hadith, Egyptian proverbs, Naguib Mahfouz, Gibran)
- Random quotes respect the active UI locale — clicking the button in Arabic mode returns an Arabic quote, and in English mode returns an English one
- No external API dependency — works fully offline

### Export
- **2× pixel ratio PNG** for crisp output on retina and social media
- **Font pre-loading** before capture — Google Fonts are injected and awaited via `document.fonts.load()` so the downloaded image always uses the correct typeface, including Arabic fonts
- **Toast notifications** — success confirmation or error message on every download attempt

### PWA
- **Installable** on iOS and Android — add to home screen works as a proper standalone app
- **Offline-capable** via Workbox service worker with runtime caching for:
  - App shell (JS, CSS, HTML) — cache-first
  - Google Fonts stylesheets and glyphs — cache-first, 1-year TTL
- **State persistence** — your last card config is saved to `localStorage` and restored on next visit (debounced 600 ms)
- Full PWA manifest with name, description, theme color (`#7c3aed`), and 192 × 512 px icons

### UI / UX
- **Mobile-first** — on small screens the sidebar becomes a bottom-sheet drawer triggered by a top bar button, with a drag handle and backdrop dismiss
- **Framer Motion animations** — sidebar entrance, card fade-up on load, quote cross-fade on random, author fade in/out, card layout animation on aspect ratio change, staggered control sections, `whileTap` on every interactive element
- **Dark mode** — full CSS variable–based dark theme respects `prefers-color-scheme`
- **Responsive** — breakpoint at 700 px; below that the layout stacks vertically
- Safe-area insets (`env(safe-area-inset-bottom)`) for notched iPhones

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Animations | Framer Motion |
| Image export | html-to-image |
| PWA | vite-plugin-pwa + Workbox |
| Persistence | `localStorage` via custom hook |
| Fonts | Google Fonts (14 families) |
| Styling | Plain CSS with custom properties |

---

## Project Structure

```quote-cards/src#L1-1
src/
├── components/
│   ├── Controls.tsx      # Sidebar — all inputs, selectors, buttons
│   ├── QuoteCard.tsx     # The card preview (also the export target)
│   └── Toast.tsx         # Animated toast notification stack
├── hooks/
│   └── usePersistedConfig.ts  # localStorage save/restore with debounce
├── App.tsx               # Root — state, handlers, layout
├── i18n.ts               # English + Egyptian Arabic string tables
├── quotes.ts             # 80+ curated English & Arabic quotes
├── types.ts              # Shared TypeScript types (CardConfig, etc.)
└── index.css             # All styles — tokens, components, responsive
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & run

```quote-cards/README.md#L1-1
git clone https://github.com/eyadmkv/quote-cards.git
cd quote-cards
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```quote-cards/README.md#L1-1
npm run build
npm run preview
```

The `dist/` folder contains the fully static PWA — deploy anywhere (Vercel, Netlify, GitHub Pages, etc.).

---

## CardConfig Shape

Every setting on the card is captured in a single `CardConfig` object that is persisted to `localStorage`:

```quote-cards/src/types.ts#L28-47
interface CardConfig {
  quote:          string;
  author:         string;
  backgroundType: "solid" | "gradient";
  solidColor:     string;          // hex
  gradient: {
    from:      string;             // hex
    to:        string;             // hex
    direction: string;             // CSS angle, e.g. "135deg"
  };
  textColor:      string;          // hex
  font:           FontFamily;      // CSS font-family value
  textAlign:      "left" | "center" | "right";
  direction:      "ltr" | "rtl";
  aspectRatio:    "1/1" | "16/9" | "4/5" | "9/16";
  fontSize:       number;          // px, 12–48
  authorFontSize: number;          // px, 10–32
  locale:         "en" | "ar-EG";
}
```

---

## Adding More Quotes

Open `src/quotes.ts` and append to the `QUOTES` array:

```quote-cards/src/quotes.ts#L1-8
{
  quote: "Your quote text here.",
  author: "Author Name",
  lang: "en",   // or "ar" for Arabic
}
```

Arabic quotes are automatically served when the UI is in Egyptian Arabic mode.

---

## Adding a New Locale

1. Add the locale key to the `Locale` type in `src/types.ts`
2. Add a complete `Strings` object in `src/i18n.ts`
3. Add a button to the locale toggle in `src/components/Controls.tsx`

---

## License

MIT
