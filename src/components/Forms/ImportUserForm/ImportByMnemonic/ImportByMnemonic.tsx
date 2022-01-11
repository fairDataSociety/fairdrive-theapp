import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import { AuthenticationInput } from '@components/Inputs';

interface ImportByMnemonicProps {
  register: UseFormRegister<FieldValues>;
}

const ImportByMnemonic: FC<ImportByMnemonicProps> = ({ register }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 1"
          id="word_1"
          type="text"
          name="word_1"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 7"
          id="word_7"
          type="text"
          name="word_7"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 2"
          id="word_2"
          type="text"
          name="word_2"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 8"
          id="word_8"
          type="text"
          name="word_8"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 3"
          id="word_3"
          type="text"
          name="word_3"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 9"
          id="word_9"
          type="text"
          name="word_9"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 4"
          id="word_4"
          type="text"
          name="word_4"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 10"
          id="word_10"
          type="text"
          name="word_10"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 5"
          id="word_5"
          type="text"
          name="word_5"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 11"
          id="word_11"
          type="text"
          name="word_11"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label="#Word 6"
          id="word_6"
          type="text"
          name="word_6"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label="#Word 12"
          id="word_12"
          type="text"
          name="word_12"
          placeholder="Type here"
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>
    </div>
  );
};

export default ImportByMnemonic;
