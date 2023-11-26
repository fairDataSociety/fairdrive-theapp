import { FC } from 'react';

import MetamaskConnect from '@components/Connect/Metamask/MetamaskConnect';
/*Blossom import deleted*/

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
      <div className="absolute top-10 -left-8 w-40 p-5 bg-color-shade-dark-3-day dark:bg-color-shade-dark-2-night text-left rounded-md shadow z-30">
        <div>
          <MetamaskConnect onConnect={onClose} onError={onClose} />
        </div>
      </div>
    </>
  );
};

export default ConnectDropdownMenu;
