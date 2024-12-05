import React from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigateTo = useNavigate();
  const columns = [
    { label: "Title", accessor: "title", type: "link" },
    // { label: "Status", accessor: "status" },
    { label: "Progress", accessor: "progress" }, // Example of nested accessor
    { label: "Sent", accessor: "email_sent_counter" },
    { label: "Open", accessor: "email_open_counter" },
  ];
  return (
    <div>
      <div className="pb-5">
        <Button
          onClick={() => navigateTo("/add-sms-campaign")}
          size="lg"
          className="py-1 flex"
        >
          Add Compaign
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          data={[]}
          // bulkActions={bulkActions}
          // totalItems={pagination?.totalItems}
          // itemsPerPage={10}
          // onPageChange={(page) => fetchData(page)}
        />
      </div>
    </div>
  );
};

export default Content;
