import React from "react";
import { useSelector } from "react-redux";

// const callLogs = [
//   {
//     id: 1,
//     phoneNumber: "+123 456 7890",
//     duration: "2 mins",
//     type: "incoming", // incoming, outgoing, missed
//     time: "Today, 10:15 AM",
//   },
//   {
//     id: 2,
//     duration: "2 mins",
//     phoneNumber: "+987 654 3210",
//     type: "outgoing",
//     time: "Yesterday, 4:20 PM",
//   },
//   {
//     id: 3,
//     duration: "34 secs",
//     phoneNumber: "+555 123 4567",
//     type: "missed",
//     time: "Today, 8:45 AM",
//   },
//   {
//     id: 4,
//     phoneNumber: "+321 654 0987",
//     type: "incoming",
//     duration: "2 mins",
//     time: "3 Days Ago, 9:30 PM",
//   },
// ];

const CallLogs = ({
  calls,
  isLoading,
  getRelativeTime,
  SidebarSkeleton,
  FaRegUser,
  MdOutlineCallMissed,
  user,
}) => {
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

  return (
    <div className="w-full h-[78vh] overflow-y-scroll overflow-x-hidden">
      {isLoading ? (
        <SidebarSkeleton />
      ) : (
        <ul className="p-0">
          {calls?.map((log) => (
            <li
              key={log.id}
              className="flex items-center justify-between border-b hover:bg-gray-50 p-5"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-200 rounded-full p-3">
                  {getIcon(
                    log?.from === user?.twilio_selected_number
                      ? "outgoing"
                      : "incoming"
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg">
                    {log?.from === user?.twilio_selected_number
                      ? log?.to
                      : log?.from}{" "}
                  </h2>
                  <p className="text-sm text-gray-500">{log.duration}s</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {" "}
                {getRelativeTime(log.startTime)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CallLogs;
