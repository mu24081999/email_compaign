import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineCallMissed } from "react-icons/md";

const Missed = ({
  calls,
  isLoading,
  getRelativeTime,
  SidebarSkeleton,
  FaRegUser,
  MdOutlineCallMissed,
  user,
}) => {
  const [filteredData, setFilterData] = useState([]);
  const getIcon = (type) => {
    switch (type) {
      case "incoming":
        return <FaRegUser className="text-black" />;
      case "outgoing":
        return <FaRegUser className="text-blue-500" />;
      case "missed":
        return <MdOutlineCallMissed className="text-red-500" />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (calls?.length > 0) {
      const data = calls?.filter((call) => call.status === "no-answer");
      console.log("🚀 ~ useEffect ~ data:", data);
      setFilterData(data);
    }
  }, [calls]);
  return (
    <div className="w-full h-[78vh] overflow-y-scroll overflow-x-hidden">
      <ul className="p-0">
        {filteredData?.map((log) => (
          <li
            key={log.id}
            className="flex items-center justify-between border-b hover:bg-gray-50 p-5"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl bg-gray-200 rounded-full p-3">
                {getIcon("missed")}{" "}
              </div>
              <div>
                <h2 className="font-bold text-lg ">
                  {log?.from === user?.twilio_selected_number
                    ? log?.to
                    : log?.from}{" "}
                </h2>
                <p className="text-sm text-gray-500">{log.duration}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {" "}
              {getRelativeTime(log.startTime)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Missed;
