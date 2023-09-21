/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

import Blockies from 'react-blockies';

import Indicator from '@components/Indicator/Indicator';

interface UserDropdownToggleProps {
  onClickHandler: any;
  address: string;
  showNotification?: boolean;
}

const ThemeToggle: FC<UserDropdownToggleProps> = ({
  onClickHandler,
  address,
  showNotification,
}) => {
  return address ? (
    <button
      className="cursor-pointer relative"
      onClick={() => onClickHandler()}
    >
      <Blockies className="inline-block rounded" seed={address} />{' '}
      {showNotification && <Indicator className="absolute -right-1 -top-1" />}
    </button>
  ) : (
    <div></div>
  );
};

export default ThemeToggle;
