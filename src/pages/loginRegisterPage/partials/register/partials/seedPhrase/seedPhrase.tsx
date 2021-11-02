import React from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import useStyles from '../seedPhrase/seedPhraseStyles';

export interface Props {
  seedPhrase: string;
}

// Simple seed phrase component
// Displays 2 columns of 6 words each

function SeedPhrase(props: Props) {
  const { theme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  return (
    <div className={classes.SeedPhrase}>
      <div>
        {props.seedPhrase.split(' ').map((word, index) => {
          return (
            <div key={index}>
              {index + 1}. {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SeedPhrase);
