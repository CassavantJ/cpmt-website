import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";

// Fallback spec columns if not defined in JSON
const defaultSpecColumns = {
  turning: ["Standard chuck size", "Max. machining diameter", "Max. machining length"],
  swiss: ["Bar size", "Number of axes", "Total No. of Tools Standard"],
  verticalturning: ["Standard chuck size", "Max. machining diameter", "Max. machining length"],
  vertical: ["Tool shank", "Max. spindle speed", "Table size"],
  horizontal: ["Pallet size", "Tool shank", "Max. spindle speed", "Max. workpiece dimension"],
  "5axis": ["Pallet size", "Tool shank", "Standard Max. spindle speed", "Max. workpiece dimension"],
  multitasking: ["Standard chuck size", "Max. machining diameter", "Max. machining length"],
  "2dlaser": ["Max. cutting size right/left", "Max. machining length", "Laser power"],
  "3dlaser": ["Max. cutting size (round)", "Max. cutting size (square)", "Max. workpiece length", "Laser power"],
};

// Try to find a spec value, checking for partial key matches
const getSpecValue = (specs, key) => {
  if (!specs) return "—";
  if (specs[key]) return specs[key];
  const lowerKey = key.toLowerCase();
  for (const [k, v] of Object.entries(specs)) {
    if (k.toLowerCase().includes(lowerKey) || lowerKey.includes(k.toLowerCase())) return v;
  }
  return "—";
};

