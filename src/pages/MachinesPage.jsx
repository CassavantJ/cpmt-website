import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";

const MachinesPage = ({ isVisible }) => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeManufacturer, setActiveManufacturer] = useState("all");
  const [hoveredMachine, setHoveredMachine] = useState(null);

  const machines = machineData.machines;
  const categories = machineData.categories;
  const manufacturerNames = [...new Set(machines.map((m) => m.manufacturer))];
  const filteredMachines = machines.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    const matchMfg = activeManufacturer === "all" || m.manufacturer === activeManufacturer;
    return matchCat && matchMfg;
  });

  return (
    <section id="machines" data-animate style={{
      padding: "140px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
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
          <p style={{ color: t.textTertiary, maxWidth: 440, fontSize: 16, lineHeight: 1.7 }}>
            Explore our full range of Mazak machining centers, turning centers, multi-tasking machines, and automation solutions.
          </p>
        </div>

        {/* Manufacturer filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <button
            className={`cat-btn ${activeManufacturer === "all" ? "cat-btn-active" : ""}`}
            onClick={() => setActiveManufacturer("all")}
          >
            All Brands
          </button>
          {manufacturerNames.map((name) => (
            <button
              key={name}
              className={`cat-btn ${activeManufacturer === name ? "cat-btn-active" : ""}`}
              onClick={() => setActiveManufacturer(name)}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {manufacturers[name] ? (
                <img
                  src={isDark ? manufacturers[name].logoDark : manufacturers[name].logoLight}
                  alt={name}
                  style={{ height: 14, width: "auto" }}
                />
              ) : (
                name
              )}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn ${activeCategory === cat.id ? "cat-btn-active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Machine grid */}
        <div className="machines-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {filteredMachines.map((machine, i) => (
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
      </div>
    </section>
  );
};

export default MachinesPage;
