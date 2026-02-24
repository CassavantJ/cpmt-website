import { useTheme } from "../contexts/ThemeContext";

const GlobalStyles = () => {
  const { t } = useTheme();

  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

      * { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }

      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: ${t.scrollTrack}; }
      ::-webkit-scrollbar-thumb { background: #C12033; border-radius: 3px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideLeft {
        from { opacity: 0; transform: translateX(60px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideRight {
        from { opacity: 0; transform: translateX(-60px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      @keyframes gridLine {
        0% { opacity: 0; }
        50% { opacity: 0.15; }
        100% { opacity: 0; }
      }
      @keyframes heroGlow {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.1); }
      }

      .animate-up { animation: fadeUp 0.8s ease-out forwards; }
      .animate-in { animation: fadeIn 0.6s ease-out forwards; }
      .animate-left { animation: slideLeft 0.8s ease-out forwards; }
      .animate-right { animation: slideRight 0.8s ease-out forwards; }
      .animate-scale { animation: scaleIn 0.7s ease-out forwards; }
      .hidden-initial { opacity: 0; }
      .visible { opacity: 1; }

      .nav-link {
        position: relative;
        color: ${t.textSecondary};
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 8px 0;
        transition: color 0.3s;
        font-family: 'Space Mono', monospace;
      }
      .nav-link:hover { color: ${t.textPrimary}; }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: #C12033;
        transition: width 0.3s;
      }
      .nav-link:hover::after { width: 100%; }

      .red-accent { color: #C12033; }
      .mono { font-family: 'Space Mono', monospace; }

      .hero-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(${t.heroGrid} 1px, transparent 1px),
          linear-gradient(90deg, ${t.heroGrid} 1px, transparent 1px);
        background-size: 60px 60px;
        mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
      }

      .machine-card {
        background: ${t.bgCard};
        border: 1px solid ${t.borderPrimary};
        border-radius: 12px;
        padding: 28px;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .machine-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #C12033, transparent);
        opacity: 0;
        transition: opacity 0.4s;
      }
      .machine-card:hover {
        border-color: #C1203340;
        transform: translateY(-6px);
        box-shadow: 0 20px 60px rgba(232,55,42,0.08);
      }
      .machine-card:hover::before { opacity: 1; }

      .service-card {
        background: ${t.bgCard};
        border: 1px solid ${t.borderPrimary};
        border-radius: 16px;
        padding: 36px;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .service-card:hover {
        border-color: ${t.borderSecondary};
        transform: translateY(-4px);
      }

      .cat-btn {
        padding: 10px 24px;
        border-radius: 100px;
        border: 1px solid ${t.borderPrimary};
        background: transparent;
        color: ${t.textSecondary};
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s;
      }
      .cat-btn:hover { border-color: #C12033; color: ${t.textPrimary}; }
      .cat-btn-active {
        background: #C12033;
        border-color: #C12033;
        color: #FAFAFA;
      }

      .cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 36px;
        background: #C12033;
        color: #FAFAFA;
        border: none;
        border-radius: 8px;
        font-family: 'Outfit', sans-serif;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
      }
      .cta-primary:hover { background: #CC2E23; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(232,55,42,0.3); }

      .cta-outline {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 16px 36px;
        background: transparent;
        color: ${t.textPrimary};
        border: 1px solid ${t.borderSecondary};
        border-radius: 8px;
        font-family: 'Outfit', sans-serif;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
      }
      .cta-outline:hover { border-color: #C12033; transform: translateY(-2px); }

      .input-field {
        width: 100%;
        padding: 14px 18px;
        background: ${t.bgCard};
        border: 1px solid ${t.borderPrimary};
        border-radius: 8px;
        color: ${t.textPrimary};
        font-family: 'Outfit', sans-serif;
        font-size: 15px;
        transition: border-color 0.3s;
        outline: none;
      }
      .input-field:focus { border-color: #C12033; }
      .input-field::placeholder { color: ${t.textMuted}; }

      .brand-scroll {
        display: flex;
        gap: 60px;
        animation: marquee 25s linear infinite;
        white-space: nowrap;
      }

      .industry-chip {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px 28px;
        background: ${t.bgCard};
        border: 1px solid ${t.borderPrimary};
        border-radius: 12px;
        transition: all 0.3s;
        cursor: default;
      }
      .industry-chip:hover {
        border-color: #C1203340;
        background: ${t.bgCardHover};
      }

      .category-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      .category-grid .category-card:nth-child(1),
      .category-grid .category-card:nth-child(2) {
        grid-column: span 1;
      }

      @media (max-width: 900px) {
        .category-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 560px) {
        .category-grid {
          grid-template-columns: 1fr;
        }
      }

      .process-timeline {
        display: grid;
        gap: 0;
        position: relative;
      }
      .process-timeline .process-line {
        display: block;
      }
      @media (max-width: 700px) {
        .process-timeline {
          grid-template-columns: 1fr !important;
          gap: 32px;
        }
        .process-timeline .process-line {
          display: none;
        }
      }

      .stat-block {
        text-align: center;
        padding: 32px;
      }

      .divider-red {
        width: 48px;
        height: 3px;
        background: #C12033;
        border-radius: 2px;
      }

      .section-label {
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #C12033;
        margin-bottom: 16px;
      }

      .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        background: none;
        border: none;
        padding: 8px;
        z-index: 1001;
      }
      .hamburger span {
        display: block;
        width: 24px;
        height: 2px;
        background: ${t.textPrimary};
        transition: all 0.3s;
      }

      @media (max-width: 768px) {
        .hamburger { display: flex; }
        .desktop-nav { display: none !important; }
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: ${t.mobileBg};
          backdrop-filter: blur(20px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .mobile-menu .nav-link {
          font-size: 18px;
        }
      }
    `}</style>
  );
};

export default GlobalStyles;
