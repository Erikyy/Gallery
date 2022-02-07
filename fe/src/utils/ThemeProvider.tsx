import React, { useContext, useEffect } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'light'; // light theme as the default;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme());

  const setRootClassTheme = (rootTheme: string) => {
    const root = window.document.documentElement;
    const isDark = rootTheme === 'dark';
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(rootTheme);
    localStorage.setItem('theme', rootTheme);
  };

  useEffect(() => {
    setRootClassTheme(theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => {
        if (theme === 'dark') setTheme('light');
        if (theme === 'light') setTheme('dark');
      }}
      className="p-2 rounded-lg  hover:bg-neutral-600"
    >
      {theme === 'dark' ? (
        <MdOutlineLightMode className="text-white w-6 h-6" />
      ) : (
        <MdOutlineDarkMode className="w-6 h-6" />
      )}
    </button>
  );
};
