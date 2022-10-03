/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from '@components/Inputs';
import { FC } from 'react';

interface NetworkSelectorToggleProps {
  onClickHandler: any;
  address: string;
}

const networks = [
  {
    value: 'mainnet',
    label: 'Mainnet - Gnosis Network',
  },
  {
    value: 'testnet',
    label: 'Testnet - Görli Network',
  },
  {
    value: 'localnet',
    label: 'Local - fdp-play developer env',
  },
];

const handleNetworkSelect = (value: string) => {
  // hard refresh
  location.href = `#network=${value}`;
};

const NetworkSelectorToggle: FC<NetworkSelectorToggleProps> = ({
  onClickHandler,
  address,
}) => {
  return address ? (
    <div className="px-5">
      <span className="inline-block mr-2">Network:</span>

      <Select
        name="Network"
        options={networks}
        updateValue={handleNetworkSelect}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default NetworkSelectorToggle;
