// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import Content from "./DropdownComponents/Content";

// const Dropdown = ({ menuData }) => {
//   return (
//     <div className="relative">
//       <Menu>
//         <MenuButton>{menuData?.title}</MenuButton>
//         <MenuItems
//           anchor="bottom"
//           className={
//             " mt-5 bg-white dark:bg-gray-700 border min-w-48 gap-2 flex flex-col"
//           }
//         >
//           {Array.isArray(menuData?.menuItems) &&
//             menuData?.menuItems?.map((item, index) => (
//               <MenuItem>
//                 <Content item={item} />
//               </MenuItem>
//             ))}
//         </MenuItems>
//       </Menu>
//     </div>
//   );
// };
// export default Dropdown;
import { useEffect, useState } from "react";
import Content from "./DropdownComponents/Content";

const Dropdown = ({ menuData, isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleDropdown = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
    return () => {};
  }, [isOpen]);
  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="btn">
        {menuData?.title}
      </button>
      {open && (
        <div className="mt-4 bg-white border shadow rounded-xl dark:bg-gray-900 min-w-48 gap-2 flex flex-col absolute right-0 z-10">
          {Array.isArray(menuData?.menuItems) &&
            menuData.menuItems.map((item, index) => (
              <div key={index} className="dropdown-item">
                <Content item={item} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
