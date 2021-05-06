import { typography, Typography } from "./typography";

export interface Theme {
  name: string;
  textColor: string;
  textColorHighlight:string;
  backgroundBlack: string;
  backgroundShade: string;
  backgroundWhite: string;
  backgroundGrey: string;
  typography: Typography;
}

export const themes = {
  dark: {
    name: "dark",
    textColor: "#16181D",
    textColorHighlight: "#EEF0FF",
    backgroundBlack: "#16181D",
    backgroundGrey: "#88898E",
    backgroundWhite: "#FFFFFF",
    backgroundShade: "#CED0DD",
    typography,
  },
  light: {
    name: "light",
    textColor: "#16181D",
    textColorHighlight: "##EEF0FF",
    backgroundBlack: "#16181D",
    backgroundGrey: "#88898E",
    backgroundWhite: "#EEF0FF",
    backgroundShade: "#CED0DD",
    typography,
  },
};
