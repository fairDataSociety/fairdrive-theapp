import React, { Dispatch, SetStateAction, useContext } from 'react';
import Blockies from 'react-blockies';

// Contexts
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { useModal } from 'src/contexts/modalContext';
import { MODAL_VARIANTS } from 'src/contexts/modalContext/types';
import { AuthProviderContext } from 'src/machines/auth';

// Hooks
import useStyles from './navbarStyles';

// Components
import { Logo, DAppIcon, Moon, Sun } from 'src/components/icons/icons';
import BaseActionButton, {
  ACTION_BUTTON_VARIANTS,
  ACTION_FONT_SIZE,
} from 'src/shared/BaseActionButton/BaseActionButton';
import BaseDropdown, {
  DROPDOWN_SIZE,
} from 'src/shared/BaseDropdown/BaseDropdown';
import {
  BaseButton,
  BUTTON_VARIANTS,
  BUTTON_SIZE,
  FONT_SIZE,
  BUTTON_TEXT_COLOR,
} from 'src/shared/BaseButton/BaseButton';
import SearchBar from 'src/layout/partials/navbar/partials/searchBar/searchBar';
import ExploreSearchBar from 'src/layout/partials/navbar/partials/exploreSearchBar/exploreSearchBar';

export interface Props {
  setShowTerms?: (data) => void;
  showTerms?: boolean;
  isAfterAuth: boolean;
  activeTab: string;
  appSearch: string;
  setAppSearch: Dispatch<SetStateAction<string>>;
}

function Navbar(props: Props): JSX.Element {
  // General
  const { AuthMachineStore, AuthMachineActions } =
    useContext(AuthProviderContext);

  const { theme, toggleTheme } = useTheme();
  const classes = useStyles({ ...props, ...theme });

  const { openModal } = useModal();

  const isThemeLight = () => theme.name === 'light';

  return (
    <header className={classes.navbar}>
      <div className={classes.left}>
        <a
          onClick={() => {
            props.setShowTerms(false);
          }}
          className={classes.logoWrapper}
        >
          <Logo className={classes.logo} />
        </a>

        {props.isAfterAuth && (
          <BaseDropdown
            moveToRight={true}
            dropdownSize={DROPDOWN_SIZE.BIG}
            title={'Activity Coming Soon'}
            contentBlock={() => (
              <>
                <p>Only active server at the moment.</p>
              </>
            )}
          >
            {(openDropdown, _, isDropdownOpen) => (
              <BaseActionButton
                variant={ACTION_BUTTON_VARIANTS.NAVBAR}
                fontSize={ACTION_FONT_SIZE.REGULAR}
                hasDropdownInitiator={true}
                isDropdownOpen={isDropdownOpen}
                onClickCallback={() => openDropdown()}
              >
                FairOS (Server)
              </BaseActionButton>
            )}
          </BaseDropdown>
        )}
      </div>

      <div className={classes.right}>
        {props.isAfterAuth && (
          <>
            <BaseButton
              variant={BUTTON_VARIANTS.ALTERNATIVE}
              size={BUTTON_SIZE.MEDIUM}
              fontSize={FONT_SIZE.BIG}
              textColor={BUTTON_TEXT_COLOR.WHITE}
              onClickCallback={() =>
                openModal({
                  type: MODAL_VARIANTS.GENERATE_LINK,
                  data: {
                    type: 'Referal',
                    // TODO: When clicked refer a friend, do request to api
                    // for now there is no endpoint
                    link: '...',
                  },
                })
              }
            >
              Refer a friend
            </BaseButton>
          </>
        )}
        <div className={classes.actionsWrapper}>
          {props.isAfterAuth && (
            <>
              {props.activeTab === 'Explore' ? (
                <ExploreSearchBar
                  appSearch={props.appSearch}
                  setAppSearch={props.setAppSearch}
                />
              ) : (
                <SearchBar />
              )}

              <div className={classes.dappAndActivityGroup}>
                <BaseDropdown
                  moveToRight={false}
                  dropdownSize={DROPDOWN_SIZE.BIG}
                  title={'Your connected dApps'}
                  contentBlock={() => (
                    <>
                      <p>Activity Coming Soon</p>
                    </>
                  )}
                >
                  {(openDropdown) => (
                    <DAppIcon
                      onClick={() => openDropdown()}
                      className={classes.icon}
                    />
                  )}
                </BaseDropdown>

                <BaseDropdown
                  moveToRight={false}
                  title={'Activity Coming Soon'}
                  dropdownSize={DROPDOWN_SIZE.BIG}
                  contentBlock={() => (
                    <>
                      <p className={classes.dropdownActivityContent}>
                        See all txs (coming soon)
                      </p>
                    </>
                  )}
                >
                  {(openDropdown) => (
                    <BaseButton
                      variant={BUTTON_VARIANTS.TERITARY}
                      size={BUTTON_SIZE.NO_PADDING}
                      fontSize={FONT_SIZE.BIG}
                      textColor={BUTTON_TEXT_COLOR.LIGHT2}
                      onClickCallback={() => openDropdown()}
                    >
                      Activity
                    </BaseButton>
                  )}
                </BaseDropdown>
              </div>

              <BaseDropdown
                moveToRight={false}
                dropdownSize={DROPDOWN_SIZE.BIG}
                optionsList={[
                  {
                    label: 'Account Info',
                    isDisabled: true,
                  },
                  {
                    label: 'Security (coming soon)',
                    isDisabled: true,
                  },
                  {
                    label: 'Dapp Centre (coming soon)',
                    isDisabled: true,
                  },
                  {
                    label: 'Disconnect',
                    isDangerVariant: true,
                    onOptionClicked: () => AuthMachineActions.onLogout(),
                  },
                ]}
                title={'Fairdrop user name Login (coming soon)'}
                footerBlock={() => (
                  <>
                    <ul className={classes.dropdownProfileFooter}>
                      <li>Privacy Policy</li>
                      <li>Terms of Service</li>
                    </ul>
                  </>
                )}
              >
                {(openDropdown) => (
                  <span onClick={() => openDropdown()}>
                    <Blockies
                      seed={AuthMachineStore.context.userData?.reference}
                      size={8}
                      scale={4}
                      className={classes.blockie}
                    />
                  </span>
                )}
              </BaseDropdown>
            </>
          )}
          {isThemeLight() ? (
            <Moon onClick={() => toggleTheme()} className={classes.icon} />
          ) : (
            <Sun onClick={() => toggleTheme()} className={classes.icon} />
          )}
        </div>
      </div>
    </header>
  );
}

export default React.memo(Navbar);
