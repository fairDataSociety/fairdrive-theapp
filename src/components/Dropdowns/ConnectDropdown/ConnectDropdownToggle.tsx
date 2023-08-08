import { FC } from 'react';
import { Button } from '@components/Buttons';
import { useLocales } from '@context/LocalesContext';

export interface ConnectDropdownToggeleProps {
  onClickHandler: () => void;
}

const ConnectDropdownToggele: FC<ConnectDropdownToggeleProps> = ({
  onClickHandler,
}) => {
  const { intl } = useLocales();

  return (
    <Button
      variant="tertiary-outlined"
      label={intl.get('CONNECT')}
      onClick={onClickHandler}
    />
  );
};

export default ConnectDropdownToggele;
