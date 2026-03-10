import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import automationData from "../automation.json";
import machineData from "../machines.json";

const AutomationPage = ({ isVisible }) => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get("category");
  const validCategory = automationData.categories.some(c => c.id === paramCategory);
  const [activeCategory, setActiveCategory] = useState(validCategory ? paramCategory : "machining");

  useEffect(() => {
    if (validCategory && paramCategory !== activeCategory) {
      setActiveCategory(paramCategory);
    }
  }, [paramCategory]);

  const categories = automationData.categories;
  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentProducts = automationData.products.filter(p =>
    Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory
  );

  return (
    <>
      {/* Hero Section */}
      <section id="automation-hero" data-animate style={{
        padding: "140px clamp(24px, 5vw, 80px) 80px",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("automation-hero") ? 1 : 0,
          transform: isVisible("automation-hero") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div className="section-label">Manufacturing Automation</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 0 }}>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, margin: 0 }}>
              Automation<br />
              <span style={{ color: "#C12033" }}>Systems</span>
            </h1>
            <p style={{ color: t.textTertiary, maxWidth: 480, fontSize: 16, lineHeight: 1.7, margin: 0 }}>
              From compact collaborative robots to full-scale flexible manufacturing systems — purpose-built automation designed to integrate seamlessly with Mazak CNC machine tools.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="automation-tabs" data-animate style={{
        padding: "0 clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("automation-tabs") ? 1 : 0,
          transform: isVisible("automation-tabs") ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}>
          <div className="automation-tabs" style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            borderBottom: `1px solid ${t.borderPrimary}`,
            paddingBottom: 0,
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setHoveredCard(null); }}
                style={{
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: activeCategory === cat.id ? 700 : 500,
                  color: activeCategory === cat.id ? "#C12033" : t.textSecondary,
                  background: "none",
                  border: "none",
                  borderBottom: activeCategory === cat.id ? "2px solid #C12033" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  marginBottom: -1,
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="automation-products" data-animate style={{
        padding: "48px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          opacity: isVisible("automation-products") ? 1 : 0,
          transform: isVisible("automation-products") ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <p style={{ color: t.textTertiary, fontSize: 15, lineHeight: 1.7, marginBottom: 36, maxWidth: 640 }}>
            {currentCategory.description}
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {currentProducts.map((product, i) => {
              const cardKey = `${activeCategory}-${i}`;
              return (
                <Link
                  to={`/automation/${product.slug}`}
                  key={cardKey}
                  onMouseEnter={() => setHoveredCard(cardKey)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    position: "relative",
                    borderRadius: 16,
                    border: `1px solid ${hoveredCard === cardKey ? "rgba(193,32,51,0.3)" : t.borderPrimary}`,
                    background: t.bgCard,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredCard === cardKey ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hoveredCard === cardKey
                      ? "0 12px 40px rgba(193,32,51,0.12), 0 4px 12px rgba(0,0,0,0.08)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
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
                    opacity: hoveredCard === cardKey ? 1 : 0,
                    transition: "opacity 0.3s",
                  }} />

                  {/* Image area */}
                  <div style={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 20px 0",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(circle at 50% 80%, rgba(193,32,51,${hoveredCard === cardKey ? "0.06" : "0.02"}), transparent 70%)`,
                      transition: "all 0.4s",
                    }} />
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      style={{
                        maxHeight: 150,
                        maxWidth: "90%",
                        objectFit: "contain",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: hoveredCard === cardKey ? "scale(1.08)" : "scale(1)",
                        filter: hoveredCard === cardKey ? "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" : "none",
                      }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>

                  <div style={{ padding: "16px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Header with name and highlight badge */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: -0.3, margin: 0 }}>
                          {product.name}
                        </h3>
                        {product.manufacturer && manufacturers[product.manufacturer] && (
                          <img
                            src={isDark ? manufacturers[product.manufacturer].logoDark : manufacturers[product.manufacturer].logoLight}
                            alt={product.manufacturer}
                            style={{ height: 14, width: "auto", opacity: 0.5, marginTop: 6, display: "block" }}
                          />
                        )}
                      </div>
                      <span style={{
                        fontSize: 10,
                        fontFamily: "'Space Mono', monospace",
                        color: "#C12033",
                        background: "rgba(193,32,51,0.08)",
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}>
                        {product.highlight}
                      </span>
                    </div>

                    <p style={{
                      fontSize: 14,
                      color: t.textTertiary,
                      lineHeight: 1.7,
                      margin: "0 0 20px 0",
                      flex: 1,
                    }}>
                      {product.description}
                    </p>

                    {/* Features */}
                    <div style={{
                      borderTop: `1px solid ${t.borderPrimary}`,
                      paddingTop: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}>
                      {product.features.map((feature, fi) => (
                        <div key={fi} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: 13,
                          color: t.textSecondary,
                          lineHeight: 1.4,
                        }}>
                          <span style={{ color: "#C12033", fontSize: 8, marginTop: 4, flexShrink: 0 }}>●</span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* View details link */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 16,
                      fontSize: 13,
                      fontWeight: 600,
                      color: hoveredCard === cardKey ? "#C12033" : t.textTertiary,
                      transition: "color 0.3s",
                    }}>
                      View details
                      <span style={{
                        transition: "transform 0.3s",
                        transform: hoveredCard === cardKey ? "translateX(4px)" : "translateX(0)",
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

      {/* CTA Section */}
      <section id="automation-cta" data-animate style={{
        padding: "0 clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <div style={{
          background: isDark ? "rgba(193,32,51,0.08)" : "rgba(193,32,51,0.04)",
          border: "1px solid rgba(193,32,51,0.15)",
          borderRadius: 20,
          padding: "60px 48px",
          textAlign: "center",
          opacity: isVisible("automation-cta") ? 1 : 0,
          transform: isVisible("automation-cta") ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>
            Ready to Automate Your <span style={{ color: "#C12033" }}>Production</span>?
          </h2>
          <p style={{
            color: t.textTertiary,
            maxWidth: 520,
            margin: "0 auto 32px",
            fontSize: 16,
            lineHeight: 1.7,
          }}>
            Our automation specialists will assess your current workflow and design a solution tailored to your production goals.
          </p>
          <Link to="/contact" className="cta-primary" style={{
            padding: "14px 36px",
            fontSize: 14,
            textDecoration: "none",
          }}>
            Contact Our Team
            <span style={{ fontSize: 16, marginLeft: 8 }}>→</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AutomationPage;
