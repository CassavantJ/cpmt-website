import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('cpmt-theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('cpmt-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const themes = {
    dark: {
      bgMain: '#09090B', bgSection: '#0C0C0F', bgCard: '#18181B', bgCardHover: '#1C1C20', bgTag: '#27272A',
      textPrimary: '#FAFAFA', textSecondary: '#A1A1AA', textTertiary: '#71717A', textMuted: '#52525B', textSubtle: '#3F3F46',
      borderPrimary: '#27272A', borderSecondary: '#3F3F46', borderDivider: '#1C1C20',
      navBgScroll: 'rgba(9,9,11,0.9)', mobileBg: '#09090BF0', scrollTrack: '#09090B',
      heroGrid: 'rgba(193,32,51,0.06)',
      ctaGradient: 'linear-gradient(to bottom, transparent 0%, rgba(193,32,51,0.08) 40%, rgba(193,32,51,0.08) 60%, #0C0C0F 100%)',
      logo: '/images/CPMTLogoLight.svg',
    },
    light: {
      bgMain: '#FFFFFF', bgSection: '#F4F4F5', bgCard: '#FFFFFF', bgCardHover: '#F4F4F5', bgTag: '#E4E4E7',
      textPrimary: '#09090B', textSecondary: '#52525B', textTertiary: '#71717A', textMuted: '#A1A1AA', textSubtle: '#D4D4D8',
      borderPrimary: '#E4E4E7', borderSecondary: '#D4D4D8', borderDivider: '#E4E4E7',
      navBgScroll: 'rgba(255,255,255,0.9)', mobileBg: '#FFFFFFE8', scrollTrack: '#FFFFFF',
      heroGrid: 'rgba(193,32,51,0.03)',
      ctaGradient: 'linear-gradient(to bottom, transparent 0%, rgba(193,32,51,0.05) 40%, rgba(193,32,51,0.05) 60%, #F4F4F5 100%)',
      logo: '/images/CPMTLogoDark.svg',
    },
  };

  const t = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
