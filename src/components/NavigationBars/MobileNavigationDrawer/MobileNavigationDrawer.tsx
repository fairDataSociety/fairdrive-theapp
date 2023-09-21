import Drawer from '@components/Dialogs/Drawer/Drawer';
import NavigationItems from '../MainSideBar/NavigationItems';

interface MobileNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileNavigationDrawer = ({
  open,
  onClose,
}: MobileNavigationDrawerProps) => {
  return (
    <Drawer className="w-44" open={open} onClose={onClose}>
      <div className="flex flex-col">
        <NavigationItems
          className="flex h-20"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          driveSideBarToggle={() => {}}
          onOptionClick={onClose}
        />
      </div>
    </Drawer>
  );
};

export default MobileNavigationDrawer;
