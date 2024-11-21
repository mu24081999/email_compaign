import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useSelector } from "react-redux";

const List = () => {
  const { emails } = useSelector((state) => state.validation);
  const [data, setData] = useState([]);
  const columns = [
    { label: "Email", accessor: "email" },
    { label: "Valid", accessor: "valid" },
  ];
  useEffect(() => {
    const data = [];
    Array.isArray(emails) &&
      emails?.length > 0 &&
      emails?.map((email) => {
        data.push({
          ...email,
          valid: email?.valid === true ? "VALID" : "INVALID",
        });
      });

    setData(data);
  }, [emails]);
  return (
    <div>
      <Table columns={columns} data={data} pagination={false} actions={false} />
    </div>
  );
};

export default List;
