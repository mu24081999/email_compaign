import React from "react";
import Tabs from "../../../components/Tabs";
import CallLogs from "./tabsComponents/CallLogs";
import Missed from "./tabsComponents/Missed";
import Recordings from "./tabsComponents/Recording";

const Sidebar = () => {
  const tabsData = [
    {
      id: "logs",
      label: "Calls",
      content: <CallLogs />,
    },
    {
      id: "missed",
      label: "Missed ",
      content: <Missed />,
    },
    {
      id: "recordings",
      label: "Recordings",
      content: <Recordings />,
    },
  ];
  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default Sidebar;
