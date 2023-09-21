/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react';
import { createContext, useContext } from 'react';
import intl from 'react-intl-universal';
import cnCnLocales from '../locales/ch-CH.json';
import deDeLocales from '../locales/de-DE.json';
import enUsLocales from '../locales/en-US.json';
import esEsLocales from '../locales/es-ES.json';
import frFrLocales from '../locales/fr-FR.json';
import huHuLocales from '../locales/hu-HU.json';
import itItLocales from '../locales/it-IT.json';
import jpJpLocales from '../locales/jp-JP.json';
import prPtLocales from '../locales/pt-PT.json';
import rsSrLocales from '../locales/rs-RS.json';
import slSiLocales from '../locales/sl-SI.json';
import trTrLocales from '../locales/tr-TR.json';

import cnFlag from '../media/flags/cn.png';
import deFlag from '../media/flags/de.png';
import enFlag from '../media/flags/gb.png';
import esFlag from '../media/flags/es.png';
import frFlag from '../media/flags/fr.png';
import huFlag from '../media/flags/hu.png';
import itFlag from '../media/flags/it.png';
import jpFlag from '../media/flags/jp.png';
import ptFlag from '../media/flags/pt.png';
import rsFlag from '../media/flags/rs.png';
import slFlag from '../media/flags/si.png';
import trFlag from '../media/flags/tr.png';
import { StaticImageData } from 'next/image';

const LOCAL_STORAGE_LOCALES_KEY = 'lang';

const flagMap: Record<string, StaticImageData> = {
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
  getFlagImage: (language?: string) => StaticImageData;
  setCurrentLocale: (locale: string) => void;
}

const LocalesContext = createContext<ILocalesContext>({
  intl,
  currentLocale: 'en-US',
  languageCodes: [],
  getFlagImage: () => null,
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
      'ch-CH': cnCnLocales,
      'de-DE': deDeLocales,
      'en-US': enUsLocales,
      'es-ES': esEsLocales,
      'fr-FR': frFrLocales,
      'hu-HU': huHuLocales,
      'it-IT': itItLocales,
      'jp-JP': jpJpLocales,
      'pt-PT': prPtLocales,
      'rs-RS': rsSrLocales,
      'sl-SI': slSiLocales,
      'tr-TR': trTrLocales,
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
