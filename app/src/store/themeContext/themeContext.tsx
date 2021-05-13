import React, { createContext, useState } from "react";
import { themes, Theme } from "./themes";

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ContextProps);

export function ThemeProvider(props: any) {
  const [theme, setTheme] = useState(themes.dark);
  // when consuming this context, to toggle the theme, call toggleTheme();
  const toggleTheme: any = () => {
    theme.name === "dark" ? setTheme(themes.light) : setTheme(themes.dark);
  };
  const value = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}
