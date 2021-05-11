import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "../seedPhrase/seedPhraseStyles";



export interface Props { seedPhrase: string }

// Simple seed phrase component
// Displays 2 columns of 6 words each

function SeedPhrase(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });


  return (
    <div className={classes.SeedPhrase}>
      {props.seedPhrase.split(' ').map((word) => {
        return <div className={classes.word}>
          {word}
        </div>
      })}
    </div>
  );
}

export default React.memo(SeedPhrase);
