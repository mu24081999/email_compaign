"use client";

import { Sidebar } from "flowbite-react";

import { TbLocationShare } from "react-icons/tb";
import Campaigns from "./Campaigns";
import Statuses from "./Statuses";

export function SidebarCom({ setCampaignData }) {
  return (
    <>
      <Sidebar className="h-[79vh]">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              icon={TbLocationShare}
              label="Campaigns"
              open={false}
              className="bg-white dark:bg-gray-700 py-4 border-gray-300 shadow-lg px-2 hover:bg-gray-100"
            >
              <Campaigns setCampaignData={setCampaignData} />
            </Sidebar.Collapse>
            <Sidebar.Collapse
              icon={TbLocationShare}
              label="Statuses"
              open={false}
              className="bg-white dark:bg-gray-700 py-4 border-gray-300 shadow-lg px-2 hover:bg-gray-100"
            >
              <Statuses setCampaignData={setCampaignData} />
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
