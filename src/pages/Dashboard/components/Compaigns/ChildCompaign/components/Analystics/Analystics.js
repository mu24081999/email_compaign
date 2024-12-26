import React from "react";
import DashboardCard from "../../../../../../../components/DashboardCard";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
  BsEnvelopeCheck,
  BsEnvelopeOpenHeart,
  BsEnvelopePlus,
  BsEnvelopeSlash,
} from "react-icons/bs";
import Button from "../../../../../../../components/Button";
import { IoIosRefresh } from "react-icons/io";
import { compaignAnalytics } from "../../../../../../../redux/services/compaign";

const Analystics = ({ data, loading, dispatch, token, id }) => {
  const refresh = () => {
    dispatch(compaignAnalytics(token, id));
  };
  return (
    <div>
      <Button
        loading={loading}
        className="bg-black px-1 mb-2"
        onClick={refresh}
      >
        <IoIosRefresh size={15} />
      </Button>
      <div className="grid lg:grid-cols-6 gap-5">
        <DashboardCard
          icon={<FaRegEnvelope color="blue" size={30} />}
          heading={"Total Emails"}
          value={data?.leads || 0}
        />
        <DashboardCard
          icon={<BsEnvelopePlus color="gold" size={30} />}
          heading={"Email Sent"}
          value={data?.sent || 0}
        />
        <DashboardCard
          icon={<BsEnvelopeCheck color="indigo" size={30} />}
          heading={"Emails Remaining"}
          value={data?.remaining || 0}
        />
        <DashboardCard
          icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
          heading={"Emails Opened"}
          value={data?.opens || 0}
        />

        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"Emails Bounce"}
          value={data?.bounce || 0}
        />
        <DashboardCard
          icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
          heading={"Replies"}
          value={data?.replies_count || 0}
        />
      </div>
    </div>
  );
};

export default Analystics;
