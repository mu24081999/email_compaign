import React, { useEffect, useState } from "react";
import DashboardCard from "../../../../components/DashboardCard";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompaignsAnalytics } from "../../../../redux/services/dashboard";
import { getUserCompaignsApi } from "../../../../redux/services/compaign";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
  BsEnvelopeCheck,
  BsEnvelopeOpenHeart,
  BsEnvelopePlus,
  BsEnvelopeSlash,
} from "react-icons/bs";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, user_id } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.dashboard);
  const { compaigns } = useSelector((state) => state.compaign);
  const [compaignsData, setCompaignsData] = useState([]);
  useEffect(() => {
    dispatch(getUserCompaignsApi(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(compaigns?.campaignsData) &&
      compaigns?.campaignsData?.map((compaign) => {
        data?.push({
          ...compaign,
          url: `/compaign/${compaign?.id}`,
          actions: [
            {
              color: "green",
              label: "Edit",
              onClick: () => alert("Edit John Doe"),
            },
            {
              color: "red",
              label: "Delete",
              onClick: () => alert("Delete John Doe"),
            },
          ],
        });
      });
    setCompaignsData(data);
  }, [compaigns]);
  const columns = [
    { label: "Title", accessor: "title", type: "link" },
    { label: "Status", accessor: "status" },
    { label: "Progress", accessor: "progress" }, // Example of nested accessor
    { label: "Sent", accessor: "email_sent_counter" },
    { label: "Click", accessor: "email_opens_counter" },
    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   type: "actions",
    //   variant: "green",
    // },
  ];
  useEffect(() => {
    dispatch(getCompaignsAnalytics(token, id));
  }, [token, id, dispatch]);
  return (
    <div>
      <div className="grid lg:grid-cols-6 gap-5">
        <DashboardCard
          icon={<FaRegEnvelope color="blue" size={30} />}
          heading={"Total Emails"}
          value={analytics?.leads}
        />
        <DashboardCard
          icon={<BsEnvelopePlus color="gold" size={30} />}
          heading={"Email Sent"}
          value={analytics?.sent}
        />
        <DashboardCard
          icon={<BsEnvelopeCheck color="indigo" size={30} />}
          heading={"Emails Delievered"}
          value={analytics?.sent}
        />
        <DashboardCard
          icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
          heading={"Emails Opened"}
          value={analytics?.opens}
        />
        <DashboardCard
          icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
          heading={"Emails Clicked"}
          value={analytics?.opens}
        />
        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"Emails Bounce"}
          value={analytics?.bounce}
        />
      </div>
      <div className="pt-10">
        <Table columns={columns} data={compaignsData} />
      </div>
    </div>
  );
};

export default Dashboard;
