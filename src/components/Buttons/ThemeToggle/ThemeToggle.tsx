import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import ThemeLightIcon from '@media/UI/theme-light.svg';
import ThemeDarkIcon from '@media/UI/theme-dark.svg';

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="cursor-pointer" onClick={() => toggleTheme()}>
      {theme === 'light' ? <ThemeDarkIcon /> : <ThemeLightIcon />}
    </button>
  );
};

export default ThemeToggle;
