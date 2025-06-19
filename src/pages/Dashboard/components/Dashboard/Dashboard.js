// import React, { useEffect, useState } from "react";
// import DashboardCard from "../../../../components/DashboardCard";
// import Table from "../../../../components/Table";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getCompaignsAnalytics } from "../../../../redux/services/dashboard";
// import { getUserCompaignsApi } from "../../../../redux/services/compaign";
// import { FaRecycle, FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
// import {
//   BsEnvelopeCheck,
//   BsEnvelopeOpenHeart,
//   BsEnvelopePlus,
//   BsEnvelopeSlash,
// } from "react-icons/bs";
// import { IoIosRefresh } from "react-icons/io";

// import Button from "../../../../components/Button";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { token, user_id } = useSelector((state) => state.auth);
//   const { analytics, isLoading } = useSelector((state) => state.dashboard);
//   const { compaigns } = useSelector((state) => state.compaign);
//   const [compaignsData, setCompaignsData] = useState([]);
//   const [pagination, setPagination] = useState({});
//   useEffect(() => {
//     dispatch(getUserCompaignsApi(token, user_id));
//   }, [token, user_id, dispatch]);
//   useEffect(() => {
//     const data = [];
//     Array.isArray(compaigns?.campaignsData) &&
//       compaigns?.campaignsData?.map((compaign) => {
//         const progressPercentage =
//           compaign?.total_leads > 0
//             ? (compaign?.email_sent_counter / compaign?.total_leads) * 100
//             : 0;

//         data.push({
//           ...compaign,
//           url: `/compaign/${compaign?.id}`,
//           progress: (
//             <div>
//               <div className="mb-2 flex justify-between items-center">
//                 <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
//                   Emails Sent
//                 </h3>
//                 <span className="text-sm text-gray-800 dark:text-white">
//                   {compaign?.email_sent_counter || 0}
//                 </span>
//               </div>
//               <div
//                 className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
//                 role="progressbar"
//                 aria-valuenow={compaign?.email_sent_counter}
//                 aria-valuemin="0"
//                 aria-valuemax={compaign?.total_leads}
//               >
//                 <div
//                   className={`flex flex-col justify-center rounded-full overflow-hidden ${
//                     progressPercentage === 100 ? "bg-green-500" : "bg-blue-600"
//                   } text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500`}
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//             </div>
//           ),
//           status: compaign?.status || "pending",
//           email_open_counter: compaign?.email_open_counter || 0,
//           email_sent_counter: compaign?.email_sent_counter || 0,
//           actions: [
//             {
//               color: "green",
//               label: "Edit",
//               onClick: () => alert("Edit John Doe"),
//             },
//             {
//               color: "red",
//               label: "Delete",
//               onClick: () => alert("Delete John Doe"),
//             },
//           ],
//         });
//       });
//     setCompaignsData(data);
//     setPagination(compaigns?.pagination);
//   }, [compaigns]);
//   const fetchData = (page) => {
//     const query = `page=${page}`;
//     dispatch(getUserCompaignsApi(token, user_id, query));
//   };
//   const columns = [
//     { label: "Title", accessor: "title", type: "link" },
//     { label: "Progress", accessor: "progress" }, // Example of nested accessor
//     { label: "Open", accessor: "openEmailCount" },
//     // {
//     //   label: "Actions",
//     //   accessor: "actions",
//     //   type: "actions",
//     //   variant: "green",
//     // },
//   ];
//   useEffect(() => {
//     dispatch(getCompaignsAnalytics(token, id));
//   }, [token, id, dispatch]);
//   const refresh = () => {
//     dispatch(getCompaignsAnalytics(token, id));
//   };
//   return (
//     <div>
//       <Button loading={isLoading} className="bg-black px-1" onClick={refresh}>
//         <IoIosRefresh size={15} />
//       </Button>
//       <div className="grid lg:grid-cols-6 gap-5">
//         <DashboardCard
//           icon={<FaRegEnvelope color="blue" size={30} />}
//           heading={"Total Emails"}
//           value={analytics?.leads || "0"}
//         />
//         <DashboardCard
//           icon={<BsEnvelopePlus color="gold" size={30} />}
//           heading={"Email Sent"}
//           value={analytics?.sent || "0"}
//         />
//         <DashboardCard
//           icon={<BsEnvelopeCheck color="indigo" size={30} />}
//           heading={"Emails Remaining"}
//           value={analytics?.remaining || 0}
//         />
//         <DashboardCard
//           icon={<FaRegEnvelopeOpen color="cyan" size={30} />}
//           heading={"Emails Opened"}
//           value={analytics?.opens || 0}
//         />

