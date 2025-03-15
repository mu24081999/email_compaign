import React from "react";
import { useSelector } from "react-redux";

const Content = () => {
  const { activity } = useSelector((state) => state.user);
  console.log("🚀 ~ Content ~ activity:", activity);
  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Activity</h2>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          {activity?.id &&
            Object.entries(activity).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-gray-500">
                  {typeof value === "string"
                    ? new Date(value).toLocaleDateString()
                    : value}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
