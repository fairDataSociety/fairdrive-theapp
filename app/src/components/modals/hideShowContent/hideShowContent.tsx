import React, { useContext } from 'react';
import { ThemeContext } from '../../../store/themeContext/themeContext';
import { StoreContext } from '../../../store/store';
import Modal from '../modal/modal';

export interface Props {}

export function HideContent(props: Props) {
  const { state, actions } = useContext(StoreContext);

  return (
    <Modal
      heading="Hide Content"
      icon={true}
      button="Hide"
      errorMessage="Are you sure you want to hide this content"
    ></Modal>
  );
}

export function ShowContent(props: Props) {
  const { state, actions } = useContext(StoreContext);

  return (
    <Modal
      heading="Unhide Content"
      icon={true}
      button="Show"
      confirmMessage="Are you sure you want to unhide this content"
    ></Modal>
  );
}
