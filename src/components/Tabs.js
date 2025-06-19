// import React, { useEffect, useState } from "react";

// const Tabs = ({
//   tabsData,
//   className,
//   noContentPadding,
//   activeTabId,
//   noPadding,
//   headerSize,
// }) => {
//   // State to track the currently active tab
//   const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

//   // Function to handle tab click and set the active tab
//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
//   };
//   useEffect(() => {
//     if (activeTabId) {
//       setActiveTab(activeTabId);
//     }
//     return () => {};
//   }, [activeTabId]);
//   return (
//     <div className={`${className} h-fit overflow-scrol`}>
//       {/* Tabs navigation */}
//       <div className=" bg-white dark:bg-gray-900   border-gray-200 dark:border-gray-700">
//         <ul
//           className={`grid grid-cols-${tabsData.length} -mb-px text-md font-medium text-center`}
//           role="tablist"
//         >
//           {tabsData.map((tab) => (
//             <li
//               key={tab.id}
//               className={` border-b-2 ${
//                 activeTab === tab.id
//                   ? "text-blue-700 border-b-blue-700 dark:text-purple-500 dark:border-b-purple-500"
//                   : "text-black hover:text-gray-600 hover:border-b-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
//               }`}
//               role="presentation"
//             >
//               <button
//                 id={tab?.id}
//                 className={` text-${
//                   headerSize ? headerSize : "lg"
//                 } inline-block p-4  rounded-t-lg `}
//                 type="button"
//                 role="tab"
//                 aria-controls={tab.id}
//                 aria-selected={activeTab === tab.id}
//                 onClick={() => handleTabClick(tab.id)}
//               >
//                 {tab.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Tabs content */}
//       <div
//         className={noContentPadding ? "" : "p-5"}
//         id="default-styled-tab-content"
//       >
//         {tabsData.map((tab) => (
//           <div
//             key={tab.id}
//             className={` dark:bg-gray-800 ${
//               activeTab === tab.id ? "block" : "hidden"
//             }`}
//             id={tab.id}
//             role="tabpanel"
//             aria-labelledby={tab.id}
//           >
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {tab.content}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tabs;
import React, { useEffect, useState } from "react";

const Tabs = ({
  tabsData,
  className = "",
  noContentPadding = false,
  activeTabId,
  noPadding = false,
  headerSize = "lg",
}) => {
  const [activeTab, setActiveTab] = useState(tabsData[0]?.id || "");

  useEffect(() => {
    if (activeTabId) setActiveTab(activeTabId);
  }, [activeTabId]);

  const handleTabClick = (tabId) => setActiveTab(tabId);

  return (
    <div className={`${className} w-full`}>
      {/* Tab Headers */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-t-xl shadow-sm">
        <ul
          className={`flex flex-wrap justify-start text-sm sm:text-md font-medium text-center`}
          role="tablist"
        >
          {tabsData.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                id={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`inline-block px-4 py-2 rounded-t-lg transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600 dark:text-purple-400 dark:border-purple-400"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                } text-${headerSize}`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div
        className={`${
          noContentPadding ? "" : "p-4"
        } rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-800`}
      >
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            role="tabpanel"
            aria-labelledby={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {typeof tab.content === "string" ? (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tab.content}
              </p>
            ) : (
              tab.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
