import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./navbar";

const useStyles = makeStyles(() =>
  createStyles({
    Navbar: {
      backgroundColor: (style: Props & Theme) => style.backgroundBlack,
      color: (style: Props & Theme) => style.textColorHighlight,
      font:(style: Props & Theme) => style.typography.h1,
      paddingLeft:"1.5rem",
      borderBottom: "1px solid lightgrey",
      width: "100%",
      height: "6rem",
      position: "absolute",
      display: "flex",
      justifyContent: "space-between",
      left: 0,
      top: 0,
    },
    walletConnectButton: {
      padding: "1rem 2rem",
      color: "black",
      backgroundColor: "lightgrey",
      margin: "auto 5rem auto auto",
      borderRadius: "2rem",
    },
    logo: {
      height: "50%",
      margin: "auto auto auto 5rem",
    },
  })
);

export default useStyles;
