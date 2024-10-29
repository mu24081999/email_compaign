import React from "react";
import DashboardCard from "../../../../../../../components/DashboardCard";

const Analystics = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-6 gap-5">
        <DashboardCard heading={"Sent"} value={"12.5k"} />
        <DashboardCard heading={"Open"} value={"12.5k"} />
        <DashboardCard heading={"Unsubscribe"} value={"12.5k"} />
        <DashboardCard heading={"Sales"} value={"12.5k"} />
        <DashboardCard heading={"Click"} value={"12.5k"} />
        <DashboardCard heading={"Bounce"} value={"12.5k"} />
      </div>
    </div>
  );
};

export default Analystics;
