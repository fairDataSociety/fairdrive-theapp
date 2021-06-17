import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../../store/themeContext/themes";
import { Props } from "./modal";

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      width: "50rem",
      minHeight: "25rem",
      display: "flex",
      flexDirection: "column",
      padding: "2.5rem",
      marginBottom: "1rem",
      borderRadius: "1rem",
      position: "relative",
    },
    header: {
      font: (style: Props & Theme) => style.typography.body3,
      borderBottom: (style: Props & Theme) =>
        `1px solid ${style.backgroundDark1}`,
      paddingBottom: "2rem",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: "1rem",
    },
    closeIcon: {
      stroke: (style: Props & Theme) => style.backgroundLight1,
      position: "absolute",
      right: "3rem",
      top: "3rem",
    },
    flex: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    body: {
      padding: "3rem 0",
    },
    confirmMessage: {
      font: (style: Props & Theme) => style.typography.caption1,
      color: (style: Props & Theme) => style.green,
    },
    notifyMessage: {
      font: (style: Props & Theme) => style.typography.caption1,
      color: (style: Props & Theme) => style.yellow,
    },
    errorMessage: {
      font: (style: Props & Theme) => style.typography.caption1,
      color: (style: Props & Theme) => style.red,
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark1,
      maxWidth: "25rem",
      padding: "1.5rem 3rem",
      borderRadius: "0.5rem",
    },
    disabledButton: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark1,
      color: (style: Props & Theme) => style.backgroundLight3,
      maxWidth: "25rem",
      padding: "1.5rem 3rem",
      borderRadius: "0.5rem",
    },
  })
);

export default useStyles;
