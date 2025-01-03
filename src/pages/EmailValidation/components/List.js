import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import { useSelector } from "react-redux";
import { getUserValidatedEmails } from "../../../redux/services/validation";
import Button from "../../../components/Button";
import { FaDownload } from "react-icons/fa";

const List = ({ user_id, token, dispatch }) => {
  const { emails } = useSelector((state) => state.validation);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const columns = [
    { label: "Email", accessor: "email" },
    { label: "Valid", accessor: "valid" },
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
  function downloadCSV(array) {
    // Separate valid and invalid emails
    const validEmails = [];
    const invalidEmails = [];

    array.forEach((item) => {
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
    <div className="bg-white ">
      <div className="flex justify-end">
        <Button className="py-3 bg-black" onClick={() => downloadCSV(data)}>
          <FaDownload />
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
