/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from '@components/Inputs';
import { NextRouter, Router, useRouter } from 'next/router';
import { FC, useEffect } from 'react';

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

const handleNetworkSelect = (router: NextRouter) => (value: string) => {
  if (router.isReady) {
    // hard refresh
    router.push({
      query: { network: value },
    });
  }
};

const NetworkSelectorToggle: FC<NetworkSelectorToggleProps> = ({
  onClickHandler,
  address,
}) => {
  const router = useRouter();
  return address ? (
    <div className="w-60 inline">
      <Select
        name="Network"
        options={networks}
        updateValue={handleNetworkSelect(router)}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default NetworkSelectorToggle;
