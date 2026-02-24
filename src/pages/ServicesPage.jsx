import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import serviceData from "../services.json";

const ServicesPage = ({ isVisible }) => {
  const { t } = useTheme();
  const [hoveredService, setHoveredService] = useState(null);

  const services = serviceData.services;

  return (
    <section id="services" data-animate style={{
      padding: "140px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)",
      background: t.bgSection,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        opacity: isVisible("services") ? 1 : 0,
        transform: isVisible("services") ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label">What We Do</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: -2 }}>
            End-to-End <span style={{ color: "#C12033" }}>Solutions</span>
          </h2>
          <p style={{ color: t.textTertiary, maxWidth: 500, margin: "16px auto 0", fontSize: 15, lineHeight: 1.7 }}>
            From initial consultation to ongoing support — we're your partner through every step of the manufacturing process.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
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
                opacity: isVisible("services") ? 1 : 0,
                transform: isVisible("services") ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: `${svc.color}15`,
                border: `1px solid ${svc.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: svc.color,
                marginBottom: 20,
                transition: "all 0.3s",
                transform: hoveredService === i ? "scale(1.1)" : "scale(1)",
              }}>
                {svc.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: -0.3 }}>
                {svc.title}
              </h3>
              <p style={{ color: t.textTertiary, fontSize: 14, lineHeight: 1.7 }}>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
