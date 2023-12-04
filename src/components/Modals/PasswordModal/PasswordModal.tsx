import { FC, useState } from 'react';
import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import AuthenticationInput from '../../Inputs/AuthenticationInput/AuthenticationInput';
import { useForm } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';
import { MIN_PASSWORD_LENGTH } from '@utils/password';
import { useLocales } from '@context/LocalesContext';
import Disclosure from '@components/Disclosure/Disclosure';
import {
  getMetamaskPassphraseExplanation,
  setMetamaskPassphraseExplanation,
} from '@utils/localStorage';

interface PasswordModalProps {
  showModal: boolean;
  closeModal: () => void;
  handleSubmitForm: (password: string) => Promise<void>;
}

const PasswordModal: FC<PasswordModalProps> = ({
  showModal,
  closeModal,
  handleSubmitForm,
}) => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
  });
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { intl } = useLocales();

  const handleSubmitButton = async (data) => {
    setLoading(true);
    try {
      await handleSubmitForm(data.password);
      setMetamaskPassphraseExplanation(false);
      closeModal();
    } catch (e) {
      setErrorMessage(intl.get('GENERIC_ERROR', { message: e.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle={intl.get('ENTER_PASSPHRASE')}
    >
      <form onSubmit={handleSubmit(handleSubmitButton)} className="w-full">
        <AuthenticationInput
          label=""
          id="password"
          type="password"
          name="password"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: intl.get('PASSWORD_IS_REQUIRED'),
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: intl.get('PASSWORD_MIN_LENGTH_ERROR_2', {
                length: MIN_PASSWORD_LENGTH,
              }),
            },
          }}
          error={errors.password as FieldError}
        />

        <p className="text-sm mb-5">{intl.get('PASSPHRASE_EXPLANATION')}</p>

        <div className="text-center">
          <Button
            type="submit"
            variant="secondary"
            label={intl.get('LOGIN')}
            disabled={loading}
            loading={loading}
          />
        </div>
        <div className="mt-5">
          <Disclosure
            title={'How it works'}
            defaultOpen={!getMetamaskPassphraseExplanation()}
          >
            <p className="text-sm mb-3">
              {intl.get('PASSPHRASE_EXPLANATION_2')}
            </p>
          </Disclosure>
        </div>
      </form>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default PasswordModal;
