import React, { useState } from "react";
import DarkModeSwitcher from "./DarkmodeSwitcher";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { TiLocationArrowOutline } from "react-icons/ti";
import { TbTemplate } from "react-icons/tb";
import { MdOutlineAccountBalance } from "react-icons/md";
import { logoutUser } from "../redux/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTemplate } from "react-icons/hi";
import { FaCogs, FaRegUser, FaUserAlt } from "react-icons/fa";

const SidebarWithNavbar = ({ component }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => dispatch(logoutUser(token));
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: <MdOutlineDashboard size={25} />,
    },
    {
      name: "Inbox",
      link: "/inbox",
      icon: <HiOutlineInboxArrowDown size={25} />,
    },
    {
      name: "Compaigns",
      link: "/compaigns",
      icon: <TiLocationArrowOutline size={25} />,
    },
    {
      name: "Templates",
      link: "/email-templates",
      icon: <TbTemplate size={25} />,
    },
    {
      name: "Sequences",
      link: "/sequences",
      icon: <HiOutlineTemplate size={25} />,
    },
    {
      name: "Email Accounts",
      link: "/accounts",
      icon: <MdOutlineAccountBalance size={25} />,
    },
    {
      name: "Account Settings",
      link: "/account-settings",
      icon: <FaCogs size={24} />,
    },
    // {
    //   name: "Sign out",
    //   link: "#",
    //   onClick: () => logout,
    //   icon: <PiSignOutBold size={25} />,
    // },
  ];
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Senderside
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <DarkModeSwitcher />

              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {user?.username}
                    </p>
                    <p
                      className=" font-medium text-gray-500 truncate dark:text-gray-300 text-xs"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    {sidebarItems?.map((item, index) => (
                      <li key={index}>
                        <Link
                          to={item?.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={logout}
                        className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg w-full"
                      >
                        <FaRegUser size={25} />
                        <span className="ms-3">Sign out</span>
                      </button>
                    </li>
                    {/* <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems?.map((item, index) => (
              <li key={index}>
                <Link
                  to={item?.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  role="menuitem"
                >
                  {item?.icon}
                  <span className="ms-3"> {item?.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg w-full"
              >
                <FaRegUser size={23} />
                <span className="ms-3">Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 h-screen overflow-scroll">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {component}
        </div>
      </div>
    </div>
  );
};

export default SidebarWithNavbar;
