import React, { useState } from "react";
import Layout from "../../../../../layout/Layout";
import Container from "../../../../../components/Container";
// import "./card.css";
import Heading from "../../../../../components/Heading";
import Card from "../../../../../components/Card";
import { FcGoogle } from "react-icons/fc";
import ListItemCard from "../../../../../components/ListItemCard";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import GoogleAppForm from "./components/Google/GoogleAppForm";
import Instruction from "./components/Google/Instruction";
import MailInstruction from "./components/MailProvider/Instruction";
import MailProviderForm from "./components/MailProvider/MailProviderForm";

const Add = () => {
  const navigateTo = useNavigate();
  const [googleAppSettings, setGoogleAppSettings] = useState({
    menu: true,
    instruction: false,
    form: false,
    mail_instructions: false,
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
            <div className="  flex items-center justify-center">
              {/* Connect */}
              <div className="h-[70vh] flex flex-col items-center justify-center gap-8">
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
                        description={"IMAP / SMPT"}
                        onClick={() =>
                          setGoogleAppSettings({
                            menu: false,
                            instruction: false,
                            form: false,
                            mail_form: false,
                            mail_instructions: true,
                          })
                        }
                      />
                    </div>
                  }
                />
              </div>
              {/* Google App Password */}
            </div>
          )}
          {googleAppSettings?.form === true && (
            <div className="flex justify-center">
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
        </div>
      }
    />
  );
};

export default Add;
