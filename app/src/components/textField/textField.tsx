import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import useStyles from "./textFieldStyles";

export interface Props {
  placeholder: string;
  setProp: any;
  setHasError?: any;
  onContinue?: any;
  type: string;
}

function TextField(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({ ...props, ...theme });
  const handleSetProp = (e: any) => {
    props.setProp(e.target.value);
    props.setHasError(false);
  };

  function handleSubmit(e: any) {
    if (props.onContinue) {
      if (e.charCode === 13) {
        props.onContinue();
      }
    }
  }
  return (
    <div className={classes.TextField}>
      <input
        className={classes.input}
        type={props.type}
        placeholder={props.placeholder}
        onKeyPress={(e) => handleSubmit(e)}
        onChange={(e) => handleSetProp(e)}
      ></input>
    </div>
  );
}

export default React.memo(TextField);
