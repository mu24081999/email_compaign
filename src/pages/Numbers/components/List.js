import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import {
  claimPhoneNumberApi,
  getAvailableNumbersApi,
} from "../../../redux/services/twilio";
import InputField from "../../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import Heading from "../../../components/Heading";
import ReactSelectField from "../../../components/FormFields/ReactSelectField/ReactSelectField";
import Checkbox from "../../../components/FormFields/Checkbox/Checkbox";
import Button from "../../../components/Button";
const List = ({
  availableNumbers,
  isLoading,
  Loader,
  dispatch,
  token,
  user,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [tableData, setTableData] = useState([]);
  const columns = [
    { label: "Phone Number", accessor: "friendlyName" },
    { label: "Locality", accessor: "locality" },
    { label: "Region", accessor: "region" }, // Example of nested accessor
    { label: "Country", accessor: "isoCountry" },

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
          isoCountry: number.isoCountry,
          region: number.region,
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
              // loading: isLoading,
              label: "Claim Number",
              onClick: () => dispatch(claimPhoneNumberApi(token, params)),
            },
          ],
        });
      });

    setTableData(data);
    return () => {};
  }, [availableNumbers, isLoading, dispatch, token, user]);
  const handleFormSubmit = (data) => {
    const params = {
      accountSid: user.accountSid,
      authToken: user.authToken,
      countryCode: data?.country?.value,
      areaCode: data?.areaCode,
      capabilities: {
        voice: data?.voice || false,
        sms: data?.sms || false,
        mms: data?.mms || false,
        fax: data?.fax || false,
      },
      type: data?.number_type?.value,
    };
    // console.log("🚀 ~ handleFormSubmit ~ params:", params);
    dispatch(getAvailableNumbersApi(token, params));
    // reset();
  };
  return (
    <div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div className="px-3">
        <div className="">
          {/* <Heading
            text={"Search Parameters"}
            className="font-extrabold text-xl text-center py-3"
          /> */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="flex  gap-5">
              <div className="w-full">
                <ReactSelectField
                  name="country"
                  placeholder="Country"
                  control={control}
                  errors={errors}
                  label="Country"
                  options={[
                    {
                      label: "United States - US",
                      value: "US",
                    },
                    {
                      label: "United Kingdom - UK",
                      value: "GB",
                    },
                    {
                      label: "Canada - CA",
                      value: "CA",
                    },
                  ]}
                />
              </div>
              <div className="w-full">
                <ReactSelectField
                  name="number_type"
                  placeholder="Number Type"
                  control={control}
                  errors={errors}
                  label="Number Type"
                  options={[
                    {
                      label: "Local",
                      value: "local",
                    },
                    {
                      label: "Toll Free",
                      value: "tollFree",
                    },
                  ]}
                />
              </div>

              <div className="w-full">
                <p className="font-extrabold pb-2">Area Code</p>
                <InputField
                  control={control}
                  errors={errors}
                  name="areaCode"
                  min={3}
                  placeholder="Area Code"
                  label="Area Code"
                />
              </div>
              <div className="w-full">
                <div>
                  <Heading
                    text={"Campabilities"}
                    className="font-extrabold text-black"
                  />
                </div>
                <div className=" items-center h-5 grid grid-cols-4">
                  <Checkbox
                    name="voice"
                    control={control}
                    errors={errors}
                    label="Voice"
                  />
                  <Checkbox
                    name="sms"
                    control={control}
                    errors={errors}
                    label="SMS"
                  />
                  {/* <Checkbox
                    name="mms"
                    control={control}
                    errors={errors}
                    label="MMS"
                  /> */}
                  {/* <Checkbox
                      name="fax"
                      control={control}
                      errors={errors}
                      label="Fax"
                    /> */}
                </div>
              </div>
            </div>
            <div className="py-3 w-full">
              <Button type="submit" loading={isLoading} className="py-3">
                Search
              </Button>
            </div>
          </form>
        </div>
        <div>
          {tableData?.length > 0 ? (
            <Table
              columns={columns}
              pagination={false}
              data={tableData}
              actions={false}
            />
          ) : (
            <div className="text-center bg-white py-5">No Numbers Found</div>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default List;
