import { FC, useContext } from 'react';

import ThemeContext from '@context/ThemeContext';

import UserLightIcon from '@media/UI/user-light.svg';
import UserDarkIcon from '@media/UI/user-dark.svg';

interface UserDropdownToggleProps {
  onClickHandler: any;
}

const ThemeToggle: FC<UserDropdownToggleProps> = ({ onClickHandler }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button className="cursor-pointer" onClick={() => onClickHandler()}>
      {theme === 'light' ? (
        <UserLightIcon className="inline-block" />
      ) : (
        <UserDarkIcon className="inline-block" />
      )}
    </button>
  );
};

export default ThemeToggle;
