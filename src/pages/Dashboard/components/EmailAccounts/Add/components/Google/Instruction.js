import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../../../../components/FormFields/InputField/InputField";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { FcGoogle } from "react-icons/fc";
const Instruction = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className=" rounded-2xl  max-w-[60%]">
      <Button
        className="my-2"
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
        icon={<FcGoogle size={30} color="blue" />}
        title={"Connect Your Google Account"}
        description="Gmail / G-suite"
      />{" "}
      <div className="my-5 bg-gray-100 flex  justify-center ">
        <div className=" h-[50vh] overflow-scroll max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            How to Create Google App Password
          </h1>
          <ol className="list-decimal list-inside space-y-4 text-gray-700">
            <li>
              <span className="font-semibold">
                Go to Google Account Security:
              </span>
              <a
                href="https://myaccount.google.com/security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Open Google Security Page
              </a>
            </li>
            <li>
              Under the <strong>"Signing in to Google"</strong> section, find
              and enable
              <span className="font-semibold"> 2-Step Verification.</span>
              (If it is already enabled, skip to the next step.)
            </li>
            <li>
              After enabling 2-Step Verification, scroll down and click on
              <span className="font-semibold">"App passwords."</span>
            </li>
            <li>
              Sign in with your Google account credentials again, if prompted.
            </li>
            <li>
              In the <span className="font-semibold">"Select app"</span>{" "}
              dropdown, choose <strong>Mail</strong>. In the{" "}
              <strong>"Select device"</strong> dropdown, choose your device (or
              select “Other” and type in a custom name).
            </li>
            <li>
              Click on the <strong>“Generate”</strong> button.
            </li>
            <li>
              A 16-character password will be displayed.
              <span className="text-green-600 font-semibold">
                Copy it carefully
              </span>{" "}
              and store it securely.
            </li>
            <li>
              Use this password in your app (like in Nodemailer) to authenticate
              and send emails via your Gmail account.
            </li>
          </ol>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Need more help? Visit Google’s documentation:
            </p>
            <a
              href="https://support.google.com/accounts/answer/185833?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Google App Password Guide
            </a>
          </div>
        </div>
      </div>
      <Button
        className="py-2"
        onClick={() =>
          handleMenu({
            menu: false,
            instruction: false,
            form: true,
          })
        }
      >
        Continue
      </Button>
    </div>
  );
};

export default Instruction;
