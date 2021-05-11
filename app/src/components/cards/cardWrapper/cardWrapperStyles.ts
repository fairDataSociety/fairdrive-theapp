import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardWrapper";

const sizes = {
  regular: "62rem",
  small: "50rem",
  smallest: "29rem",
};
const useStyles = makeStyles(() =>
  createStyles({
    CardWrapper: {
      background: (style: Props & Theme) => style.backgroundWhite,
      left:"10rem",
      border: "1px solid var(--grey)",
      borderRadius: "1.5rem",
      width: "20rem",
      height:"20rem",
      margin: "1.5rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "space-around",
      padding: "2.5rem 0 2.5rem 0",
    },
  })
);

export default useStyles;