//         <DashboardCard
//           icon={<BsEnvelopeSlash color="red" size={30} />}
//           heading={"Emails Bounce"}
//           value={analytics?.bounce || 0}
//         />
//         <DashboardCard
//           icon={<BsEnvelopeOpenHeart color="orange" size={30} />}
//           heading={"Warmup Emails"}
//           value={analytics?.warmupEmails || 0}
//         />
//       </div>
//       <div className="pt-10">
//         <Table
//           columns={columns}
//           data={compaignsData}
//           totalItems={pagination?.totalItems}
//           itemsPerPage={10}
//           actions={false}
//           onPageChange={(page) => fetchData(page)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
  BsEnvelopeCheck,
  BsEnvelopeOpenHeart,
  BsEnvelopePlus,
  BsEnvelopeSlash,
} from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";

import Button from "../../../../components/Button";
import Table from "../../../../components/Table";
import DashboardCard from "../../../../components/DashboardCard";

import { getCompaignsAnalytics } from "../../../../redux/services/dashboard";
import { getUserCompaignsApi } from "../../../../redux/services/compaign";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { token, user_id } = useSelector((state) => state.auth);
  const { analytics, isLoading } = useSelector((state) => state.dashboard);
  const { compaigns } = useSelector((state) => state.compaign);

  const [compaignsData, setCompaignsData] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    dispatch(getUserCompaignsApi(token, user_id));
  }, [token, user_id, dispatch]);

  useEffect(() => {
    const data = compaigns?.campaignsData?.map((compaign) => {
      const sent = compaign?.email_sent_counter || 0;
      const total = compaign?.total_leads || 0;
      const progressPercentage = total > 0 ? (sent / total) * 100 : 0;

      return {
        ...compaign,
        url: `/compaign/${compaign?.id}`,
        progress: (
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-gray-800 dark:text-white">
                Emails Sent
              </span>
              <span className="text-gray-700 dark:text-white">{sent}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div
                className={`h-full transition-all duration-500 ${
                  progressPercentage === 100
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : "bg-gradient-to-r from-blue-500 to-blue-700"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        ),
        openEmailCount: compaign?.email_open_counter || 0,
        status: compaign?.status || "pending",
      };
    });

    setCompaignsData(data || []);
    setPagination(compaigns?.pagination || {});
  }, [compaigns]);

  useEffect(() => {
    if (token && id) dispatch(getCompaignsAnalytics(token, id));
  }, [token, id, dispatch]);

  const handleRefresh = () => {
    dispatch(getCompaignsAnalytics(token, id));
  };

  const fetchPageData = (page) => {
    dispatch(getUserCompaignsApi(token, user_id, `page=${page}`));
  };

  const columns = [
    { label: "Title", accessor: "title", type: "link" },
    { label: "Progress", accessor: "progress" },
    { label: "Open", accessor: "openEmailCount" },
  ];

  const cards = [
    {
      heading: "Total Emails",
      value: analytics?.leads || "0",
      icon: <FaRegEnvelope size={28} className="text-blue-500" />,
    },
    {
      heading: "Email Sent",
      value: analytics?.sent || "0",
      icon: <BsEnvelopePlus size={28} className="text-yellow-500" />,
    },
    {
      heading: "Emails Remaining",
      value: analytics?.remaining || 0,
      icon: <BsEnvelopeCheck size={28} className="text-indigo-500" />,
    },
    {
      heading: "Emails Opened",
      value: analytics?.opens || 0,
      icon: <FaRegEnvelopeOpen size={28} className="text-cyan-500" />,
    },
    {
      heading: "Emails Bounce",
      value: analytics?.bounce || 0,
      icon: <BsEnvelopeSlash size={28} className="text-red-500" />,
    },
    {
      heading: "Warmup Emails",
      value: analytics?.warmupEmails || 0,
      icon: <BsEnvelopeOpenHeart size={28} className="text-orange-500" />,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
          } shadow-md`}
        >
          <IoIosRefresh
            size={18}
            className={`${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Refreshing..." : "Reload Analytics"}
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-2">{card.icon}</div>
            <div className="text-center text-3xl font-bold text-gray-800 dark:text-white">
              {card.value}
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-300 uppercase tracking-wide">
              {card.heading}
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="">
        <Table
          columns={columns}
          data={compaignsData}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          actions={false}
          onPageChange={fetchPageData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
