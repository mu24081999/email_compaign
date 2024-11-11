import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import moment from "moment";
import _ from "lodash";

const CommonBox = () => {
  const { subscription } = useSelector((state) => state.subscription);
  console.log("🚀 ~ CommonBox ~ subscription:", subscription);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const columns = [
    { label: "Package Name", accessor: "plan_name" },
    { label: "Start Date", accessor: "start_date" },
    { label: "End Date", accessor: "end_date" },
    { label: "Status", accessor: "status" },
  ];
  useEffect(() => {
    const data = [];
    if (subscription) {
      data.push({
        ...subscription,
        start_date: moment(subscription.start_date).format("DD MMM, YYYY"),
        end_date: moment(subscription.end_date).format("DD MMM, YYYY"),
        status: _.capitalize(subscription.status),
      });
    }
    setSubscriptionData(data);
  }, [subscription]);
  return (
    <Layout
      component={
        <div className="text-center">
          <div>
            <Table columns={columns} data={subscriptionData} />
          </div>
        </div>
      }
    />
  );
};

export default CommonBox;
