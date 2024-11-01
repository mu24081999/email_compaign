import React, { useEffect } from "react";
import Analystics from "./components/Analystics/Analystics";
import Leads from "./components/Leads/Leads";
import Tabs from "../../../../../components/Tabs";
import Shadule from "./components/Shedule/Shadule";
import Options from "./components/Options/Options";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { compaignAnalytics } from "../../../../../redux/services/compaign";
const CompaignContent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { compaignAnalytics: analystics } = useSelector(
    (state) => state.compaign
  );
  console.log("🚀 ~ CompaignContent ~ analystics:", analystics);
  const tabsData = [
    {
      id: "analystics",
      label: "Analystics",
      content: <Analystics data={analystics} />,
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
  useEffect(() => {
    dispatch(compaignAnalytics(token, id));
  }, [token, id, dispatch]);
  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default CompaignContent;
