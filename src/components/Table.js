import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const Table = ({ columns, data, dataFromChild }) => {
  const navigateTo = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [statusFilter, setStatusFilter] = useState("");

  const getValue = (row, accessor) => {
    const keys = accessor.split(".");
    return keys.reduce((value, key) => value?.[key], row);
  };

  const handleCheckboxChange = (rowIndex) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowIndex)) {
        return prevSelected.filter((index) => index !== rowIndex);
      } else {
        return [...prevSelected, rowIndex];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSort = (accessor) => {
    setSortDirection((prev) => {
      const newDirection = prev[accessor] === "asc" ? "desc" : "asc";
      return { [accessor]: newDirection };
    });
  };

  const filteredData = data?.filter((row) => {
    return statusFilter ? row.status === statusFilter : true; // Adjust this line based on your data structure
  });

  const sortedData =
    Array.isArray(filteredData) &&
    [...filteredData]?.sort((a, b) => {
      for (const accessor in sortDirection) {
        const direction = sortDirection[accessor] === "asc" ? 1 : -1;
        if (getValue(a, accessor) < getValue(b, accessor))
          return -1 * direction;
        if (getValue(a, accessor) > getValue(b, accessor)) return 1 * direction;
      }
      return 0;
    });

  return (
    <div className="py-5 relative overflow-x-auto shadow-md sm:rounded-lg font-space">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg h-[40px]"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            {/* Add more status options as needed */}
          </select>
          <Button
            size="sm"
            className=""
            onClick={() => {
              // Perform bulk action
              console.log("Bulk action on rows:", selectedRows);
            }}
            // disabled={selectedRows.length === 0}
          >
            <FaTrash size={15} />
          </Button>
        </div>
        <div className="flex ">
          <div className="">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="table-search"
              className="block pt-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-300">
          <tr>
            <th scope="col" className="p-4 w-10">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows?.length === data?.length}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {data?.length > 0 &&
              columns?.map((col) => (
                <th
                  key={col.accessor}
                  className="p-4 text-gray-800 text-md text-center cursor-pointer"
                  onClick={() => handleSort(col.accessor)}
                >
                  {col.label}
                  {sortDirection[col.accessor] && (
                    <span>
                      {sortDirection[col.accessor] === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="border">
          {Array.isArray(sortedData) &&
            sortedData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-300 border-b cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${rowIndex}`}
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleCheckboxChange(rowIndex)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label htmlFor={`checkbox-${rowIndex}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                {columns?.map((col) => (
                  <td key={col.accessor} className="p-3 text-center">
                    {col.type === "actions" ? (
                      <div className="flex justify-center gap-4 ">
                        {row?.actions?.map((action) => (
                          <button
                            type="button"
                            onClick={action?.onClick}
                            style={{ color: action?.color }}
                            key={action.label}
                          >
                            {action?.label}
                          </button>
                        ))}
                      </div>
                    ) : col.type === "button" ? (
                      <Button
                        onClick={() => dataFromChild(row)}
                        className="py-3"
                      >
                        {getValue(row, col.accessor)}
                      </Button>
                    ) : (
                      <>
                        {col?.type === "link" ? (
                          <Link to={row?.url}>
                            {getValue(row, col.accessor)}
                          </Link>
                        ) : (
                          getValue(row, col.accessor)
                        )}
                      </>
                      // Use getValue function
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
