import React, { useState } from "react";
import Table from "../../../../../../../components/Table";
import Button from "../../../../../../../components/Button";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteLeadRec,
  getCompaignLeads,
} from "../../../../../../../redux/services/smsLeads";
const List = ({
  leadsData,
  handleOpenModal,
  compaign_id,
  token,
  pagination,
  user_id,
  id,
}) => {
  const dispatch = useDispatch();
  const columns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    { label: "Last Name", accessor: "lastname" },
    { label: "Phone", accessor: "phone" },
  ];
  const deleteBulk = (ids) => {
    dispatch(deleteLeadRec(token, ids, compaign_id));
  };
  const bulkActions = [
    {
      name: "delete",
      bgColor: "gray",
      icon: <FaTrashAlt color="red" size={15} />,
      onClick: (ids) => deleteBulk(ids),
    },
  ];
  const fetchData = (page) => {
    const query = `page=${page}`;

    dispatch(getCompaignLeads(token, id, query));
  };
  return (
    <div>
      {Array?.isArray(leadsData) ? (
        <Table
          columns={columns}
          data={leadsData}
          bulkActions={bulkActions}
          totalItems={pagination?.totalItems}
          itemsPerPage={10}
          onPageChange={(page) => fetchData(page)}
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
