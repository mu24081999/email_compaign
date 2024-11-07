import React from "react";
import DashboardCard from "../../../../../../../components/DashboardCard";

const Analystics = ({ data }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-5">
        <DashboardCard heading={"Sent"} value={data?.sent} />
        <DashboardCard heading={"Open"} value={data?.opens} />
        <DashboardCard heading={"Bounce"} value={data?.bounce} />
        <DashboardCard heading={"Leads"} value={data?.bounce} />
      </div>
    </div>
  );
};

export default Analystics;
