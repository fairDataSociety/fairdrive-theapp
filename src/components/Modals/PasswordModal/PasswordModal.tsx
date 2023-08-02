import { FC, useState } from 'react';
import { Modal } from '@components/Modals';
import { Button } from '@components/Buttons';
import FeedbackMessage from '@components/FeedbackMessage/FeedbackMessage';
import Spinner from '@components/Spinner/Spinner';
import AuthenticationInput from '../../Inputs/AuthenticationInput/AuthenticationInput';
import { useForm } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';
import { MIN_PASSWORD_LENGTH } from '@utils/password';

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

  const handleSubmitButton = async (data) => {
    setLoading(true);
    try {
      await handleSubmitForm(data.password);
      closeModal();
    } catch (e) {
      setErrorMessage(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      showModal={showModal}
      closeModal={closeModal}
      headerTitle="Enter password"
    >
      <Spinner isLoading={loading} />

      <form onSubmit={handleSubmit(handleSubmitButton)} className="w-full">
        <AuthenticationInput
          label="password"
          id="password"
          type="password"
          name="password"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: 'Password field is required',
            minLength: {
              value: MIN_PASSWORD_LENGTH,
              message: `Password field needs to contain at least ${MIN_PASSWORD_LENGTH} characters`,
            },
          }}
          error={errors.password as FieldError}
        />

        <div className="text-center">
          <Button
            type="submit"
            variant="secondary"
            label="Login"
            disabled={loading}
          />
        </div>
      </form>

      <div className="mt-4 text-center">
        <FeedbackMessage type="error" message={errorMessage} />
      </div>
    </Modal>
  );
};

export default PasswordModal;
