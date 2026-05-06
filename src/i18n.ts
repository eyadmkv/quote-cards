import type { Locale } from "./types";

export interface Strings {
  // Header
  appName: string;

  // Section labels
  labelQuote: string;
  labelAuthor: string;
  labelAuthorFontSize: string;
  labelFont: string;
  labelQuoteFontSize: string;
  labelDirectionAlignment: string;
  labelCardSize: string;
  labelBackground: string;
  labelTextColor: string;

  // Font group headers
  fontGroupLatin: string;
  fontGroupArabic: string;

  // Inputs / placeholders
  placeholderQuote: string;
  placeholderAuthor: string;

  // Buttons
  btnRandomQuote: string;
  btnFetching: string;
  btnDownload: string;
  btnWhite: string;
  btnDark: string;
  btnSolid: string;
  btnGradient: string;
  btnLtr: string;
  btnRtl: string;
  btnCustomize: string;

  // Gradient sub-labels
  gradientFrom: string;
  gradientTo: string;
  gradientDirection: string;

  // Aspect ratio labels
  ratioSquare: string;
  ratioLandscape: string;
  ratioPortrait: string;
  ratioStory: string;

  // Gradient direction labels
  gradDirDiagonalDown: string;
  gradDirHorizontal: string;
  gradDirVertical: string;
  gradDirDiagonalUp: string;

  // Preview
  previewHint: string;

  // Card placeholder
  cardPlaceholder: string;

  // Toasts
  toastDownloadSuccess: string;
  toastDownloadError: string;
}

const en: Strings = {
  appName: "Quote Cards",

  labelQuote: "Quote",
  labelAuthor: "Author",
  labelAuthorFontSize: "Author Font Size",
  labelFont: "Font",
  labelQuoteFontSize: "Quote Font Size",
  labelDirectionAlignment: "Direction & Alignment",
  labelCardSize: "Card Size",
  labelBackground: "Background",
  labelTextColor: "Text Color",

  fontGroupLatin: "Latin",
  fontGroupArabic: "Arabic / عربي",

  placeholderQuote: "Enter your quote…",
  placeholderAuthor: "Author name",

  btnRandomQuote: "Random Quote",
  btnFetching: "Fetching…",
  btnDownload: "Download PNG",
  btnWhite: "White",
  btnDark: "Dark",
  btnSolid: "Solid",
  btnGradient: "Gradient",
  btnLtr: "LTR",
  btnRtl: "RTL",
  btnCustomize: "Customize",

  gradientFrom: "From",
  gradientTo: "To",
  gradientDirection: "Direction",

  ratioSquare: "Square (1:1)",
  ratioLandscape: "Landscape (16:9)",
  ratioPortrait: "Portrait (4:5)",
  ratioStory: "Story (9:16)",

  gradDirDiagonalDown: "↘ Diagonal",
  gradDirHorizontal: "→ Horizontal",
  gradDirVertical: "↓ Vertical",
  gradDirDiagonalUp: "↗ Diagonal",

  previewHint: "Live preview · 2× resolution export",

  cardPlaceholder: "Your quote will appear here…",

  toastDownloadSuccess: "Image downloaded successfully!",
  toastDownloadError: "Download failed. Please try again.",
};

// Egyptian Arabic — عامية مصرية
const arEG: Strings = {
  appName: "بطاقات الاقتباس",

  labelQuote: "الاقتباس",
  labelAuthor: "صاحب الكلام",
  labelAuthorFontSize: "حجم خط الاسم",
  labelFont: "الخط",
  labelQuoteFontSize: "حجم خط الاقتباس",
  labelDirectionAlignment: "الاتجاه والمحاذاة",
  labelCardSize: "حجم الكارت",
  labelBackground: "الخلفية",
  labelTextColor: "لون الكلام",

  fontGroupLatin: "لاتيني",
  fontGroupArabic: "عربي",

  placeholderQuote: "اكتب اقتباسك هنا…",
  placeholderAuthor: "اسم الكاتب",

  btnRandomQuote: "اقتباس عشوائي",
  btnFetching: "بيجيب…",
  btnDownload: "تحميل PNG",
  btnWhite: "أبيض",
  btnDark: "غامق",
  btnSolid: "لون واحد",
  btnGradient: "تدرج",
  btnLtr: "يسار",
  btnRtl: "يمين",
  btnCustomize: "تخصيص",

  gradientFrom: "من",
  gradientTo: "لـ",
  gradientDirection: "الاتجاه",

  ratioSquare: "مربع (1:1)",
  ratioLandscape: "أفقي (16:9)",
  ratioPortrait: "عمودي (4:5)",
  ratioStory: "ستوري (9:16)",

  gradDirDiagonalDown: "↙ قطري",
  gradDirHorizontal: "← أفقي",
  gradDirVertical: "↓ رأسي",
  gradDirDiagonalUp: "↖ قطري",

  previewHint: "معاينة مباشرة · تصدير بدقة ضعف",

  cardPlaceholder: "هيظهر اقتباسك هنا…",

  toastDownloadSuccess: "اتحمّلت الصورة بنجاح!",
  toastDownloadError: "فشل التحميل. حاول تاني.",
};

export const translations: Record<Locale, Strings> = { en, "ar-EG": arEG };

export function t(locale: Locale): Strings {
  return translations[locale];
}
