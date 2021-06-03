import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./navbar";

const useStyles = makeStyles(() =>
  createStyles({
    Navbar: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      color: (style: Props & Theme) => style.textColorSecondary,
      font:(style: Props & Theme) => style.typography.h4,
      paddingLeft:"1.5rem",
      width: "100%",
      height: "6rem",
      position: "absolute",
      display: "flex",
      alignItems:"center",
      flexDirection:"row",
      left: 0,
      top: 0,
    },
    searchBar:{
      marginLeft:"2rem",
    },
    walletConnectButton: {
      padding: "1rem 2rem",
      color: "black",
      backgroundColor: "lightgrey",
      margin: "auto 5rem auto auto",
      borderRadius: "2rem",
    },
    logo: {
      margin: "1rem",
    },
    TextField: {
      display: "flex",
      flexDirection: "row",
      border: "1px solid var(--white)",
      color:(style: Props & Theme) => style.textColorSecondary,
      padding:"0.5rem",
      width: "45rem",

    },
    input: {
      fontFamily: 'Work Sans',
      fontWeight: 'normal', //TODO can this be thinner???
      fontSize: '18px',
      letterSpacing: '0',
      lineHeight: '17px',
      // custom
      textAlign: 'left',
      width: "45rem",
      paddingBottom: '5px',
      color:(style: Props & Theme) => style.textColorSecondary,
      border: "0px",
      backgroundColor: "transparent",
      outline: 'none',
    },
    iconContainer: {
      width: "2rem",
      height: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight:"1rem"
    },
    Icon: {
      width: "2rem",
      height: "2rem",
    },
  })
);

export default useStyles;
