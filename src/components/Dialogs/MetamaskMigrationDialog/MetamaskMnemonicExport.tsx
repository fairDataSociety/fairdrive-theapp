import { Button } from '@components/Buttons';
import { useContext } from 'react';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import UserContext from '@context/UserContext';
import { useLocales } from '@context/LocalesContext';

interface MetamaskMnemonicExportProps {
  onConfirm: (mnemonic: string) => void;
}

export default function MetamaskMnemonicExport({
  onConfirm,
}: MetamaskMnemonicExportProps) {
  const { mnemonic } = useContext(UserContext);
  const { intl } = useLocales();

  return (
    <>
      <div className="mt-2">
        <p className="text-sm">{intl.get('SAVE_MNEMONIC_WARNING')}</p>
      </div>
      <div className="mt-4">
        <p className="text-lg my-3">{mnemonic}</p>
        <div className="flex flex-col ">
          <CopyButton text={mnemonic} />
        </div>
        <Button
          variant="primary-outlined"
          label={intl.get('NEXT')}
          onClick={() => onConfirm(mnemonic)}
        />
      </div>
    </>
  );
}
