import { Button } from '@components/Buttons';
import { useContext, useEffect, useState } from 'react';
import { getSignatureWallet } from '@utils/metamask';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import { CopyButton } from '@components/Buttons/CopyButton/CopyButton';
import UserContext from '@context/UserContext';

interface MetamaskMnemonicExportProps {
  onConfirm: (mnemonic: string) => void;
}

export default function MetamaskMnemonicExport({
  onConfirm,
}: MetamaskMnemonicExportProps) {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { password } = useContext(UserContext);

  const getMnemonic = async () => {
    try {
      const wallet = await getSignatureWallet(password);

      setMnemonic(wallet.mnemonic.phrase);
    } catch (error) {
      setError(String(error));
    }
  };

  useEffect(() => {
    getMnemonic();
  }, []);

  return (
    <>
      <div className="mt-2">
        <p className="text-sm">
          {mnemonic
            ? "Save your account mnemonic and don't share it with anyone."
            : 'Please allow access to Metamask account.'}
        </p>
      </div>
      {error && <FeedbackMessage type="error" message={error} />}
      {mnemonic && (
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
      )}
    </>
  );
}
