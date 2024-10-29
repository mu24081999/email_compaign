import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope } from "react-icons/fa";
const Instruction = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className="p-8 rounded-2xl border border-gray-300 shadow-xl max-w-[60%]">
      <Button
        onClick={() =>
          handleMenu({
            menu: true,
            instruction: false,
            form: false,
          })
        }
      >
        Back
      </Button>
      <ListItemCard
        icon={<FaRegEnvelope size={30} color="blue" />}
        title={"Connect Your Email Account"}
        description="Gmail / G-suite"
      />{" "}
      <div className="my-5 bg-gray-100 flex items-center justify-center ">
        <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            How to Create Google App Password
          </h1>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <span className="font-semibold">
                Log in to your cPanel or email control panel
              </span>
            </li>
            <li>
              Navigate To <strong>Email Accounts</strong>
            </li>
            <li>
              Look for the Configuration Instructions or Connect Devices section
              for details.
            </li>
            <li>
              Retrieve the following credentials:
              <ul class="list-disc">
                <li className="ms-5">
                  <strong>SMPT Server:</strong>Usually something like
                  mail.yourdomain.com
                  <li className="ms-5">Port: 465 (SSL) or 587 (TLS)</li>
                </li>
              </ul>
            </li>
            <li>
              Use the email account and password you created in cPanel for the
              connection.
            </li>
          </ol>
        </div>
      </div>
      <Button
        className="py-2"
        onClick={() =>
          handleMenu({
            menu: false,
            instruction: false,
            form: false,
            mail_form: true,
            mail_instruction: false,
          })
        }
      >
        Continue
      </Button>
    </div>
  );
};

export default Instruction;
