"use client";

import { Sidebar } from "flowbite-react";

import { TbLocationShare } from "react-icons/tb";
import Campaigns from "./Campaigns";

export function SidebarCom({ setCampaignData }) {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse
            icon={TbLocationShare}
            label="Campaigns"
            open={true}
            className="bg-white py-4 border-gray-300 shadow-lg px-2 hover:bg-gray-100"
          >
            <Campaigns setCampaignData={setCampaignData} />
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
