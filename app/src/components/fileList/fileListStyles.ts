import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "../../store/themeContext/themes";
import { Props } from "./fileList";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: "50rem",
      backgroundColor: (style: Props & Theme) => style.backgroundDark,
      border: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      borderRadius: "1rem",
      width: "auto",
      margin: '2rem'
    },
    headerwrapper: {
      backgroundColor: (style: Props & Theme) => style.backgroundDark2,
      display: "flex",
      padding: "2rem",
    },
    wrapper: {
      display: "flex",
      backgroundColor: (style: Props & Theme) => style.backgroundDark4,
    },
    fileWrapper: {
      padding: "2rem",
      display: "flex",
      alignItems: 'center',
      borderTop: (style: Props & Theme) => `1px solid ${style.backgroundDark2}`,
      backgroundColor: (style: Props & Theme) => style.backgroundDark3,
      "&:nth-child(2n + 1)": {
        backgroundColor: (style: Props & Theme) => style.backgroundDark4,
      },
    },
    fileContainer: {},
    fileName: {
      width: '45%'
    },
    fileInfo: {width: '13%'},
  })
);

export default useStyles;