const MachineCategoryPage = () => {
  const { isDark, t } = useTheme();
  const { categoryId } = useParams();
  const manufacturers = machineData.manufacturers || {};
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const category = machineData.categories.find((c) => c.id === categoryId);
  const allCategoryMachines = machineData.machines.filter((m) => m.category === categoryId);

  const otherCategories = machineData.categories.filter(
    (c) => c.id !== "all" && c.id !== categoryId
  );

  // Build category images map
  const categoryImages = {};
  machineData.machines.forEach((m) => {
    if (!categoryImages[m.category]) categoryImages[m.category] = m.image;
  });

  if (!category || category.id === "all") {
    return (
      <section style={{
        padding: "200px clamp(24px, 5vw, 80px) 100px",
        textAlign: "center",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>Category Not Found</h1>
        <p style={{ color: t.textSecondary, fontSize: 16, marginBottom: 32 }}>
          The machine category you're looking for doesn't exist.
        </p>
        <Link to="/machines" className="cta-primary">
          ← Back to All Machines
        </Link>
      </section>
    );
  }

  const heroImage = categoryImages[categoryId] || (allCategoryMachines[0] && allCategoryMachines[0].image);
  const specColumns = category.specColumns || defaultSpecColumns[categoryId] || [];

  // Build sub-groups: use defined subGroups or fall back to a single group
  const machinesBySlug = {};
  allCategoryMachines.forEach((m) => { machinesBySlug[m.slug] = m; });
  // Also index all machines so subGroups can reference cross-category slugs
  machineData.machines.forEach((m) => { if (!machinesBySlug[m.slug]) machinesBySlug[m.slug] = m; });

  const subGroups = category.subGroups
    ? category.subGroups.map((sg) => ({
        label: sg.label,
        machines: sg.slugs.map((s) => machinesBySlug[s]).filter(Boolean),
        specColumns: sg.specColumns || null,
      }))
    : [{ label: null, machines: allCategoryMachines, specColumns: null }];

  // Track row hover across all sub-groups
  let globalRowIndex = 0;

  return (
    <>
      {/* ==================== BREADCRUMB + HERO ==================== */}
      <section style={{
        padding: "120px clamp(24px, 5vw, 80px) 0",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
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
          <span style={{ color: "#C12033" }}>{category.label}</span>
        </nav>

        <div style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
          animation: "fadeUp 0.6s ease-out 0.2s both",
        }}>
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
              src={heroImage}
              alt={category.label}
              style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain" }}
            />
          </div>

          <div style={{ flex: "1 1 400px" }}>
            <div className="section-label">Machine Category</div>
            <h1 style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 16,
            }}>
              {category.label}{" "}
              <span style={{ color: "#C12033" }}>Machines</span>
            </h1>

            <span style={{
              display: "inline-block",
              fontSize: 12,
              fontFamily: "'Space Mono', monospace",
              color: "#C12033",
              background: "rgba(193,32,51,0.08)",
              padding: "4px 14px",
              borderRadius: 20,
              fontWeight: 600,
              marginBottom: 20,
            }}>
              {allCategoryMachines.length} {allCategoryMachines.length === 1 ? "model" : "models"}
            </span>

            <p style={{
              fontSize: 16,
              color: t.textSecondary,
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              {category.longDescription || category.description}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="cta-primary">
                Request a Quote →
              </Link>
              <Link to="/machines" className="cta-outline">
                View All Machines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MACHINE SPEC TABLES (SUB-GROUPED) ==================== */}
      <section style={{
        padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)",
        maxWidth: 1600,
        margin: "0 auto",
      }}>
        <h2 style={{
          fontSize: "clamp(26px, 4vw, 40px)",
          fontWeight: 800,
          letterSpacing: -1,
          marginBottom: 40,
          animation: "fadeUp 0.6s ease-out 0.3s both",
        }}>
          Our <span style={{ color: "#C12033" }}>{category.label}</span> Lineup
        </h2>

        {subGroups.map((group, gi) => {
          const cols = group.specColumns || specColumns;
          const machineGroups = [];
          group.machines.forEach((machine) => {
            machineGroups.push({ machine, rowIdx: globalRowIndex++ });
          });

          return (
            <div key={gi} style={{
              marginBottom: gi < subGroups.length - 1 ? 40 : 0,
              animation: `fadeUp 0.6s ease-out ${0.4 + gi * 0.1}s both`,
            }}>
              {/* Sub-group heading */}
              {group.label && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}>
                  <div style={{
                    fontSize: 11,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#C12033",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}>
                    {group.label}
                  </div>
                  <div style={{
                    flex: 1,
                    height: 1,
                    background: `linear-gradient(90deg, rgba(193,32,51,0.3), transparent)`,
                  }} />
                </div>
              )}

              {/* Spec Table */}
              <div style={{
                borderRadius: 12,
                border: `1px solid ${t.borderPrimary}`,
                overflow: "hidden",
              }}>
                {/* Table Header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `72px 1.4fr ${cols.map(() => "1fr").join(" ")} 40px`,
                  gap: 0,
                  padding: "12px 20px",
                  background: t.bgSection,
                  borderBottom: `2px solid #C12033`,
                }}>
                  <div />
                  <div style={{
                    fontSize: 11,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#C12033",
                    fontWeight: 700,
                  }}>
                    Series
                  </div>
                  {cols.map((col, ci) => (
                    <div key={col} style={{
                      fontSize: 10,
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: t.textTertiary,
                      fontWeight: 600,
                      paddingLeft: ci === 0 ? 16 : 0,
                    }}>
                      {col}
                    </div>
                  ))}
                  <div />
                </div>

                {/* Machine Rows */}
                {machineGroups.map(({ machine, rowIdx }, mgi) => {
                  const isHovered = hoveredRow === rowIdx;
                  const catRows = machine.categoryRows;
                  const rowCount = catRows ? catRows.length : 1;

                  return (
                    <Link
                      to={`/machines/${machine.manufacturer.toLowerCase()}/${machine.slug}`}
                      key={machine.slug}
                      onMouseEnter={() => setHoveredRow(rowIdx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: `72px 1.4fr ${cols.map(() => "1fr").join(" ")} 40px`,
                        gridTemplateRows: catRows ? `repeat(${rowCount}, auto)` : "auto",
                        gap: 0,
                        padding: "14px 20px",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "inherit",
                        borderBottom: mgi < machineGroups.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                        background: isHovered
                          ? (isDark ? "rgba(193,32,51,0.06)" : "rgba(193,32,51,0.03)")
                          : "transparent",
                        transition: "background 0.2s",
                      }}
                    >
                      {/* Image — spans all rows */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: 1,
                        gridRow: catRows ? `1 / ${rowCount + 1}` : undefined,
                        alignSelf: "center",
                      }}>
                        <img
                          src={machine.image}
                          alt={machine.name}
                          style={{ width: 56, height: 42, objectFit: "contain" }}
                        />
                      </div>

                      {/* Name — spans all rows */}
                      <div style={{
                        gridColumn: 2,
                        gridRow: catRows ? `1 / ${rowCount + 1}` : undefined,
                        alignSelf: "center",
                      }}>
                        <div style={{
                          fontSize: 15,
                          fontWeight: 700,
                          letterSpacing: -0.3,
                          color: isHovered ? "#C12033" : t.textPrimary,
                          transition: "color 0.2s",
                        }}>
                          {machine.name}
                        </div>
                        <div style={{
                          fontSize: 11,
                          color: t.textTertiary,
                          marginTop: 1,
                        }}>
                          {machine.tagline}
                        </div>
                      </div>

                      {/* Spec values */}
                      {catRows ? (
                        (() => {
                          // For each column, check if only the first row has a value (rest are empty "")
                          const spanCols = cols.map((col) =>
                            catRows[0][col] && catRows.slice(1).every((r) => r[col] === "" || r[col] === undefined)
                              && catRows.slice(1).some((r) => r[col] === "")
                          );
                          return catRows.flatMap((row, ri) =>
                            cols.map((col, ci) => {
                              // Skip empty cells in later rows for spanning columns
                              if (ri > 0 && spanCols[ci]) return null;
                              const val = row[col];
                              const isHeader = val && typeof val === "object" && val.header;
                              const display = isHeader ? val.header : (val !== undefined ? val : getSpecValue(machine.specifications, col));
                              const spans = ri === 0 && spanCols[ci];
                              return (
                              <div key={`${ri}-${col}`} style={{
                                gridRow: spans ? `1 / ${rowCount + 1}` : ri + 1,
                                gridColumn: ci + 3,
                                fontSize: isHeader ? 12 : 13,
                                fontWeight: isHeader ? 700 : 400,
                                color: isHeader ? t.textPrimary : t.textSecondary,
                                lineHeight: 1.4,
                                whiteSpace: "pre-line",
                                alignSelf: spans ? "center" : undefined,
                                paddingTop: !spans && ri > 0 ? 8 : 0,
                                paddingBottom: !spans && ri < rowCount - 1 ? 8 : 0,
                                paddingLeft: ci === 0 ? 16 : 0,
                                borderTop: !spans && ri > 0 ? `1px solid ${t.borderPrimary}` : "none",
                              }}>
                                {display}
                              </div>
                              );
                            }).filter(Boolean)
                          );
                        })()
                      ) : (
                        cols.map((col, ci) => (
                          <div key={col} style={{
                            fontSize: 13,
                            color: t.textSecondary,
                            lineHeight: 1.4,
                            whiteSpace: "pre-line",
                            paddingLeft: ci === 0 ? 16 : 0,
                          }}>
                            {getSpecValue(machine.specifications, col)}
                          </div>
                        ))
                      )}

                      {/* Arrow — spans all rows */}
                      <div style={{
                        gridColumn: cols.length + 3,
                        gridRow: catRows ? `1 / ${rowCount + 1}` : undefined,
                        alignSelf: "center",
                        color: "#C12033",
                        fontSize: 18,
                        textAlign: "center",
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.3s",
                        opacity: isHovered ? 1 : 0.3,
                      }}>
                        →
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* ==================== EXPLORE OTHER CATEGORIES ==================== */}
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
          Explore More <span style={{ color: "#C12033" }}>Categories</span>
        </h2>

        <div className="category-grid">
          {otherCategories.map((cat, i) => {
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
                }}
              >
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: "linear-gradient(90deg, #C12033, #E8475A)",
                  opacity: hoveredCategory === i ? 1 : 0,
                  transition: "opacity 0.3s",
                }} />

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
                    {cat.description}
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
          <div className="section-label">Get Started</div>
          <h2 style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 16,
          }}>
            Ready to explore {category.label}{" "}
            <span style={{ color: "#C12033" }}>machines?</span>
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

export default MachineCategoryPage;
