import { FC } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

import { AuthenticationInput } from '@components/Inputs';
import { useLocales } from '@context/LocalesContext';

interface ImportByMnemonicProps {
  register: UseFormRegister<FieldValues>;
}

const ImportByMnemonic: FC<ImportByMnemonicProps> = ({ register }) => {
  const { intl } = useLocales();

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '1' })}
          id="word_1"
          type="text"
          name="word_1"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '7' })}
          id="word_7"
          type="text"
          name="word_7"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '2' })}
          id="word_2"
          type="text"
          name="word_2"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '8' })}
          id="word_8"
          type="text"
          name="word_8"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '3' })}
          id="word_3"
          type="text"
          name="word_3"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '9' })}
          id="word_9"
          type="text"
          name="word_9"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '4' })}
          id="word_4"
          type="text"
          name="word_4"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '10' })}
          id="word_10"
          type="text"
          name="word_10"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '5' })}
          id="word_5"
          type="text"
          name="word_5"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '11' })}
          id="word_11"
          type="text"
          name="word_11"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />
      </div>

      <div className="flex flex-row justify-between items-center space-x-5">
        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '6' })}
          id="word_6"
          type="text"
          name="word_6"
          placeholder={intl.get('TYPE_HERE')}
          useFormRegister={register}
          validationRules={{
            required: true,
          }}
        />

        <AuthenticationInput
          label={intl.get('WORD_NUM', { number: '12' })}
          id="word_12"
          type="text"
          name="word_12"
          placeholder={intl.get('TYPE_HERE')}
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
