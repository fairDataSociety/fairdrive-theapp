import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import useStyles from './setUpCardsStyles';
import { StartFolder, Dapps, Complete } from '../icons/icons';

export interface Props {}

function SetupCards(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const boxContent = [
    {
      icon: <StartFolder className={classes.icon} />,
      header: 'Get started with your Drive',
      body: 'Start interacting with the Fairdrive ecosystem, launch your Subpods and explore new ways to organize your files.',
      button: 'Create in Fairtext',
    },
    {
      icon: <Dapps className={classes.icon} />,
      header: 'Explore Public Pods',
      body: 'Explore Public pods that are in the Fair Data Society Ecosystem',
      button: 'Explore Public Pods',
    },
    {
      icon: <Complete className={classes.icon} />,
      header: 'Complete your profile',
      body: 'Complete your profile with an avatar of your choice that can be seenon Fairdrive',
      button: 'Edit Your Profile',
    },
  ];

  return (
    <div className={classes.cards}>
      {boxContent.map((content) => {
        return (
          <li>
            <div className={classes.container}>
              {content.icon}
              <p className={classes.header}>{content.header}</p>
              <p className={classes.body}>{content.body}</p>
              <button className={classes.button}>{content.button}</button>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default React.memo(SetupCards);
