import React, { useContext, useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';

// Contexts
import { ThemeContext } from 'src/contexts/themeContext/themeContext';
import { usePodStateMachine } from 'src/contexts/podStateMachine';
import { STATES_NAMES } from 'src/types/pod-state';
import { StoreContext } from 'src/store/store';

// Hooks
import useStyles from './navbarStyles';

// Components
import GenerateLink from 'src/components/modals/generateLink/generateLink';
import { Logo, DAppIcon, Profile, Moon, Sun } from 'src/components/icons/icons';
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
export interface Props {
  setShowTerms?: (data) => void;
  showTerms?: boolean;
}

function Navbar(props: Props): JSX.Element {
  // General
  const { actions } = useContext(StoreContext);
  const { podStateMachine } = usePodStateMachine();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const classes = useStyles({ ...props, ...theme });

  const [isReferalModalOpen, setIsReferalModalOpen] = useState(false);

  const isPodStateOtherThanInitial = () =>
    podStateMachine.tag !== STATES_NAMES.INITIAL;

  const isThemeLight = () => theme.name === 'light';

  return (
    <header className={classes.navbar}>
      <div className={classes.left}>
        <a
          onClick={() => {
            props.setShowTerms(false);
            actions.setDirectory('root');
          }}
          className={classes.logoWrapper}
        >
          <Logo className={classes.logo} />
        </a>

        {isPodStateOtherThanInitial() && (
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
      {isPodStateOtherThanInitial() && (
        <div className={classes.right}>
          <BaseButton
            variant={BUTTON_VARIANTS.ALTERNATIVE}
            size={BUTTON_SIZE.MEDIUM}
            fontSize={FONT_SIZE.BIG}
            textColor={BUTTON_TEXT_COLOR.WHITE}
            onClickCallback={() => setIsReferalModalOpen(true)}
          >
            Refer a friend
          </BaseButton>

          {isReferalModalOpen && (
            <GenerateLink
              variant="refer"
              handleClose={() => setIsReferalModalOpen(false)}
            />
          )}

          <div className={classes.actionsWrapper}>
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
                  onOptionClicked: () => actions.userLogout(),
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
                <Profile
                  onClick={() => openDropdown()}
                  className={classes.icon}
                />
              )}
            </BaseDropdown>

            {isThemeLight() ? (
              <Moon onClick={() => toggleTheme()} className={classes.icon} />
            ) : (
              <Sun onClick={() => toggleTheme()} className={classes.icon} />
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default React.memo(Navbar);
