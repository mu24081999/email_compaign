import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Papa from "papaparse";
import Button from "../../../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addLeadRec } from "../../../../../../../../redux/services/leads";
import { useParams } from "react-router-dom";

const UploadCSV = ({ close }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token, user_id } = useSelector((state) => state.auth);
  const { handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const handleUploadCSV = () => {
    if (data.length > 0) {
      const formattedData = [];
      if (data.length > 500) {
        return toast.error("You can only upload 500 contacts in a campaign.");
      } else {
        data?.map((item) => {
          return formattedData?.push({
            // ...item,
            firstname: item?.firstname,
            lastname: item?.lastname,
            email: item?.email,
            phone: item?.phone,
            user_id: user_id,
            compaign_id: parseInt(id),
          });
        });
        dispatch(addLeadRec(token, { leads: formattedData }));
        close();
      }
    } else {
      toast.error("There is no contacts in the list.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== "text/csv") {
      return toast.error("Please select a CSV file.");
    }
    setFile(file);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const validData = results.data.filter((row) =>
          Object.values(row).some(Boolean)
        );
        setData(validData.slice(0, 500)); // Limit to 100 rows
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        toast.error("Error parsing the CSV file.");
      },
    });
  };

  return (
    <div className="p-5">
      <div className="">
        <form onSubmit={handleSubmit(handleUploadCSV)}>
          {file === null ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  )}
                  <p className="mb-2 text-sm text-gray-500 text-center">
                    <span className="font-semibold">
                      Click to upload CSV file
                    </span>{" "}
                    or drag and drop
                    <p>
                      {" "}
                      Please make sure you've added columns exactly named
                      firstname, lastname, email in small letters. Otherwise,
                      you'll face problem in uploading leads.
                    </p>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <div className=" max-h-[500px] overflow-scroll">
              {data.length > 0 && (
                <div className="mt-5 overflow-auto">
                  <h3 className="text-lg font-semibold mb-3">
                    CSV Data Grouped by Keys:
                  </h3>
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <tbody>
                      {Object.keys(data[0]).map((key) => (
                        <tr key={key} className="hover:bg-gray-50">
                          <td className="border px-4 py-2 font-semibold bg-gray-100">
                            {key}
                          </td>
                          <td className="border px-4 py-2">
                            <ul className="list-disc pl-5">
                              {data.map((row, index) => (
                                <li key={index}>{row[key] || "N/A"}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          <Button type="submit" className=" py-2 mt-5">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadCSV;
