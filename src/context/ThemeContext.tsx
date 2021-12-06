import { FC, ReactNode, createContext, useEffect, useState } from 'react';

interface ThemeContext {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeContextProps {
  children: ReactNode;
}

const themeContextDefaultValues: ThemeContext = {
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContext>(themeContextDefaultValues);

const ThemeProvider: FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme !== null) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const d = document.documentElement;

    const themes = ['light', 'dark'];

    if (theme === 'light') {
      d.setAttribute('class', 'dark');

      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      d.classList.remove(...themes);
      d.classList.add('light');

      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider };
