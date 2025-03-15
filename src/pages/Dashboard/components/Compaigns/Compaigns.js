import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompaignApi,
  getUserCompaignsApi,
} from "../../../../redux/services/compaign";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import Layout from "../../../../layout/Layout";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const Compaigns = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user_id, token } = useSelector((state) => state.auth);
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
          email_open_counter: compaign?.openEmailCount || 0,
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
    // { label: "Status", accessor: "status" },
    { label: "Progress", accessor: "progress" }, // Example of nested accessor
    // { label: "Sent", accessor: "email_sent_counter" },
    { label: "Open", accessor: "openEmailCount" },
  ];

  const deleteBulk = (ids) => {
    console.log("🚀 ~ deleteBulk ~ ids:", ids);
    dispatch(deleteCompaignApi(token, ids, user_id));
  };
  const bulkActions = [
    {
      name: "delete",
      bgColor: "gray",
      icon: <FaTrashAlt color="white" size={15} />,
      onClick: (ids) => deleteBulk(ids),
    },
  ];
  return (
    <Layout
      component={
        <div>
          <div className="pb-5 flex justify-end ">
            <Button
              onClick={() => navigateTo("/add-compaign")}
              size="lg"
              className="py-3 flex"
            >
              <span className="mt-1 pe-1">
                <FaPlus />
              </span>{" "}
              Add New Compaign
            </Button>
          </div>
          <div>
            <Table
              columns={columns}
              data={compaignsData}
              bulkActions={bulkActions}
              totalItems={pagination?.totalItems}
              itemsPerPage={10}
              onPageChange={(page) => fetchData(page)}
            />
          </div>
        </div>
      }
    ></Layout>
  );
};

export default Compaigns;
