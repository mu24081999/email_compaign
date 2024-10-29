import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUserCompaignsApi } from "../../../../redux/services/compaign";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";

const Compaigns = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user_id, token } = useSelector((state) => state.auth);
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
    { label: "Sent", accessor: "sent" },
    { label: "Click", accessor: "click" },

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
  //     progress: "john@example.com",

  //     // actions: [
  //     //   {
  //     //     color: "green",
  //     //     label: "Edit",
  //     //     onClick: () => alert("Edit John Doe"),
  //     //   },
  //     //   {
  //     //     color: "red",
  //     //     label: "Delete",
  //     //     onClick: () => alert("Delete John Doe"),
  //     //   },
  //     // ],
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
  const addButton = {
    title: "Add Compaign",
    onClick: () => navigateTo("/"),
  };
  return (
    <div>
      <div className="pt-10">
        <Button
          onClick={() => navigateTo("/add-compaign")}
          size="lg"
          className="py-1 flex"
        >
          Add Compaign
        </Button>
        <Table columns={columns} data={compaignsData} />
      </div>
    </div>
  );
};

export default Compaigns;
