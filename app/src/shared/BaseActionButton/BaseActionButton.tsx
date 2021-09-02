import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'src/contexts/themeContext/themeContext';

// Hooks
import useStyles from './BaseActionButtonStyles';

// Helpers
import { isValueInEnum } from 'src/helpers/isValueInEnum';

// Icons
import {
  Folder,
  Upload,
  Plus,
  Download,
  ChevronDown,
  Share,
  GridIcon,
  SortingIcon,
  ListIcon,
} from 'src/components/icons/icons';

export enum ACTION_BUTTON_VARIANTS {
  ACTION_OUTLINED = 'action_outlined',
  ACTION_OUTLINED_WITHOUT_TEXT = 'action_outlined_without_text',
}

export enum ACTION_BUTTON_ICONS {
  CREATE = 'create',
  FOLDER = 'folder',
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
  SHARE = 'share',
  GRID_ICON = 'grid_icon',
  SORTING_ICON = 'sorting_icon',
  LIST_ICON = 'list_icon',
}

export interface Props {
  icon: ACTION_BUTTON_ICONS;
  variant: ACTION_BUTTON_VARIANTS;
  hasDropdownInitiator?: boolean;
  isDropdownOpen?: boolean;
  children?: string;
  label?: string;
  isSubmit?: boolean;
  isDisabled?: boolean;
  onClickCallback: () => void;
}

function BaseActionButton(props: Props): JSX.Element {
  const {
    icon,
    variant,
    onClickCallback,
    isDisabled,
    hasDropdownInitiator,
    isDropdownOpen,
    children,
    isSubmit,
    label,
  } = props;
  const { theme } = useContext(ThemeContext);

  const classes = useStyles({
    ...props,
    ...theme,
  });

  useEffect(() => {
    isValueInEnum(icon, ACTION_BUTTON_ICONS);
    isValueInEnum(variant, ACTION_BUTTON_VARIANTS);
  }, [variant, icon]);

  const getIconForVariant = (iconVariant: ACTION_BUTTON_ICONS) => {
    // TODO: Change below to some icons.includes(iconVariant);
    switch (iconVariant) {
      case ACTION_BUTTON_ICONS.CREATE:
        return <Plus className={classes.icon} />;
      case ACTION_BUTTON_ICONS.FOLDER:
        return <Folder className={classes.icon} />;
      case ACTION_BUTTON_ICONS.DOWNLOAD:
        return <Download className={classes.icon} />;
      case ACTION_BUTTON_ICONS.UPLOAD:
        return <Upload className={classes.icon} />;
      case ACTION_BUTTON_ICONS.SHARE:
        return <Share className={classes.icon} />;
      case ACTION_BUTTON_ICONS.GRID_ICON:
        return <GridIcon className={classes.icon} />;
      case ACTION_BUTTON_ICONS.SORTING_ICON:
        return <SortingIcon className={classes.icon} />;
      case ACTION_BUTTON_ICONS.LIST_ICON:
        return <ListIcon className={classes.icon} />;
      default:
        console.warn('Unknown variant', iconVariant);
        break;
    }
  };

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={() => onClickCallback()}
      disabled={isDisabled}
      className={`${classes.button} ${classes[variant]}`}
    >
      {getIconForVariant(icon)}
      {variant === ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT &&
        children && <span className={classes.text}>{children}</span>}
      {hasDropdownInitiator && (
        <ChevronDown
          className={`${classes.dropdownIndicator} ${
            isDropdownOpen ? classes.dropdownOpen : ''
          }`}
        />
      )}
      {label && <div className={classes.labelWrapper}>{label}</div>}
    </button>
  );
}

export default React.memo(BaseActionButton);
