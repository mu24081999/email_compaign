import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";

const Claimed = ({
  claimedNumbers,
  isLoading,
  Loader,
  dispatch,
  token,
  user,
}) => {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { label: "Phone Number", accessor: "friendlyName" },
    { label: "SMS", accessor: "sms" },
    { label: "Voice", accessor: "voice" },
    { label: "MMS", accessor: "mms" },
  ];
  useEffect(() => {
    const data = [];
    Array.isArray(claimedNumbers) &&
      claimedNumbers?.map((number) => {
        data.push({
          ...number,
          sms: number?.capabilities?.sms === true ? "True" : "False",
          mms: number?.capabilities.mms === true ? "True" : "False",
          voice: number?.capabilities.voice === true ? "True" : "False",
        });
      });

    setTableData(data);
    return () => {};
  }, [claimedNumbers]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          pagination={false}
          data={tableData}
          actions={false}
        />
      )}
    </div>
  );
};

export default Claimed;
