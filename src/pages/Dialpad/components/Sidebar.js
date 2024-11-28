import React from "react";
import Tabs from "../../../components/Tabs";
import CallLogs from "./tabsComponents/CallLogs";
import Missed from "./tabsComponents/Missed";
import Recordings from "./tabsComponents/Recording";

const Sidebar = ({
  calls,
  isLoading,
  getRelativeTime,
  SidebarSkeleton,
  FaRegUser,
  MdOutlineCallMissed,
  user,
}) => {
  const tabsData = [
    {
      id: "logs",
      label: "Calls",
      content: (
        <CallLogs
          calls={calls}
          isLoading={isLoading}
          getRelativeTime={getRelativeTime}
          SidebarSkeleton={SidebarSkeleton}
          FaRegUser={FaRegUser}
          MdOutlineCallMissed={MdOutlineCallMissed}
          user={user}
        />
      ),
    },
    {
      id: "missed",
      label: "Missed ",
      content: (
        <Missed
          calls={calls}
          isLoading={isLoading}
          getRelativeTime={getRelativeTime}
          SidebarSkeleton={SidebarSkeleton}
          FaRegUser={FaRegUser}
          MdOutlineCallMissed={MdOutlineCallMissed}
          user={user}
        />
      ),
    },
    {
      id: "recordings",
      label: "Recordings",
      content: (
        <Recordings
          calls={calls}
          isLoading={isLoading}
          getRelativeTime={getRelativeTime}
          SidebarSkeleton={SidebarSkeleton}
          FaRegUser={FaRegUser}
          MdOutlineCallMissed={MdOutlineCallMissed}
          user={user}
        />
      ),
    },
  ];
  return (
    <div>
      <Tabs
        noContentPadding={true}
        tabsData={tabsData}
        className={"bg-white border"}
      />
    </div>
  );
};

export default Sidebar;
