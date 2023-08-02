import { Button } from '@components/Buttons';
import { useContext } from 'react';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import UserContext from '@context/UserContext';

interface MetamaskMnemonicExportProps {
  onConfirm: (mnemonic: string) => void;
}

export default function MetamaskMnemonicExport({
  onConfirm,
}: MetamaskMnemonicExportProps) {
  const { mnemonic } = useContext(UserContext);

  return (
    <>
      <div className="mt-2">
        <p className="text-sm">
          Save your account mnemonic and don&apos;t share it with anyone.
        </p>
      </div>
      <div className="mt-4">
        <p className="text-lg my-3">{mnemonic}</p>
        <div className="flex flex-col ">
          <CopyButton text={mnemonic} />
        </div>
        <Button
          variant="primary-outlined"
          label="Next"
          onClick={() => onConfirm(mnemonic)}
        />
      </div>
    </>
  );
}
