import React, { createContext, useContext, useState } from "react";
import { themes } from "./themes";

import { IContextProps, IThemeProvider } from "./themeContextTypes";

export const ThemeContext = createContext({} as IContextProps);

export function ThemeProvider({ children }: IThemeProvider): JSX.Element {
  const [theme, setTheme] = useState(themes.dark);
  // when consuming this context, to toggle the theme, call toggleTheme();
  const toggleTheme = (): void => {
    theme.name === "light" ? setTheme(themes.dark) : setTheme(themes.light);
  };
  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
