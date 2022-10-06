/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from '@components/Inputs';
import UserContext from '@context/UserContext';
import { FC, useContext, useEffect } from 'react';

interface NetworkSelectorToggleProps {
  onClickHandler: any;
  address: string;
}

const NetworkSelectorToggle: FC<NetworkSelectorToggleProps> = ({ address }) => {
  let beeurl;
  useEffect(() => {
    beeurl = localStorage.getItem('beeUrl') || process.env.NEXT_PUBLIC_BEE_URL;
  }, []);

  return address ? <div className="w-60 inline">{beeurl}</div> : <div></div>;
};

export default NetworkSelectorToggle;
