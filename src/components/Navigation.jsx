import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import machineData from "../machines.json";
import automationData from "../automation.json";

const Navigation = () => {
  const { isDark, setIsDark, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [machinesOpen, setMachinesOpen] = useState(false);
  const [automationOpen, setAutomationOpen] = useState(false);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null);
  const machinesTimeout = useRef(null);
  const automationTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const machineCategories = machineData.categories.filter((c) => c.id !== "all");
  const automationCategories = automationData.categories;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setMachinesOpen(false);
    setAutomationOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Machines", to: "/machines" },
    { label: "Automation", to: "/automation" },
    { label: "Services", to: "/services" },
    { label: "Industries", to: "/industries" },
    { label: "Support", to: "/support" },
    { label: "About Us", to: "/about" },
  ];

  const handleNavClick = (item, e) => {
    if (item.anchor) {
      if (isHome) {
        // Already on home page — just scroll
        e.preventDefault();
        document.querySelector(item.anchor)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate to home, then scroll after render
        e.preventDefault();
        navigate("/");
        setTimeout(() => {
          document.querySelector(item.anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const handleMachinesEnter = () => {
    clearTimeout(machinesTimeout.current);
    setMachinesOpen(true);
  };
  const handleMachinesLeave = () => {
    machinesTimeout.current = setTimeout(() => setMachinesOpen(false), 150);
  };

  const handleAutomationEnter = () => {
    clearTimeout(automationTimeout.current);
    setAutomationOpen(true);
  };
  const handleAutomationLeave = () => {
    automationTimeout.current = setTimeout(() => setAutomationOpen(false), 150);
  };

  const renderNavLink = (item) => {
    if (item.homeOnly && !isHome && !item.anchor) return null;

    if (item.label === "Machines") {
      return (
        <div
          key={item.label}
          onMouseEnter={handleMachinesEnter}
          onMouseLeave={handleMachinesLeave}
          style={{ position: "relative" }}
        >
          <Link to={item.to} className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {item.label}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginTop: 1, opacity: 0.5, transform: machinesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          {machinesOpen && (
            <div className="nav-dropdown" style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: t.navBgScroll,
              backdropFilter: "blur(20px)",
              border: `1px solid ${t.borderPrimary}`,
              borderRadius: 12,
              padding: "12px 8px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              minWidth: 380,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              zIndex: 1000,
            }}>
              {machineCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/machines/category/${cat.id}`}
                  onMouseEnter={() => setHoveredDropdownItem(cat.id)}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  style={{
                    padding: "10px 14px",
                    fontSize: 13,
                    color: hoveredDropdownItem === cat.id ? t.textPrimary : t.textSecondary,
                    textDecoration: "none",
                    borderRadius: 8,
                    background: hoveredDropdownItem === cat.id ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                to="/machines"
                onMouseEnter={() => setHoveredDropdownItem("all")}
                onMouseLeave={() => setHoveredDropdownItem(null)}
                style={{
                  gridColumn: "1 / -1",
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#C12033",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: hoveredDropdownItem === "all" ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                  borderTop: `1px solid ${t.borderPrimary}`,
                  marginTop: 4,
                  paddingTop: 14,
                  transition: "all 0.15s",
                  fontWeight: 600,
                }}
              >
                View All Machines
              </Link>
            </div>
          )}
        </div>
      );
    }

    if (item.label === "Automation") {
      return (
        <div
          key={item.label}
          onMouseEnter={handleAutomationEnter}
          onMouseLeave={handleAutomationLeave}
          style={{ position: "relative" }}
        >
          <Link to={item.to} className="nav-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {item.label}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginTop: 1, opacity: 0.5, transform: automationOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          {automationOpen && (
            <div className="nav-dropdown" style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: t.navBgScroll,
              backdropFilter: "blur(20px)",
              border: `1px solid ${t.borderPrimary}`,
              borderRadius: 12,
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: 240,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              zIndex: 1000,
            }}>
              {automationCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/automation?category=${cat.id}`}
                  onMouseEnter={() => setHoveredDropdownItem(`auto-${cat.id}`)}
                  onMouseLeave={() => setHoveredDropdownItem(null)}
                  style={{
                    padding: "10px 14px",
                    fontSize: 13,
                    color: hoveredDropdownItem === `auto-${cat.id}` ? t.textPrimary : t.textSecondary,
                    textDecoration: "none",
                    borderRadius: 8,
                    background: hoveredDropdownItem === `auto-${cat.id}` ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                to="/automation"
                onMouseEnter={() => setHoveredDropdownItem("auto-all")}
                onMouseLeave={() => setHoveredDropdownItem(null)}
                style={{
                  padding: "10px 14px",
                  fontSize: 13,
                  color: "#C12033",
                  textDecoration: "none",
                  borderRadius: 8,
                  background: hoveredDropdownItem === "auto-all" ? (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)") : "transparent",
                  borderTop: `1px solid ${t.borderPrimary}`,
                  marginTop: 4,
                  paddingTop: 14,
                  transition: "all 0.15s",
                  fontWeight: 600,
                }}
              >
                View All Automation
              </Link>
            </div>
          )}
        </div>
      );
    }

    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className="nav-link">
          {item.label}
        </Link>
      );
    }
    return (
      <a
        key={item.label}
        href={item.anchor}
        className="nav-link"
        onClick={(e) => handleNavClick(item, e)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      padding: "0 clamp(16px, 4vw, 48px)",
      height: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrollY > 50 ? t.navBgScroll : isHome ? "rgba(0,0,0,0.4)" : "transparent",
      backdropFilter: scrollY > 50 ? "blur(20px)" : isHome ? "blur(12px)" : "none",
      borderBottom: scrollY > 50 ? `1px solid ${t.borderPrimary}` : "1px solid transparent",
      transition: "all 0.4s",
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <img src={t.logo} alt="CPMT - Cassavant Precision Machine Tools" style={{ height: 48, width: "auto" }} />
      </Link>

      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
        {navItems.map(renderNavLink)}
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: "none",
            border: `1px solid ${t.borderPrimary}`,
            borderRadius: 8,
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: t.textSecondary,
            fontSize: 18,
            transition: "all 0.3s",
          }}
        >
          {isDark ? "☀" : "☾"}
        </button>
        <Link to="/contact" className="cta-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
          Contact Us
        </Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          {navItems.map((item) => {
            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className="nav-link">
                  {item.label}
                </Link>
              );
            }
            return (
              <a
                key={item.label}
                href={item.anchor}
                className="nav-link"
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={(e) => { e.stopPropagation(); setIsDark(!isDark); }}
            style={{
              background: "none",
              border: `1px solid ${t.borderPrimary}`,
              borderRadius: 8,
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: t.textSecondary,
              fontSize: 22,
              marginTop: 8,
            }}
          >
            {isDark ? "☀" : "☾"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
