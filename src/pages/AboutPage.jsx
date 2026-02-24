import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const AboutPage = ({ isVisible }) => {
  const { t } = useTheme();

  const values = [
    {
      title: "Precision First",
      description: "Every machine we sell, every solution we engineer, and every service call we make is driven by an unwavering commitment to precision and quality.",
      color: "#C12033",
    },
    {
      title: "Customer Partnership",
      description: "We don't just sell machines — we build lasting partnerships. Your success on the shop floor is our success, and we're with you every step of the way.",
      color: "#1A6CFF",
    },
    {
      title: "Technical Excellence",
      description: "Our factory-trained engineers and technicians bring deep expertise to every project, from initial consultation through installation and ongoing support.",
      color: "#00C47D",
    },
    {
      title: "Continuous Innovation",
      description: "Manufacturing never stands still, and neither do we. We stay ahead of industry trends to bring you the latest in CNC technology and automation.",
      color: "#FF8A00",
    },
  ];

  const milestones = [
    { year: "Founded", detail: "Cassavant Precision Machine Tools established as an authorized Mazak distributor, committed to delivering world-class CNC solutions." },
    { year: "Growth", detail: "Expanded our service capabilities with factory-trained technicians and a dedicated parts department for rapid response." },
    { year: "Innovation", detail: "Introduced turnkey manufacturing solutions and automation integration, helping customers modernize their production." },
    { year: "Today", detail: "A full-service partner for CNC machine sales, engineering, automation, and support — serving manufacturers across the region." },
  ];

  const strengths = [
    { label: "Authorized Mazak Distributor", desc: "Factory-backed sales, service, and parts for the full Mazak product line." },
    { label: "Factory-Trained Technicians", desc: "Our service team is certified by Mazak to handle everything from routine PM to complex repairs." },
    { label: "Application Engineering", desc: "Dedicated engineers who analyze your parts and processes to recommend the optimal machine and tooling." },
    { label: "Turnkey Solutions", desc: "From machine selection to installation, tooling, fixturing, programming, and operator training." },
    { label: "Automation Integration", desc: "Robot loading, bar feeders, pallet changers, and custom automation to maximize your throughput." },
    { label: "24/7 Service Support", desc: "Emergency breakdown response and remote diagnostics to minimize your downtime." },
  ];

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section style={{
        padding: "160px clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,32,51,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ animation: "fadeUp 0.8s ease-out 0.2s both" }}>
            About Us
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: 20,
            animation: "fadeUp 0.8s ease-out 0.4s both",
          }}>
            Your Partner in{" "}
            <span style={{
              background: "linear-gradient(135deg, #C12033, #E8475A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}>
              Precision Manufacturing
            </span>
          </h1>
          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 620,
            margin: "0 auto 36px",
            animation: "fadeUp 0.8s ease-out 0.6s both",
          }}>
            Cassavant Precision Machine Tools is your authorized Mazak distributor — delivering world-class CNC machines, engineering expertise, and dedicated service to manufacturers who demand the best.
          </p>
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp 0.8s ease-out 0.8s both",
          }}>
            <Link to="/contact" className="cta-primary">
              Get in Touch →
            </Link>
            <Link to="/machines" className="cta-outline">
              Explore Machines
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MISSION ==================== */}
      <section id="mission" data-animate style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          opacity: isVisible("mission") ? 1 : 0,
          transform: isVisible("mission") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            display: "flex",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: "1 1 400px" }}>
              <div className="section-label">Our Mission</div>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: -1.5,
                lineHeight: 1.15,
                marginBottom: 20,
              }}>
                Empowering Manufacturers to{" "}
                <span style={{ color: "#C12033" }}>Build Better</span>
              </h2>
              <p style={{
                fontSize: 16,
                color: t.textSecondary,
                lineHeight: 1.8,
                marginBottom: 20,
              }}>
                At Cassavant Precision Machine Tools, we believe that exceptional manufacturing starts with the right partner. We go beyond selling machines — we deliver complete solutions that help your shop run faster, cut more accurately, and grow more profitably.
              </p>
              <p style={{
                fontSize: 16,
                color: t.textSecondary,
                lineHeight: 1.8,
              }}>
                As an authorized Mazak distributor, we bring the full power of Mazak's world-leading CNC technology to your shop floor, backed by our own team of factory-trained engineers and technicians who understand the demands of modern manufacturing.
              </p>
            </div>

            <div style={{
              flex: "1 1 320px",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}>
              {[
                { value: "100%", label: "Mazak Authorized" },
                { value: "24/7", label: "Service Support" },
                { value: "Full", label: "Turnkey Solutions" },
                { value: "Expert", label: "Application Engineering" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  padding: "24px 20px",
                  borderRadius: 14,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#C12033",
                    marginBottom: 6,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: t.textTertiary,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section id="values" data-animate style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("values") ? 1 : 0,
          transform: isVisible("values") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">What Drives Us</div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: -1.5,
            }}>
              Our <span style={{ color: "#C12033" }}>Values</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {values.map((val, i) => (
              <div
                key={val.title}
                style={{
                  padding: "clamp(28px, 3vw, 40px)",
                  borderRadius: 16,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  opacity: isVisible("values") ? 1 : 0,
                  transform: isVisible("values") ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
                }}
              >
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: -0.3,
                  marginBottom: 10,
                }}>
                  {val.title}
                </h3>
                <p style={{
                  color: t.textSecondary,
                  fontSize: 14,
                  lineHeight: 1.7,
                }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STORY / MILESTONES ==================== */}
      <section id="story" data-animate style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          opacity: isVisible("story") ? 1 : 0,
          transform: isVisible("story") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">Our Journey</div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: -1.5,
            }}>
              Built on <span style={{ color: "#C12033" }}>Experience</span>
            </h2>
          </div>

          <div style={{
            position: "relative",
            maxWidth: 800,
            margin: "0 auto",
          }}>
            {/* Vertical timeline line */}
            <div style={{
              position: "absolute",
              left: 27,
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, #C1203340, ${t.borderPrimary})`,
            }} />

            {milestones.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  marginBottom: i < milestones.length - 1 ? 48 : 0,
                  opacity: isVisible("story") ? 1 : 0,
                  transform: isVisible("story") ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: t.bgCard,
                  border: `2px solid #C12033`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#C12033",
                  fontFamily: "'Space Mono', monospace",
                  flexShrink: 0,
                  boxShadow: `0 0 0 6px ${t.bgSection}`,
                  position: "relative",
                  zIndex: 1,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content card */}
                <div style={{
                  flex: 1,
                  padding: "clamp(20px, 3vw, 32px)",
                  borderRadius: 14,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                }}>
                  <h3 style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                    letterSpacing: -0.3,
                  }}>
                    {m.year}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: t.textTertiary,
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section id="strengths" data-animate style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("strengths") ? 1 : 0,
          transform: isVisible("strengths") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ marginBottom: 48 }}>
            <div className="section-label">Why CPMT</div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: -1.5,
            }}>
              Why Choose <span style={{ color: "#C12033" }}>Us</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
            gap: 16,
          }}>
            {strengths.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "24px 28px",
                  borderRadius: 12,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: isVisible("strengths") ? 1 : 0,
                  transform: isVisible("strengths") ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#C1203340";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = t.borderPrimary;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ color: "#C12033", fontSize: 8, marginTop: 7, flexShrink: 0 }}>◆</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: t.textTertiary, lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        background: t.ctaGradient,
      }}>
        <div style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <div className="section-label">
            Let's Work Together
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 16,
          }}>
            Ready to elevate your{" "}
            <span style={{ color: "#C12033" }}>manufacturing?</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}>
            Whether you're looking for a new machine, need service on your existing equipment, or want to explore automation — our team is here to help.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="cta-primary">
              Contact Us →
            </Link>
            <Link to="/machines" className="cta-outline">
              View Machines
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
