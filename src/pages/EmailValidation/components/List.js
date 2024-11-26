import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useSelector } from "react-redux";
import { getUserValidatedEmails } from "../../../redux/services/validation";

const List = ({ user_id, token, dispatch }) => {
  const { emails } = useSelector((state) => state.validation);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const columns = [
    { label: "Email", accessor: "email" },
    { label: "Valid", accessor: "valid" },
  ];
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUserValidatedEmails(token, user_id, query));
  };
  useEffect(() => {
    const data = [];
    Array.isArray(emails?.emailsData) &&
      emails?.emailsData?.length > 0 &&
      emails?.emailsData?.map((email) => {
        data.push({
          ...email,
          valid: email?.valid === true ? "VALID" : "INVALID",
        });
      });
    setPagination(emails?.pagination);
    setData(data);
  }, [emails]);
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        pagination={true}
        totalItems={pagination?.totalItems}
        itemsPerPage={10}
        onPageChange={(page) => fetchData(page)}
      />
    </div>
  );
};

export default List;
