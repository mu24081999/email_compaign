import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
                <button
                  className=" dark:text-gray-300 text-left data-[focus]:bg-blue-100 p-3 "
                  onClick={item?.onClick}
                >
                  <div className="flex gap-2">
                    <span className="mt-1"> {item?.icon}</span>

                    <div className="flex flex-col">
                      <span> {item?.name}</span>
                      {item?.description && (
                        <span className="text-xs">{item?.description}</span>
                      )}
                    </div>
                  </div>
                </button>
              </MenuItem>
            ))}
        </MenuItems>
      </Menu>
    </div>
  );
};
export default Dropdown;
