import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { claimPhoneNumberApi } from "../../../redux/services/twilio";

const List = ({
  availableNumbers,
  isLoading,
  Loader,
  dispatch,
  token,
  user,
}) => {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { label: "Phone Number", accessor: "friendlyName" },
    { label: "Locality", accessor: "locality" },
    { label: "Region", accessor: "region" }, // Example of nested accessor
    { label: "County", accessor: "isoCountry" },

    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  useEffect(() => {
    const data = [];
    Array.isArray(availableNumbers) &&
      availableNumbers?.map((number) => {
        const params = {
          phoneNumber: number.phoneNumber,
          accountSid: user.accountSid,
          authToken: user.authToken,
          addressSid: user.addressSid,
        };
        data.push({
          ...number,
          actions: [
            {
              color: "green",
              loading: isLoading,
              label: "Claim Number",
              onClick: () => dispatch(claimPhoneNumberApi(token, params)),
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [availableNumbers, isLoading]);

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

export default List;
