import React, { useContext } from "react";
import FilePreviewFallback from "src/components/filePreview/filePreviewFallback";
import { ThemeContext } from "../../../store/themeContext/themeContext";
import useStyles from "./cardHeaderStyles";

export interface Props {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  heading: string;
  isDirectory?: boolean;
  file: any;
}

function CardHeader(props: Props) {
  const { theme } = useContext(ThemeContext);
  const { heading } = props;
  const classes = useStyles({ ...props, ...theme });

  console.log(props);
  return (
    <div className={classes.CardHeader}>
      {props.Icon && (
        <div className={classes.iconContainer}>
          <FilePreviewFallback file={props.file} isDirectory={props.isDirectory} />
        </div>
      )}
      <h2 className={classes.Title}>{heading}</h2>
    </div>
  );
}

export default React.memo(CardHeader);
