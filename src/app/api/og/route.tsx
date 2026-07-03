import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "60px",
          border: "4px solid #00d4ff",
          fontFamily: "sans-serif",
          color: "#f5f5f5",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 20,
              color: "#00d4ff",
              letterSpacing: "4px",
              fontWeight: "bold",
            }}
          >
            SPLIT SECOND // v2.0
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#ff9500",
              backgroundColor: "#1a1a1e",
              padding: "8px 16px",
              borderRadius: "20px",
            }}
          >
            IAAF ≤100ms CEILING
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            JINESH DABHI
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#00d4ff",
            }}
          >
            Frontend Developer & Track Architecture
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "24px",
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>WorkoutWala • Enterprise HRMS • IPL Platform</span>
          <span>Navsari, India</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
