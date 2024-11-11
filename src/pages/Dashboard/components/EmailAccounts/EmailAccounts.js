import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../../../../components/Table";
import Button from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmailAccountsApi } from "../../../../redux/services/email";
import Modal from "../../../../components/Modal";
import ModalBody from "./ModalBody/ModalBody";
import Layout from "../../../../layout/Layout";
const EmailAccounts = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { emails } = useSelector((state) => state.email);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(false);
  console.log("🚀 ~ EmailAccounts ~ selectedEmail:", selectedEmail);
  const handleSelectedEmail = () => {};
  const columns = [
    {
      label: "Email",
      accessor: "email",
      type: "link",
      onClick: () => handleSelectedEmail,
    },
    { label: "Emails Sent", accessor: "emails_sent" },
    { label: "Warmup Emails", accessor: "warmup_emails" }, // Example of nested accessor
    { label: "Health Score", accessor: "health_score" },
  ];

  const data = [
    {
      email: "mu24081999@gmail.com",
      emails_sent: 30,
      warmup_emails: 10,
      health_score: "100%",
    },
    {
      email: "mu24081999@gmail.com",
      emails_sent: 30,
      warmup_emails: 10,
      health_score: "100%",
    },
  ];
  const handleChildData = (selectedEmail) => {
    console.log("🚀 ~ handleChildData ~ selectedEmail:", selectedEmail);
    setSelectedEmail(selectedEmail);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(getEmailAccountsApi(token));
  }, [token, dispatch]);
  return (
    <Layout
      component={
        <div>
          <div className="flex justify-between">
            <Button
              onClick={() => navigateTo("/connect-email-account")}
              size="lg"
              className="py-1 flex"
            >
              Add Email Account
            </Button>
          </div>
          <div className="pt-10">
            <Table
              columns={columns}
              data={emails?.accountsData}
              dataFromChild={handleChildData}
            />
          </div>
          <div>
            {/* Modal Component */}
            <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Warm up Emails "
              body=<ModalBody selectedEmail={selectedEmail} />
              // onSave={handleSave}
              saveButtonText="Save Changes"
              closeButtonText="Dismiss"
              size="md"
            />
          </div>
        </div>
      }
    />
  );
};

export default EmailAccounts;
