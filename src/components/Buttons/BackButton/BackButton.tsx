import { FC, useContext } from 'react';
import { useRouter } from 'next/router';

import ThemeContext from '@context/ThemeContext';

import BackArrowLight from '@media/UI/back-arrow-circle-light.svg';
import BackArrowDark from '@media/UI/back-arrow-circle-dark.svg';

const BackButton: FC = () => {
  const router = useRouter();

  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    router.back();
  };

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      {theme === 'light' ? (
        <BackArrowLight className="inline" />
      ) : (
        <BackArrowDark className="inline" />
      )}
      <span className="ml-2 text-color-accents-purple-heavy dark:text-color-accents-grey-lavendar uppercase">
        back
      </span>
    </div>
  );
};

export default BackButton;
