import React, { useEffect, useState } from "react";
import DashboardCard from "../../../../components/DashboardCard";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompaignsAnalytics } from "../../../../redux/services/dashboard";
import { getUserCompaignsApi } from "../../../../redux/services/compaign";

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

  // const data = [
  //   {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     phone: {
  //       mobile: "123-456-7890",
  //     },
  //     actions: [
  //       {
  //         color: "green",
  //         label: "Edit",
  //         onClick: () => alert("Edit John Doe"),
  //       },
  //       {
  //         color: "red",
  //         label: "Delete",
  //         onClick: () => alert("Delete John Doe"),
  //       },
  //     ],
  //   },
  //   {
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     phone: {
  //       mobile: "987-654-3210",
  //     },
  //     actions: [
  //       {
  //         color: "green",
  //         label: "Edit",
  //         onClick: () => alert("Edit John Doe"),
  //       },
  //       {
  //         color: "red",
  //         label: "Delete",
  //         onClick: () => alert("Delete John Doe"),
  //       },
  //     ],
  //   },
  //   {
  //     name: "Sam Wilson",
  //     email: "sam@example.com",
  //     phone: {
  //       mobile: "555-555-5555",
  //     },
  //     actions: [
  //       {
  //         color: "green",
  //         label: "Edit",
  //         onClick: () => alert("Edit John Doe"),
  //       },
  //       {
  //         color: "red",
  //         label: "Delete",
  //         onClick: () => alert("Delete John Doe"),
  //       },
  //     ],
  //   },
  // ];
  useEffect(() => {
    dispatch(getCompaignsAnalytics(token, id));
  }, [token, id, dispatch]);
  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-5">
        <DashboardCard heading={"Sent"} value={analytics?.sent} />
        <DashboardCard heading={"Open"} value={analytics?.opens} />
        <DashboardCard heading={"Bounce"} value={analytics?.bounce} />
        <DashboardCard heading={"Leads"} value={analytics?.bounce} />
      </div>
      <div className="pt-10">
        <Table columns={columns} data={compaignsData} />
      </div>
    </div>
  );
};

export default Dashboard;
