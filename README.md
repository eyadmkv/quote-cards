<div align="center">

<img src="public/favicon.svg" width="72" height="72" alt="Quote Cards logo" />

# Quote Cards

**Create beautiful, shareable quote images in seconds.**

Arabic & RTL support · 14 Google Fonts · Gradient backgrounds · 2× PNG export · Works offline

[![Live Demo](https://img.shields.io/badge/Live%20Demo-quote--cards.vercel.app-7c3aed?style=for-the-badge&logo=vercel&logoColor=white)](https://quote-cards.vercel.app)
[![Built with React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5a0fc8?style=for-the-badge&logo=pwa&logoColor=white)](https://quote-cards.vercel.app)

</div>

---

> [!WARNING]
> **~60% of this project was built with AI assistance** (Claude Sonnet). The design decisions, feature direction, Arabic content, and final review are human — but a significant portion of the code was AI-generated.

---

## ✨ Features

### 🎨 Card Designer
- Free-form **quote and author** inputs with instant live preview
- **14 fonts** — 8 Latin + 6 Arabic, all loaded from Google Fonts
- **Independent font size sliders** for the quote body (12–48 px) and author line (10–32 px)
- **Text alignment** — Left, Center, Right
- **4 aspect ratios** — Square 1:1 · Landscape 16:9 · Portrait 4:5 · Story 9:16
- **Backgrounds** — solid color or gradient (7 presets + full custom from/to + 4 angle directions)
- **Text color picker** with White / Dark quick-set buttons

### 🌍 Arabic & RTL
- **6 Arabic Google Fonts** — Amiri, Cairo, Tajawal, Scheherazade New, Noto Naskh Arabic, Reem Kufi
- **Auto-detection** — typing Arabic characters instantly flips the card to RTL + right-align
- Switching to an Arabic font **auto-enables RTL**; switching back reverts to LTR
- **Manual LTR / RTL toggle** always available
- Full **Egyptian Arabic UI** (عامية مصرية) — every label, button, and placeholder translates when you switch to عربي mode
- **EN / عربي toggle** lives in the sidebar header

### 🎲 Random Quote
- **60 curated quotes** — English icons (Mandela, Einstein, Twain…) and Arabic authors (المتنبي, جبران, نجيب محفوظ, محمود درويش, نزار قباني)
- Respects your active locale — Arabic mode picks an Arabic quote, English mode picks English
- No external API — **fully offline capable**

### 📤 Export
- **2× pixel-ratio PNG** — crisp on retina screens and social media
- **Font pre-loading** via `document.fonts.load()` before capture — Arabic and Latin fonts render correctly in the exported image every time
- **Toast notifications** for success and failure feedback

### 📱 PWA & Mobile
- **Installable** on iOS and Android — works as a standalone app
- **Offline support** via Workbox service worker (app shell + Google Fonts cached for 1 year)
- **State persisted** to `localStorage` — your card survives a page refresh
- **Mobile-first layout** — sidebar becomes a bottom-sheet drawer on small screens
- Safe-area insets for notched iPhones (`env(safe-area-inset-bottom)`)

### 🎬 Animations
- Framer Motion throughout — entrance animations, quote cross-fade on random, card layout animation on aspect ratio change, staggered sidebar sections, `whileTap` on every button

---

## 🛠 Tech Stack

| | |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build** | Vite 8 |
| **Animations** | Framer Motion |
| **Image Export** | html-to-image |
| **PWA** | vite-plugin-pwa + Workbox |
| **Persistence** | `localStorage` (custom debounced hook) |
| **Fonts** | Google Fonts — 14 families |
| **Styles** | Vanilla CSS with custom properties + dark mode |

---

## 📁 Project Structure

```quote-cards/src/App.tsx#L1-1
src/
├── components/
│   ├── Controls.tsx          # Sidebar — all inputs, pickers, buttons
│   ├── QuoteCard.tsx         # Card preview & export target
│   └── Toast.tsx             # Animated notification stack
├── hooks/
│   └── usePersistedConfig.ts # localStorage save/restore (debounced)
├── App.tsx                   # Root — state, layout, handlers
├── i18n.ts                   # English + Egyptian Arabic strings
├── quotes.ts                 # 60 curated quotes (EN + AR)
├── types.ts                  # Shared TypeScript types
└── index.css                 # All styles, tokens, responsive layout
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ · npm 9+

```quote-cards/README.md#L1-1
git clone https://github.com/eyadmkv/quote-cards.git
cd quote-cards
npm install
npm run dev
```

Open **http://localhost:5173**

```quote-cards/README.md#L1-1
# Production build
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## 🧩 CardConfig

Every card setting lives in one typed object, persisted automatically:

```quote-cards/src/types.ts#L28-47
interface CardConfig {
  quote:          string;
  author:         string;
  backgroundType: "solid" | "gradient";
  solidColor:     string;               // hex
  gradient:       { from, to, direction };
  textColor:      string;               // hex
  font:           FontFamily;           // CSS font-family string
  textAlign:      "left" | "center" | "right";
  direction:      "ltr" | "rtl";
  aspectRatio:    "1/1" | "16/9" | "4/5" | "9/16";
  fontSize:       number;               // 12–48 px
  authorFontSize: number;               // 10–32 px
  locale:         "en" | "ar-EG";
}
```

---

## ➕ Adding Quotes

Append to the `QUOTES` array in `src/quotes.ts`:

```quote-cards/src/quotes.ts#L1-1
{ quote: "Your quote.", author: "Author Name", lang: "en" }
// lang: "ar" for Arabic — served automatically in Arabic mode
```

## 🌐 Adding a Locale

1. Add the key to `Locale` in `src/types.ts`
2. Add a `Strings` object in `src/i18n.ts`
3. Add a toggle button in the header inside `src/components/Controls.tsx`

---

<div align="center">

Made by **[Eyad](https://eyadmkv.vercel.app)** · [GitHub](https://github.com/eyadmkv)

</div>
