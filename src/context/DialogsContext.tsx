/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { createContext, useContext } from 'react';

export interface IDialogContext {
  metamaskMigrationOpen: boolean;
  setMetamaskMigrationOpen: (value: boolean) => void;
}

const DialogContext = createContext<IDialogContext>({
  metamaskMigrationOpen: false,
  setMetamaskMigrationOpen: () => {},
});

export const useDialogs = () => useContext(DialogContext);

export interface DialogContextProps {
  children: React.ReactNode;
}

export const DialogProvider = ({ children }: DialogContextProps) => {
  const [metamaskMigrationOpen, setMetamaskMigrationOpen] =
    useState<boolean>(false);

  return (
    <DialogContext.Provider
      value={{
        metamaskMigrationOpen,
        setMetamaskMigrationOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
