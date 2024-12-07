import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCompaignsApi } from "../../redux/services/smsCampaign";

const Content = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const { user_id, token } = useSelector((state) => state.auth);
  const { campaigns } = useSelector((state) => state.smsCampaign);
  const [compaignsData, setCompaignsData] = useState([]);
  console.log("🚀 ~ Content ~ compaignsData:", compaignsData);
  const [pagination, setPagination] = useState({});
  const navigateTo = useNavigate();
  const columns = [
    { label: "Name", accessor: "name", type: "link" },
    // { label: "Status", accessor: "status" },
    { label: "Progress", accessor: "progress" }, // Example of nested accessor
    { label: "Sent", accessor: "sms_sent" },
    { label: "Total Leads", accessor: "total_leads" },
  ];
  useEffect(() => {
    dispatch(getUserCompaignsApi(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(campaigns?.campaignsData) &&
      campaigns?.campaignsData?.map((compaign) => {
        const progressPercentage =
          compaign?.total_leads > 0
            ? (compaign?.email_sent_counter / compaign?.total_leads) * 100
            : 0;

        data.push({
          ...compaign,
          url: `/sms-campaign/${compaign?.id}`,
          progress: (
            <div>
              <div className="mb-2 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                  SMS Sent
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
    setPagination(campaigns?.pagination);
  }, [campaigns]);
  return (
    <div>
      <div className="pb-5">
        <Button
          onClick={() => navigateTo("/add-sms-campaign")}
          size="lg"
          className="py-1 flex"
        >
          Add Compaign
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          data={compaignsData}
          // bulkActions={bulkActions}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          // onPageChange={(page) => fetchData(page)}
        />
      </div>
    </div>
  );
};

export default Content;
