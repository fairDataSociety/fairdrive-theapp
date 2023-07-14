import { FC } from 'react';

import MetamaskConnect from '@components/Connect/Metamask/MetamaskConnect';
import BlossomLogin from '@components/Connect/Blossom/BlossomLogin';

export interface ConnectDropdownMenuProps {
  showDropdown: boolean;
  onClose: () => void;
}

const ConnectDropdownMenu: FC<ConnectDropdownMenuProps> = ({
  showDropdown,
  onClose,
}) => {
  if (!showDropdown) {
    return null;
  }

  return (
    <>
      <div className="absolute top-10 -right-8 w-40 p-5 bg-color-shade-dark-3-day dark:bg-color-shade-dark-2-night text-left rounded-md shadow z-30">
        <div className="mb-2">
          <BlossomLogin />
        </div>
        <div>
          <MetamaskConnect onConnect={onClose} onError={onClose} />
        </div>
      </div>
    </>
  );
};

export default ConnectDropdownMenu;
