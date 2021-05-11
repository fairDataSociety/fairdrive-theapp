import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardBody";

const useStyles = makeStyles(() =>
  createStyles({
    CardBody: {
      width: "100%",
      height: "auto",
      backgroundColor: "transparent",
      color: (style: Theme & Props) => style.textColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "auto 0 3rem 0",
    },

  })
);

export default useStyles;
