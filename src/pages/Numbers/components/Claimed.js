import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { releasePhoneNumberApi } from "../../../redux/services/twilio";

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
    // { label: "Country", accessor: "isoCountry" },
    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
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
          actions: [
            {
              label: "Release Number",
              onClick: () => {
                const params = {
                  accountSid: user?.accountSid,
                  authToken: user?.authToken,
                  phoneNumberSid: number?.sid,
                };
                console.log("🚀 ~ claimedNumbers?.map ~ params:", params);
                dispatch(releasePhoneNumberApi(token, params));
              },
            },
          ],
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
              Not a number claimed yet.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Claimed;
