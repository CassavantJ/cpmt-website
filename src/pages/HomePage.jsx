import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";
import serviceData from "../services.json";

const HomePage = ({ isVisible }) => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const [hoveredMachine, setHoveredMachine] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroImages = [
    "/images/hero-bg-1.png",
    "/images/hero-bg-2.png",
    "/images/hero-bg-3.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Pick at least one machine from each category, then fill remaining slots
  const machines = (() => {
    const allMachines = machineData.machines;
    const cats = [...new Set(allMachines.map(m => m.category))];
    const picked = [];
    const usedSlugs = new Set();
    cats.forEach(cat => {
      const match = allMachines.find(m => m.category === cat);
      if (match) { picked.push(match); usedSlugs.add(match.slug); }
    });
    for (const m of allMachines) {
      if (picked.length >= 6) break;
      if (!usedSlugs.has(m.slug)) { picked.push(m); usedSlugs.add(m.slug); }
    }
    return picked.slice(0, 6);
  })();
  const services = serviceData.services;
  const categories = machineData.categories.filter(c => c.id !== "all");
  const featuredMachine = machineData.machines.find(m => m.slug === "integrex-i-neo");

  // Get a representative machine image for each category
  const categoryImages = {};
  machineData.machines.forEach((m) => {
    if (!categoryImages[m.category]) categoryImages[m.category] = m.image;
  });

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
        zIndex: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 48px 80px",
      }}>
        {/* Slideshow background images */}
        {heroImages.map((img, i) => (
          <div
            key={img}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: activeSlide === i ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        ))}

        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.8) 100%)",
        }} />

        <div className="hero-grid" style={{ opacity: 0.4 }} />

        <div style={{
          position: "absolute",
          top: "10%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,55,42,0.15), transparent 70%)",
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
          background: "radial-gradient(circle, rgba(26,108,255,0.1), transparent 70%)",
          animation: "heroGlow 8s ease-in-out infinite 2s",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", maxWidth: 1000, position: "relative", zIndex: 1 }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeUp 0.8s ease-out 0.2s both",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ height: 1, width: 32, background: "rgba(255,255,255,0.3)" }} />
              <img src="/images/CPMTLogoLight.svg" alt="CPMT" style={{ height: 28, width: "auto", opacity: 0.85 }} />
              <div style={{ height: 1, width: 32, background: "rgba(255,255,255,0.3)" }} />
            </div>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#E8475A",
            }}>
              Cassavant Precision Machine Tools
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(44px, 7vw, 92px)",
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-3px",
            marginBottom: 28,
            animation: "fadeUp 0.8s ease-out 0.4s both",
            color: "#FAFAFA",
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
            fontSize: "clamp(17px, 2vw, 21px)",
            color: "rgba(255,255,255,0.7)",
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
            <Link to="/contact" className="cta-outline" style={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "#FAFAFA",
            }}>
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
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: 700,
                  color: "#C12033",
                  marginBottom: 4,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 40,
            animation: "fadeUp 0.8s ease-out 1.2s both",
          }}>
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: activeSlide === i ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: "none",
                  background: activeSlide === i ? "#C12033" : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  padding: 0,
                }}
              />
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

      {/* ==================== MACHINE CATEGORIES ==================== */}
      <section id="categories" data-animate style={{
        padding: "clamp(40px, 5vw, 64px) clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("categories") ? 1 : 0,
          transform: isVisible("categories") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="section-label">Machine Categories</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: -1.5 }}>
              Find Your <span style={{ color: "#C12033" }}>Machine</span>
            </h2>
            <p style={{ color: t.textTertiary, maxWidth: 500, margin: "12px auto 0", fontSize: 14, lineHeight: 1.6 }}>
              Browse our full lineup by category — from multi-tasking powerhouses to precision turning centers.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((cat, i) => {
              const count = machineData.machines.filter(m => m.category === cat.id).length;
              const categoryDescs = {
                turning: "High-speed, high-precision CNC turning for production efficiency.",
                vertical: "Rigid vertical machining centers for mold, die, and general machining.",
                horizontal: "High-volume horizontal machining with pallet changers and automation.",
                "5axis": "Simultaneous 5-axis contouring for the most complex geometries.",
                multitasking: "Turn, mill, and drill in a single setup — eliminate multiple operations.",
              };
              return (
                <Link
                  to={`/machines?category=${cat.id}`}
                  key={cat.id}
                  className="category-card"
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    position: "relative",
                    borderRadius: 16,
                    border: `1px solid ${hoveredCategory === i ? "rgba(193,32,51,0.3)" : t.borderPrimary}`,
                    background: t.bgCard,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredCategory === i ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hoveredCategory === i
                      ? "0 12px 40px rgba(193,32,51,0.12), 0 4px 12px rgba(0,0,0,0.08)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    opacity: isVisible("categories") ? 1 : 0,
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "linear-gradient(90deg, #C12033, #E8475A)",
                    opacity: hoveredCategory === i ? 1 : 0,
                    transition: "opacity 0.3s",
                  }} />

                  {/* Machine image area */}
                  <div style={{
                    height: 130,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 16px 4px",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 80%, rgba(193,32,51,${hoveredCategory === i ? "0.06" : "0.02"}), transparent 70%)`,
                      transition: "all 0.4s",
                    }} />
                    <img
                      src={categoryImages[cat.id]}
                      alt={cat.label}
                      style={{
                        maxHeight: 105,
                        maxWidth: "90%",
                        objectFit: "contain",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: hoveredCategory === i ? "scale(1.1)" : "scale(1)",
                        filter: hoveredCategory === i ? "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" : "none",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "8px 20px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.3, margin: 0 }}>
                        {cat.label}
                      </h3>
                      <span style={{
                        fontSize: 11,
                        fontFamily: "'Space Mono', monospace",
                        color: "#C12033",
                        background: "rgba(193,32,51,0.08)",
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}>
                        {count} {count === 1 ? "model" : "models"}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 13,
                      color: t.textTertiary,
                      lineHeight: 1.6,
                      margin: 0,
                      flex: 1,
                    }}>
                      {categoryDescs[cat.id]}
                    </p>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12,
                      fontSize: 13,
                      fontWeight: 600,
                      color: hoveredCategory === i ? "#C12033" : t.textTertiary,
                      transition: "color 0.3s",
                    }}>
                      Explore category
                      <span style={{
                        transition: "transform 0.3s",
                        transform: hoveredCategory === i ? "translateX(4px)" : "translateX(0)",
                        fontSize: 16,
                      }}>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== MACHINES PREVIEW ==================== */}
      <section id="machines" data-animate style={{
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("machines") ? 1 : 0,
          transform: isVisible("machines") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="section-label">Our Inventory</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
              CNC Machine<br />
              <span style={{ color: "#C12033" }}>Tools</span>
            </h2>
            <p style={{ color: t.textTertiary, maxWidth: 400, fontSize: 15, lineHeight: 1.7 }}>
              Explore our full range of Mazak machining centers, turning centers, multi-tasking machines, and automation solutions.
            </p>
          </div>

          <div className="machines-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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
                  <img src={machine.image} alt={machine.name} style={{ width: 150, height: 150, objectFit: "contain", borderRadius: 8, opacity: 0.9 }} />
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

      {/* ==================== FEATURED MACHINE ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{ maxWidth: 1600, margin: "0 auto" }}>
          <div style={{
            display: "flex",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <div style={{
              flex: "1 1 400px",
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}>
              <img
                src={featuredMachine.image}
                alt={featuredMachine.name}
                style={{ maxWidth: "100%", maxHeight: 460, objectFit: "contain" }}
              />
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <div className="section-label">Featured Machine</div>
              <div style={{
                fontSize: 11,
                color: "#C12033",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}>
                {featuredMachine.type}
              </div>
              <h2 style={{
                fontSize: "clamp(30px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: -1.5,
                marginBottom: 12,
              }}>
                {featuredMachine.name}
              </h2>
              {featuredMachine.tagline && (
                <p style={{
                  fontSize: 16,
                  color: t.textSecondary,
                  fontStyle: "italic",
                  marginBottom: 16,
                }}>
                  {featuredMachine.tagline}
                </p>
              )}
              <p style={{
                fontSize: 14,
                color: t.textTertiary,
                lineHeight: 1.7,
                marginBottom: 24,
              }}>
                {featuredMachine.description}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <div style={{
                  padding: "6px 14px",
                  background: t.bgTag,
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  color: t.textSecondary,
                }}>
                  {featuredMachine.specs}
                </div>
                <div style={{
                  padding: "6px 14px",
                  background: t.bgTag,
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: "'Space Mono', monospace",
                  color: t.textSecondary,
                }}>
                  {featuredMachine.speed}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to={`/machines/${featuredMachine.manufacturer.toLowerCase()}/${featuredMachine.slug}`} className="cta-primary">
                  View Specifications →
                </Link>
                <Link to="/contact" className="cta-outline">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" data-animate style={{
        padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)",
        background: t.bgSection,
      }}>
        <div style={{
          maxWidth: 1600,
          margin: "0 auto",
          opacity: isVisible("services") ? 1 : 0,
          transform: isVisible("services") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label">What We Do</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2 }}>
              End-to-End <span style={{ color: "#C12033" }}>Solutions</span>
            </h2>
            <p style={{ color: t.textTertiary, maxWidth: 500, margin: "16px auto 0", fontSize: 15, lineHeight: 1.7 }}>
              From initial consultation to ongoing support — we're your partner through every step of the manufacturing process.
            </p>
          </div>

          <div className="services-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
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
                  position: "relative",
                  overflow: "hidden",
                  padding: 0,
                  opacity: isVisible("services") ? 1 : 0,
                  transform: isVisible("services") ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                }}
              >
                {/* Service image */}
                <div style={{
                  height: 200,
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: hoveredService === i ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: "20px 24px 24px" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, margin: "0 0 14px" }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: t.textTertiary, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {svc.desc}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 16,
                    fontSize: 13,
                    color: svc.color,
                    fontWeight: 600,
                  }}>
                    Learn More
                    <span style={{
                      transition: "transform 0.3s",
                      transform: hoveredService === i ? "translateX(4px)" : "translateX(0)",
                    }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA / ABOUT BAND ==================== */}
      <section id="about" data-animate style={{
        padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)",
        background: t.ctaGradient,
      }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          textAlign: "center",
          opacity: isVisible("about") ? 1 : 0,
          transform: isVisible("about") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="section-label">
            Precision Without Compromise
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.15, marginBottom: 20 }}>
            Your manufacturing success is{" "}
            <span style={{ color: "#C12033" }}>our mission.</span>
          </h2>
          <p style={{ fontSize: 18, color: t.textSecondary, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 36px" }}>
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
