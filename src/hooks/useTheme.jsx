import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

const STORAGE_KEY = 'qs-theme';

/**
 * Theme state, shared.
 *
 * This used to be a bare hook holding useState, called independently in App,
 * NetworkBackground and both ThemeToggles. Each call site got its own copy, so
 * toggling updated the DOM (CSS followed) but left every *other* component's
 * `theme` value stale — NetworkBackground kept painting the previous theme's
 * colours until it remounted. One provider, one listener, one value.
 */
const ThemeContext = createContext(null);

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null; // private mode or blocked storage
  }
}

function systemPrefersDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

/**
 * The theme in effect on first render.
 *
 * Read from the attribute the pre-paint script in index.html already set, so
 * React agrees with what is on screen. Returning a hardcoded 'dark' here — as
 * this did before — told every consumer the theme was dark for one frame, which
 * made light-theme visitors flash dark-theme canvas colours.
 */
function initialTheme() {
  if (typeof document === 'undefined') return 'dark'; // prerender
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  return readStored() || (systemPrefersDark() ? 'dark' : 'light');
}

/**
 * Write the theme to the document.
 * Light is set explicitly rather than by removing the attribute, so the
 * prefers-color-scheme fallback in the stylesheet can tell "chose light" apart
 * from "hasn't chosen".
 */
function applyTheme(themeName) {
  const html = document.documentElement;
  html.setAttribute('data-theme', themeName);
  html.classList.toggle('dark', themeName === 'dark');
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the OS only while the visitor has made no explicit choice.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      if (readStored()) return;
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setThemeExplicitly = useCallback((next) => {
    setTheme(next);
    try {
      // Persisted only for a deliberate choice. Writing on mount, as this once
      // did, recorded a preference the visitor never made — after one visit the
      // site stopped following their OS.
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeExplicitly(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setThemeExplicitly]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme: setThemeExplicitly, isMounted: true }),
    [theme, toggleTheme, setThemeExplicitly]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {{theme: 'light'|'dark', toggleTheme: () => void, setTheme: (t: string) => void, isMounted: boolean}}
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }

  return context;
}
