import { Cookie } from './Cookie';

export type SaveMode = 'alwaysAsk' | 'alwaysStore' | 'neverStore';

export interface Preferences {
  saveMode: SaveMode;
}

export interface CookieFile {
  cookies?: Cookie[];
  preferences?: Preferences;
}
