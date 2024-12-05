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
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    dispatch(getUserCompaignsApi(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(compaigns?.campaignsData) &&
      compaigns?.campaignsData?.map((compaign) => {
        const progressPercentage =
          compaign?.total_leads > 0
            ? (compaign?.email_sent_counter / compaign?.total_leads) * 100
            : 0;

        data.push({
          ...compaign,
          url: `/compaign/${compaign?.id}`,
          progress: (
            <div>
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                  Emails Sent
                </h3>
                <span className="text-sm text-gray-800 dark:text-white">
                  {compaign?.email_sent_counter || 0}
                </span>
              </div>
              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
                aria-valuenow={compaign?.email_sent_counter}
                aria-valuemin="0"
                aria-valuemax={compaign?.total_leads}
              >
                <div
                  className={`flex flex-col justify-center rounded-full overflow-hidden ${
                    progressPercentage === 100 ? "bg-green-500" : "bg-blue-600"
                  } text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          ),
          status: compaign?.status || "pending",
          email_open_counter: compaign?.email_open_counter || 0,
          email_sent_counter: compaign?.email_sent_counter || 0,
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
    setPagination(compaigns?.pagination);
  }, [compaigns]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUserCompaignsApi(token, user_id, query));
  };
  const columns = [
    { label: "Title", accessor: "title", type: "link" },
    { label: "Progress", accessor: "progress" }, // Example of nested accessor
    { label: "Sent", accessor: "email_sent_counter" },
    { label: "Open", accessor: "email_open_counter" },
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
          heading={"Emails Remaining"}
          value={analytics?.remaining}
        />
        <DashboardCard
          icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
          heading={"Emails Opened"}
          value={analytics?.opens}
        />

        <DashboardCard
          icon={<BsEnvelopeSlash color="red" size={30} />}
          heading={"Emails Bounce"}
          value={analytics?.bounce}
        />
        <DashboardCard
          icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
          heading={"Warmup Emails"}
          value={analytics?.warmupEmails || 0}
        />
      </div>
      <div className="pt-10">
        <Table
          columns={columns}
          data={compaignsData}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          actions={false}
          onPageChange={(page) => fetchData(page)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
