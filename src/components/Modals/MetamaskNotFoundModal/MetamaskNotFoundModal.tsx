import { FC } from 'react';
import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';
import { useLocales } from '@context/LocalesContext';

interface MetamaskNotFoundModalProps {
  showModal: boolean;
  closeModal: () => void;
}

/**
 * Modal with information in case of Metamask is not installed
 */
const MetamaskNotFoundModal: FC<MetamaskNotFoundModalProps> = ({
  showModal,
  closeModal,
}) => {
  const { intl } = useLocales();

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('METAMASK_NOT_FOUND')}
    >
      <div>
        {intl.get('METAMASK_NOT_INSTALLED')}{' '}
        <a
          className="text-color-accents-purple-heavy dark:text-color-shade-light-1-night"
          href="https://metamask.io/download/"
          target="_blank"
          rel="noreferrer"
        >
          {intl.get('CLICK_HERE_TO_INSTALL_IT')}
        </a>
      </div>

      <Button
        type="button"
        variant="secondary"
        label={intl.get('CLOSE')}
        onClick={closeModal}
        className="mt-8 w-auto"
      />
    </Modal>
  );
};

export default MetamaskNotFoundModal;
