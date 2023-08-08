import React, { useMemo, useState } from 'react';
import { createContext, useContext } from 'react';
import intl from 'react-intl-universal';
import enUsLocales from '../locales/en-US.json';

import cnFlag from '../media/flags/cn.svg';
import deFlag from '../media/flags/de.svg';
import enFlag from '../media/flags/gb.svg';
import esFlag from '../media/flags/es.svg';
import frFlag from '../media/flags/fr.svg';
import huFlag from '../media/flags/hu.svg';
import itFlag from '../media/flags/it.svg';
import jpFlag from '../media/flags/jp.svg';
import ptFlag from '../media/flags/pt.svg';
import rsFlag from '../media/flags/rs.svg';
import slFlag from '../media/flags/si.svg';
import trFlag from '../media/flags/tr.svg';

const LOCAL_STORAGE_LOCALES_KEY = 'lang';

const flagMap: Record<string, string> = {
  'ch-CH': cnFlag,
  'de-DE': deFlag,
  'en-US': enFlag,
  'es-ES': esFlag,
  'fr-FR': frFlag,
  'hu-HU': huFlag,
  'it-IT': itFlag,
  'jp-JP': jpFlag,
  'pt-PT': ptFlag,
  'rs-RS': rsFlag,
  'sl-SI': slFlag,
  'tr-TR': trFlag,
};

export interface ILocalesContext {
  intl: typeof intl;
  currentLocale: string;
  languageCodes: string[];
  getFlagImage: (language?: string) => string;
  setCurrentLocale: (locale: string) => void;
}

const LocalesContext = createContext<ILocalesContext>({
  intl,
  currentLocale: 'en-US',
  languageCodes: [],
  getFlagImage: () => '',
  setCurrentLocale: () => {},
});

export const useLocales = () => useContext(LocalesContext);

export interface LocalesProviderProps {
  children: React.ReactNode;
}

const defaultLanguage =
  (typeof window !== 'undefined' &&
    localStorage.getItem(LOCAL_STORAGE_LOCALES_KEY)) ||
  'en-US';

function setLanguage(language: string) {
  typeof window !== 'undefined' &&
    localStorage.setItem(LOCAL_STORAGE_LOCALES_KEY, language);

  intl.init({
    currentLocale: language,
    locales: {
      'en-US': enUsLocales,
    },
  });
}

setLanguage(defaultLanguage);

export const LocalesProvider = ({ children }: LocalesProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState<string>(defaultLanguage);

  const languageCodes = useMemo(() => Object.keys(flagMap), []);

  const changeCurrentLocale = (locale: string) => {
    setLanguage(locale);

    setCurrentLocale(locale);
  };

  const getFlagImage = (language?: string) =>
    flagMap[language || currentLocale];

  return (
    <LocalesContext.Provider
      value={{
        intl,
        currentLocale,
        languageCodes,
        getFlagImage,
        setCurrentLocale: changeCurrentLocale,
      }}
    >
      {children}
    </LocalesContext.Provider>
  );
};
