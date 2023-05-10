import { FC } from 'react';
import { Button } from '@components/Buttons';

export interface ConnectDropdownToggeleProps {
  onClickHandler: () => void;
}

const ConnectDropdownToggele: FC<ConnectDropdownToggeleProps> = ({
  onClickHandler,
}) => {
  return (
    <Button
      variant="tertiary-outlined"
      label="Connect"
      onClick={onClickHandler}
    />
  );
};

export default ConnectDropdownToggele;
