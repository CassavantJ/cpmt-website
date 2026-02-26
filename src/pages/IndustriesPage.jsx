import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const IndustriesPage = ({ isVisible }) => {
  const { t } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const industries = [
    {
      name: "Aerospace",
      icon: "✈",
      stat: "AS9100",
      image: "/images/industries/aerospace.png",
      description: "From turbine blades to structural components, aerospace manufacturing demands extreme precision and traceability. Our Mazak multi-tasking and 5-axis machines deliver the tight tolerances and complex geometries required for flight-critical parts.",
      highlights: ["AS9100 certified workflows", "5-axis simultaneous machining", "Complex alloy expertise (titanium, Inconel)", "Full traceability & documentation"],
    },
    {
      name: "Automotive",
      icon: "🏎",
      stat: "IATF 16949",
      image: "/images/industries/automotive.png",
      description: "High-volume production with zero-defect expectations. Whether you're machining engine blocks, transmission housings, or EV components, our turning and machining centers deliver the cycle times and consistency automotive suppliers demand.",
      highlights: ["IATF 16949 compliance support", "High-volume production cells", "Automated loading & unloading", "Statistical process control"],
    },
    {
      name: "Medical",
      icon: "⚕",
      stat: "ISO 13485",
      image: "/images/industries/medical.png",
      description: "Implants, surgical instruments, and diagnostic equipment require surfaces and tolerances that leave no margin for error. Our precision machining solutions meet the stringent demands of the medical device industry.",
      highlights: ["ISO 13485 compatible processes", "Micro-machining capabilities", "Biocompatible material expertise", "Cleanroom-ready surface finishes"],
    },
    {
      name: "Defense & Government",
      icon: "🛡",
      stat: "ITAR",
      image: "/images/industries/defense.png",
      description: "Mission-critical components for land, sea, and air platforms. Our machines handle the hard metals, complex geometries, and security requirements that defense contractors face every day.",
      highlights: ["ITAR registered & compliant", "Hard metal machining", "Large-envelope 5-axis capability", "Secure supply chain support"],
    },
    {
      name: "Energy & Oil/Gas",
      icon: "⚡",
      stat: "API",
      image: "/images/industries/energy.png",
      description: "From downhole tools to turbine components, the energy sector requires machines that can handle large parts, tough materials, and 24/7 production schedules. Our heavy-duty turning and milling solutions are built for the job.",
      highlights: ["API standard compliance", "Large-part turning capacity", "Heavy-duty cutting performance", "Automation for lights-out operation"],
    },
    {
      name: "Semiconductors",
      icon: "🔬",
      stat: "ISO 14644",
      image: "/images/industries/semiconductors.png",
      description: "Semiconductor manufacturing equipment demands ultra-precise components with mirror-like surface finishes and sub-micron tolerances. Our high-speed machining centers and Swiss-type turning machines produce the critical parts that keep fabs running — from vacuum chamber components to wafer handling assemblies.",
      highlights: ["Ultra-precision surface finishes", "High-speed aluminum machining", "Cleanroom-compatible components", "Complex multi-feature parts in single setup"],
    },
    {
      name: "General Manufacturing",
      icon: "🏭",
      stat: "ISO 9001",
      image: "/images/industries/general.png",
      description: "Job shops and contract manufacturers need versatility, quick changeovers, and reliable uptime. Our full range of Mazak machining centers and turning centers helps general manufacturers stay competitive and profitable.",
      highlights: ["ISO 9001 quality systems", "Quick-change tooling solutions", "Flexible automation options", "Training & application support"],
    },
  ];

  return (
    <>
      {/* ==================== HERO BANNER ==================== */}
      <section style={{
        padding: "160px clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,55,42,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ animation: "fadeUp 0.8s ease-out 0.2s both" }}>
            Industries We Serve
          </div>
          <h1 style={{
            fontSize: "clamp(38px, 6vw, 68px)",
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.1,
            marginBottom: 20,
            animation: "fadeUp 0.8s ease-out 0.4s both",
          }}>
            Precision Solutions for{" "}
            <span style={{
              background: "linear-gradient(135deg, #C12033, #E8475A)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}>
              Every Sector
            </span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 620,
            margin: "0 auto 36px",
            animation: "fadeUp 0.8s ease-out 0.6s both",
          }}>
            We understand that every industry has unique manufacturing challenges — from the materials you cut to the certifications you carry. Our Mazak machines and engineering expertise are tailored to meet your exact requirements.
          </p>
          <div style={{ animation: "fadeUp 0.8s ease-out 0.8s both" }}>
            <Link to="/contact" className="cta-primary">
              Request Information →
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRY SECTIONS ==================== */}
      <section id="industries" data-animate style={{
        maxWidth: 1600,
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
      }}>
        <div style={{
          opacity: isVisible("industries") ? 1 : 0,
          transform: isVisible("industries") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(48px, 8vw, 80px)",
        }}>
          {industries.map((ind, i) => {
            const isReversed = i % 2 === 1;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={ind.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "flex",
                  flexDirection: isReversed ? "row-reverse" : "row",
                  gap: "clamp(32px, 5vw, 64px)",
                  alignItems: "center",
                  padding: "clamp(24px, 4vw, 48px)",
                  borderRadius: 16,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isHovered ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
                  flexWrap: "wrap",
                }}
              >
                {/* Industry image */}
                <div style={{
                  flex: "1 1 340px",
                  minHeight: 260,
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <img
                    src={ind.image}
                    alt={ind.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: 260,
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: isHovered ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)",
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 2,
                    color: "#C12033",
                    textTransform: "uppercase",
                    background: `${t.bgCard}dd`,
                    padding: "4px 12px",
                    borderRadius: 6,
                    backdropFilter: "blur(8px)",
                  }}>
                    {ind.stat}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: "1 1 400px" }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: "#C12033",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}>
                    {ind.stat}
                  </div>
                  <h2 style={{
                    fontSize: "clamp(26px, 3vw, 40px)",
                    fontWeight: 800,
                    letterSpacing: -1,
                    marginBottom: 16,
                    lineHeight: 1.2,
                  }}>
                    {ind.name}
                  </h2>
                  <p style={{
                    color: t.textSecondary,
                    fontSize: 16,
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}>
                    {ind.description}
                  </p>

                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 28px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 8,
                  }}>
                    {ind.highlights.map((h) => (
                      <li key={h} style={{
                        fontSize: 13,
                        color: t.textTertiary,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}>
                        <span style={{ color: "#C12033", fontSize: 8 }}>◆</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="cta-outline"
                    style={{ fontSize: 13, padding: "10px 24px" }}
                  >
                    Explore Solutions →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        background: t.ctaGradient,
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <div className="section-label">
            Your Industry, Our Expertise
          </div>
          <h2 style={{
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: -1.5,
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Don't see your industry?{" "}
            <span style={{ color: "#C12033" }}>We can help.</span>
          </h2>
          <p style={{
            fontSize: 18,
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: 580,
            margin: "0 auto 36px",
          }}>
            Our application engineers work across dozens of sectors. Whatever you're machining, we'll find the right Mazak solution for your shop.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="cta-primary">
              Talk to an Engineer →
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

export default IndustriesPage;
