import React from "react";
import Heading from "./Heading";

const DashboardCard = ({ heading, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 p-5 rounded-xl">
      <Heading text={heading} level={1} color="gray" align="center" />
      <Heading
        text={value}
        level={1}
        color="black"
        align="center"
        className=" font-sans text-3xl font-extrabold"
      />
    </div>
  );
};

export default DashboardCard;
