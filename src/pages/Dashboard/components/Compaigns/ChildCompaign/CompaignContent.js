import React, { useEffect, useState } from "react";
import Analystics from "./components/Analystics/Analystics";
import Leads from "./components/Leads/Leads";
import Tabs from "../../../../../components/Tabs";
import Shadule from "./components/Shedule/Shadule";
import Options from "./components/Options/Options";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  compaignAnalytics,
  pauseCompaignRec,
  resumeCompaignRec,
} from "../../../../../redux/services/compaign";
import Button from "../../../../../components/Button";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";

const CompaignContent = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeTabId, setActiveTabId] = useState(null);
  const location = useLocation(); // Access the current location object

  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirected = searchParams.get("redirected"); // Get "redirected" from "?redirected=true"

  const { token, user_id } = useSelector((state) => state.auth);
  const {
    compaignAnalytics: analystics,
    compaign,
    isLoading,
  } = useSelector((state) => state.compaign);
  const setActiveTabId_ = (id) => {
    setActiveTabId(id);
  };
  const tabsData = [
    {
      id: "analytics",
      label: "Analytics",
      content: (
        <Analystics
          data={analystics}
          loading={isLoading}
          token={token}
          id={id}
          dispatch={dispatch}
        />
      ),
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
      label: "Trigger Campaign",
      content: <Options setActiveTabId_={setActiveTabId_} />,
    },
  ];
  const pauseCompaign = () => {
    const params = {
      compaign_id: id,
      user_id: user_id,
    };
    dispatch(pauseCompaignRec(token, params));
  };
  const resumeCompaign = () => {
    const params = {
      compaign_id: id,
      user_id: user_id,
    };
    dispatch(resumeCompaignRec(token, params));
  };
  useEffect(() => {
    dispatch(compaignAnalytics(token, id));
  }, [token, id, dispatch]);
  useEffect(() => {
    if (redirected) {
      setActiveTabId("leads");
    }
  }, [redirected]);
  return (
    <div>
      <div className="float-end px-8">
        {compaign?.status === "paused" ? (
          <Button
            className="flex gap-2 py-2 mt-1  bg-green-500 hover:bg-green-600"
            onClick={resumeCompaign}
          >
            <span className="mt-1">
              <CiPlay1 />
            </span>
            <span>Resume Compaign</span>
          </Button>
        ) : (
          compaign?.status === "sending" && (
            <Button
              className="flex gap-2 py-2 mt-1 bg-black hover:bg-gray-800"
              onClick={pauseCompaign}
            >
              <span className="mt-1">
                <CiPause1 />
              </span>
              <span>Pause Campaign</span>
            </Button>
          )
        )}
      </div>
      <Tabs tabsData={tabsData} activeTabId={activeTabId} />
    </div>
  );
};

export default CompaignContent;
