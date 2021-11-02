import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes } from './themes';

import { IContextProps, IThemeProvider } from './themeContextTypes';

export const ThemeContext = createContext({} as IContextProps);

export function ThemeProvider({ children }: IThemeProvider): JSX.Element {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = (): void => {
    theme.name === 'light' ? setTheme(themes.dark) : setTheme(themes.light);
  };

  const value = { theme, toggleTheme };

  // Manage storing of current theme in local storage
  const [wasSPAInitialized, setWasSPAInitialized] = useState(false);

  useEffect(() => {
    if (!wasSPAInitialized) {
      localStorage.getItem('theme') === 'light'
        ? setTheme(themes.light)
        : setTheme(themes.dark);

      setWasSPAInitialized(true);
    } else {
      localStorage.setItem('theme', theme.name);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): IContextProps => {
  return useContext(ThemeContext);
};
