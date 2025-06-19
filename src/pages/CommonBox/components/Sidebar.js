// "use client";

// import { Sidebar } from "flowbite-react";

// import { TbLocationShare } from "react-icons/tb";
// import Campaigns from "./Campaigns";
// import Statuses from "./Statuses";
// import "./style.css";

// const SidebarCom = ({ setCampaignData }) => {
//   return (
//     <div>
//       <Sidebar className="h-[79vh]" id="sidebar_main">
//         <Sidebar.Items className="">
//           <Sidebar.ItemGroup>
//             <Sidebar.Collapse
//               icon={TbLocationShare}
//               label="Campaigns"
//               open={false}
//               className="bg-white dark:bg-gray-700 py-4 border-gray-300  px-2 hover:bg-gray-100"
//             >
//               <Campaigns setCampaignData={setCampaignData} />
//             </Sidebar.Collapse>
//             <Sidebar.Collapse
//               icon={TbLocationShare}
//               label="Statuses"
//               open={false}
//               className="bg-white dark:bg-gray-700 py-4 border-gray-300 px-2 hover:bg-gray-100"
//             >
//               <Statuses setCampaignData={setCampaignData} />
//             </Sidebar.Collapse>
//           </Sidebar.ItemGroup>
//         </Sidebar.Items>
//       </Sidebar>
//     </div>
//   );
// };
// export default SidebarCom;
"use client";

import { Sidebar } from "flowbite-react";
import { TbLocationShare } from "react-icons/tb";
import Campaigns from "./Campaigns";
import Statuses from "./Statuses";
import "./style.css";

const SidebarCom = ({ setCampaignData }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full">
      <Sidebar className="h-full" id="sidebar_main">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              icon={TbLocationShare}
              label="Campaigns"
              open={false}
              className="bg-white dark:bg-gray-800 py-4 px-2 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <Campaigns setCampaignData={setCampaignData} />
            </Sidebar.Collapse>
            <Sidebar.Collapse
              icon={TbLocationShare}
              label="Statuses"
              open={false}
              className="bg-white dark:bg-gray-800 py-4 px-2 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <Statuses setCampaignData={setCampaignData} />
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarCom;
