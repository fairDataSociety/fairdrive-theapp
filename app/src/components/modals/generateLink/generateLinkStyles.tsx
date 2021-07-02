import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./generateLink";

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      font: (style: Props & Theme) => style.typography.caption2,
      marginBottom: "1.5rem",
      textTransform: "uppercase",
    },
    body: {
      font: (style: Props & Theme) => style.typography.body1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "3rem 1rem",
      height: "4rem",
    },
    icon: {
      width: "3rem",
      "&:hover": {
        filter: "brightness(1.2)",
      },
    },
  })
);

export default useStyles;
