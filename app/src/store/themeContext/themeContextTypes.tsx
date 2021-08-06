import { Theme } from "./themes";

export interface IContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export interface IThemeProvider {
  children: React.ReactNode | React.ReactNode[];
}
