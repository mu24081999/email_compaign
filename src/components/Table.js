// import React, { useState } from "react";
// import Button from "./Button";
// import { Link, useNavigate } from "react-router-dom";
// import _ from "lodash";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const Table = ({
//   columns,
//   data,
//   dataFromChild,
//   bulkActions,
//   totalItems,
//   itemsPerPage = 10,
//   onPageChange,
//   pagination = true,
//   actions = true,
// }) => {
//   const navigateTo = useNavigate();
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [sortDirection, setSortDirection] = useState({});
//   const [statusFilter, setStatusFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const getValue = (row, accessor) => {
//     const keys = accessor.split(".");
//     return keys.reduce((value, key) => value?.[key], row);
//   };

//   const handleCheckboxChange = (rowId) => {
//     setSelectedRows((prevSelected) => {
//       if (prevSelected.includes(rowId)) {
//         return prevSelected.filter((index) => index !== rowId);
//       } else {
//         return [...prevSelected, rowId];
//       }
//     });
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const filteredData = data?.filter((data) => data?.status !== "sending");
//       setSelectedRows(filteredData.map((_, index) => _.id));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSort = (accessor) => {
//     setSortDirection((prev) => {
//       const newDirection = prev[accessor] === "asc" ? "desc" : "asc";
//       return { [accessor]: newDirection };
//     });
//   };

//   const filteredData = data?.filter((row) => {
//     return statusFilter ? row.status === statusFilter : true;
//   });

//   const sortedData =
//     Array.isArray(filteredData) &&
//     [...filteredData]?.sort((a, b) => {
//       for (const accessor in sortDirection) {
//         const direction = sortDirection[accessor] === "asc" ? 1 : -1;
//         if (getValue(a, accessor) < getValue(b, accessor))
//           return -1 * direction;
//         if (getValue(a, accessor) > getValue(b, accessor)) return 1 * direction;
//       }
//       return 0;
//     });

//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       onPageChange(page); // Trigger the parent callback to fetch new data
//     }
//   };
//   const getPageNumbers = () => {
//     const maxPagesToShow = 5; // Adjust based on design
//     let pages = [];

//     if (totalPages <= maxPagesToShow) {
//       // If total pages are few, show all pages
//       pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//     } else {
//       // Always show the first page
//       pages.push(1);

//       if (currentPage > 3) {
//         pages.push("...");
//       }

//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push("...");
//       }

//       // Always show the last page
//       pages.push(totalPages);
//     }

//     return pages;
//   };
//   return (
//     <div className="py-5 relative overflow-x-auto  font-space  dark:bg-gray-800 ">
//       <div className="pb-2 flex justify-between items-center">
//         {actions && (
//           <>
//             {Array?.isArray(bulkActions) &&
//               bulkActions?.map((action) => (
//                 <Button
//                   size="sm"
//                   className={`py-3 bg-gray-100 border hover:bg-gray-200`}
//                   onClick={() => action?.onClick(selectedRows)}
//                   variant="secondary"
//                 >
//                   {action?.icon}
//                 </Button>
//               ))}
//           </>
//         )}
//         {pagination && (
//           <div className="text-gray-600 dark:text-white">
//             Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//             {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
//             entries
//           </div>
//         )}
//       </div>

