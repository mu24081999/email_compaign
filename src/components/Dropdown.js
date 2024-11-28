import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Content from "./DropdownComponents/Content";

const Dropdown = ({ menuData }) => {
  return (
    <div className="relative">
      <Menu>
        <MenuButton>{menuData?.title}</MenuButton>
        <MenuItems
          anchor="bottom"
          className={
            " mt-5 bg-white dark:bg-gray-700 border min-w-48 gap-2 flex flex-col"
          }
        >
          {Array.isArray(menuData?.menuItems) &&
            menuData?.menuItems?.map((item, index) => (
              <MenuItem>
                <Content item={item} />
              </MenuItem>
            ))}
        </MenuItems>
      </Menu>
    </div>
  );
};
export default Dropdown;
