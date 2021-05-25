import { makeStyles, createStyles } from "@material-ui/styles";
import { Signer } from 'crypto';
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardWrapper";
import Sizes from "./cardWrapper"
const sizes = {
  big: "100%",
  regular: "25rem",
  small: "20rem",
};
const useStyles = makeStyles(() =>
  createStyles({
    CardWrapper: {
      background: (style: Props & Theme) => style.backgroundShade4,
      left:"10rem",
      border: "1px solid var(--grey)",
      borderRadius: "1.5rem",
      width: (style: Props & Theme) => sizes[style.size] ?? sizes.regular,
      height: (style: Props & Theme) => sizes[style.size] ?? sizes.regular,
      margin: (style: Props & Theme) => style.size === "big" ? "0rem": "1.5rem",
      justifyContent: (style: Props & Theme) => style.size === "big" ? "flex-end" :"space-around",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      padding: "2.5rem 0 2.5rem 0",
      cursor:"pointer"
    },
  })
);

export default useStyles;
