import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";

const ReleasedNumber = ({
  releasedNumbers,
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
    Array.isArray(releasedNumbers) &&
      releasedNumbers?.map((number) => {
        data.push({
          ...number,
          sms: number?.capabilities?.sms === true ? "True" : "False",
          mms: number?.capabilities.mms === true ? "True" : "False",
          voice: number?.capabilities.voice === true ? "True" : "False",
        });
      });

    setTableData(data);
    return () => {};
  }, [releasedNumbers]);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {tableData?.length > 0 ? (
            <Table
              columns={columns}
              pagination={false}
              data={tableData}
              actions={false}
            />
          ) : (
            <div className=" p-10 text-center bg-white dark:bg-gray-800">
              No Data Found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReleasedNumber;
