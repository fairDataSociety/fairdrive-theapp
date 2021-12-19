/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { AuthenticationHeader } from '@components/Headers';

import { AddressImport, MnemonicImport } from '@components/ImportAccount';
import { Button } from '@components/Buttons';

const ImportUserForm: FC = () => {
  const { handleSubmit } = useForm();

  const [methodAddressImport, setMethodAddressImport] = useState(true);
  const [address, setAddress] = useState('');
  const [mnemonicSeed, setMnemonicSeed] = useState({
    firstWord: '',
    secondWord: '',
    thirdWord: '',
    fourthWord: '',
    fifthWord: '',
    sixthWord: '',
    seventhWord: '',
    eighthWord: '',
    ninthWord: '',
    tenthWord: '',
    eleventhWord: '',
    twelfthWord: '',
  });
  const onSubmit = () => {
    const mnemonicPhrase = Object.keys(mnemonicSeed).reduce(
      (acc, key: string) => {
        if ((mnemonicSeed as any)[key]) {
          acc += ' ' + (mnemonicSeed as any)[key].toString();
        }
        return acc.trim();
      },
      ''
    );
    console.log(mnemonicPhrase);
    // Set Mnemonic to empty
    // Set Address to empty
    setMnemonicSeed({
      firstWord: '',
      secondWord: '',
      thirdWord: '',
      fourthWord: '',
      fifthWord: '',
      sixthWord: '',
      seventhWord: '',
      eighthWord: '',
      ninthWord: '',
      tenthWord: '',
      eleventhWord: '',
      twelfthWord: '',
    });
    setAddress('');
    // Call import user function
    // After import user function redirect to login page
  };
  const toAddressSwitch = () => {
    setMethodAddressImport(true);
    // Set mnemonicSeed to empty
    setMnemonicSeed({
      firstWord: '',
      secondWord: '',
      thirdWord: '',
      fourthWord: '',
      fifthWord: '',
      sixthWord: '',
      seventhWord: '',
      eighthWord: '',
      ninthWord: '',
      tenthWord: '',
      eleventhWord: '',
      twelfthWord: '',
    });
  };
  const toMnemonicSwitch = () => {
    setMethodAddressImport(false);
    // Set address to empty
    setAddress('');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthenticationHeader
        title="Import your account"
        content="Please select a method of of recovery."
      />

      <div className="w-98 mt-12">
        <div className="mb-5 text-center">
          <Button
            label="Address"
            variant="secondary"
            className="pl-16 pr-16"
            onClick={toAddressSwitch}
          ></Button>
          <Button
            label="Mnemonic"
            variant="secondary"
            className="pl-16 pr-16"
            onClick={toMnemonicSwitch}
          ></Button>
        </div>

        <div onSubmit={handleSubmit(onSubmit)} className="w-full">
          {methodAddressImport ? (
            <AddressImport
              label="Address"
              address={address}
              setAddress={setAddress}
              type="text"
              name="address"
              placeholder="Type here"
            ></AddressImport>
          ) : (
            <MnemonicImport
              type="text"
              mnemonicSeed={mnemonicSeed}
              setMnemonicSeed={setMnemonicSeed}
              placeholder="Type here"
              defaultValue=""
            ></MnemonicImport>
          )}

          <div className="text-center">
            <Button
              type="submit"
              variant="secondary"
              label="Submit"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportUserForm;
