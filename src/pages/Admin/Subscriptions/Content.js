import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/Table";
import { getAllSubacriptionsApi } from "../../../redux/services/subscription";
import moment from "moment/moment";

const Content = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { subscriptions } = useSelector((state) => state.subscription);

  const [subscriptionsData, setSubscriptions] = useState([]);
  const [pagination, setPagination] = useState([]);
  useEffect(() => {
    dispatch(getAllSubacriptionsApi(token));
    return () => {};
  }, [token, dispatch]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getAllSubacriptionsApi(token, query));
  };
  const columns = [
    { label: "Full Name", accessor: "User.firstname", type: "link" },
    { label: "Email", accessor: "User.email", type: "link" },
    { label: "Plan Name", accessor: "plan_name", type: "link" },
    { label: "Monthly Amount", accessor: "monthly_price" },
    { label: "Yearly Amount", accessor: "yearly_price" },
    { label: "Start Date", accessor: "start_date" },
    { label: "End Date", accessor: "end_date" },
    { label: "Status", accessor: "status" },
  ];
  useEffect(() => {
    const filteredData = [];
    Array.isArray(subscriptions?.subscriptionsData) &&
      subscriptions?.subscriptionsData?.map((usr) => {
        const currentDate = new Date();
        const endDate = new Date(usr?.end_date);

        return filteredData?.push({
          ...usr,
          start_date: moment(usr?.start_date).format("YYYY-MM-DD"),
          end_date: moment(usr?.end_date).format("YYYY-MM-DD"),
          status:
            currentDate <= endDate ? (
              <li style={{ color: "green" }}>Active</li>
            ) : (
              <li style={{ color: "red" }}> Blocked</li>
            ),
        });
      });
    setSubscriptions(filteredData);
    setPagination(subscriptions?.pagination);

    return () => {};
  }, [subscriptions, dispatch]);
  return (
    <div>
      <div>
        <Table
          columns={columns}
          data={subscriptionsData}
          pagination={true}
          actions={false}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          onPageChange={(page) => fetchData(page)}
        />
      </div>
    </div>
  );
};

export default Content;
