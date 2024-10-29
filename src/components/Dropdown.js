import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Dropdown = ({ menuData }) => {
  return (
    <Menu>
      <MenuButton>{menuData?.title}</MenuButton>
      <MenuItems
        anchor="bottom"
        className={
          "mt-5 bg-white dark:bg-gray-700 border border-gray-400 min-w-48 p-2 rounded-b-xl gap-2 flex flex-col shadow-lg"
        }
      >
        {Array.isArray(menuData?.menuItems) &&
          menuData?.menuItems?.map((item, index) => (
            <MenuItem>
              <button
                className="block dark:text-gray-300 text-left data-[focus]:bg-blue-100 p-3 rounded-xl"
                onClick={item?.onClick}
              >
                {item?.name}
              </button>
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
};
export default Dropdown;
