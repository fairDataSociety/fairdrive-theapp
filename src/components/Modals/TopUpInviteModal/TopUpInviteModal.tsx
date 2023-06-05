import { FC, useState } from 'react';
import { Modal } from '@components/Modals';
import { TextInput } from '@components/Inputs';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import Spinner from '@components/Spinner/Spinner';
import { CreatorModalProps } from '@interfaces/handlers';
import { Invite } from '@utils/invite';
import {
  getChainId,
  isMetamaskAvailable,
  NETWORK_SEPOLIA,
  sendAmount,
  switchToNetwork,
} from '@utils/metamask';

export interface TopUpInviteModalProps extends CreatorModalProps {
  invite: Invite;
}

const TopUpInviteModal: FC<TopUpInviteModalProps> = ({
  showModal,
  closeModal,
  invite,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [amount, setAmount] = useState('0.002');

  const onMetamaskTopUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!isMetamaskAvailable()) {
      alert('Metamask is not available');
      return;
    }

    setLoading(true);
    try {
      const chainId = await getChainId();
      if (Number(chainId) !== NETWORK_SEPOLIA) {
        await switchToNetwork('0x' + NETWORK_SEPOLIA.toString(16));
      }

      await sendAmount(invite.address, amount);
      setSuccessMessage(`${amount} SepoliaETH has been sent!`);
    } catch (e) {
      if (e.message.includes('User denied transaction signature')) {
        return;
      }

      setErrorMessage(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Top Up Invite"
    >
      {errorMessage && (
        <div className="mb-4 text-center">
          <FeedbackMessage type="error" message={errorMessage} />
        </div>
      )}

      {successMessage && (
        <div className="mb-4 text-center">
          <FeedbackMessage type="success" message={successMessage} />
        </div>
      )}

      <Spinner isLoading={loading} />

      <TextInput
        name="name"
        label="Name"
        disabled={true}
        value={invite?.name || invite?.id}
      />

      <TextInput
        name="address"
        label="Invite address"
        disabled={true}
        value={invite?.address}
      />

      <TextInput
        name="amount"
        label="Amount (Sepolia ETH)"
        value={amount}
        updateValue={setAmount}
      />

      <div className="text-center">
        <Button
          type="button"
          variant="secondary"
          label="🦊 Top-up With Metamask"
          disabled={loading}
          onClick={onMetamaskTopUp}
        />
      </div>
    </Modal>
  );
};

export default TopUpInviteModal;
