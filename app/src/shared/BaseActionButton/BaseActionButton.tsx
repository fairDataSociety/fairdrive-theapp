import React, { useContext, useEffect, useState } from 'react';
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
  Trash,
  InfoIcon,
} from 'src/components/icons/icons';

export enum ACTION_BUTTON_VARIANTS {
  NAVBAR = 'navbar',
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
  TRASH = 'trash',
  INFO_ICON = 'info_icon',
}

export enum ACTION_FONT_SIZE {
  REGULAR = 'font_regular',
  BIG = 'font_big',
}

export interface Props {
  icon?: ACTION_BUTTON_ICONS;
  variant: ACTION_BUTTON_VARIANTS;
  hasDropdownInitiator?: boolean;
  showDropdownInitiatorOnHover?: boolean;
  isDropdownOpen?: boolean;
  children?: string;
  label?: string;
  isSubmit?: boolean;
  isDisabled?: boolean;
  onClickCallback?: () => void;
  fontSize?: ACTION_FONT_SIZE;
}

function BaseActionButton(props: Props): JSX.Element {
  const {
    icon,
    variant,
    onClickCallback,
    isDisabled,
    hasDropdownInitiator,
    showDropdownInitiatorOnHover,
    isDropdownOpen,
    fontSize,
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
    if (icon) {
      isValueInEnum(icon, ACTION_BUTTON_ICONS);
    }
    if (fontSize) {
      isValueInEnum(fontSize, ACTION_FONT_SIZE);
    }

    isValueInEnum(variant, ACTION_BUTTON_VARIANTS);
  }, [variant, icon, fontSize]);

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
      case ACTION_BUTTON_ICONS.TRASH:
        return <Trash className={classes.icon} />;
      case ACTION_BUTTON_ICONS.INFO_ICON:
        return <InfoIcon className={classes.icon} />;
      default:
        console.warn('Unknown variant', iconVariant);
        break;
    }
  };

  const [isDropdownInitiatorHovered, setIsDropdownInitiatorHovered] =
    useState(true);

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={() => onClickCallback()}
      disabled={isDisabled}
      className={`${classes.button} ${classes[variant]} `}
      onMouseOver={() =>
        showDropdownInitiatorOnHover &&
        !isDropdownInitiatorHovered &&
        setIsDropdownInitiatorHovered(true)
      }
      onMouseOut={() =>
        showDropdownInitiatorOnHover &&
        isDropdownInitiatorHovered &&
        setIsDropdownInitiatorHovered(false)
      }
    >
      {icon && getIconForVariant(icon)}
      {variant !== ACTION_BUTTON_VARIANTS.ACTION_OUTLINED_WITHOUT_TEXT &&
        children && (
          <span
            className={`${classes.text} ${fontSize ? classes[fontSize] : ''}`}
          >
            {children}
          </span>
        )}
      {hasDropdownInitiator && isDropdownInitiatorHovered && (
        <ChevronDown
          className={`
          ${classes.dropdownIndicator} 
          ${isDropdownOpen ? classes.dropdownOpen : ''}
          `}
        />
      )}
      {label && <div className={classes.labelWrapper}>{label}</div>}
    </button>
  );
}

export default React.memo(BaseActionButton);
