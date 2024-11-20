import React, { useEffect, useState } from "react";
import DarkModeSwitcher from "./DarkmodeSwitcher";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineMarkEmailRead } from "react-icons/md";
import { TbTemplate } from "react-icons/tb";
import { logoutUser } from "../redux/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbLocationShare } from "react-icons/tb";
import { TbCalendarDollar } from "react-icons/tb";

import {
  FaCogs,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaRegUser,
  FaRegUserCircle,
} from "react-icons/fa";
import logo2 from "../assets/2.png";
import logo from "../assets/1.png";
import Dropdown from "./Dropdown";
const SidebarWithNavbar = ({ component }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const logout = () => dispatch(logoutUser(token));
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const setDarkModeFunc = (data) => {
    setDarkMode(data);
  };
  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/",
      icon: MdOutlineDashboard,
    },
    {
      name: "Common Box",
      link: "/common-box",
      icon: FaRegEnvelopeOpen,
    },
    {
      name: "Compaigns",
      link: "/compaigns",
      icon: TbLocationShare,
    },
    {
      name: "Templates",
      link: "/email-templates",
      icon: TbTemplate,
    },
    {
      name: "Sequences",
      link: "/sequences",
      icon: HiOutlineTemplate,
    },
    {
      name: "Email Accounts",
      link: "/accounts",
      icon: FaRegEnvelope,
    },
    {
      name: "Email Validation",
      link: "/email-validation",
      icon: MdOutlineMarkEmailRead,
    },
    // {
    //   name: "Lead Finder",
    //   link: "/lead-finder",
    //   icon: MdOutlineScreenSearchDesktop,
    // },
    // {
    //   name: "Drip Compaing",
    //   link: "/drip-compaign",
    //   icon: FaRegEnvelope,
    // },
    {
      name: "My Subscription",
      link: "/my-subscription",
      icon: TbCalendarDollar,
    },
    {
      name: "Account Settings",
      link: "/account-settings",
      icon: FaCogs,
    },
    // {
    //   name: "Account Settings",
    //   link: "/account-settings",
    //   icon: FaCogs size={24},
    // },
    // {
    //   name: "Sign out",
    //   link: "#",
    //   onClick: () => logout,
    //   icon: PiSignOutBold size={25},
    // },
  ];
  const menuData = {
    title: (
      <div className="mt-1 mx-1">
        <FaRegUserCircle size={32} />
      </div>
    ),
    menuItems: [
      {
        name: user?.username,
        icon: <FaRegUserCircle size={30} />,
        description: user?.email,
      },
      {
        name: "Sign out",
        icon: <FaRegUser />,
        onClick: logout,
      },
    ],
  };
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
              <Link to="/" className="flex ms-2 md:me-24">
                <img
                  src={darkMode ? logo : logo2}
                  className="h-12"
                  alt="Senderside Logo"
                />
                {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Senderside
                </span> */}
              </Link>
            </div>
            <div className="flex items-center">
              <DarkModeSwitcher setDarkModeFunc={setDarkModeFunc} />
              <Dropdown menuData={menuData} />
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
            {sidebarItems?.map((item, index) => {
              const Icon = item?.icon;

              return (
                <li
                  key={index}
                  className={`${
                    location?.pathname === item?.link &&
                    "bg-black dark:bg-gray-600 text-white p-1 shadow-lg"
                  }`}
                >
                  <Link
                    to={item?.link}
                    className="flex items-center p-2  rounded-lg dark:text-white dark:hover:bg-gray-700 group"
                    role="menuitem"
                  >
                    <Icon
                      color={
                        location?.pathname === item?.link ? "white" : "gray"
                      }
                      size={25}
                    />
                    <span className="ms-3"> {item?.name}</span>
                  </Link>
                </li>
              );
            })}
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
