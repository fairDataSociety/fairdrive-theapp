import { FC, useState } from 'react';
import Link from 'next/link';
import Logo from '@components/Logo/Logo';
import { Button, ThemeToggle } from '@components/Buttons';
import DownloadIcon from '@media/UI/download.svg';
import MetamaskIcon from '@media/UI/metamask.svg';
import { getSignatureWallet, isMetamaskAvailable } from '@utils/metamask';
import { useFdpStorage } from '@context/FdpStorageContext';
import { useRouter } from 'next/router';
import MetamaskNotFoundModal from '@components/Modals/MetamaskNotFoundModal/MetamaskNotFoundModal';

const AuthenticationNavbar: FC = () => {
  const { fdpClient, setWallet } = useFdpStorage();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-between items-center w-full h-16 px-6 shadow-lg">
      <Logo />

      <div className="flex justify-between items-center">
        <Link href="/import">
          <a className="mr-6">
            <Button
              variant="tertiary-outlined"
              label="Import Account"
              icon={<DownloadIcon className="inline-block ml-2" />}
            />
          </a>
        </Link>

        <a className="mr-6">
          <Button
            variant="tertiary-outlined"
            label="Connect"
            icon={<MetamaskIcon className="inline-block ml-2" />}
            onClick={async () => {
              if (!isMetamaskAvailable()) {
                setShowModal(true);
                return;
              }

              const data = await getSignatureWallet();
              fdpClient.account.setAccountFromMnemonic(data.mnemonic.phrase);
              setWallet(data);
              router.push('/overview').then();
            }}
          />
        </a>

        <ThemeToggle />
        <MetamaskNotFoundModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
