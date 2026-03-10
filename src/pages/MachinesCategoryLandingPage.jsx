import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";

const MachinesCategoryLandingPage = ({ isVisible }) => {
  const { t } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = machineData.categories.filter((c) => c.id !== "all");

  // Get a representative machine image for each category
  const categoryImages = {};
  machineData.machines.forEach((m) => {
    if (!categoryImages[m.category]) categoryImages[m.category] = m.image;
  });

  return (
    <section id="machine-categories" data-animate style={{
      padding: "140px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
      maxWidth: 1600,
      margin: "0 auto",
    }}>
      <div style={{
        opacity: isVisible("machine-categories") ? 1 : 0,
        transform: isVisible("machine-categories") ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div className="section-label">Our Inventory</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
            CNC Machine<br />
            <span style={{ color: "#C12033" }}>Categories</span>
          </h2>
          <p style={{ color: t.textTertiary, maxWidth: 440, fontSize: 16, lineHeight: 1.7 }}>
            Browse our full lineup by category — from multi-tasking powerhouses to precision turning centers and laser cutting systems.
          </p>
        </div>

        <div className="category-grid" style={{ marginBottom: 48 }}>
          {categories.map((cat, i) => {
            const count = machineData.machines.filter((m) => m.category === cat.id).length;
            return (
              <Link
                to={`/machines/category/${cat.id}`}
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
                  opacity: isVisible("machine-categories") ? 1 : 0,
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
                  height: 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 20px 8px",
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
                      maxHeight: 130,
                      maxWidth: "90%",
                      objectFit: "contain",
                      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: hoveredCategory === i ? "scale(1.1)" : "scale(1)",
                      filter: hoveredCategory === i ? "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" : "none",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "8px 24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3, margin: 0 }}>
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
                      whiteSpace: "nowrap",
                    }}>
                      {count} {count === 1 ? "series" : "series"}
                    </span>
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: t.textTertiary,
                    lineHeight: 1.6,
                    margin: 0,
                    flex: 1,
                  }}>
                    {cat.description}
                  </p>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 14,
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

        <div style={{ textAlign: "center" }}>
          <Link to="/machines/inventory" className="cta-outline" style={{ padding: "14px 32px", fontSize: 14 }}>
            View Full Inventory
            <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MachinesCategoryLandingPage;
