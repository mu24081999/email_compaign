import React, { useState } from "react";
import Table from "../../../../../../../../components/Table";
import Button from "../../../../../../../../components/Button";

const List = ({ leadsData, handleOpenModal }) => {
  const columns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    { label: "Last Name", accessor: "lastname" },
    { label: "Email", accessor: "email" }, // Example of nested accessor
    { label: "Phone", accessor: "phone" },

    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   type: "actions",
    //   variant: "green",
    // },
  ];

  // const data = [
  //   {
  //     firstname: "John Doe",
  //     lastname: "John",
  //     email: "john@example.com",
  //     phone: "+923174660027",
  //   },
  //   {
  //     firstname: "John Doe",
  //     lastname: "John",
  //     email: "john@example.com",
  //     phone: "+923174660027",
  //   },
  //   {
  //     firstname: "John Doe",
  //     lastname: "John",
  //     email: "john@example.com",
  //     phone: "+923174660027",
  //   },
  // ];
  return (
    <div>
      {Array?.isArray(leadsData) ? (
        <Table columns={columns} data={leadsData} />
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
