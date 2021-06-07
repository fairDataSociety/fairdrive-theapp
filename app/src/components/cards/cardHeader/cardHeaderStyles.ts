import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardHeader";

const useStyles = makeStyles(() =>
  createStyles({
    CardHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      color: (style: Theme & Props) => style.textColorPrimary,
      borderBottom:  (style: Theme & Props) => style.isDirectory?"":"1px solid var(--dark3)", 
      width:"100%",
      height:"15rem"
    },
    iconContainer: {
      margin: "0 0 1rem 0",
      width: "9rem",
      height: "9rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    Icon: {
      width: "8rem",
      height: "8rem",
      margin: "auto",
    },
    Type: {
      color: "var(--grey2)",
      font: (style: Theme & Props) => style.typography.body1,
      margin: "1rem",
      textTransform: "uppercase",
    },
    Title: {
      color: (style: Theme & Props) => style.textColorPrimary,
      font: (style: Theme & Props) => style.typography.h6,
      margin: "1rem 0 auto 0",
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
