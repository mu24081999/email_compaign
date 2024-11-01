import React from "react";
import Logo from "../assets/logo.png";
import DarkModeSwitcher from "./DarkmodeSwitcher";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/services/auth";
import Dropdown from "./Dropdown";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const logout = () => dispatch(logoutUser(token));

  const menuData = {
    title: (
      <FaUser size={36} className="border border-gray-600 p-1 rounded-full " />
    ),
    menuItems: [
      {
        name: "Profile",
        onClick: () => {},
      },
      {
        name: "Support",
        onClick: () => {},
      },
      {
        name: "Licence",
        onClick: () => {},
      },
      {
        name: "Settings",
        onClick: () => {},
      },
      {
        name: "Sign out",
        onClick: () => logout(),
      },
    ],
  };
  return (
    <nav className="bg-white  dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className=" max-w-screen-xl grid grid-cols-2   items-center mx-auto p-4 ">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
        </Link>
        <div class="flex justify-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center sm:col-span-2 lg:col-span-1 md:col-span-1 justify-between hidden md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <div>
            {" "}
            <p className="text-xl">Welcome, Amanda</p>
          </div>
          <div className="lg:flex  gap-5">
            <div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <div className="flex justify-between gap-5">
              <DarkModeSwitcher />
              <Dropdown menuData={menuData} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
