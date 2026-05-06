export type FontFamily =
  // Latin
  | "serif"
  | "sans-serif"
  | "cursive"
  | "'Playfair Display', serif"
  | "'Lora', serif"
  | "'Montserrat', sans-serif"
  | "'Raleway', sans-serif"
  | "'Dancing Script', cursive"
  | "'Pacifico', cursive"
  // Arabic
  | "'Amiri', serif"
  | "'Cairo', sans-serif"
  | "'Tajawal', sans-serif"
  | "'Scheherazade New', serif"
  | "'Noto Naskh Arabic', serif"
  | "'Reem Kufi', sans-serif";

export type TextAlign = "left" | "center" | "right";

export type Locale = "en" | "ar-EG";

export type Direction = "ltr" | "rtl";

export type AspectRatio = "1/1" | "16/9" | "4/5" | "9/16";

export type BackgroundType = "solid" | "gradient";

export interface Gradient {
  from: string;
  to: string;
  direction: string;
}

export interface CardConfig {
  quote: string;
  author: string;
  backgroundType: BackgroundType;
  solidColor: string;
  gradient: Gradient;
  textColor: string;
  font: FontFamily;
  textAlign: TextAlign;
  direction: Direction;
  aspectRatio: AspectRatio;
  fontSize: number;
  authorFontSize: number;
  locale: Locale;
}
