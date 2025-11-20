import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for managing light/dark theme with localStorage persistence
 * Automatically detects system preference and syncs theme changes
 * @returns {Object} { theme, toggleTheme, isMounted }
 * @property {string} theme - Current theme ('light' or 'dark')
 * @property {Function} toggleTheme - Function to toggle between themes
 * @property {boolean} isMounted - Whether the component is mounted (prevents SSR issues)
 */
export function useTheme() {
  const [theme, setTheme] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const applyTheme = useCallback((themeName) => {
    const html = document.documentElement;
    
    if (themeName === 'dark') {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
    } else {
      html.removeAttribute('data-theme');
      html.classList.remove('dark');
    }
    
    localStorage.setItem('qs-theme', themeName);
  }, []);

  useEffect(() => {
    // Check localStorage for saved theme
    const stored = localStorage.getItem('qs-theme');
    
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDark = mediaQuery.matches;
    
    // Determine initial theme
    const initial = stored || (prefersDark ? 'dark' : 'light');
    
    setTheme(initial);
    applyTheme(initial);
    setIsMounted(true);

    // Listen for system theme changes (only if no stored preference)
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('qs-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  return { theme: theme || 'dark', toggleTheme, isMounted };
}
