/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useContext } from 'react';

import UserContext from '@context/UserContext';
import Blockies from 'react-blockies';

interface UserDropdownToggleProps {
  onClickHandler: any;
}

const ThemeToggle: FC<UserDropdownToggleProps> = ({ onClickHandler }) => {
  const { address } = useContext(UserContext);
  return (
    <button className="cursor-pointer" onClick={() => onClickHandler()}>
      <Blockies className="inline-block rounded" seed={address} />{' '}
    </button>
  );
};

export default ThemeToggle;
