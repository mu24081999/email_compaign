import React from "react";
import DashboardCard from "../../../../components/DashboardCard";
import Table from "../../../../components/Table";

const Dashboard = () => {
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone.mobile" }, // Example of nested accessor
    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];

  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: {
        mobile: "123-456-7890",
      },
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
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: {
        mobile: "987-654-3210",
      },
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
    },
    {
      name: "Sam Wilson",
      email: "sam@example.com",
      phone: {
        mobile: "555-555-5555",
      },
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
    },
  ];
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
      <div className="pt-10">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
