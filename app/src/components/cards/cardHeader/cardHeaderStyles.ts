import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardHeader";

const useStyles = makeStyles(() =>
  createStyles({
    CardHeader: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "transparent",
      color: (style: Theme & Props) => style.textColorPrimary,
      width:"100%",
      height:"18rem",
      position: 'relative',
      marginBottom: '0',
    },
    iconContainer: {
      width: "9rem",
      height: "9rem",
      paddingBottom:"1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    kebabIcon: {
      position: 'absolute',
      top: 0,
      right: -10,
      height: '3rem',
      margin: '2rem',
    },
    Icon: {
      width: "7rem",
      height: "7rem",
      margin: "0",
    },
    Type: {
      color: (style: Theme & Props) => style.backgroundDark2,
      font: (style: Theme & Props) => style.typography.body1,
      margin: "1rem",
      textTransform: "uppercase",
    },
    Title: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body2,
      paddingTop:"3rem",
      paddingBottom:"3rem",
      textAlign:"left",
      
      textOverflow: "ellipsis",
      display: "-webkit-box",
      // truncate text after 3 lines of text
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
    },
    Description: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.body1,
    },
  })
);

export default useStyles;
