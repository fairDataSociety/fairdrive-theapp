import { useState } from 'react';

import PodDropdownToggele from './PodDropdownToggle';
import PodDropdownMenu from './PodDropdownMenu';

const PodDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="relative flex cursor-default"
      onClick={(event) => event.stopPropagation()}
    >
      <PodDropdownToggele onClickHandler={handleToggleDropdown} />

      <PodDropdownMenu
        showDropdown={showDropdown}
        onClose={() => setShowDropdown(false)}
      />
    </div>
  );
};

export default PodDropdown;
