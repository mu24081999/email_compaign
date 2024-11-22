import React, { useEffect, useState } from "react";
import Table from "../../../../../../components/Table/Table";
import Pagination from "../../../../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
const productColumns = [
  { label: "Friendly Name", accessor: "phoneNumber" },
  //   { label: "Voice", accessor: "capabilities.voice" },
  //   { label: "SMS", accessor: "capabilities.sms" }, // Note: Changed to lowercase
  //   { label: "MMS", accessor: "capabilities.mms" }, // Note: Changed to lowercase
];
const ClaimedPhoneNumbers = () => {
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
  const handleDataPagination = (data) => {
    setPhoneNumbersData(data);
  };
  const { claimed_numbers } = useSelector((state) => state.signalwire);
  useEffect(() => {
    setPhoneNumbersData(claimed_numbers);
    setPhoneNumbersData_(claimed_numbers);
  }, [claimed_numbers]);

  return (
    <div className="pt-10">
      <Table columns={productColumns} data={phoneNumbersData} />
      <Pagination
        itemsPerPage={5}
        items={phoneNumbersData_}
        dataFromChild={handleDataPagination}
      />
    </div>
  );
};

export default ClaimedPhoneNumbers;
