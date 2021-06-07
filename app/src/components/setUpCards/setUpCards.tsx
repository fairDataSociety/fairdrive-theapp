import React, { useContext } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "./setUpCardsStyles";
import { StartFolder, Dapps, Complete } from "../icons/icons";

export interface Props {}

function SetupCards(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const boxContent = [
    {
      icon: <StartFolder className={classes.icon} />,
      header: "Get started with your Drive",
      body: "Start interacting with the Fairdrive ecosystem, launch your Subpods and explore new ways to organize your files.",
      button: "Upload your first file",
    },
    {
      icon: <Dapps className={classes.icon} />,
      header: "Get started with DApps",
      body: "Start interacting with the Fairdrive ecosystem, launch your Subpods and explore new ways to organize your files.",
      button: "Explore DApps",
    },
    {
      icon: <Complete className={classes.icon} />,
      header: "Complete your profile",
      body: "Start interacting with the Fairdrive ecosystem, launch your Subpods and explore new ways to organize your files.",
      button: "Go to profile",
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
