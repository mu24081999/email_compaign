import React from "react";
import DashboardCard from "../../../../../../../components/DashboardCard";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
  BsEnvelopeCheck,
  BsEnvelopeOpenHeart,
  BsEnvelopePlus,
  BsEnvelopeSlash,
} from "react-icons/bs";
const Analystics = ({ data }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-6 gap-5">
        <DashboardCard
          icon={<FaRegEnvelope color="blue" size={30} />}
          heading={"Total Emails"}
          value={0}
        />
        <DashboardCard
          icon={<BsEnvelopePlus color="gold" size={30} />}
          heading={"Email Sent"}
          value={0}
        />
        <DashboardCard
          icon={<BsEnvelopeCheck color="indigo" size={30} />}
          heading={"Emails Delievered"}
          value={0}
        />
        <DashboardCard
          icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
          heading={"Emails Opened"}
          value={0}
        />
        <DashboardCard
          icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
          heading={"Emails Clicked"}
          value={0}
        />
        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"Emails Bounce"}
          value={0}
        />
      </div>
    </div>
  );
};

export default Analystics;
