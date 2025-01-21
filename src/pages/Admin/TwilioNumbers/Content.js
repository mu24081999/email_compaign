import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { releasePhoneNumber } from "../../../redux/services/twilio";
const Content = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { claimedNumbers, currentAccount } = useSelector(
    (state) => state.twilio
  );
  const columns = [
    { label: "Phone Number", accessor: "friendlyName" },
    { label: "SMS", accessor: "sms" },
    { label: "Voice", accessor: "voice" },
    { label: "MMS", accessor: "mms" },
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
                  accountSid: currentAccount?.sid,
                  authToken: currentAccount?.authToken,
                  phoneNumberSid: number?.sid,
                };
                console.log("🚀 ~ claimedNumbers?.map ~ params:", params);
                dispatch(releasePhoneNumber(token, params));
              },
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [claimedNumbers, token, dispatch, currentAccount]);
  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        data={tableData}
        actions={false}
      />
    </div>
  );
};

export default Content;
