import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { t } = useTheme();

  const columns = [
    {
      title: "Machines",
      links: [
        { label: "All Machines", to: "/machines" },
        { label: "Multi-Tasking", to: "/machines" },
        { label: "5-Axis", to: "/machines" },
        { label: "Turning Centers", to: "/machines" },
        { label: "Vertical Centers", to: "/machines" },
        { label: "Horizontal Centers", to: "/machines" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Machine Sales", to: "/services/machine-sales" },
        { label: "Turnkey Solutions", to: "/services/turnkey-solutions" },
        { label: "Automation", to: "/services/automation" },
        { label: "Service & Parts", to: "/services/service-and-parts" },
        { label: "Engineering", to: "/services/engineering" },
        { label: "Financing", to: "/services/financing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Industries", to: "/industries" },
        { label: "Support", to: "/support" },
        { label: "Contact", to: "/contact" },
        { label: "Request a Quote", to: "/contact" },
      ],
    },
  ];

  return (
    <footer style={{
      borderTop: `1px solid ${t.borderDivider}`,
      padding: "60px clamp(24px, 5vw, 80px) 32px",
      background: t.bgSection,
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 48,
        }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link to="/">
                <img src={t.logo} alt="CPMT" style={{ height: 36, width: "auto" }} />
              </Link>
            </div>
            <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.7, maxWidth: 250 }}>
              Your authorized Mazak distributor for CNC machine tools, automation, and manufacturing solutions.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: t.textTertiary,
                marginBottom: 16,
              }}>
                {col.title}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{
                    display: "block",
                    color: t.textMuted,
                    textDecoration: "none",
                    fontSize: 14,
                    padding: "5px 0",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => e.target.style.color = t.textPrimary}
                  onMouseOut={(e) => e.target.style.color = t.textMuted}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: `1px solid ${t.borderDivider}`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: t.textSubtle, letterSpacing: 1 }}>
            © 2026 CPMT. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
