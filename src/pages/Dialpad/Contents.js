import React, { useEffect } from "react";
// import TabsComponent from "./components/Tabs/Tabs";
import Dialpad from "./components/Dialpad";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCallLogsApi } from "../../redux/services/twilio";
import SidebarSkeleton from "../../components/SidebarSkeleton";
import { MdOutlineCallMissed } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Button from "../../components/Button";

const Contents = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { callLogs, isLoading } = useSelector((state) => state.twilio);
  const dispatch = useDispatch();
  useEffect(() => {
    const accountSid = user.accountSid;
    const authToken = user.authToken;
    const params = {
      accountSid,
      authToken,
    };
    dispatch(getCallLogsApi(token, params));
    return () => {};
  }, [token, user, dispatch]);
  function getRelativeTime(dateString) {
    const date = new Date(dateString); // Convert the date key to a Date object
    const now = new Date();

    const diffInMs = now - date; // Difference in milliseconds
    const diffInMinutes = Math.round(diffInMs / (1000 * 60)); // Convert to minutes

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minute");
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.round(diffInMinutes / 60);
      return rtf.format(-diffInHours, "hour");
    } else {
      const diffInDays = Math.round(diffInMinutes / 1440);
      return rtf.format(-diffInDays, "day");
    }
  }
  const handlePageChange = (token) => {
    const accountSid = user.accountSid;
    const authToken = user.authToken;
    const params = {
      accountSid,
      authToken,
    };
    const query = `pageSize=10&pageToken=${token}`;
    dispatch(getCallLogsApi(token, params, query));
  };
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1  ">
        <div className="bg-white border">
          <Sidebar
            calls={callLogs?.calls}
            isLoading={isLoading}
            getRelativeTime={getRelativeTime}
            SidebarSkeleton={SidebarSkeleton}
            FaRegUser={FaRegUser}
            MdOutlineCallMissed={MdOutlineCallMissed}
            user={user}
          />
          <div className="flex justify-between items-center py-2 px-5">
            <Button
              loading={isLoading}
              onClick={() => handlePageChange(callLogs?.previousPageToken)}
              disabled={callLogs?.previousPageToken === null ? true : false}
              className="px-4 py-2 bg-black text-white  disabled:bg-gray-300 rounded-full"
            >
              Back
            </Button>

            <Button
              loading={isLoading}
              onClick={() => handlePageChange(callLogs?.nextPageToken)}
              disabled={callLogs?.nextPageToken === null ? true : false}
              className="px-4 py-2 rounded-full bg-cyan-500 text-white  disabled:bg-gray-300"
            >
              Next
            </Button>
          </div>
        </div>
        <div className="col-span-2">
          <Dialpad isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Contents;
