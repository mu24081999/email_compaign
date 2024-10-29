import React, { useState } from "react";

const Tabs = ({ tabsData }) => {
  // State to track the currently active tab
  const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

  // Function to handle tab click and set the active tab
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="h-screen overflow-scrol">
      {/* Tabs navigation */}
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabsData.map((tab) => (
            <li key={tab.id} className="me-2" role="presentation">
              <button
                id={tab?.id}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? "text-blue-700 border-blue-700 dark:text-purple-500 dark:border-purple-500"
                    : "text-black hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
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
      <div id="default-styled-tab-content">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`  p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
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
