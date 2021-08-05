import React, { createContext, useContext, useState } from 'react';
import { themes, Theme } from './themes';

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ContextProps);

export function ThemeProvider(props: any) {
  const [theme, setTheme] = useState(themes.dark);
  // when consuming this context, to toggle the theme, call toggleTheme();
  const toggleTheme: any = () => {
    theme.name === 'light' ? setTheme(themes.dark) : setTheme(themes.light);
  };
  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
