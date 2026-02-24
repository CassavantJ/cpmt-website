import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const SupportPage = ({ isVisible }) => {
  const { t } = useTheme();
  const [hoveredCard, setHoveredCard] = useState(null);

  const supportCategories = [
    {
      icon: "🔧",
      title: "Machine Servicing",
      description: "When your machines need service, our factory-trained Mazak technicians provide fast response times and expert diagnostics. We minimize your downtime so you can get back to production.",
      features: [
        "Factory-trained Mazak service engineers",
        "On-site and remote diagnostics",
        "Emergency breakdown response",
        "Mechanical, electrical, and CNC repairs",
      ],
      cta: "Request Service",
      ctaLink: "/contact",
      color: "#C12033",
    },
    {
      icon: "⚙",
      title: "Parts & Accessories",
      description: "We stock genuine Mazak OEM parts for fast delivery. Critical parts orders placed before noon ship same day, keeping your machines running with the right components.",
      features: [
        "Genuine Mazak OEM parts",
        "Same-day shipping on critical orders",
        "Tooling and workholding accessories",
        "Spindle components and drives",
      ],
      cta: "Order Parts",
      ctaLink: "/contact",
      color: "#1A6CFF",
    },
    {
      icon: "🛡",
      title: "Preventive Maintenance",
      description: "Avoid unplanned downtime with custom preventive maintenance programs. Our technicians create a tailored schedule based on your machines, run time, and production demands.",
      features: [
        "Custom PM schedules per machine",
        "Inspection checklists and reports",
        "Fluid analysis and wear monitoring",
        "Extend machine life and accuracy",
      ],
      cta: "Schedule PM",
      ctaLink: "/contact",
      color: "#00C47D",
    },
    {
      icon: "📋",
      title: "Warranty Registration",
      description: "Register your new Mazak machine to activate your warranty coverage. Quick and easy process that ensures you're protected from day one.",
      features: [
        "Fast online registration process",
        "Full warranty coverage activation",
        "Maintenance schedule setup",
        "Access to technical resources",
      ],
      cta: "Register Machine",
      ctaLink: "/contact",
      color: "#FF8A00",
    },
  ];

  const quickLinks = [
    { label: "Submit Service Request", desc: "Need a repair? Get a technician scheduled.", to: "/contact", icon: "→" },
    { label: "Technical Support", desc: "Troubleshooting help from our engineering team.", to: "/contact", icon: "→" },
    { label: "Training Programs", desc: "Operator and programmer training for your team.", to: "/services/turnkey-solutions", icon: "→" },
    { label: "Automation Consultation", desc: "Explore automation options for your shop.", to: "/services/automation", icon: "→" },
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
          background: "radial-gradient(circle, rgba(232,55,42,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ animation: "fadeUp 0.8s ease-out 0.2s both" }}>
            Customer Support
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: 20,
            animation: "fadeUp 0.8s ease-out 0.4s both",
          }}>
            We're Here to{" "}
            <span style={{
              background: "linear-gradient(135deg, #C12033, #E8475A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}>
              Keep You Running
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
            From emergency repairs to preventive maintenance, our factory-trained team delivers the support you need to maximize uptime and productivity.
          </p>
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp 0.8s ease-out 0.8s both",
          }}>
            <Link to="/contact" className="cta-primary">
              Submit Service Request →
            </Link>
            <a href="tel:+18005551234" className="cta-outline">
              Call 24/7 Hotline
            </a>
          </div>
        </div>
      </section>

      {/* ==================== SUPPORT CATEGORIES ==================== */}
      <section id="support" data-animate style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("support") ? 1 : 0,
          transform: isVisible("support") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}>
            {supportCategories.map((cat, i) => (
              <div
                key={cat.title}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "clamp(28px, 3vw, 40px)",
                  borderRadius: 16,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: hoveredCard === i ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  opacity: isVisible("support") ? 1 : 0,
                  transform: isVisible("support") ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: `${cat.color}12`,
                  border: `1px solid ${cat.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 24,
                  transition: "transform 0.3s",
                  transform: hoveredCard === i ? "scale(1.08)" : "scale(1)",
                }}>
                  {cat.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  marginBottom: 12,
                }}>
                  {cat.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: t.textSecondary,
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}>
                  {cat.description}
                </p>

                {/* Features */}
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}>
                  {cat.features.map((f) => (
                    <li key={f} style={{
                      fontSize: 13,
                      color: t.textTertiary,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}>
                      <span style={{ color: cat.color, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={cat.ctaLink}
                  className="cta-outline"
                  style={{
                    fontSize: 13,
                    padding: "10px 24px",
                    textAlign: "center",
                    borderColor: cat.color,
                    color: cat.color,
                  }}
                >
                  {cat.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== QUICK LINKS ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div className="section-label">Quick Access</div>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: -1.5,
            }}>
              How Can We <span style={{ color: "#C12033" }}>Help?</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {quickLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  borderRadius: 12,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  gap: 16,
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
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: 13, color: t.textTertiary, lineHeight: 1.5 }}>
                    {link.desc}
                  </div>
                </div>
                <span style={{ color: "#C12033", fontSize: 18, flexShrink: 0 }}>{link.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT INFO BAND ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 80px) clamp(24px, 5vw, 80px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          maxWidth: 1000,
          margin: "0 auto",
        }}>
          {[
            { label: "24/7 Service Hotline", value: "1-800-555-1234", icon: "📞", sub: "Emergency & after-hours support" },
            { label: "Service Email", value: "service@cpmt.com", icon: "✉", sub: "Submit requests & documentation" },
            { label: "Parts Department", value: "1-800-555-5678", icon: "📦", sub: "Orders, quotes & availability" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "28px 32px",
                borderRadius: 14,
                border: `1px solid ${t.borderPrimary}`,
                background: t.bgSection,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#C12033",
                marginBottom: 8,
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 6,
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: 13, color: t.textTertiary }}>
                {item.sub}
              </div>
            </div>
          ))}
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
            We've Got Your Back
          </div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 16,
          }}>
            Need support{" "}
            <span style={{ color: "#C12033" }}>right now?</span>
          </h2>
          <p style={{
            fontSize: 16,
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}>
            Whether it's an emergency breakdown or a scheduled maintenance visit, our team is ready to help. Contact us anytime.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="cta-primary">
              Contact Support →
            </Link>
            <Link to="/services/service-and-parts" className="cta-outline">
              View Service Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportPage;
