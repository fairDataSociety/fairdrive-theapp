import { FC, useContext } from 'react';
import Link from 'next/link';

import ThemeContext from '@context/ThemeContext';

import LogoLightIcon from '@media/branding/logo-light.svg';
import LogoDarkIcon from '@media/branding/logo-dark.svg';

const Logo: FC = () => {
  const { theme } = useContext(ThemeContext);

  return theme === 'light' ? <LogoLightIcon /> : <LogoDarkIcon />;
};

export default Logo;
