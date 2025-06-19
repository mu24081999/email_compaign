import React, { useEffect, useState } from "react";
import { getUnsubscribedEmailsApi } from "../../redux/services/unsubscribed";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table";

const Content = () => {
  const dispatch = useDispatch();
  const { user_id, token } = useSelector((state) => state.auth);
  const { unsubscribedEmails } = useSelector((state) => state.unsubscribed);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUnsubscribedEmailsApi(token, query));
  };
  const columns = [
    { label: "Lead Eamil", accessor: "lead", type: "link" },
    // { label: "Status", accessor: "status" },
    { label: "Reason", accessor: "reason" }, // Example of nested accessor
    // { label: "Sent", accessor: "email_sent_counter" },
    { label: "Unsubscribed At", accessor: "createdAt" },
  ];
  useEffect(() => {
    const query = `userId=${user_id}`;
    dispatch(getUnsubscribedEmailsApi(token, query));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(unsubscribedEmails?.unsubscribedEmails) &&
      unsubscribedEmails?.unsubscribedEmails?.map((item) => {
        data.push({
          ...item,
        });
      });
    setData(data);
    setPagination(unsubscribedEmails?.pagination);
  }, [unsubscribedEmails]);
  return (
    <div>
      <div>
        <Table
          columns={columns}
          data={data}
          bulkActions={false}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          onPageChange={(page) => fetchData(page)}
        />
      </div>
    </div>
  );
};

export default Content;
