import { useTheme } from "../contexts/ThemeContext";

const LineCardPage = () => {
  const { t } = useTheme();

  const categories = [
    { name: "Turning", models: "68 models", img: "/images/machines/quick-turn.webp" },
    { name: "Swiss", models: "20 models", img: "/images/machines/syncrex.webp" },
    { name: "Vertical Turning", models: "14 models", img: "/images/machines/mega-turn.webp" },
    { name: "Vertical Machining", models: "38 models", img: "/images/machines/vc-ez.webp" },
    { name: "Horizontal Machining", models: "24 models", img: "/images/machines/hcn.webp" },
    { name: "5-Axis", models: "39 models", img: "/images/machines/variaxis-i-neo.webp" },
    { name: "Multi-Tasking", models: "88 models", img: "/images/machines/integrex-i-neo.webp" },
    { name: "2D Laser", models: "11 models", img: "/images/machines/optiplex-neo.webp" },
    { name: "3D Laser", models: "2 models", img: "/images/machines/fg-400-neo.webp" },
    { name: "Tube & Pipe Laser", models: "3 models", img: "/images/machines/ft-150-neo.webp" },
    { name: "Additive Manufacturing", models: "1 model", img: "/images/machines/vc-500a-5x-am-hwd.webp" },
    { name: "Friction Stir Welding", models: "1 model", img: "/images/machines/fsw-460v.webp" },
  ];

  const services = [
    { name: "Machine Sales", desc: "New & pre-owned Mazak CNC machines with expert consultation" },
    { name: "Turnkey Solutions", desc: "Complete project management from concept to production" },
    { name: "Automation", desc: "Robotic loading, pallet systems, and lights-out manufacturing" },
    { name: "Service & Parts", desc: "Factory-trained technicians, preventive maintenance, genuine parts" },
    { name: "Engineering", desc: "Application engineering, process optimization, and programming" },
    { name: "Financing", desc: "Leasing, loans, and custom programs through MCEF" },
  ];

  const industries = [
    { name: "Aerospace", badge: "AS9100" },
    { name: "Automotive", badge: "IATF 16949" },
    { name: "Medical", badge: "ISO 13485" },
    { name: "Defense & Government", badge: "ITAR" },
    { name: "Energy & Oil/Gas", badge: "API" },
    { name: "Semiconductors", badge: "ISO 14644" },
    { name: "General Manufacturing", badge: "ISO 9001" },
  ];

  const automationSolutions = [
    { name: "PALLETECH System", desc: "Flexible multi-machine automation", img: "/images/automation/palletech-line-card-nobg.webp" },
    { name: "MPP (Multi Pallet Pool)", desc: "Compact multi-level pallet stocker", img: "/images/automation/mpp-line-card-nobg.webp" },
    { name: "MA (Mill Assist)", desc: "Robotic workpiece transport", img: "/images/automation/ma-line-card-nobg.png" },
    { name: "Ez LOADER", desc: "Compact collaborative robot", img: "/images/automation/ez-loader-line-card-nobg.webp" },
  ];

  const territories = ["Arizona", "New Mexico", "Southern California", "Clark County, NV", "El Paso, TX"];

  return (
    <>
      <style>{`
        @media print {
          nav, footer, .line-card-print-btn { display: none !important; }
          body { background: #fff !important; }
          .line-card-page { padding-top: 0 !important; }
          .line-card-container { box-shadow: none !important; }
        }
      `}</style>

      <section className="line-card-page" style={{
        padding: "140px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <div className="section-label">Resources</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
              Line <span style={{ color: "#C12033" }}>Card</span>
            </h2>
          </div>
          <a
            href="/downloads/CPMT-Line-Card.pdf"
            download
            style={{
              display: "inline-block",
              background: "#C12033",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 28px",
              borderRadius: 8,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(193, 32, 51, 0.3)",
            }}
          >
            Download PDF ↓
          </a>
        </div>

        {/* Line Card Container */}
        <div className="line-card-container" style={{
          background: "#fff",
          color: "#1a1a1a",
          borderRadius: 12,
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          padding: "40px 44px 32px",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingBottom: 6,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <img src="/images/CPMTLogoDark.svg" alt="CPMT" style={{ height: 52, width: "auto" }} />
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>
                  Cassavant Precision<br />Machine Tools
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, textAlign: "right", fontSize: 10, color: "#555", lineHeight: 1.7 }}>
                <div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: "#C12033", letterSpacing: 0.5 }}>cpmtusa.com</div>
                  (602) 487-4134<br />
                  sales@cpmtusa.com<br />
                  Phoenix, AZ
                </div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cpmtusa.com" alt="QR Code" style={{ width: 68, height: 68 }} />
              </div>
            </div>
            <div style={{ paddingBottom: 6, marginTop: 6, borderBottom: "3px solid #C12033" }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#C12033",
                textAlign: "center",
              }}>
                Authorized <img src="/images/manufacturers/mazak-dark.svg" alt="Mazak" style={{ height: 13, width: "auto", verticalAlign: "middle", margin: "0 2px", position: "relative", top: -2 }} /> Distributor &nbsp;&bull;&nbsp; Woman-Owned &nbsp;&bull;&nbsp; GSA Contract Holder
              </div>
            </div>
          </div>

          {/* Machine Categories */}
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#C12033", marginBottom: 10, fontWeight: 700 }}>
            Machine Categories
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
            {categories.map((cat) => (
              <div key={cat.name} style={{
                border: "1.5px solid #e5e5e5",
                borderRadius: 8,
                padding: "14px 14px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg, #C12033, #E8475A)" }} />
                <img src={cat.img} alt={cat.name} style={{ width: 68, height: 50, objectFit: "contain", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{cat.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#888" }}>{cat.models}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Automation Solutions */}
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#C12033", marginBottom: 10, fontWeight: 700 }}>
            Automation Solutions
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 28 }}>
            {automationSolutions.map((item) => (
              <div key={item.name} style={{
                border: "1.5px solid #e5e5e5",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg, #C12033, #E8475A)" }} />
                <div style={{ padding: "8px 6px", display: "flex", alignItems: "center", justifyContent: "center", height: 52 }}>
                  <img src={item.img} alt={item.name} style={{ maxWidth: "100%", maxHeight: 44, objectFit: "contain" }} />
                </div>
                <div style={{ padding: "4px 8px 7px", borderTop: "1px solid #f0f0f0" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{item.name}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#888" }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{
              border: "1.5px dashed #ccc",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#C12033" }}>+ More Solutions</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#888" }}>Laser, turning, & peripheral</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#C12033", marginBottom: 10, fontWeight: 700 }}>
            Services
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 28 }}>
            {services.map((svc) => (
              <div key={svc.name} style={{ background: "#f8f8f8", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{svc.name}</div>
                <div style={{ fontSize: 9, color: "#666", lineHeight: 1.5 }}>{svc.desc}</div>
              </div>
            ))}
          </div>

          {/* Industries */}
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#C12033", marginBottom: 10, fontWeight: 700 }}>
            Industries Served
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {industries.map((ind) => (
              <div key={ind.name} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#fff",
                border: "1.5px solid #e5e5e5",
                borderRadius: 20,
                padding: "7px 14px",
                fontSize: 11,
                fontWeight: 600,
              }}>
                {ind.name}
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  color: "#C12033",
                  background: "rgba(193, 32, 51, 0.08)",
                  padding: "2px 7px",
                  borderRadius: 10,
                  fontWeight: 700,
                }}>{ind.badge}</span>
              </div>
            ))}
          </div>

          {/* Financing Banner */}
          <div style={{
            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
            borderRadius: 10,
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            marginBottom: 28,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>
                <img src="/images/manufacturers/mazak-light.svg" alt="Mazak" style={{ height: 16, width: "auto", verticalAlign: "middle", marginRight: 4, position: "relative", top: -2 }} /> Capital Equipment Financing
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                Flexible leasing, loans, and customized financing. Quick approvals — often within 24 hours.<br />
                0% financing available on select Mazak models. Preserves your bank credit lines.
              </div>
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#E67225",
              border: "1.5px solid rgba(230, 114, 37, 0.5)",
              padding: "6px 14px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}>MCEF Partner</div>
          </div>

          {/* Territory */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#C12033", fontWeight: 700, whiteSpace: "nowrap" }}>
              Territory
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {territories.map((t) => (
                <span key={t} style={{ fontSize: 11, fontWeight: 600, background: "#f8f8f8", borderRadius: 20, padding: "6px 14px" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            paddingTop: 14,
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 9,
            color: "#999",
          }}>
            <div>&copy; 2026 Cassavant Precision Machine Tools, LLC &mdash; cpmtusa.com</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#555" }}>
              Authorized <img src="/images/manufacturers/mazak-dark.svg" alt="Mazak" style={{ height: 12, width: "auto", verticalAlign: "middle", margin: "0 3px", position: "relative", top: -2 }} /> Distributor
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LineCardPage;
