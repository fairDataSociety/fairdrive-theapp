import { useState } from 'react';

import ConnectDropdownToggele from './ConnectDropdownToggle';
import ConnectDropdownMenu from './ConnectDropdownMenu';

const ConnectDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="relative flex cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <ConnectDropdownToggele onClickHandler={handleToggleDropdown} />

      <ConnectDropdownMenu
        showDropdown={showDropdown}
        onClose={() => setShowDropdown(false)}
      />
    </div>
  );
};

export default ConnectDropdown;
