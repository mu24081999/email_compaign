import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../../../../components/Button";
import ListItemCard from "../../../../../../../components/ListItemCard";
import { PiMicrosoftOutlookLogoLight } from "react-icons/pi";

const OutlookInstructions = ({ handleMenu }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center w-full items-center h-[86vh]">
      <div className="rounded-2xl max-w-[60%] border shadow-xl p-5 bg-white dark:bg-gray-800">
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
          icon={<PiMicrosoftOutlookLogoLight size={30} color="blue" />}
          title={"Connect Your Outlook Account"}
          description="Microsoft Outlook / Office365"
        />
        <div className="my-5 bg-gray-100 flex justify-center rounded-xl">
          <div className=" h-[50vh] overflow-scroll max-w-2xl w-full bg-white border  dark:bg-gray-900 shadow-lg rounded-xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              How to Create Outlook App Password
            </h1>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-white">
              <li>
                <span className="font-semibold">
                  Go to Microsoft Account Security:
                </span>
                <a
                  href="https://account.microsoft.com/security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Open Security Page
                </a>
              </li>
              <li>
                Under <strong>"Security basics"</strong>, click on{" "}
                <span className="font-semibold">
                  "Advanced security options."
                </span>
              </li>
              <li>
                Find the{" "}
                <span className="font-semibold">"Two-step verification"</span>{" "}
                section and enable it if not already enabled.
              </li>
              <li>
                Scroll down and locate the{" "}
                <span className="font-semibold">"App passwords"</span> section.
              </li>
              <li>
                Click on <strong>"Create a new app password."</strong>
              </li>
              <li>
                A 16-character password will be generated.{" "}
                <span className="text-green-600 font-semibold">
                  Copy it carefully
                </span>{" "}
                and store it securely, as it will not be shown again.
              </li>
              <li>
                Use this password in your app to authenticate and send emails
                via Outlook.
              </li>
            </ol>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-white">
                Need additional help? Visit Microsoft’s documentation:
              </p>
              <a
                href="https://support.microsoft.com/en-us/account-billing/how-to-create-an-app-password-45913c4b-f1c9-4f63-bd8b-8f245a14c594"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Microsoft App Password Guide
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
              form: false,
              mail_form: false,
              mail_instructions: false,
              outlook_form: true,
              outlook_instructions: false,
            })
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OutlookInstructions;
