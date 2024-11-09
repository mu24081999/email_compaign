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
          value={data?.leads}
        />
        <DashboardCard
          icon={<BsEnvelopePlus color="gold" size={30} />}
          heading={"Email Sent"}
          value={data?.sent}
        />
        <DashboardCard
          icon={<BsEnvelopeCheck color="indigo" size={30} />}
          heading={"Emails Delievered"}
          value={data?.sent}
        />
        <DashboardCard
          icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
          heading={"Emails Opened"}
          value={data?.opens}
        />
        <DashboardCard
          icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
          heading={"Emails Clicked"}
          value={data?.opens}
        />
        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"Emails Bounce"}
          value={data?.bounce}
        />
      </div>
    </div>
  );
};

export default Analystics;
