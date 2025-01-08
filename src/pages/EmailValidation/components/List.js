import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useSelector } from "react-redux";
import {
  getUserValidatedEmails,
  getValidationCSVList,
} from "../../../redux/services/validation";
import Button from "../../../components/Button";
import { FaDownload, FaRecycle } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

const List = ({ user_id, token, dispatch }) => {
  const { emails } = useSelector((state) => state.validation);
  const [data, setData] = useState([]);
  console.log("🚀 ~ List ~ data:", data);
  const [pagination, setPagination] = useState({});
  const columns = [
    { label: "Email", accessor: "email" },
    { label: "Status", accessor: "valid" },
  ];
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUserValidatedEmails(token, user_id, query));
    console.log("🚀 ~ fetchData ~ query:", query);
  };

  useEffect(() => {
    const data = [];
    Array.isArray(emails?.emailsData) &&
      emails?.emailsData?.length > 0 &&
      emails?.emailsData?.map((email) => {
        data.push({
          ...email,
          valid: email?.valid === true ? "VALID" : "INVALID",
        });
      });
    setPagination(emails?.pagination);
    setData(data);
  }, [emails]);
  async function downloadCSV(array) {
    const list = await dispatch(getValidationCSVList(token, user_id));
    // // Separate valid and invalid emails
    const validEmails = [];
    const invalidEmails = [];

    list.forEach((item) => {
      if (item.valid === true) {
        validEmails.push(item.email);
      } else {
        invalidEmails.push(item.email);
      }
    });
    // Prepare CSV data
    let csvContent = "Valid Emails,Invalid Emails\n";
    const maxRows = Math.max(validEmails.length, invalidEmails.length);

    for (let i = 0; i < maxRows; i++) {
      const validEmail = validEmails[i] || ""; // Use empty string if no valid email
      const invalidEmail = invalidEmails[i] || ""; // Use empty string if no invalid email
      csvContent += `${validEmail},${invalidEmail}\n`;
    }

    // Create a Blob and trigger a download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "emails.csv");
    link.style.display = "none";
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className=" flex flex-col gap-5 ">
      <div className="flex gap-3 justify-end">
        <Button
          className="py-3 flex gap-2 bg-black"
          onClick={() => downloadCSV(data)}
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
      </div>
      <Table
        columns={columns}
        data={data}
        pagination={true}
        totalItems={pagination?.totalItems}
        itemsPerPage={10}
        onPageChange={(page) => fetchData(page)}
      />
    </div>
  );
};

export default List;
