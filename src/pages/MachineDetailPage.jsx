import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";

const MachineDetailPage = () => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const { manufacturer, slug } = useParams();
  const [selectedModel, setSelectedModel] = useState(null);
  const [hoveredModel, setHoveredModel] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(0);

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

  const variants = machine.tableVariants && machine.tableVariants.length > 0
    ? machine.tableVariants : null;

  // Look up category specColumns for the models table (machine-level override takes priority)
  const category = machineData.categories.find((c) => c.id === machine.category);
  const specColumns = machine.specColumns || category?.specColumns || [];

  const baseSpecs = machine.specifications || {};
  const specEntries = Object.entries(baseSpecs);

  // Find related series (same category, excluding current)
  const related = machineData.machines
    .filter((m) => m.category === machine.category && m.slug !== machine.slug)
    .slice(0, 3);

  // Find the category page link
  const categoryLink = category ? `/machines/category/${category.id}` : "/machines";
  const categoryLabel = category?.label || "Machines";

  // Derive descriptor tags from model name suffix (M=Milling, S=Second Spindle, Y=Y-axis)
  const getModelTags = (name) => {
    const tags = [];
    if (!name) return tags;
    if (name.startsWith("QUICK TURN")) {
      const match = name.match(/(\d+)([A-Z]*)$/);
      if (!match) return tags;
      const num = match[1];
      const suffix = match[2];
      if (!suffix) {
        tags.push("Bolt-on");
      } else {
        if (suffix.includes("M")) tags.push("Milling");
        if (suffix.includes("S")) tags.push("Second Spindle");
        if (suffix.includes("Y")) tags.push("Y-axis");
        tags.push(num === "100" ? "Bolt-on" : "VDI");
      }
    } else if (name.startsWith("QTE-")) {
      const match = name.match(/QTE-\d+([A-Z]*)\s/);
      if (!match || !match[1]) return tags;
      const suffix = match[1];
      if (suffix.includes("M")) tags.push("Milling");
      if (suffix.includes("S")) tags.push("Second Spindle");
      if (suffix.includes("Y")) tags.push("Y-axis");
    }
    return tags;
  };

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
          <Link to={categoryLink} style={{ color: t.textTertiary, textDecoration: "none" }}>
            {categoryLabel}
          </Link>
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
              {variants && (
                <div style={{
                  padding: "8px 16px",
                  background: "rgba(193,32,51,0.08)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "'Space Mono', monospace",
                  color: "#C12033",
                  fontWeight: 600,
                }}>
                  {variants.length} {variants.length === 1 ? "Model" : "Models"}
                </div>
              )}
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

      {/* ==================== MODELS IN THIS SERIES ==================== */}
      {variants && specColumns.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
          maxWidth: 1600,
          margin: "0 auto",
          animation: "fadeUp 0.6s ease-out 0.35s both",
        }}>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            marginBottom: 24,
          }}>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800,
              letterSpacing: -0.5,
            }}>
              Models in the <span style={{ color: "#C12033" }}>{machine.name}</span> Series
            </h2>
            <span style={{
              fontSize: 12,
              fontFamily: "'Space Mono', monospace",
              color: t.textTertiary,
              letterSpacing: 1,
            }}>
              {variants.length} {variants.length === 1 ? "MODEL" : "MODELS"}
            </span>
          </div>

          {(() => {
            const groups = machine.variantGroups;
            const gridCols = `1.4fr ${specColumns.map(() => "1fr").join(" ")}`;

            const renderHeader = (groupLabel) => (
              <div style={{
                display: "grid",
                gridTemplateColumns: gridCols,
                alignItems: "center",
                gap: 0,
                padding: "12px 20px",
                background: t.bgSection,
                borderBottom: `2px solid #C12033`,
              }}>
                <div style={{
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#C12033",
                  fontWeight: 700,
                }}>
                  {groupLabel && groupLabel.startsWith("Max. machining diameter") ? (
                    <>
                      <div>Max. machining diameter</div>
                      <div>{groupLabel.replace("Max. machining diameter ", "")}</div>
                    </>
                  ) : (groupLabel || "Model")}
                </div>
                {specColumns.map((col) => (
                  <div key={col} style={{
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: t.textTertiary,
                    fontWeight: 600,
                    whiteSpace: "pre-line",
                  }}>
                    {col}
                  </div>
                ))}
              </div>
            );

            const renderRow = (variant, vi, isLast) => {
              const isSelected = selectedModel === vi;
              const isHovered = hoveredModel === vi;
              const modelName = variant.name || `Model ${vi + 1}`;

              // Merge base specs with variant overrides for expanded view
              const mergedSpecs = { ...baseSpecs };
              for (const [k, v] of Object.entries(variant)) {
                if (k !== "name") mergedSpecs[k] = v;
              }
              const mergedEntries = Object.entries(mergedSpecs);

              const tags = variant.tags || getModelTags(modelName);

              return (
                <div
                  key={vi}
                  onClick={() => { setSelectedModel(vi); setSelectedConfig(0); }}
                  onMouseEnter={() => setHoveredModel(vi)}
                  onMouseLeave={() => setHoveredModel(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: gridCols,
                    gap: 0,
                    padding: "14px 20px",
                    alignItems: "center",
                    cursor: "pointer",
                    borderBottom: isLast ? "none" : `1px solid ${t.borderPrimary}`,
                    borderLeft: "3px solid transparent",
                    background: isHovered
                      ? (isDark ? "rgba(193,32,51,0.05)" : "rgba(193,32,51,0.02)")
                      : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <div>
                    {tags.length > 0 && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                        {tags.map((tag) => (
                          <span key={tag} style={{
                            fontSize: 10,
                            fontWeight: 600,
                            fontFamily: "'Space Mono', monospace",
                            padding: "2px 8px",
                            borderRadius: 4,
                            background: isDark ? "rgba(193,32,51,0.12)" : "rgba(232,119,34,0.1)",
                            color: isDark ? "#e8884a" : "#C85000",
                            letterSpacing: 0.3,
                            whiteSpace: "nowrap",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: -0.2,
                      color: isHovered ? "#C12033" : t.textPrimary,
                      transition: "color 0.2s",
                    }}>
                      {modelName}
                    </div>
                  </div>
                  {specColumns.map((col) => (
                    <div key={col} style={{
                      fontSize: 13,
                      color: t.textSecondary,
                      lineHeight: 1.4,
                    }}>
                      {variant[col] || "—"}
                    </div>
                  ))}
                </div>
              );
            };

            if (groups) {
              let offset = 0;
              return groups.map((group, gi) => {
                const groupVariants = variants.slice(offset, offset + group.count);
                const startOffset = offset;
                offset += group.count;
                return (
                  <div key={gi} style={{
                    borderRadius: 12,
                    border: `1px solid ${t.borderPrimary}`,
                    overflow: "hidden",
                    marginBottom: gi < groups.length - 1 ? 20 : 0,
                  }}>
                    {renderHeader(group.label)}
                    {groupVariants.map((variant, i) =>
                      renderRow(variant, startOffset + i, i === groupVariants.length - 1)
                    )}
                  </div>
                );
              });
            }

            return (
              <div style={{
                borderRadius: 12,
                border: `1px solid ${t.borderPrimary}`,
                overflow: "hidden",
              }}>
                {renderHeader()}
                {variants.map((variant, vi) =>
                  renderRow(variant, vi, vi === variants.length - 1)
                )}
              </div>
            );
          })()}

        </section>
      )}

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
              <div style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 24,
              }}>
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                }}>
                  <span style={{ color: "#C12033" }}>Specifications</span>
                </h2>
              </div>
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

      {/* ==================== RELATED SERIES ==================== */}
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
            Related <span style={{ color: "#C12033" }}>Series</span>
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

      {/* ==================== SPEC MODAL ==================== */}
      {selectedModel !== null && variants && variants[selectedModel] && (() => {
        const variant = variants[selectedModel];
        const modalName = variant.name || `Model ${selectedModel + 1}`;

        // Determine spec format: array (single config) or object (multi config with tabs)
        const fs = variant.fullSpecs;
        const isMultiConfig = fs && !Array.isArray(fs) && typeof fs === "object";
        const isSingleConfig = fs && Array.isArray(fs) && fs.length > 0;
        const configKeys = isMultiConfig ? Object.keys(fs) : [];
        const activeConfigIdx = Math.min(selectedConfig, configKeys.length - 1);
        const activeSpecs = isMultiConfig ? fs[configKeys[Math.max(0, activeConfigIdx)]] : (isSingleConfig ? fs : null);

        // Fallback: merge base specs with variant overrides
        let fallbackEntries = [];
        if (!activeSpecs) {
          const merged = { ...baseSpecs };
          for (const [k, v] of Object.entries(variant)) {
            if (k !== "name") merged[k] = v;
          }
          fallbackEntries = Object.entries(merged);
        }

        return (
          <div
            onClick={() => setSelectedModel(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: isDark ? "#1a1a1f" : "#ffffff",
                borderRadius: 16,
                border: `1px solid ${t.borderPrimary}`,
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                maxWidth: 560,
                width: "100%",
                maxHeight: "80vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                animation: "fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Modal header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: `1px solid ${t.borderPrimary}`,
                flexShrink: 0,
              }}>
                <div>
                  <div style={{
                    fontSize: 11,
                    fontFamily: "'Space Mono', monospace",
                    color: "#C12033",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}>
                    Specifications
                  </div>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: -0.3,
                    color: t.textPrimary,
                  }}>
                    {modalName}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModel(null)}
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    border: "none",
                    borderRadius: 8,
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: t.textSecondary,
                    fontSize: 18,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}
                >
                  ✕
                </button>
              </div>

              {/* Config tabs */}
              {isMultiConfig && configKeys.length > 1 && (
                <div style={{
                  padding: "12px 24px",
                  borderBottom: `1px solid ${t.borderPrimary}`,
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontSize: 12,
                    color: t.textTertiary,
                    fontFamily: "'Space Mono', monospace",
                    marginBottom: 8,
                    letterSpacing: 0.5,
                  }}>
                    Select bed length
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {configKeys.map((key, ki) => (
                      <button
                        key={key}
                        onClick={() => setSelectedConfig(ki)}
                        style={{
                          padding: "6px 16px",
                          fontSize: 13,
                          fontWeight: 600,
                          fontFamily: "'Space Mono', monospace",
                          borderRadius: 20,
                          border: "none",
                          cursor: "pointer",
                          background: ki === activeConfigIdx
                            ? (isDark ? "#ffffff" : "#111111")
                            : (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"),
                          color: ki === activeConfigIdx
                            ? (isDark ? "#111111" : "#ffffff")
                            : t.textSecondary,
                          transition: "all 0.2s",
                        }}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal body */}
              <div style={{
                overflowY: "auto",
              }}>
                {activeSpecs ? (
                  activeSpecs.map((group, gi) => (
                    <div key={gi}>
                      {/* Category header */}
                      <div style={{
                        padding: "10px 24px",
                        background: isDark ? "rgba(193,32,51,0.08)" : "rgba(193,32,51,0.04)",
                        borderTop: gi > 0 ? `1px solid ${t.borderPrimary}` : "none",
                        borderBottom: `1px solid ${t.borderPrimary}`,
                      }}>
                        <span style={{
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Space Mono', monospace",
                          color: "#C12033",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}>
                          {group.category}
                        </span>
                      </div>
                      {/* Spec rows within category */}
                      {Object.entries(group.specs).map(([key, value], si) => (
                        <div key={key} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 24px 12px 40px",
                          background: si % 2 === 0 ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
                        }}>
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
                            marginLeft: 16,
                          }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  fallbackEntries.map(([key, value], i) => (
                    <div key={key} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 24px",
                      background: i % 2 === 0 ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)") : "transparent",
                    }}>
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
                        marginLeft: 16,
                      }}>
                        {value}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Modal footer */}
              <div style={{
                padding: "16px 24px",
                borderTop: `1px solid ${t.borderPrimary}`,
                display: "flex",
                gap: 12,
                flexShrink: 0,
              }}>
                <Link
                  to="/contact"
                  className="cta-primary"
                  style={{ flex: 1, textAlign: "center", fontSize: 13, padding: "10px 16px" }}
                >
                  Request a Quote →
                </Link>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="cta-outline"
                  style={{ flex: 1, fontSize: 13, padding: "10px 16px" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default MachineDetailPage;
