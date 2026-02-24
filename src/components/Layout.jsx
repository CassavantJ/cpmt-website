import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import GlobalStyles from "./GlobalStyles";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { t } = useTheme();
  const location = useLocation();
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    // Small delay to let page content render before observing
    const timer = setTimeout(() => {
      document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: t.bgMain,
      color: t.textPrimary,
      minHeight: "100vh",
      overflow: "hidden",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <GlobalStyles />
      <Navigation />
      <main>
        {typeof children === "function" ? children({ isVisible }) : children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
