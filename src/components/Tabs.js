import React, { useState } from "react";

const Tabs = ({ tabsData, className, noContentPadding }) => {
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

  // Function to handle tab click and set the active tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className={`${className} h-fit overflow-scrol`}>
      {/* Tabs navigation */}
      <div className=" bg-white dark:bg-gray-900   border-gray-200 dark:border-gray-700">
        <ul
          className={`grid grid-cols-${tabsData.length} -mb-px text-md font-medium text-center`}
          role="tablist"
        >
          {tabsData.map((tab) => (
            <li
              key={tab.id}
              className={` border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-700 border-b-blue-700 dark:text-purple-500 dark:border-b-purple-500"
                  : "text-black hover:text-gray-600 hover:border-b-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              role="presentation"
            >
              <button
                id={tab?.id}
                className={` text-md inline-block font-extrabold p-4  rounded-t-lg `}
                type="button"
                role="tab"
                aria-controls={tab.id}
                aria-selected={activeTab === tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tabs content */}
      <div
        className={noContentPadding ? "" : "p-5"}
        id="default-styled-tab-content"
      >
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={` dark:bg-gray-800 ${
              activeTab === tab.id ? "block" : "hidden"
            }`}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={tab.id}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
