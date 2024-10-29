import React from "react";
import Analystics from "./components/Analystics/Analystics";
import Leads from "./components/Leads/Leads";
import Tabs from "../../../../../components/Tabs";
import Shadule from "./components/Shedule/Shadule";
import Options from "./components/Options/Options";
const CompaignContent = () => {
  const tabsData = [
    {
      id: "analystics",
      label: "Analystics",
      content: <Analystics />,
    },
    {
      id: "leads",
      label: "Leads",
      content: <Leads />,
    },

    {
      id: "schedule",
      label: "Schedule",
      content: <Shadule />,
    },
    {
      id: "trigger",
      label: "Trigger Compaign",
      content: <Options />,
    },
  ];
  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default CompaignContent;
