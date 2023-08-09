import LanguageDropdownMenu from './LanguageDropdownMenu';
import LanguageDropdownToggle from './LanguageDropdownToggle';
import { Menu } from '@headlessui/react';

function LanguageDropdown() {
  return (
    <Menu as="div" className="relative flex cursor-default">
      {({ open }) => (
        <>
          <LanguageDropdownToggle open={open} />

          <LanguageDropdownMenu />
        </>
      )}
    </Menu>
  );
}

export default LanguageDropdown;
