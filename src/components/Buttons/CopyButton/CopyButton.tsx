import { useContext, useState } from 'react';
import Button from '../Button/Button';
import copyToClipboard from '@utils/copyToClipboard';
import CopyIcon from '@media/UI/copy.svg';
import CheckLight from '@media/UI/check-light.svg';
import CheckDark from '@media/UI/check-dark.svg';
import ThemeContext from '@context/ThemeContext';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copyDisabled, setCopyDisabled] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);

  const onClick = async () => {
    try {
      await copyToClipboard(text);
      setCopyDisabled(true);
      setTimeout(() => setCopyDisabled(false), 4000);
    } catch (error) {
      console.log('Could not copy mnemonic!');
    }
  };

  return (
    <Button
      variant="tertiary"
      onClick={onClick}
      icon={
        copyDisabled ? (
          theme === 'light' ? (
            <CheckLight className="inline ml-2" />
          ) : (
            <CheckDark className="inline ml-2" />
          )
        ) : (
          <CopyIcon className="inline ml-2" />
        )
      }
      className="m-auto"
    />
  );
}
