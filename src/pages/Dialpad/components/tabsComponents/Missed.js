import React from "react";
import {
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhoneMissed,
} from "react-icons/fi";

const callLogs = [
  {
    id: 1,
    name: "John Doe",
    phoneNumber: "+123 456 7890",
    type: "incoming", // incoming, outgoing, missed
    time: "Today, 10:15 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "+987 654 3210",
    type: "outgoing",
    time: "Yesterday, 4:20 PM",
  },
  {
    id: 3,
    name: "Mark Wilson",
    phoneNumber: "+555 123 4567",
    type: "missed",
    time: "Today, 8:45 AM",
  },
  {
    id: 4,
    name: "Emily Johnson",
    phoneNumber: "+321 654 0987",
    type: "incoming",
    time: "3 Days Ago, 9:30 PM",
  },
];

const Missed = () => {
  const getIcon = (type) => {
    switch (type) {
      case "incoming":
        return <FiPhoneIncoming className="text-green-500" />;
      case "outgoing":
        return <FiPhoneOutgoing className="text-blue-500" />;
      case "missed":
        return <FiPhoneMissed className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto h-[75vh] rounded-lg shadow-lg">
      <ul className="p-0">
        {callLogs.map((log) => (
          <li
            key={log.id}
            className="flex items-center justify-between border-b hover:bg-gray-50 p-5"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getIcon(log.type)}</div>
              <div>
                <h2 className="font-medium text-gray-800">{log.name}</h2>
                <p className="text-sm text-gray-500">{log.phoneNumber}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{log.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Missed;
