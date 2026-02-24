import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Navigation = () => {
  const { isDark, setIsDark, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Machines", to: "/machines" },
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

  const renderNavLink = (item) => {
    if (item.homeOnly && !isHome && !item.anchor) return null;

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
      padding: "0 48px",
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
