import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./sidebar";

const useStyles = makeStyles(() =>
  createStyles({
    Sidebar: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      borderBottom: "1px solid lightgrey",
      width: "17rem",
      height: "120vh",
      position: "absolute",
      display: "flex",
      justifyContent: "space-between",
      left: 0,
      top:"6rem",
      paddingTop:"10rem",
      flexDirection: "column",
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
