/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useState } from 'react';
import router from 'next/router';
import { useForm } from 'react-hook-form';

import { importUser } from '@api/user';

import { AuthenticationHeader } from '@components/Headers';
import { AuthenticationInput } from '@components/Inputs';
import { ImportToggle, Button } from '@components/Buttons';
import ImportByAddress from '@components/Forms/ImportUserForm/ImportByAddress/ImportByAddress';
import ImportByMnemonic from '@components/Forms/ImportUserForm/ImportByMnemonic/ImportByMnemonic';
import { useLocales } from '@context/LocalesContext';

const ImportUserForm: FC = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [importMethod, setImportMethod] = useState('address');
  const [errorMessage, setErrorMessage] = useState('');
  const { intl } = useLocales();

  const onSubmit = (data: any) => {
    if (importMethod === 'address') {
      const importUserData = {
        user_name: data?.user_name,
        password: data?.password,
        address: data?.address,
      };

      importUser(importUserData)
        .then(() => {
          setErrorMessage('');
          router.push('/');
        })
        .catch(() => setErrorMessage(intl.get('IMPORT_FAILED_ERROR')));
    } else {
      let mnemonicString = '';

      for (let i = 1; i <= 12; i++) {
        mnemonicString += data['word_' + i] + ' ';
      }
      mnemonicString = mnemonicString.trim();

      const importUserData = {
        user_name: data?.user_name,
        password: data?.password,
        mnemonic: mnemonicString,
      };

      importUser(importUserData)
        .then(() => {
          setErrorMessage('');
          router.push('/');
        })
        .catch(() => setErrorMessage(intl.get('IMPORT_FAILED_ERROR')));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        title={intl.get('IMPORT_YOUR_ACCOUNT')}
        content={intl.get('METHOD_OF_RECOVERY')}
      />

      <div className="w-full px-3 md:px-0 md:w-98 mt-12">
        <ImportToggle
          importMethod={importMethod}
          updateImportMethod={setImportMethod}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <AuthenticationInput
            label={intl.get('USERNAME')}
            id="user_name"
            type="text"
            name="user_name"
            placeholder={intl.get('TYPE_HERE')}
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            // @ts-ignore
            error={errors.user_name}
            errorMessage={intl.get('USERNAME_OR_EMAIL_IS_REQUIRED')}
          />

          <AuthenticationInput
            label={intl.get('PASSWORD')}
            id="password"
            type="password"
            name="password"
            placeholder={intl.get('TYPE_HERE')}
            useFormRegister={register}
            validationRules={{
              required: true,
            }}
            // @ts-ignore
            error={errors.password}
            errorMessage={intl.get('PASSWORD_IS_REQUIRED')}
          />

          {importMethod === 'address' ? (
            <ImportByAddress
              register={register}
              // @ts-ignore
              error={errors?.address}
            />
          ) : (
            <ImportByMnemonic register={register} />
          )}

          <span className="block my-2 text-color-status-negative-day text-xs text-center leading-none">
            {errorMessage}
          </span>

          <div className="my-10 text-center">
            <Button
              type="submit"
              variant="secondary"
              label={intl.get('Submit')}
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportUserForm;
