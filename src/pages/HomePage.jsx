import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";
import serviceData from "../services.json";

const HomePage = ({ isVisible }) => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const [hoveredMachine, setHoveredMachine] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);

  const machines = machineData.machines.slice(0, 6);
  const services = serviceData.services;

  const brands = ["Authorized Mazak Distributor", "Sales & Service", "Turnkey Solutions", "Automation", "Multi-Tasking", "5-Axis", "Turning", "Machining Centers"];

  const stats = [
    { value: "17+", label: "Mazak Models" },
    { value: "100%", label: "Dedicated Service" },
    { value: "5", label: "Machine Categories" },
    { value: "24/7", label: "Service Support" },
  ];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 48px 80px",
      }}>
        <div className="hero-grid" />

        <div style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,55,42,0.12), transparent 70%)",
          animation: "heroGlow 6s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,108,255,0.08), transparent 70%)",
          animation: "heroGlow 8s ease-in-out infinite 2s",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeUp 0.8s ease-out 0.2s both",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ height: 1, width: 32, background: t.borderSecondary }} />
              <img src={t.logo} alt="CPMT" style={{ height: 28, width: "auto", opacity: 0.7 }} />
              <div style={{ height: 1, width: 32, background: t.borderSecondary }} />
            </div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#C12033",
            }}>
              Cassavant Precision Machine Tools
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-3px",
            marginBottom: 28,
            animation: "fadeUp 0.8s ease-out 0.4s both",
          }}>
            Precision{" "}
            <span style={{
              background: "linear-gradient(135deg, #C12033, #E8475A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}>
              Machines
            </span>
            <br />
            Built to Perform
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto 44px",
            animation: "fadeUp 0.8s ease-out 0.6s both",
          }}>
            Your authorized Mazak distributor. Sales, service, automation, and engineering excellence.
          </p>

          <div style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp 0.8s ease-out 0.8s both",
          }}>
            <Link to="/machines" className="cta-primary">
              Explore Machines →
            </Link>
            <Link to="/contact" className="cta-outline">
              Get a Quote
            </Link>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 64px)",
            marginTop: 80,
            flexWrap: "wrap",
            animation: "fadeUp 0.8s ease-out 1s both",
          }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-block">
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  color: "#C12033",
                  marginBottom: 4,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: t.textTertiary, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BRAND MARQUEE ==================== */}
      <section style={{
        borderTop: `1px solid ${t.borderDivider}`,
        borderBottom: `1px solid ${t.borderDivider}`,
        padding: "32px 0",
        overflow: "hidden",
        background: t.bgSection,
      }}>
        <div style={{ display: "flex", overflow: "hidden" }}>
          <div className="brand-scroll">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 14,
                fontWeight: 700,
                color: t.textSubtle,
                letterSpacing: 3,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 60,
              }}>
                {b}
                <span style={{ color: "#C12033", fontSize: 8 }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MACHINES PREVIEW ==================== */}
      <section id="machines" data-animate style={{
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("machines") ? 1 : 0,
          transform: isVisible("machines") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="section-label">Our Inventory</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
              CNC Machine<br />
              <span style={{ color: "#C12033" }}>Tools</span>
            </h2>
            <p style={{ color: t.textTertiary, maxWidth: 400, fontSize: 15, lineHeight: 1.7 }}>
              Explore our full range of Mazak machining centers, turning centers, multi-tasking machines, and automation solutions.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {machines.map((machine, i) => (
              <Link
                to={`/machines/${machine.manufacturer.toLowerCase()}/${machine.slug}`}
                key={machine.slug}
                className="machine-card"
                onMouseEnter={() => setHoveredMachine(i)}
                onMouseLeave={() => setHoveredMachine(null)}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  opacity: isVisible("machines") ? 1 : 0,
                  transform: isVisible("machines") ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#C12033", fontFamily: "'Space Mono', monospace", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
                      {machine.type}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
                      {machine.name}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      {manufacturers[machine.manufacturer] ? (
                        <img
                          src={isDark ? manufacturers[machine.manufacturer].logoDark : manufacturers[machine.manufacturer].logoLight}
                          alt={machine.manufacturer}
                          style={{ height: 14, width: "auto", opacity: 0.6 }}
                        />
                      ) : (
                        <span style={{ fontSize: 12, color: t.textTertiary }}>{machine.manufacturer}</span>
                      )}
                    </div>
                  </div>
                  <img src={machine.image} alt={machine.name} style={{ width: 120, height: 120, objectFit: "contain", borderRadius: 8, opacity: 0.9 }} />
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                  <div style={{
                    padding: "6px 14px",
                    background: t.bgTag,
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    color: t.textSecondary,
                  }}>
                    {machine.specs}
                  </div>
                  <div style={{
                    padding: "6px 14px",
                    background: t.bgTag,
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    color: t.textSecondary,
                  }}>
                    {machine.speed}
                  </div>
                </div>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 16,
                  borderTop: `1px solid ${t.borderPrimary}`,
                }}>
                  <span style={{ fontSize: 13, color: t.textTertiary }}>View Specifications</span>
                  <span style={{
                    color: "#C12033",
                    fontSize: 18,
                    transform: hoveredMachine === i ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.3s",
                  }}>→</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/machines" className="cta-outline">
              View Full Inventory →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" data-animate style={{
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          opacity: isVisible("services") ? 1 : 0,
          transform: isVisible("services") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">What We Do</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: -2 }}>
              End-to-End <span style={{ color: "#C12033" }}>Solutions</span>
            </h2>
            <p style={{ color: t.textTertiary, maxWidth: 500, margin: "16px auto 0", fontSize: 15, lineHeight: 1.7 }}>
              From initial consultation to ongoing support — we're your partner through every step of the manufacturing process.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: 20,
          }}>
            {services.map((svc, i) => (
              <Link
                to={`/services/${svc.slug}`}
                key={svc.slug}
                className="service-card"
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  opacity: isVisible("services") ? 1 : 0,
                  transform: isVisible("services") ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: `${svc.color}15`,
                  border: `1px solid ${svc.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: svc.color,
                  marginBottom: 20,
                  transition: "all 0.3s",
                  transform: hoveredService === i ? "scale(1.1)" : "scale(1)",
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: -0.3 }}>
                  {svc.title}
                </h3>
                <p style={{ color: t.textTertiary, fontSize: 14, lineHeight: 1.7 }}>
                  {svc.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA / ABOUT BAND ==================== */}
      <section id="about" data-animate style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        borderTop: `1px solid ${t.borderDivider}`,
        borderBottom: `1px solid ${t.borderDivider}`,
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          opacity: isVisible("about") ? 1 : 0,
          transform: isVisible("about") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="section-label">
            Precision Without Compromise
          </div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 20 }}>
            Your manufacturing success is{" "}
            <span style={{ color: "#C12033" }}>our mission.</span>
          </h2>
          <p style={{ fontSize: 17, color: t.textSecondary, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 36px" }}>
            Partnering with machine shops, job shops, aerospace manufacturers, and production facilities. Factory-trained technicians. Dedicated application engineers. A brand you can trust.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/about" className="cta-primary">
              Meet Our Team →
            </Link>
            <Link to="/contact" className="cta-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
