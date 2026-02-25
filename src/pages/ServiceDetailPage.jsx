import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import serviceData from "../services.json";

const ServiceDetailPage = () => {
  const { t } = useTheme();
  const { slug } = useParams();

  const service = serviceData.services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section style={{
        padding: "200px clamp(24px, 5vw, 80px) 100px",
        textAlign: "center",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>Service Not Found</h1>
        <p style={{ color: t.textSecondary, fontSize: 16, marginBottom: 32 }}>
          The service you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/services" className="cta-primary">
          ← Back to All Services
        </Link>
      </section>
    );
  }

  // Other services for the "Explore More" section
  const otherServices = serviceData.services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section style={{
        padding: "140px clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${service.color}12, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1600, margin: "0 auto", position: "relative", zIndex: 1 }}>
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
            <Link to="/services" style={{ color: t.textTertiary, textDecoration: "none" }}>
              Services
            </Link>
            <span style={{ color: t.textTertiary }}>→</span>
            <span style={{ color: service.color }}>{service.title}</span>
          </nav>

          {/* Service hero image */}
          {service.image && (
            <div style={{
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 48,
              position: "relative",
              animation: "fadeUp 0.6s ease-out 0.15s both",
            }}>
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: "100%",
                  maxHeight: 480,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%)",
              }} />
            </div>
          )}

          <div style={{
            display: "flex",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "flex-start",
            flexWrap: "wrap",
            animation: "fadeUp 0.6s ease-out 0.2s both",
          }}>
            {/* Content */}
            <div style={{ flex: "1 1 500px" }}>
              <h1 style={{
                fontSize: "clamp(38px, 5vw, 60px)",
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.1,
                marginBottom: 12,
              }}>
                {service.title}
              </h1>

              {service.tagline && (
                <p style={{
                  fontSize: 20,
                  color: service.color,
                  fontStyle: "italic",
                  marginBottom: 24,
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}>
                  {service.tagline}
                </p>
              )}

              <p style={{
                fontSize: 17,
                color: t.textSecondary,
                lineHeight: 1.8,
                marginBottom: 36,
                maxWidth: 680,
              }}>
                {service.description}
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/contact" className="cta-primary">
                  Get Started →
                </Link>
                <Link to="/contact" className="cta-outline">
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Quick stats / highlights sidebar */}
            <div style={{
              flex: "1 1 320px",
              background: t.bgSection,
              borderRadius: 16,
              border: `1px solid ${t.borderPrimary}`,
              padding: "clamp(24px, 3vw, 40px)",
            }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 20,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: 1,
                textTransform: "uppercase",
                color: service.color,
              }}>
                What's Included
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <span style={{
                      color: service.color,
                      fontSize: 8,
                      marginTop: 6,
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
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      {service.process && service.process.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
          background: t.bgSection,
        }}>
          <div style={{ maxWidth: 1300, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">How It Works</div>
              <h2 style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: -1.5,
              }}>
                Our <span style={{ color: service.color }}>Process</span>
              </h2>
              <p style={{ color: t.textTertiary, maxWidth: 540, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>
                A proven approach from start to finish.
              </p>
            </div>

            <div
              className="process-timeline"
              style={{
                gridTemplateColumns: `repeat(${service.process.length}, 1fr)`,
              }}
            >
              {/* Connecting line */}
              <div className="process-line" style={{
                position: "absolute",
                top: 28,
                left: "calc(12.5% + 20px)",
                right: "calc(12.5% + 20px)",
                height: 2,
                background: `linear-gradient(90deg, ${service.color}40, ${service.color}20)`,
                zIndex: 0,
              }} />

              {service.process.map((step, i) => (
                <div
                  key={step.step}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    padding: "0 12px",
                  }}
                >
                  {/* Step number circle */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: t.bgCard,
                    border: `2px solid ${service.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: service.color,
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: 24,
                    boxShadow: `0 0 0 6px ${t.bgSection}`,
                  }}>
                    {i + 1}
                  </div>

                  <h3 style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 10,
                    letterSpacing: -0.3,
                  }}>
                    {step.step}
                  </h3>
                  <p style={{
                    fontSize: 13,
                    color: t.textTertiary,
                    lineHeight: 1.7,
                    maxWidth: 220,
                    margin: 0,
                  }}>
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== EXPLORE MORE SERVICES ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 800,
          letterSpacing: -1,
          marginBottom: 32,
        }}>
          Explore More <span style={{ color: "#C12033" }}>Services</span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {otherServices.map((svc) => (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className="service-card"
              style={{ textDecoration: "none", color: "inherit", overflow: "hidden", padding: 0 }}
            >
              {svc.image && (
                <div style={{ height: 120, overflow: "hidden" }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <div style={{ padding: "16px 20px 20px" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: -0.3 }}>
                  {svc.title}
                </h3>
                <p style={{ color: t.textTertiary, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  {svc.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
            Ready to get started with{" "}
            <span style={{ color: "#C12033" }}>{service.title}?</span>
          </h2>
          <p style={{
            fontSize: 17,
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 32px",
          }}>
            Our team is ready to discuss your requirements and build a solution that fits your shop.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="cta-primary">
              Contact Us →
            </Link>
            <Link to="/services" className="cta-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;
