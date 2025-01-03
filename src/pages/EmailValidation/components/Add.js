import React, { useState } from "react";
import TextAreaField from "../../../components/FormFields/TextAreaField/TextAreaField";
import { useForm } from "react-hook-form";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import { sendValidationEmails } from "../../../redux/services/validation";
const Add = () => {
  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
  } = useForm();
  const { token, user_id } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.validation);
  const textEmails = watch("emails");
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  function formatEmails(text) {
    const fomatted = text?.split("\n");
    setData(fomatted);
  }
  const handleReset = () => {
    setData([]);
    setFile(null);
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
        const formattedData = [];
        Array.isArray(validData) &&
          validData?.map((item) => {
            return formattedData?.push(item.email);
          });
        setData(formattedData.slice(0, 100)); // Limit to 100 rows
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        toast.error("Error parsing the CSV file.");
      },
    });
  };
  const formSubmit = () => {
    const validateEmails = data.filter((email) => email.endsWith("@gmail.com"));
    const params = {
      user_id,
      emails: validateEmails,
    };
    dispatch(sendValidationEmails(token, params));
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div>
        <Heading
          text={"Add only google email accounts for validation process"}
          className="text-center text-2xl font-extrabold my-5"
        />
      </div>
      <TextAreaField
        name="emails"
        control={control}
        onChange={(e) => formatEmails(e.target.value)}
        disabled={file !== null ? true : false}
        errors={errors}
        rows={5}
        placeholder="Enter/Paste Emails"
      />

      <p class="text-gray-500 dark:text-gray-400">
        Add your emails in the format each email in one line and press enter and
        then the next.
      </p>
      <div class="relative inline-flex items-center justify-center w-full">
        <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <p class="absolute bg-white text-gray-500 dark:text-gray-400">OR</p>
      </div>
      <div>
        {file === null ? (
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
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
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      Click to upload CSV file
                    </span>{" "}
                    or drag and drop
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  disabled={
                    textEmails === undefined || textEmails === "" ? false : true
                  }
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>Upload CSV file including column exactly named "email"</div>
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
                    <tr className="hover:bg-gray-50">
                      <td className="border px-4 py-2 font-semibold bg-gray-100">
                        Emails
                      </td>
                      <td className="border px-4 py-2">
                        <ul className="list-disc pl-5">
                          {data.map((row, index) => (
                            <li key={index}>{row || "N/A"}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-2 py-5">
          <Button loading={isLoading} type="submit" className=" py-2 mt-5">
            Submit
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            className="bg-gray-700 py-2 mt-5"
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Add;
