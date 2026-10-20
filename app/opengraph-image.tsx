import { ImageResponse } from "next/og";

export const alt = "Tablaturas de Mägo de Oz y José Andrea";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          color: "#efe4cc",
          background:
            "radial-gradient(circle at 82% 22%, rgba(243,230,194,0.35), rgba(212,162,76,0.08) 18%, transparent 34%), radial-gradient(ellipse at 80% 95%, rgba(70,196,138,0.35), transparent 55%), linear-gradient(180deg, #040a08 0%, #0b2219 55%, #0a0c09 100%)",
          border: "10px solid #3a3826",
        }}
      >
        <div style={{ display: "flex", color: "#d4a24c", fontSize: 28, letterSpacing: 6 }}>
          TABLATURAS DE GUITARRA
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 18, lineHeight: 1.05 }}>
          Mägo de Oz
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#e2d6bb", marginTop: 8 }}>
          y José Andrea
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            width: 360,
            height: 2,
            background: "linear-gradient(90deg, #d4a24c, transparent)",
          }}
        />
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#b2a68b" }}>
          Riffs · solos · acordes · leyenda de técnicas
        </div>
      </div>
    ),
    size,
  );
}
