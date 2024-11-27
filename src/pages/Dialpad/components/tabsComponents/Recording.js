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
    recording: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Example recording URL
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "+987 654 3210",
    type: "outgoing",
    time: "Yesterday, 4:20 PM",
    recording: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    name: "Mark Wilson",
    phoneNumber: "+555 123 4567",
    type: "missed",
    time: "Today, 8:45 AM",
    recording: null, // Missed call, no recording
  },
  {
    id: 4,
    name: "Emily Johnson",
    phoneNumber: "+321 654 0987",
    type: "incoming",
    time: "3 Days Ago, 9:30 PM",
    recording: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const Recordings = () => {
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
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4">
      <ul>
        {callLogs.map((log) => (
          <li
            key={log.id}
            className="flex flex-col gap-2 py-4 border-b hover:bg-gray-50"
          >
            {/* Call Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getIcon(log.type)}</div>
                <div>
                  <h2 className="font-medium text-gray-800">{log.name}</h2>
                  <p className="text-sm text-gray-500">{log.phoneNumber}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{log.time}</p>
            </div>

            {/* Recording Section */}
            {log.recording ? (
              <div className="mt-2">
                <audio
                  controls
                  className="w-full rounded-lg border border-gray-200"
                >
                  <source src={log.recording} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No recording available
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recordings;
