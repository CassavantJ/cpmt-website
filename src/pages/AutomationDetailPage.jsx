import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import automationData from "../automation.json";
import machineData from "../machines.json";

const AutomationDetailPage = () => {
  const { isDark, t } = useTheme();
  const manufacturers = machineData.manufacturers || {};
  const { slug } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const product = automationData.products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <section style={{
        padding: "200px clamp(24px, 5vw, 80px) 100px",
        textAlign: "center",
        maxWidth: 600,
        margin: "0 auto",
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}>System Not Found</h1>
        <p style={{ color: t.textSecondary, fontSize: 16, marginBottom: 32 }}>
          The automation system you're looking for doesn't exist or may have been removed.
        </p>
        <Link to="/automation" className="cta-primary">
          ← Back to Automation
        </Link>
      </section>
    );
  }

  const productCategories = Array.isArray(product.category) ? product.category : [product.category];
  const category = automationData.categories.find((c) => productCategories.includes(c.id));
  const related = automationData.products
    .filter((p) => {
      const pCats = Array.isArray(p.category) ? p.category : [p.category];
      return pCats.some(c => productCategories.includes(c)) && p.slug !== product.slug;
    })
    .slice(0, 3);

  const specEntries = Object.entries(product.specifications || {});
  const images = product.images || [];
  const validImages = images.filter((_, i) => !imageErrors[i]);
  const hasMultipleImages = validImages.length > 1;

  // Group consecutive sections with the same `group` field
  const sectionBlocks = (product.sections || []).reduce((blocks, section) => {
    const lastBlock = blocks[blocks.length - 1];
    if (section.group && lastBlock && lastBlock.group === section.group) {
      lastBlock.items.push(section);
    } else {
      blocks.push({
        group: section.group || null,
        items: [section],
      });
    }
    return blocks;
  }, []);

  return (
    <>
      {/* Breadcrumb + Hero */}
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
          <Link to="/automation" style={{ color: t.textTertiary, textDecoration: "none" }}>
            Automation
          </Link>
          <span style={{ color: t.textTertiary }}>→</span>
          <Link to={`/automation?category=${productCategories[0]}`} style={{ color: t.textTertiary, textDecoration: "none" }}>{category?.label}</Link>
          <span style={{ color: t.textTertiary }}>→</span>
          <span style={{ color: "#C12033" }}>{product.name}</span>
        </nav>

        {/* Hero */}
        <div style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "flex-start",
          flexWrap: "wrap",
          animation: "fadeUp 0.6s ease-out 0.2s both",
        }}>
          {/* Left: image gallery */}
          <div style={{ flex: "1 1 400px" }}>
            {/* Main image */}
            <div style={{
              minHeight: 360,
              background: t.bgSection,
              borderRadius: 16,
              border: `1px solid ${t.borderPrimary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
              position: "relative",
              overflow: "hidden",
            }}>
              {validImages.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 320,
                    objectFit: "contain",
                  }}
                  onError={() => {
                    setImageErrors(prev => ({ ...prev, [activeImage]: true }));
                    // Move to next valid image if current one fails
                    const nextValid = images.findIndex((_, i) => i !== activeImage && !imageErrors[i]);
                    if (nextValid >= 0) setActiveImage(nextValid);
                  }}
                />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(48px, 8vw, 72px)",
                    fontWeight: 900,
                    fontFamily: "'Space Mono', monospace",
                    color: "#C12033",
                    letterSpacing: -2,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}>
                    {product.highlight}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: t.textTertiary,
                    fontWeight: 500,
                    maxWidth: 240,
                    lineHeight: 1.5,
                    margin: "0 auto",
                  }}>
                    {product.tagline}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail strip — only shown when multiple valid images exist */}
            {hasMultipleImages && (
              <div style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
              }}>
                {images.map((img, i) => {
                  if (imageErrors[i]) return null;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 10,
                        border: activeImage === i
                          ? "2px solid #C12033"
                          : `1px solid ${t.borderPrimary}`,
                        background: t.bgSection,
                        padding: 6,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: activeImage === i ? 1 : 0.6,
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => { if (activeImage !== i) e.currentTarget.style.opacity = "0.85"; }}
                      onMouseLeave={(e) => { if (activeImage !== i) e.currentTarget.style.opacity = "0.6"; }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                        onError={() => setImageErrors(prev => ({ ...prev, [i]: true }))}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: info */}
          <div style={{ flex: "1 1 400px" }}>
            <div style={{
              fontSize: 11,
              color: "#C12033",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 12,
            }}>
              {category?.label}
            </div>

            <h1 style={{
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.1,
              marginBottom: 8,
            }}>
              {product.name}
            </h1>

            {product.manufacturer && manufacturers[product.manufacturer] && (
              <div style={{ marginBottom: 20 }}>
                <img
                  src={isDark ? manufacturers[product.manufacturer].logoDark : manufacturers[product.manufacturer].logoLight}
                  alt={product.manufacturer}
                  style={{ height: 18, width: "auto", opacity: 0.6 }}
                />
              </div>
            )}

            <p style={{
              fontSize: 16,
              color: t.textSecondary,
              lineHeight: 1.8,
              marginBottom: 32,
            }}>
              {product.fullDescription}
            </p>

            {/* Feature tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
              {product.features.map((f, i) => (
                <div key={i} style={{
                  padding: "8px 16px",
                  background: i === 0 ? "rgba(193,32,51,0.08)" : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"),
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "'Space Mono', monospace",
                  color: i === 0 ? "#C12033" : t.textSecondary,
                  fontWeight: i === 0 ? 600 : 400,
                }}>
                  {f}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/contact" className="cta-primary">
                Request a Quote →
              </Link>
              <Link to="/contact" className="cta-outline">
                Ask a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      {specEntries.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
          maxWidth: 1600,
          margin: "0 auto",
          animation: "fadeUp 0.6s ease-out 0.35s both",
        }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 800,
            letterSpacing: -0.5,
            marginBottom: 24,
          }}>
            Key <span style={{ color: "#C12033" }}>Specifications</span>
          </h2>

          <div style={{
            borderRadius: 12,
            border: `1px solid ${t.borderPrimary}`,
            overflow: "hidden",
          }}>
            {specEntries.map(([key, value], i) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 24px",
                background: i % 2 === 0
                  ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)")
                  : "transparent",
                borderBottom: i < specEntries.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
              }}>
                <span style={{
                  fontSize: 14,
                  color: t.textTertiary,
                  fontFamily: "'Space Mono', monospace",
                }}>
                  {key}
                </span>
                <span style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: t.textPrimary,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail Sections */}
      {product.details && product.details.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
          maxWidth: 1600,
          margin: "0 auto",
          animation: "fadeUp 0.6s ease-out 0.4s both",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: product.details.length === 1 ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}>
            {product.details.map((section, si) => (
              <div key={si} style={{
                borderRadius: 16,
                border: `1px solid ${t.borderPrimary}`,
                background: t.bgCard,
                padding: "28px 24px",
              }}>
                <h3 style={{
                  fontSize: 11,
                  fontFamily: "'Space Mono', monospace",
                  color: "#C12033",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 20,
                  fontWeight: 700,
                }}>
                  {section.label}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 14,
                      color: t.textSecondary,
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: "#C12033", fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Configuration Examples */}
      {product.configurationExamples && product.configurationExamples.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
          maxWidth: 1600,
          margin: "0 auto",
          animation: "fadeUp 0.6s ease-out 0.38s both",
        }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 800,
            letterSpacing: -0.5,
            marginBottom: 24,
          }}>
            Configuration <span style={{ color: "#C12033" }}>Examples</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
            gap: 20,
          }}>
            {product.configurationExamples.map((config, ci) => (
              <div key={ci} style={{
                borderRadius: 16,
                border: `1px solid ${t.borderPrimary}`,
                background: t.bgCard,
                overflow: "hidden",
              }}>
                <div style={{
                  background: t.bgSection,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  minHeight: 240,
                }}>
                  <img
                    src={config.image}
                    alt={config.label}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 280,
                      objectFit: "contain",
                    }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div style={{
                  padding: "14px 20px",
                  borderTop: `1px solid ${t.borderPrimary}`,
                }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    color: t.textPrimary,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}>
                    {config.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content Sections (grouped or standalone) */}
      {sectionBlocks.map((block, bi) => {
        const renderSection = (section, si) => {
          if (section.table) {
            return (
              <div key={si} style={{ marginTop: si > 0 ? "clamp(40px, 6vw, 72px)" : 0 }}>
                <h2 style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  marginBottom: 24,
                }}>
                  {section.title}
                </h2>
                {section.table.groups ? (
                  section.table.groups.map((group, gi) => (
                    <div key={gi} style={{ marginBottom: gi < section.table.groups.length - 1 ? 32 : 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontFamily: "'Space Mono', monospace",
                        color: "#C12033",
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}>
                        {group.label}
                      </div>
                      <div style={{
                        borderRadius: 12,
                        border: `1px solid ${t.borderPrimary}`,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                          borderBottom: `1px solid ${t.borderPrimary}`,
                        }}>
                          {section.table.headers.map((h, hi) => (
                            <div key={hi} style={{
                              padding: "12px 16px",
                              fontSize: 12,
                              fontWeight: 700,
                              fontFamily: "'Space Mono', monospace",
                              color: t.textSecondary,
                            }}>
                              {h}
                            </div>
                          ))}
                        </div>
                        {group.rows.map((row, ri) => (
                          <div key={ri} style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                            background: ri % 2 === 0
                              ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)")
                              : "transparent",
                            borderBottom: ri < group.rows.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                          }}>
                            {row.map((cell, ci) => (
                              <div key={ci} style={{
                                padding: "11px 16px",
                                fontSize: 13,
                                color: ci === 0 ? t.textPrimary : t.textSecondary,
                                fontWeight: ci === 0 ? 600 : 400,
                              }}>
                                {cell.includes("\n") ? cell.split("\n").map((line, li) => (
                                  <span key={li}>{li > 0 && <br />}{line}</span>
                                )) : cell}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    borderRadius: 12,
                    border: `1px solid ${t.borderPrimary}`,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      borderBottom: `1px solid ${t.borderPrimary}`,
                    }}>
                      {section.table.headers.map((h, hi) => (
                        <div key={hi} style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Space Mono', monospace",
                          color: t.textSecondary,
                        }}>
                          {h}
                        </div>
                      ))}
                    </div>
                    {section.table.rows.map((row, ri) => (
                      <div key={ri} style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                        background: ri % 2 === 0
                          ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)")
                          : "transparent",
                        borderBottom: ri < section.table.rows.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                      }}>
                        {row.map((cell, ci) => (
                          <div key={ci} style={{
                            padding: "11px 16px",
                            fontSize: 13,
                            color: ci === 0 ? t.textPrimary : t.textSecondary,
                            fontWeight: ci === 0 ? 600 : 400,
                          }}>
                            {cell.includes("\n") ? cell.split("\n").map((line, li) => (
                              <span key={li}>{li > 0 && <br />}{line}</span>
                            )) : cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={si} style={{
              display: "flex",
              gap: "clamp(32px, 5vw, 64px)",
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: si % 2 === 0 ? "row" : "row-reverse",
              marginTop: si > 0 ? "clamp(40px, 6vw, 72px)" : 0,
            }}>
              <div style={{ flex: "1 1 400px" }}>
                <h3 style={{
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}>
                  {section.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: t.textSecondary,
                  lineHeight: 1.8,
                }}>
                  {section.description && section.description.includes("\n") ? section.description.split("\n").map((line, li) => (
                    <span key={li}>{li > 0 && <br />}{line}</span>
                  )) : section.description}
                </p>
                {section.bullets && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: section.description ? 16 : 0 }}>
                    {section.bullets.map((bullet, bi) => (
                      <div key={bi} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        color: t.textSecondary,
                        lineHeight: 1.6,
                      }}>
                        <span style={{ color: "#C12033", fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                        {bullet}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {section.image && (
                <div style={{ flex: "1 1 360px" }}>
                  <div style={{
                    borderRadius: 16,
                    border: `1px solid ${t.borderPrimary}`,
                    background: t.bgSection,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 24,
                    minHeight: 260,
                  }}>
                    <img
                      src={section.image}
                      alt={section.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 320,
                        objectFit: "contain",
                        borderRadius: 8,
                      }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  {section.imageCaption && (
                    <p style={{
                      fontSize: 13,
                      color: t.textTertiary,
                      lineHeight: 1.6,
                      marginTop: 12,
                      paddingLeft: 4,
                    }}>
                      {section.imageCaption.split("\n").map((line, li) => (
                        <span key={li}>
                          {li > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        };

        if (block.group) {
          const isGridLayout = block.items.some(s => s.groupLayout === "grid");
          const descItems = block.items.filter(s => s.groupDescription);
          const richItems = block.items.filter(s => (s.image || s.table) && !s.groupDescription);
          const textOnlyItems = block.items.filter(s => !s.image && !s.table && !s.groupDescription);

          return (
            <section key={bi} style={{
              padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
              maxWidth: 1600,
              margin: "0 auto",
              animation: `fadeUp 0.6s ease-out ${0.45 + bi * 0.05}s both`,
            }}>
              <div style={{
                borderRadius: 20,
                border: `1px solid ${t.borderPrimary}`,
                background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
                padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
              }}>
                <h2 style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  marginBottom: 8,
                }}>
                  {block.group}
                </h2>
                <div style={{
                  width: 40,
                  height: 3,
                  background: "#C12033",
                  borderRadius: 2,
                  marginBottom: "clamp(32px, 5vw, 48px)",
                }} />
                {descItems.map((desc, di) => (
                  <p key={`desc-${di}`} style={{
                    fontSize: 15,
                    color: t.textSecondary,
                    lineHeight: 1.8,
                    marginBottom: "clamp(24px, 4vw, 36px)",
                    maxWidth: 800,
                  }}>
                    {desc.description}
                  </p>
                ))}
                {isGridLayout ? (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fill, minmax(220px, 1fr))`,
                    gap: 20,
                  }}>
                    {block.items.filter(s => !s.groupDescription).map((section, si) => (
                      <div key={si} style={{
                        padding: "20px",
                        borderRadius: 12,
                        border: `1px solid ${t.borderPrimary}`,
                        background: t.bgCard,
                        display: "flex",
                        flexDirection: "column",
                      }}>
                        {section.image && (
                          <div style={{
                            borderRadius: 8,
                            overflow: "hidden",
                            marginBottom: 16,
                            background: t.bgSection,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: 140,
                            padding: 8,
                          }}>
                            <img
                              src={section.image}
                              alt={section.title}
                              style={{
                                maxWidth: "100%",
                                maxHeight: 160,
                                objectFit: "contain",
                              }}
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          </div>
                        )}
                        <h4 style={{
                          fontSize: 15,
                          fontWeight: 700,
                          letterSpacing: -0.2,
                          marginBottom: 8,
                        }}>
                          {section.title}
                        </h4>
                        <p style={{
                          fontSize: 13,
                          color: t.textSecondary,
                          lineHeight: 1.6,
                          margin: 0,
                        }}>
                          {section.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {richItems.map((section, si) => renderSection(section, si))}
                    {textOnlyItems.length > 0 && (
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 20,
                        marginTop: richItems.length > 0 ? "clamp(40px, 6vw, 56px)" : 0,
                      }}>
                        {textOnlyItems.map((section, si) => (
                          <div key={si} style={{
                            padding: "24px",
                            borderRadius: 12,
                            border: `1px solid ${t.borderPrimary}`,
                            background: t.bgCard,
                          }}>
                            <h4 style={{
                              fontSize: 16,
                              fontWeight: 700,
                              letterSpacing: -0.2,
                              marginBottom: 10,
                            }}>
                              {section.title}
                            </h4>
                            <p style={{
                              fontSize: 14,
                              color: t.textSecondary,
                              lineHeight: 1.7,
                              margin: 0,
                            }}>
                              {section.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          );
        }

        return block.items.map((section, si) => (
          <section key={`${bi}-${si}`} style={{
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
            maxWidth: 1600,
            margin: "0 auto",
            animation: `fadeUp 0.6s ease-out ${0.45 + bi * 0.05}s both`,
          }}>
            {section.table ? (
              <>
                <h2 style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  marginBottom: 24,
                }}>
                  {section.title}
                </h2>
                {section.table.groups ? (
                  section.table.groups.map((group, gi) => (
                    <div key={gi} style={{ marginBottom: gi < section.table.groups.length - 1 ? 32 : 0 }}>
                      <div style={{
                        fontSize: 13,
                        fontFamily: "'Space Mono', monospace",
                        color: "#C12033",
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}>
                        {group.label}
                      </div>
                      <div style={{
                        borderRadius: 12,
                        border: `1px solid ${t.borderPrimary}`,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                          borderBottom: `1px solid ${t.borderPrimary}`,
                        }}>
                          {section.table.headers.map((h, hi) => (
                            <div key={hi} style={{
                              padding: "12px 16px",
                              fontSize: 12,
                              fontWeight: 700,
                              fontFamily: "'Space Mono', monospace",
                              color: t.textSecondary,
                            }}>
                              {h}
                            </div>
                          ))}
                        </div>
                        {group.rows.map((row, ri) => (
                          <div key={ri} style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                            background: ri % 2 === 0
                              ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)")
                              : "transparent",
                            borderBottom: ri < group.rows.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                          }}>
                            {row.map((cell, ci) => (
                              <div key={ci} style={{
                                padding: "11px 16px",
                                fontSize: 13,
                                color: ci === 0 ? t.textPrimary : t.textSecondary,
                                fontWeight: ci === 0 ? 600 : 400,
                              }}>
                                {cell.includes("\n") ? cell.split("\n").map((line, li) => (
                                  <span key={li}>{li > 0 && <br />}{line}</span>
                                )) : cell}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    borderRadius: 12,
                    border: `1px solid ${t.borderPrimary}`,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                      background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      borderBottom: `1px solid ${t.borderPrimary}`,
                    }}>
                      {section.table.headers.map((h, hi) => (
                        <div key={hi} style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: "'Space Mono', monospace",
                          color: t.textSecondary,
                        }}>
                          {h}
                        </div>
                      ))}
                    </div>
                    {section.table.rows.map((row, ri) => (
                      <div key={ri} style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${section.table.headers.length}, 1fr)`,
                        background: ri % 2 === 0
                          ? (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)")
                          : "transparent",
                        borderBottom: ri < section.table.rows.length - 1 ? `1px solid ${t.borderPrimary}` : "none",
                      }}>
                        {row.map((cell, ci) => (
                          <div key={ci} style={{
                            padding: "11px 16px",
                            fontSize: 13,
                            color: ci === 0 ? t.textPrimary : t.textSecondary,
                            fontWeight: ci === 0 ? 600 : 400,
                          }}>
                            {cell.includes("\n") ? cell.split("\n").map((line, li) => (
                              <span key={li}>{li > 0 && <br />}{line}</span>
                            )) : cell}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{
                display: "flex",
                gap: "clamp(32px, 5vw, 64px)",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: si % 2 === 0 ? "row" : "row-reverse",
              }}>
                <div style={{ flex: "1 1 400px" }}>
                  <h2 style={{
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 800,
                    letterSpacing: -0.5,
                    lineHeight: 1.2,
                    marginBottom: 20,
                  }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p style={{
                      fontSize: 15,
                      color: t.textSecondary,
                      lineHeight: 1.8,
                    }}>
                      {section.description && section.description.includes("\n") ? section.description.split("\n").map((line, li) => (
                        <span key={li}>{li > 0 && <br />}{line}</span>
                      )) : section.description}
                    </p>
                  )}
                  {section.bullets && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: section.description ? 16 : 0 }}>
                      {section.bullets.map((bullet, bi) => (
                        <div key={bi} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 14,
                          color: t.textSecondary,
                          lineHeight: 1.6,
                        }}>
                          <span style={{ color: "#C12033", fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {section.image && (
                  <div style={{ flex: "1 1 360px" }}>
                    <div style={{
                      borderRadius: 16,
                      border: `1px solid ${t.borderPrimary}`,
                      background: t.bgSection,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 24,
                      minHeight: 260,
                    }}>
                      <img
                        src={section.image}
                        alt={section.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: 320,
                          objectFit: "contain",
                          borderRadius: 8,
                        }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>
                    {section.imageCaption && (
                      <p style={{
                        fontSize: 13,
                        color: t.textTertiary,
                        lineHeight: 1.6,
                        marginTop: 12,
                        paddingLeft: 4,
                      }}>
                        {section.imageCaption.split("\n").map((line, li) => (
                          <span key={li}>
                            {li > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        ));
      })}

      {/* Related Systems */}
      {related.length > 0 && (
        <section style={{
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          maxWidth: 1600,
          margin: "0 auto",
          animation: "fadeUp 0.6s ease-out 0.45s both",
        }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 800,
            letterSpacing: -0.5,
            marginBottom: 24,
          }}>
            Related <span style={{ color: "#C12033" }}>Systems</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}>
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/automation/${rel.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 12,
                  border: `1px solid ${t.borderPrimary}`,
                  background: t.bgCard,
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(193,32,51,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(193,32,51,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.borderPrimary;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, margin: 0 }}>
                    {rel.name}
                  </h3>
                  <span style={{
                    fontSize: 10,
                    fontFamily: "'Space Mono', monospace",
                    color: "#C12033",
                    background: "rgba(193,32,51,0.08)",
                    padding: "3px 8px",
                    borderRadius: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    {rel.highlight}
                  </span>
                </div>
                <p style={{
                  fontSize: 13,
                  color: t.textTertiary,
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default AutomationDetailPage;
