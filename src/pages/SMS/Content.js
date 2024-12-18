import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCompaignsApi } from "../../redux/services/smsCampaign";
import Chatbot from "./components/Chatbot";
const Content = () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const { user_id, token } = useSelector((state) => state.auth);
  const [showA2PToast, setShowA2PToast] = useState(false);
  const { campaigns, analytics } = useSelector((state) => state.smsCampaign);
  const [compaignsData, setCompaignsData] = useState([]);
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
            ? (compaign?.sms_sent / compaign?.total_leads) * 100
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
                  {compaign?.sms_sent || 0}
                </span>
              </div>
              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
                aria-valuenow={compaign?.sms_sent}
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
        <div className="flex justify-end">
          <Button
            // onClick={() => navigateTo("/add-sms-campaign")}
            onClick={() => setShowA2PToast(true)}
            size="lg"
            className="py-3 flex"
          >
            Add Compaign
          </Button>
        </div>
        {showA2PToast && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5"
            role="alert"
          >
            <strong class="font-bold">A2P Verification Required! </strong>
            <span class="block sm:inline">
              You need to perform A2P Verification first to add and send SMS
              campaign. Please add your business information{" "}
              <Link className="text-blue-500" to={"/a2p-verification"}>
                here
              </Link>
            </span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => setShowA2PToast(false)}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
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
      {/* <Chatbot /> */}
    </div>
  );
};

export default Content;
