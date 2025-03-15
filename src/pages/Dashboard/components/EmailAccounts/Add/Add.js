import React, { useState } from "react";
import Layout from "../../../../../layout/Layout";
import Card from "../../../../../components/Card";
import { FcGoogle } from "react-icons/fc";
import ListItemCard from "../../../../../components/ListItemCard";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import GoogleAppForm from "./components/Google/GoogleAppForm";
import Instruction from "./components/Google/Instruction";
import MailInstruction from "./components/MailProvider/Instruction";
import MailProviderForm from "./components/MailProvider/MailProviderForm";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import OutlookForm from "./components/Outlook/OutlookForm";
import Button from "../../../../../components/Button";
import OutlookInstructions from "./components/Outlook/Instruction";
const Add = () => {
  const navigateTo = useNavigate();
  const [googleAppSettings, setGoogleAppSettings] = useState({
    menu: true,
    instruction: false,
    form: false,
    mail_instructions: false,
    outlook_form: false,
    outlook_instructions: false,
    mail_form: false,
  });

  const handleMenu = (data) => {
    setGoogleAppSettings(data);
  };

  return (
    <Layout
      component={
        <div className="lg:mx-60 ">
          {googleAppSettings?.menu === true && (
            <div className="  h-[86vh] flex items-center justify-center">
              {/* Connect */}
              <div className=" flex flex-col items-center justify-center gap-8">
                <div className=" p-5 bg-white dark:bg-gray-800  rounded-2xl shadow-lg">
                  <Button
                    onClick={() => navigateTo("/accounts")}
                    className="mb-5"
                  >
                    Back
                  </Button>
                  <Card
                    title="Connect Existing Email Account"
                    body={
                      <div className="flex flex-col gap-5 mt-5">
                        <ListItemCard
                          icon={<FcGoogle size={30} color="blue" />}
                          title={"Google"}
                          description="Gmail / G-suite"
                          onClick={() =>
                            setGoogleAppSettings({
                              menu: false,
                              instruction: true,
                              form: false,
                            })
                          }
                        />
                        <ListItemCard
                          icon={<FaRegEnvelope size={30} color="blue" />}
                          title={"Any Provider"}
                          description={"IMAP / SMTP"}
                          onClick={() =>
                            setGoogleAppSettings({
                              menu: false,
                              instruction: false,
                              form: false,
                              mail_form: false,
                              mail_instructions: true,
                              outlook_instructions: false,
                            })
                          }
                        />
                        <ListItemCard
                          icon={
                            <PiMicrosoftOutlookLogo size={30} color="red" />
                          }
                          title={"Microsoft Outlook"}
                          description={"Microsoft Outlook 360"}
                          onClick={() =>
                            setGoogleAppSettings({
                              menu: false,
                              instruction: false,
                              form: false,
                              mail_form: false,
                              mail_instructions: false,
                              outlook_form: false,
                              outlook_instructions: true,
                            })
                          }
                        />
                      </div>
                    }
                  />
                </div>
              </div>
              {/* Google App Password */}
            </div>
          )}
          {googleAppSettings?.form === true && (
            <div className="flex items-center">
              <GoogleAppForm handleMenu={handleMenu} />
            </div>
          )}
          {googleAppSettings?.instruction === true && (
            <div className="flex justify-center">
              <Instruction handleMenu={handleMenu} />
            </div>
          )}
          {googleAppSettings?.mail_form === true && (
            <div className="flex justify-center">
              <MailProviderForm handleMenu={handleMenu} />
            </div>
          )}
          {googleAppSettings?.mail_instructions === true && (
            <div className="flex justify-center">
              <MailInstruction handleMenu={handleMenu} />
            </div>
          )}
          {googleAppSettings?.outlook_form === true && (
            <div className="flex justify-center">
              <OutlookForm handleMenu={handleMenu} />
            </div>
          )}
          {googleAppSettings?.outlook_instructions === true && (
            <div className="flex justify-center">
              <OutlookInstructions handleMenu={handleMenu} />
            </div>
          )}
        </div>
      }
    />
  );
};

export default Add;
