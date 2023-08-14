/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';

import { AuthenticationInput } from '@components/Inputs';
import { useLocales } from '@context/LocalesContext';

interface ImportByAddressProps {
  register: UseFormRegister<FieldValues>;
  error: FieldError;
}

const ImportByAddress: FC<ImportByAddressProps> = ({ register, error }) => {
  const { intl } = useLocales();

  return (
    <AuthenticationInput
      label={intl.get('ADDRESS')}
      id="address"
      type="text"
      name="address"
      placeholder={intl.get('TYPE_HERE')}
      useFormRegister={register}
      validationRules={{
        required: true,
      }}
      error={error}
      errorMessage={intl.get('IMPORT_ADDRESS_IS_REQUIRED')}
    />
  );
};

export default ImportByAddress;