//       <table className="w-full text-sm text-left text-gray-500 dark:text-white">
//         <thead className="text-xs text-white uppercase bg-black border border-gray-300 rounded-2xl ">
//           <tr className="">
//             {actions && (
//               <th scope="col" className="p-4 w-10 ">
//                 <div className="flex items-center">
//                   <input
//                     id="checkbox-all-search"
//                     type="checkbox"
//                     onChange={handleSelectAll}
//                     checked={selectedRows?.length === data?.length}
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
//                   />
//                   <label htmlFor="checkbox-all-search" className="sr-only">
//                     checkbox
//                   </label>
//                 </div>
//               </th>
//             )}
//             {data?.length > 0 &&
//               columns?.map((col) => (
//                 <th
//                   key={col.accessor}
//                   className={`p-4  text-md text-center cursor-pointer`}
//                   style={{ width: col?.width }}
//                   onClick={() => handleSort(col.accessor)}
//                 >
//                   {col.label}
//                   {sortDirection[col.accessor] && (
//                     <span>
//                       {sortDirection[col.accessor] === "asc" ? " 🔼" : " 🔽"}
//                     </span>
//                   )}
//                 </th>
//               ))}
//           </tr>
//         </thead>
//         <tbody className="border">
//           {Array.isArray(sortedData) &&
//             sortedData?.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="hover:bg-gray-300 border-b cursor-pointer"
//               >
//                 {actions && (
//                   <td className="p-4">
//                     <div className="flex items-center">
//                       <input
//                         id={`checkbox-${rowIndex}`}
//                         type="checkbox"
//                         checked={selectedRows.includes(row?.id)}
//                         onChange={() => handleCheckboxChange(row?.id)}
//                         disabled={row?.status === "sending"}
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
//                       />
//                       <label
//                         htmlFor={`checkbox-${rowIndex}`}
//                         className="sr-only"
//                       >
//                         checkbox
//                       </label>
//                     </div>
//                   </td>
//                 )}
//                 {columns?.map((col) => (
//                   <td
//                     key={col.accessor}
//                     onClick={() => col.type === "link" && navigateTo(row?.url)}
//                     className="p-3 text-center"
//                   >
//                     {col.type === "actions" ? (
//                       <div className="flex justify-center gap-4 ">
//                         {row?.actions?.map((action) => (
//                           <Button
//                             type="button"
//                             loading={action.loading}
//                             onClick={action?.onClick}
//                             key={action.label}
//                           >
//                             {action?.label}
//                           </Button>
//                         ))}
//                       </div>
//                     ) : col.type === "button" ? (
//                       <Button
//                         onClick={() => dataFromChild(row)}
//                         className="py-3"
//                       >
//                         {getValue(row, col.accessor)}
//                       </Button>
//                     ) : (
//                       <>
//                         {col?.type === "link" ? (
//                           <Link to={row?.url} className="text-blue-500">
//                             {getValue(row, col.accessor)}
//                           </Link>
//                         ) : (
//                           getValue(row, col.accessor)
//                         )}
//                       </>
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       {pagination && (
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-black text-white  disabled:bg-gray-300 rounded-full"
//           >
//             <FaArrowLeft />
//           </button>
//           <div className="flex space-x-1">
//             {getPageNumbers().map((page, index) => (
//               <button
//                 key={index}
//                 onClick={() =>
//                   typeof page === "number" && handlePageChange(page)
//                 }
//                 className={`px-3 py-1 rounded-full ${
//                   currentPage === page
//                     ? "bg-[#2563eb] text-white"
//                     : "bg-gray-200 text-black"
//                 } ${page === "..." ? "cursor-default" : ""}`}
//                 disabled={page === "..."}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 text-white rounded-full bg-black  disabled:bg-gray-300"
//           >
//             <FaArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;
import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Table = ({
  columns,
  data = [],
  dataFromChild,
  bulkActions,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  pagination = true,
  actions = true,
}) => {
  const navigateTo = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getValue = (row, accessor) => {
    return accessor.split(".").reduce((value, key) => value?.[key], row);
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const filteredData = data?.filter((item) => item?.status !== "sending");
      setSelectedRows(filteredData.map((item) => item.id));
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

  const filteredData = data?.filter((row) =>
    statusFilter ? row.status === statusFilter : true
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    for (const accessor in sortDirection) {
      const dir = sortDirection[accessor] === "asc" ? 1 : -1;
      const valA = getValue(a, accessor);
      const valB = getValue(b, accessor);
      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
    }
    return 0;
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  const getPageNumbers = () => {
    const maxPages = 5;
    const pages = [];

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="py-6 px-4 font-space dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        {actions && Array.isArray(bulkActions) && bulkActions.length > 0 && (
          <div className="flex gap-2">
            {bulkActions.map((action) => (
              <Button
                key={action.label}
                size="sm"
                className="py-2 px-4 bg-gray-100 border hover:bg-gray-200 text-sm"
                onClick={() => action.onClick(selectedRows)}
              >
                {action.icon || action.label}
              </Button>
            ))}
          </div>
        )}
        {pagination && (
          <div className="text-sm text-gray-700 dark:text-white">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
            entries
          </div>
        )}
      </div>

      <div className="relative overflow-x-auto border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left text-gray-700 dark:text-white">
          <thead className="text-xs uppercase bg-black text-white">
            <tr>
              {actions && (
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedRows.length ===
                      data.filter((d) => d.status !== "sending")?.length
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  className={`p-4 cursor-pointer whitespace-nowrap text-center`}
                  style={{ width: col?.width }}
                >
                  {col.label}
                  {sortDirection[col.accessor] && (
                    <span className="ml-1">
                      {sortDirection[col.accessor] === "asc" ? "🔼" : "🔽"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-10 text-gray-400"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {actions && (
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleCheckboxChange(row.id)}
                        disabled={row.status === "sending"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      onClick={() => col.type === "link" && navigateTo(row.url)}
                      className="p-3 text-center"
                    >
                      {col.type === "actions" ? (
                        <div className="flex justify-center gap-2">
                          {row.actions?.map((action) => (
                            <Button
                              key={action.label}
                              onClick={action.onClick}
                              loading={action.loading}
                              size="sm"
                              className="text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      ) : col.type === "button" ? (
                        <Button
                          onClick={() => dataFromChild(row)}
                          className="text-xs py-2 px-4"
                        >
                          {getValue(row, col.accessor)}
                        </Button>
                      ) : col.type === "link" ? (
                        <Link
                          to={row.url}
                          className="text-blue-500 hover:underline"
                        >
                          {getValue(row, col.accessor)}
                        </Link>
                      ) : (
                        getValue(row, col.accessor)
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-black text-white rounded-full disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="flex gap-2">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === "number" && handlePageChange(page)
                }
                disabled={page === "..."}
                className={`px-3 py-1 rounded-full text-sm ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                } ${page === "..." ? "cursor-default" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-black text-white rounded-full disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
