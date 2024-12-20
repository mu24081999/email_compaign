import React, { useEffect, useState } from "react";
import DarkModeSwitcher from "./DarkmodeSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdCall,
  MdOutlineDashboard,
  MdOutlineSms,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { TbTemplate } from "react-icons/tb";
import { logoutUser } from "../redux/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineTemplate } from "react-icons/hi";
import { TbLocationShare } from "react-icons/tb";
import { TbCalendarDollar } from "react-icons/tb";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCogs,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaRegUserCircle,
  FaRocketchat,
} from "react-icons/fa";
import logo2 from "../assets/2.png";
import logo from "../assets/1.png";
import logo3 from "../assets/3.png";
import logo4 from "../assets/4.png";
import Dropdown from "./Dropdown";
import { IoKeypadOutline, IoWalletOutline } from "react-icons/io5";
import useMain from "../context/Main/useMain";
import Dialer from "../pages/Dialpad/components/DialpadComponents/Dialer";
import { PiSignOutBold } from "react-icons/pi";
import { RiContactsBook3Line } from "react-icons/ri";
import useCalling from "../context/CallingContext/useCalling";
import { GrValidate } from "react-icons/gr";
import { GiSecretBook } from "react-icons/gi";

const SidebarWithNavbar = ({ component }) => {
  const { incoming } = useCalling();
  const navigateTo = useNavigate();
  const { isCollapsed, setIsCollapsed_ } = useMain();

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
  const navigate = (link) => {
    navigateTo(link);
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
      name: "Email Campaigns",
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
      icon: GrValidate,
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
      name: "Dialpad",
      link: "/dialpad",
      icon: IoKeypadOutline,
    },
    {
      name: "SMS Campaigns",
      link: "/sms",
      icon: MdOutlineSms,
    },
    {
      name: "Conversations",
      link: "/sms-conversation",
      icon: FaRocketchat,
    },
    {
      name: "A2P Verification",
      link: "/a2p-verification",
      icon: MdOutlineVerifiedUser,
    },
    {
      name: "Phone Numbers",
      link: "/phone-numbers",
      icon: RiContactsBook3Line,
    },
    {
      name: "My Subscription",
      link: "/my-subscription",
      icon: TbCalendarDollar,
    },
    {
      name: "Wallet",
      link: "/wallet",
      icon: IoWalletOutline,
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
      <div className="mt-1">
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
        name: "Privacy Policy",
        type: "button",
        onClick: () => navigateTo("/privacy-policy"),
        icon: <GiSecretBook size={25} />,
      },
      {
        name: "Logout",
        type: "button",
        onClick: logout,
        icon: <PiSignOutBold size={25} />,
      },
    ],
  };
  const dialpadMenuData = {
    title: (
      <div
        className={`mt-1 mx-1 bg-green-500 p-2 rounded-full ${
          incoming ? "animate-bounce" : ""
        }`}
      >
        <MdCall size={19} color="white" />
      </div>
    ),
    menuItems: [
      {
        type: "content",
        content: <Dialer />,
      },
    ],
  };
  const handleCollapsed = () => {
    setIsCollapsed_(!isCollapsed);
  };
  useEffect(() => {
    if (window.innerWidth <= 650) {
      setIsCollapsed_(true);
    }
  }, []);
  return (
    <div className="w-full">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center justify-between rtl:justify-end transition-all duration-500 ease-in-out sm:translate-x-0`}
              style={{
                width: isCollapsed ? "6rem" : "16rem", // Dynamic width for smooth transitions
              }}
            >
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  sm:translate-x-0"
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

              <Link to="/" className="flex ms-2">
                {isCollapsed ? (
                  <img
                    src={darkMode ? logo4 : logo3}
                    className="h-12"
                    alt="Senderside Logo"
                  />
                ) : (
                  <img
                    src={darkMode ? logo : logo2}
                    className="h-12"
                    alt="Senderside Logo"
                  />
                )}
              </Link>
              {window.innerWidth >= 650 && (
                <span className="float-end border p-1 rounded border-gray-800 bg-black ms-3">
                  {isCollapsed ? (
                    <FaArrowRight
                      color="white"
                      size={18}
                      onClick={handleCollapsed}
                    />
                  ) : (
                    <FaArrowLeft
                      color="white"
                      size={18}
                      onClick={handleCollapsed}
                    />
                  )}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <DarkModeSwitcher setDarkModeFunc={setDarkModeFunc} />
              <Dropdown
                menuData={dialpadMenuData}
                isOpen={incoming ? true : false}
              />
              <Dropdown menuData={menuData} />
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        style={{
          width: isCollapsed ? "4.5rem" : "16rem", // Dynamic width for smooth transitions
        }}
        className={`fixed top-0 left-0 z-40 ${
          isCollapsed ? "w-18" : "w-64"
        } h-screen pt-20 transition-all duration-500 ease-in-out sm:translate-x-0 bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems?.map((item, index) => {
              const Icon = item?.icon;

              return (
                <li
                  key={index}
                  className={`${
                    location?.pathname === item?.link &&
                    "bg-black  dark:bg-gray-600 text-white p-1 shadow-lg"
                  } px-3 `}
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
                    {!isCollapsed && (
                      <span className="ms-3"> {item?.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div
        className={` top-3 left-0 z-40 ${
          !isCollapsed ? "ml-64" : "ml-20"
        } p-3  h-screen overflow-scroll`}
      >
        <div className="p-4 rounded-lg  mt-14">{component}</div>
      </div>
    </div>
  );
};

export default SidebarWithNavbar;
