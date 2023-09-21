/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { createContext, useContext } from 'react';

export interface IDialogContext {
  metamaskMigrationOpen: boolean;
  mobileNavigationOpen: boolean;
  setMetamaskMigrationOpen: (value: boolean) => void;
  setMobileNavigationOpen: (value: boolean) => void;
}

const DialogContext = createContext<IDialogContext>({
  metamaskMigrationOpen: false,
  mobileNavigationOpen: false,
  setMetamaskMigrationOpen: () => {},
  setMobileNavigationOpen: () => {},
});

export const useDialogs = () => useContext(DialogContext);

export interface DialogContextProps {
  children: React.ReactNode;
}

export const DialogProvider = ({ children }: DialogContextProps) => {
  const [metamaskMigrationOpen, setMetamaskMigrationOpen] =
    useState<boolean>(false);
  const [mobileNavigationOpen, setMobileNavigationOpen] =
    useState<boolean>(false);

  return (
    <DialogContext.Provider
      value={{
        metamaskMigrationOpen,
        mobileNavigationOpen,
        setMetamaskMigrationOpen,
        setMobileNavigationOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
