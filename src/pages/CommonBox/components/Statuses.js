// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserRepliesApi } from "../../../redux/services/unibox.";
// import Heading from "../../../components/Heading";

// const Statuses = () => {
//   const dispatch = useDispatch();
//   const { token, user_id } = useSelector((state) => state.auth);
//   const getReplies = () => {
//     dispatch(getUserRepliesApi(token, user_id));
//   };
//   return (
//     <div>
//       <div>
//         <ul className="font-semibold text-sm ps-5 py-2 space-y-2">
//           <li
//             className="list-item list-disc cursor-pointer hover:text-gray-300 transition-colors duration-200"
//             onClick={() => getReplies()}
//           >
//             Sent
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Statuses;
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
