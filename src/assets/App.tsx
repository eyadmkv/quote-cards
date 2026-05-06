import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("#111827");
  const [font, setFont] = useState("serif");

  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current);
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Quote Generator</h1>

      <input
        placeholder="Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <select onChange={(e) => setFont(e.target.value)}>
        <option value="serif">Serif</option>
        <option value="sans-serif">Sans</option>
        <option value="cursive">Cursive</option>
      </select>

      <button onClick={downloadImage}>Download</button>

      <div
        ref={cardRef}
        style={{
          marginTop: 20,
          padding: 40,
          background: color,
          color: "white",
          fontFamily: font,
          width: 400,
          borderRadius: 12
        }}
      >
        <h2>{quote || "Your quote here"}</h2>
        <p>- {author || "Author"}</p>
      </div>
    </div>
  );
}