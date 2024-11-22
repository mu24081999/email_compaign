import React, { useEffect, useState } from "react";
import Table from "../../../../../../components/Table/Table";
import Pagination from "../../../../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../../../../../components/FormFields/ReactSelectField/ReactSelectField";
import Modal from "../../../../../../components/Modal/Modal";
import {
  claimPhoneNumber,
  getAvailableNumbers,
} from "../../../../../../redux/services/signalwire";
import { createPaymentIntend } from "../../../../../../redux/services/order";
import Payment from "../../../../../../components/Payment/Payment";
const productColumns = [
  { label: "Phone Number", accessor: "friendlyName" },
  { label: "Region", accessor: "region" },
  { label: "Country", accessor: "isoCountry" },
  { label: "Price", accessor: "price" },
  { label: "Actions", accessor: "actions", type: "actions", variant: "purple" },
  //   { label: "Voice", accessor: "capabilities.voice" },
  //   { label: "SMS", accessor: "capabilities.sms" }, // Note: Changed to lowercase
  //   { label: "MMS", accessor: "capabilities.mms" }, // Note: Changed to lowercase
];
const PhoneNumbers = () => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [phoneNumbersData, setPhoneNumbersData] = useState(null);
  const [phoneNumbersData_, setPhoneNumbersData_] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPhoneNumbers, setSelectedPhoneNumbers] = useState(null);
  const handleDataPagination = (data) => {
    setPhoneNumbersData(data);
  };
  const { available_numbers } = useSelector((state) => state.signalwire);
  const handleClaimClick = (number, amount) => {
    setSelectedPhoneNumbers(number);
    setOpenModal(true);
    dispatch(createPaymentIntend(token, { amount: amount }));
  };
  const afterPayment = () => {
    dispatch(
      claimPhoneNumber(token, {
        phone_number: selectedPhoneNumbers?.phoneNumber,
        friendly_name: selectedPhoneNumbers?.friendlyName,
      })
    );
  };
  useEffect(() => {
    const data = [];
    Array.isArray(available_numbers) &&
      available_numbers?.map((number) => {
        const price = number?.region === null ? 4.99 : 3.99;
        return data?.push({
          ...number,
          price: price,
          actions: [
            {
              label: "Claim",
              onClick: () => handleClaimClick(number, price * 100),
            },
          ],
        });
      });
    setPhoneNumbersData(data);
    setPhoneNumbersData_(data);
  }, [available_numbers]);
  // useEffect(() => {
  //   setPhoneNumbersData(available_numbers);
  //   setPhoneNumbersData_(available_numbers);
  // }, [available_numbers]);
  const handleSearch = (data) => {
    const params = {
      numberType: data.numberType.value,
      country_iso: data.country_iso.value,
      region: data?.region?.value,
    };
    dispatch(getAvailableNumbers(token, params));
  };
  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-sans font-extrabold">
          Phone Numbers
        </h1>
        <form class="max-w-full my-5 " onSubmit={handleSubmit(handleSearch)}>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
            <div class="relative">
              <ReactSelectField
                errors={errors}
                control={control}
                name="country_iso"
                placeholder="Select a country"
                options={[{ label: "United States", value: "US" }]}
              />
            </div>
            <div class="relative">
              <ReactSelectField
                errors={errors}
                control={control}
                name="region"
                placeholder="Select a region"
                options={[
                  { label: "Alabama", value: "AL" },
                  { label: "Alaska", value: "AK" },
                  { label: "Arizona", value: "AZ" },
                  { label: "Arkansas", value: "AR" },
                  { label: "California", value: "CA" },
                  { label: "Colorado", value: "CO" },
                  { label: "Connecticut", value: "CT" },
                  { label: "Delaware", value: "DE" },
                  { label: "Florida", value: "FL" },
                  { label: "Georgia", value: "GA" },
                  { label: "Hawaii", value: "HI" },
                  { label: "Idaho", value: "ID" },
                  { label: "Illinois", value: "IL" },
                  { label: "Indiana", value: "IN" },
                  { label: "Iowa", value: "IA" },
                  { label: "Kansas", value: "KS" },
                  { label: "Kentucky", value: "KY" },
                  { label: "Louisiana", value: "LA" },
                  { label: "Maine", value: "ME" },
                  { label: "Maryland", value: "MD" },
                  { label: "Massachusetts", value: "MA" },
                  { label: "Michigan", value: "MI" },
                  { label: "Minnesota", value: "MN" },
                  { label: "Mississippi", value: "MS" },
                  { label: "Missouri", value: "MO" },
                  { label: "Montana", value: "MT" },
                  { label: "Nebraska", value: "NE" },
                  { label: "Nevada", value: "NV" },
                  { label: "New Hampshire", value: "NH" },
                  { label: "New Jersey", value: "NJ" },
                  { label: "New Mexico", value: "NM" },
                  { label: "New York", value: "NY" },
                  { label: "North Carolina", value: "NC" },
                  { label: "North Dakota", value: "ND" },
                  { label: "Ohio", value: "OH" },
                  { label: "Oklahoma", value: "OK" },
                  { label: "Oregon", value: "OR" },
                  { label: "Pennsylvania", value: "PA" },
                  { label: "Rhode Island", value: "RI" },
                  { label: "South Carolina", value: "SC" },
                  { label: "South Dakota", value: "SD" },
                  { label: "Tennessee", value: "TN" },
                  { label: "Texas", value: "TX" },
                  { label: "Utah", value: "UT" },
                  { label: "Vermont", value: "VT" },
                  { label: "Virginia", value: "VA" },
                  { label: "Washington", value: "WA" },
                  { label: "West Virginia", value: "WV" },
                  { label: "Wisconsin", value: "WI" },
                  { label: "Wyoming", value: "WY" },
                ]}
              />
            </div>
            <div class="relative">
              <ReactSelectField
                errors={errors}
                control={control}
                name="numberType"
                placeholder="Select a type"
                options={[
                  { label: "tollFree", value: "tollFree" },
                  { label: "Local", value: "local" },
                ]}
              />
            </div>
          </div>
          <button
            type="submit"
            class="text-gray-900 mt-5 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Search
          </button>
        </form>

        <Table columns={productColumns} data={phoneNumbersData} />
        <Pagination
          itemsPerPage={5}
          items={phoneNumbersData_}
          dataFromChild={handleDataPagination}
        />
      </div>
      <div>
        <Modal
          title=""
          isOpen={openModal}
          content={<Payment afterPayment={afterPayment} />}
        />
      </div>
    </>
  );
};

export default PhoneNumbers;
