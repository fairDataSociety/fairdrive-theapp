/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form';

import { AuthenticationInput } from '@components/Inputs';

interface ImportByAddressProps {
  register: UseFormRegister<FieldValues>;
  error: FieldError;
}

const ImportByAddress: FC<ImportByAddressProps> = ({ register, error }) => {
  return (
    <AuthenticationInput
      label="Address"
      id="address"
      type="text"
      name="address"
      placeholder="Type here"
      useFormRegister={register}
      validationRules={{
        required: true,
      }}
      error={error}
      errorMessage="Import address is required"
    />
  );
};

export default ImportByAddress;
