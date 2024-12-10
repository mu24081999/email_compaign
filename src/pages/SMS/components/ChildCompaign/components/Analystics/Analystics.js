import React from "react";
import DashboardCard from "../../../../../../components/DashboardCard";
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
      <div className="grid lg:grid-cols-4 gap-5">
        <DashboardCard
          icon={<FaRegEnvelope color="blue" size={30} />}
          heading={"Total SMS"}
          value={data?.leads || 0}
        />
        <DashboardCard
          icon={<BsEnvelopePlus color="gold" size={30} />}
          heading={"SMS Sent"}
          value={data?.sent || 0}
        />
        <DashboardCard
          icon={<BsEnvelopeCheck color="indigo" size={30} />}
          heading={"SMS Remaining"}
          value={data?.remaining || 0}
        />
        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"SMS Bounce"}
          value={data?.bounce || 0}
        />
      </div>
    </div>
  );
};

export default Analystics;
