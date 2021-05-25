import { typography, Typography } from "./typography";

export interface Theme {
  name: string;
  textColorMain: string;
  textColorSecond:string;
  backgroundDark: string;
  backgroundShadeDark: string;
  backgroundWhite: string;
  backgroundGrey: string;
  backgroundShade2: string;
  backgroundShade3: string;
  backgroundShade4: string;
  typography: Typography;
}

export const themes = {
  dark: {
    name: "dark",
    textColorMain: "#EEF0FF",
    textColorSecond: "#82848E",
    backgroundDark: "#101113",
    backgroundShadeDark: "#88898E",
    backgroundWhite: "#FFFFFF",
    backgroundShade2: "#27292E",
    backgroundShade3: "#202226",
    backgroundShade4: "#17191D",
    backgroundGrey: "#494B50",
    typography,
  },
  light: {
    name: "light",
    textColorMain: "#EEF0FF",
    textColorSecond: "#82848E",
    backgroundDark: "#101113",
    backgroundShadeDark: "#88898E",
    backgroundWhite: "#FFFFFF",
    backgroundShade2: "#27292E",
    backgroundShade3: "#202226",
    backgroundShade4: "#17191D",
    backgroundGrey: "#494B50",
    typography,
  },
};
