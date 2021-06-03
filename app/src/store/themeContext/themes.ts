import { typography, Typography } from "./typography";

export interface Theme {
  name: string;
  textColorPrimary: string;
  textColorSecondary:string;
  textColorHoverSelected:string;
  backgroundDark: string;
  backgroundDark4: string;
  backgroundDark3: string;
  backgroundDark2: string;
  backgroundDark1: string;
  backgroundLight3: string;
  backgroundLight2: string;
  backgroundLight1: string;
  backgroundWhite: string;
  red:string;
  yellow:string;
  green:string;
  typography: Typography;
}

export const themes = {
  dark: {
    name: "dark",
    textColorPrimary: "#CED0DD",
    textColorSecondary: "#82848E",
    textColorHoverSelected:"#EEF0FF",
    backgroundDark: "#101113",
    backgroundDark4: "#17191D",
    backgroundDark3: "#202226",
    backgroundDark2: "#27292E",
    backgroundDark1: "#36383F",
    backgroundLight3: "#494B50",
    backgroundLight2: "#82848E",
    backgroundLight1: "#CED0DD",
    backgroundWhite: "#EEF0FF",
    red:"#FF3864",
    yellow:"#DBB889",
    green:"#7FC18A",
    typography,
  },
  light: {
    name: "light",
    textColorPrimary: "#CED0DD",
    textColorSecondary: "#82848E",
    textColorHoverSelected:"#EEF0FF",
    backgroundDark: "#101113",
    backgroundDark4: "#17191D",
    backgroundDark3: "#202226",
    backgroundDark2: "#27292E",
    backgroundDark1: "#36383F",
    backgroundLight3: "#494B50",
    backgroundLight2: "#82848E",
    backgroundLight1: "#CED0DD",
    backgroundWhite: "#EEF0FF",
    red:"#FF3864",
    yellow:"#DBB889",
    green:"#7FC18A",
    typography,
  },
};
