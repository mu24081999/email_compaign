import React from "react";
import Heading from "./Heading";

const DashboardCard = ({ heading, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 p-5 rounded-xl">
      <div className="flex justify-center">{icon && icon}</div>
      <Heading
        text={value}
        level={1}
        color="black"
        align="center"
        className=" font-sans text-3xl font-extrabold"
      />
      <Heading
        text={heading}
        level={1}
        color="gray"
        align="center"
        className="text-xs"
      />
    </div>
  );
};

export default DashboardCard;
