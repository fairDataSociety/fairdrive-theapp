import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./cardBody";

const useStyles = makeStyles(() =>
  createStyles({
    CardBody: {
      width: "100%",
      backgroundColor: "transparent",
      color: (style: Theme & Props) => style.textColorMain,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      margin: "1rem 0 2rem 0",
    },

  })
);

export default useStyles;
