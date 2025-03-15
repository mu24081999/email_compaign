import React, { useState } from "react";
import Table from "../../../../../../../../components/Table";
import Button from "../../../../../../../../components/Button";
import { FaDownload, FaSearch, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLeadRec,
  getCompaignLeads,
  getLeadsCSVData,
} from "../../../../../../../../redux/services/leads";
import { IoMdRefresh } from "react-icons/io";
import InputField from "../../../../../../../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DatePickerFeild from "../../../../../../../../components/FormFields/DatePickerField/DatePickerField";
import Checkbox from "../../../../../../../../components/FormFields/Checkbox/Checkbox";
import Heading from "../../../../../../../../components/Heading";
import moment from "moment";
const List = ({
  leadsData,
  handleOpenModal,
  compaign_id,
  token,
  pagination,
  user_id,
  id,
}) => {
  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({});
  const { compaign } = useSelector((state) => state.compaign);

  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    { label: "Last Name", accessor: "lastname" },
    { label: "Email", accessor: "email" }, // Example of nested accessor
    { label: "Open", accessor: "open" },
    { label: "Open Count", accessor: "open_count" },
    { label: "Last Opened At", accessor: "opened_at" },
    { label: "country", accessor: "country" },
    { label: "state", accessor: "state" },
    { label: "city", accessor: "city" },
    { label: "address", accessor: "address" },
    { label: "postalCode", accessor: "postalCode" },
    { label: "company", accessor: "company" },
    { label: "position", accessor: "position" },
  ];
  const deleteBulk = (ids) => {
    dispatch(deleteLeadRec(token, ids, compaign_id));
  };
  const bulkActions = [
    {
      name: "delete",
      bgColor: "gray",
      icon: <FaTrashAlt color="white" size={15} />,
      onClick: (ids) => deleteBulk(ids),
    },
  ];
  const fetchData = (page, firstname, lastname, open, opened_at, email) => {
    const date = opened_at
      ? moment(opened_at).format("YYYY-MM-DD")
      : "undefined";
    const query = `page=${page}&fistname=${firstname}&lastname=${lastname}&open=${open}&opened_at=${date}&email=${email}`;

    dispatch(getCompaignLeads(token, id, query));
  };
  function exportToCSV(data, filename = "data.csv") {
    // Extract column names (keys of the first object)
    const headers = Object.keys(data[0]);

    // Create CSV content
    const rows = data.map(
      (row) => headers.map((header) => `"${row[header] ?? ""}"`).join(",") // Escape values and handle nulls
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create a Blob and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Trigger the download
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function downloadCSV(array) {
    const response = await dispatch(getLeadsCSVData(token, compaign_id));
    const list =
      Array.isArray(response) &&
      response?.map((item) => {
        return {
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
          open: item.open,
          open_count: item.open_count,
          opened_at: item.opened_at,
          company: item.company,
          phone: item.phone,
          country: item.country,
          state: item.state,
          city: item.city,
          address: item.address,
          position: item.position,
        };
      });
    // console.log(list);
    const open_list = list?.filter((item) => item.open === true);
    const not_open_list = list?.filter((item) => item.open === false);
    exportToCSV(open_list, "open_leads.csv");
    exportToCSV(not_open_list, "not_open_leads.csv");
  }
  const handleSearch = (data) => {
    const { firstname, lastname, email, opened_at, open } = data;
    fetchData(1, firstname, lastname, open, opened_at, email);
  };
  return (
    <div>
      <div className="flex gap-3 justify-end pb-3">
        <Button
          className="py-3 flex gap-2 bg-black"
          onClick={() => downloadCSV()}
        >
          <FaDownload className="mt-1" />
          <span> Export Emails</span>
        </Button>
        <Button
          className="py-3 flex gap-2 bg-black"
          onClick={() => fetchData(1)}
        >
          <IoMdRefresh className="mt-1" />
        </Button>
        <Button
          className="py-3 flex gap-2 bg-black"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FaSearch className="mt-1" />
        </Button>
      </div>
      {showSearch && (
        <div>
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="flex gap-5 py-3"
          >
            <div className="w-full">
              <Heading text={"First Name"} className="font-extrabold pb-2" />
              <InputField
                name="firstname"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                // placeholder="Enter your email address"
                label="First Name"
              />
            </div>
            <div className="w-full">
              <Heading text={"Last Name"} className="font-extrabold pb-2" />
              <InputField
                name="lastname"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                // placeholder="Enter your email address"
                label="Last Name"
              />
            </div>
            <div className="w-full">
              <Heading text={"Email Address"} className="font-extrabold pb-2" />
              <InputField
                name="email"
                type="email"
                control={control}
                svg={<MdDriveFileRenameOutline />}
                errors={errors}
                // placeholder="Enter your email address"
                label="Email Address"
              />
            </div>
            <div className="w-full">
              <DatePickerFeild
                name="opened_at"
                noShowTime={true}
                placeHolder="Last Opened At"
                label="Last Opened At"
                errors={errors}
                control={control}
              />
            </div>

            <div className="px-5 pt-10">
              <Checkbox
                name="open"
                label="Open"
                errors={errors}
                control={control}
              />
            </div>
            <div className="pt-7">
              <Button type="submit" className="py-3 px-2 bg-black">
                Search
              </Button>
            </div>
          </form>
        </div>
      )}
      {Array?.isArray(leadsData) ? (
        <Table
          columns={columns}
          data={leadsData}
          bulkActions={compaign?.status !== "sending" && bulkActions}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          onPageChange={(page) => fetchData(page)}
          actions={compaign?.status === "sending" ? false : true}
        />
      ) : (
        <div className="lg:h-[80vh] items-center flex justify-center">
          <div className="flex flex-col justify-around gap-5">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
              alt="new"
              width={"500px"}
            ></img>
            <Button
              onClick={() => handleOpenModal(true)}
              className="m-auto py-2"
              size="md"
            >
              Add Leads
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
