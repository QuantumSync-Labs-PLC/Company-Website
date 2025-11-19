import { useEffect, useState, useCallback } from 'react';

/**
 * useTheme - Hook for managing light/dark theme
 * @returns {Object} { theme, toggleTheme, isMounted }
 */
export function useTheme() {
  const [theme, setTheme] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run this effect once on mount
    // Check localStorage for saved theme
    const stored = localStorage.getItem('qs-theme');
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const initial = stored || (prefersDark ? 'dark' : 'light');
    
    setTheme(initial);
    applyTheme(initial);
    setIsMounted(true);
  }, []);

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

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      return newTheme;
    });
  }, [applyTheme]);

  return { theme: theme || 'dark', toggleTheme, isMounted };
}
