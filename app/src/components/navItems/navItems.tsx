import React, { useContext, useState } from "react";
import { ThemeContext } from "../../store/themeContext/themeContext";
import useStyles from "../../containers/navbar/navbarStyles";
import ClickAwayListener from "react-click-away-listener";
import SearchBar from "../searchBar/searchBar";
import { Profile, DAppIcon } from "src/components/icons/icons";
import GenerateLink from "src/components/modals/generateLink/generateLink";
import DropDown from "src/components/dropDown/dropDown";

export interface Props {}

function NavItems(props: Props) {
  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });
  const [referModal, setReferModal] = useState(false);
  const [dappDropdown, setDappDropdown] = useState(false);
  const [avatarDropdown, setAvatarDropdown] = useState(false);
  const [activityDropdown, setActivityDropdown] = useState(false);

  const handleClick = () => {
    setReferModal(true);
  };
  const handleDappClick = () => {
    setDappDropdown(true);
  };
  const handleAvatarClick = () => {
    setAvatarDropdown(true);
  };
  const handleActivityClick = () => {
    setActivityDropdown(true);
  };

  return (
    <div className={classes.navItems}>
      <ClickAwayListener onClickAway={() => setReferModal(false)}>
        <button className={classes.refer} onClick={handleClick}>
          Refer A Friend
        </button>
      </ClickAwayListener>
      <SearchBar />
      <DAppIcon onClick={handleDappClick} className={classes.dappIcon} />
      {dappDropdown && (
        <ClickAwayListener onClickAway={() => setDappDropdown(false)}>
          <div className={classes.dropdown}>
            <DropDown variant="secondary" heading="Your Connected DApps">
              Coming soon
            </DropDown>
          </div>
        </ClickAwayListener>
      )}
      <Profile onClick={handleAvatarClick} className={classes.profileIcon} />
      {avatarDropdown && (
        <ClickAwayListener onClickAway={() => setAvatarDropdown(false)}>
          <div className={classes.dropdown}>
            <DropDown
              variant="secondary"
              heading="Fairdrop User Name Login (Coming soon)"
            >
              <ul>
                <li className={classes.listItem}>Account Info</li>
                <li className={classes.listItem}>Security (coming soon)</li>
                <li className={classes.listItem}>Dapp centre (coming soon)</li>
                <li className={classes.listItem} style={{ color: "red" }}>
                  Logout
                </li>
              </ul>
            </DropDown>
          </div>
        </ClickAwayListener>
      )}
      <div onClick={handleActivityClick} className={classes.activity}>
        Activity
      </div>
      {activityDropdown && (
        <ClickAwayListener onClickAway={() => setActivityDropdown(false)}>
          <div className={classes.dropdown}>
            <DropDown variant="tertiary" heading="Activity Coming Soon">
              <ul>
                <li className={classes.listItem} style={{ color: "#DBB889" }}>
                  See all txs (comin soon)
                </li>
              </ul>
            </DropDown>
          </div>
        </ClickAwayListener>
      )}
      {referModal && <GenerateLink variant="refer" />}
    </div>
  );
}

export default React.memo(NavItems);
