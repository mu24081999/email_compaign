import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

const Table = ({ columns, data, dataFromChild, bulkActions }) => {
  console.log("🚀 ~ Table ~ bulkActions:", bulkActions);
  const navigateTo = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("🚀 ~ Table ~ selectedRows:", selectedRows);
  const [sortDirection, setSortDirection] = useState({});
  const [statusFilter, setStatusFilter] = useState("");

  const getValue = (row, accessor) => {
    const keys = accessor.split(".");
    return keys.reduce((value, key) => value?.[key], row);
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((index) => index !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, index) => _.id));
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
    <div className="py-5 relative overflow-x-auto shadow-md sm:rounded-lg font-space  bg-white border  dark:bg-gray-800 p-5">
      <div className="pb-2">
        {Array?.isArray(bulkActions) &&
          bulkActions?.map((action) => (
            <Button
              size="sm"
              className={`py-3 bg-gray-100 border hover:bg-gray-200`}
              onClick={() => action?.onClick(selectedRows)}
            >
              {action?.icon}
            </Button>
          ))}
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-white uppercase bg-black border border-gray-300 rounded-2xl ">
          <tr className="">
            <th scope="col" className="p-4 w-10 ">
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
                  className="p-4  text-md text-center cursor-pointer"
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
                      checked={selectedRows.includes(row?.id)}
                      onChange={() => handleCheckboxChange(row?.id)}
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
                          <Link to={row?.url} className="text-blue-500">
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
