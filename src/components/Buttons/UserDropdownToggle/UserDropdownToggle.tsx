/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import Blockies from 'react-blockies';

interface UserDropdownToggleProps {
  onClickHandler: any;
  address: string;
}

const ThemeToggle: FC<UserDropdownToggleProps> = ({
  onClickHandler,
  address,
}) => {
  return address ? (
    <button className="cursor-pointer" onClick={() => onClickHandler()}>
      <Blockies className="inline-block rounded" seed={address} />{' '}
    </button>
  ) : (
    <div></div>
  );
};

export default ThemeToggle;
