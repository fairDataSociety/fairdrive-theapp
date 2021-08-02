import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    imagePreview: {
      width: "100%",
      height: "45rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      objectFit: "contain",
      objectPosition: "top"
    },
    Icon: {
      width: "8rem",
      height: "8rem",
      margin: "auto",
    },
  })
);

export default useStyles;
