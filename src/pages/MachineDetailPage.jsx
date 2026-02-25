import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";

const MachineDetailPage = () => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const { manufacturer, slug } = useParams();

  const machine = machineData.machines.find(
    (m) => m.slug === slug && m.manufacturer.toLowerCase() === manufacturer
  );

  if (!machine) {
    return (
      <section style={{
        padding: "200px clamp(24px, 5vw, 80px) 100px",
        textAlign: "center",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>Machine Not Found</h1>
        <p style={{ color: t.textSecondary, fontSize: 16, marginBottom: 32 }}>
          The machine you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/machines" className="cta-primary">
          ← Back to All Machines
        </Link>
      </section>
    );
  }

  const specEntries = Object.entries(machine.specifications || {});

  // Find related machines (same category, excluding current)
  const related = machineData.machines
    .filter((m) => m.category === machine.category && m.slug !== machine.slug)
    .slice(0, 3);

  return (
    <>
      {/* ==================== BREADCRUMB + HERO ==================== */}
      <section style={{
        padding: "120px clamp(24px, 5vw, 80px) 0",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        {/* Breadcrumb */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 40,
          fontSize: 13,
          fontFamily: "'Space Mono', monospace",
          animation: "fadeUp 0.6s ease-out 0.1s both",
        }}>
          <Link to="/machines" style={{ color: t.textTertiary, textDecoration: "none" }}>
            Machines
          </Link>
          <span style={{ color: t.textTertiary }}>→</span>
          <span style={{ color: t.textTertiary }}>{machine.manufacturer}</span>
          <span style={{ color: t.textTertiary }}>→</span>
          <span style={{ color: "#C12033" }}>{machine.name}</span>
        </nav>

        {/* Hero layout */}
        <div style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
          animation: "fadeUp 0.6s ease-out 0.2s both",
        }}>
          {/* Image */}
          <div style={{
            flex: "1 1 400px",
            minHeight: 360,
            background: t.bgSection,
            borderRadius: 16,
            border: `1px solid ${t.borderPrimary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}>
            <img
              src={machine.image}
              alt={machine.name}
              style={{
                maxWidth: "100%",
                maxHeight: 320,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: "1 1 400px" }}>
            <div style={{
              fontSize: 11,
              color: "#C12033",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}>
              {machine.type}
            </div>

            <h1 style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 8,
            }}>
              {machine.name}
            </h1>

            <div style={{ marginBottom: 20 }}>
              {manufacturers[machine.manufacturer] ? (
                <img
                  src={isDark ? manufacturers[machine.manufacturer].logoDark : manufacturers[machine.manufacturer].logoLight}
                  alt={machine.manufacturer}
                  style={{ height: 18, width: "auto", opacity: 0.6 }}
                />
              ) : (
                <span style={{ fontSize: 14, color: t.textTertiary }}>{machine.manufacturer}</span>
              )}
            </div>

            {machine.tagline && (
              <p style={{
                fontSize: 18,
                color: t.textSecondary,
                fontStyle: "italic",
                marginBottom: 24,
                lineHeight: 1.5,
              }}>
                {machine.tagline}
              </p>
            )}

            <p style={{
              fontSize: 16,
              color: t.textSecondary,
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              {machine.description}
            </p>

            {/* Quick specs tags */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <div style={{
                padding: "8px 16px",
                background: t.bgTag,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "'Space Mono', monospace",
                color: t.textSecondary,
              }}>
                {machine.specs}
              </div>
              <div style={{
                padding: "8px 16px",
                background: t.bgTag,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "'Space Mono', monospace",
                color: t.textSecondary,
              }}>
                {machine.speed}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="cta-primary">
                Request a Quote →
              </Link>
              <Link to="/contact" className="cta-outline">
                Ask an Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES + SPECIFICATIONS ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 64px)",
          flexWrap: "wrap",
          animation: "fadeUp 0.6s ease-out 0.4s both",
        }}>
          {/* Key Features */}
          {machine.features && machine.features.length > 0 && (
            <div style={{ flex: "1 1 340px" }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: -0.5,
                marginBottom: 24,
              }}>
                Key <span style={{ color: "#C12033" }}>Features</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {machine.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      padding: "16px 20px",
                      background: t.bgSection,
                      borderRadius: 10,
                      border: `1px solid ${t.borderPrimary}`,
                    }}
                  >
                    <span style={{
                      color: "#C12033",
                      fontSize: 10,
                      marginTop: 5,
                      flexShrink: 0,
                    }}>◆</span>
                    <span style={{
                      fontSize: 14,
                      color: t.textSecondary,
                      lineHeight: 1.5,
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Table */}
          {specEntries.length > 0 && (
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: -0.5,
                marginBottom: 24,
              }}>
                <span style={{ color: "#C12033" }}>Specifications</span>
              </h2>
              <div style={{
                borderRadius: 12,
                border: `1px solid ${t.borderPrimary}`,
                overflow: "hidden",
              }}>
                {specEntries.map(([key, value], i) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 20px",
                      background: i % 2 === 0 ? t.bgSection : "transparent",
                      borderBottom: i < specEntries.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                    }}
                  >
                    <span style={{
                      fontSize: 13,
                      color: t.textTertiary,
                      fontFamily: "'Space Mono', monospace",
                    }}>
                      {key}
                    </span>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: t.textPrimary,
                      textAlign: "right",
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==================== RELATED MACHINES ==================== */}
      {related.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
          maxWidth: 1600,
          margin: "0 auto",
          borderTop: `1px solid ${t.borderDivider}`,
        }}>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 32,
          }}>
            Related <span style={{ color: "#C12033" }}>Machines</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/machines/${rel.manufacturer.toLowerCase()}/${rel.slug}`}
                className="machine-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}>
                  <div>
                    <div style={{
                      fontSize: 11,
                      color: "#C12033",
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}>
                      {rel.type}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
                      {rel.name}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      {manufacturers[rel.manufacturer] ? (
                        <img
                          src={isDark ? manufacturers[rel.manufacturer].logoDark : manufacturers[rel.manufacturer].logoLight}
                          alt={rel.manufacturer}
                          style={{ height: 14, width: "auto", opacity: 0.6 }}
                        />
                      ) : (
                        <span style={{ fontSize: 12, color: t.textTertiary }}>{rel.manufacturer}</span>
                      )}
                    </div>
                  </div>
                  <img
                    src={rel.image}
                    alt={rel.name}
                    style={{ width: 100, height: 100, objectFit: "contain", borderRadius: 8, opacity: 0.9 }}
                  />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{
                    padding: "6px 14px",
                    background: t.bgTag,
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    color: t.textSecondary,
                  }}>
                    {rel.specs}
                  </div>
                  <div style={{
                    padding: "6px 14px",
                    background: t.bgTag,
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    color: t.textSecondary,
                  }}>
                    {rel.speed}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ==================== BOTTOM CTA ==================== */}
      <section style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        background: t.ctaGradient,
      }}>
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <div className="section-label">
            Get Started
          </div>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 16,
          }}>
            Ready to add a {machine.name} to your{" "}
            <span style={{ color: "#C12033" }}>shop?</span>
          </h2>
          <p style={{
            fontSize: 17,
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 32px",
          }}>
            Our team can help you configure the right machine, tooling, and automation for your application.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="cta-primary">
              Get a Quote →
            </Link>
            <Link to="/machines" className="cta-outline">
              View All Machines
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MachineDetailPage;
