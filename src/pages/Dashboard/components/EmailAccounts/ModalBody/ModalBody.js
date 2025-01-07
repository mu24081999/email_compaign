import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Tabs from "../../../../../components/Tabs";
import WarmupForm from "./components/WarmupForm";
import UpdateStatus from "./components/UpdateStatus";
import { getWarmupApi } from "../../../../../redux/services/warmup";
import { useDispatch, useSelector } from "react-redux";
const ModalBody = ({ selectedEmail, handleClose }) => {
  const dispatch = useDispatch();
  const { user_id, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getWarmupApi(token, selectedEmail?.id));
  }, [dispatch, token, selectedEmail]);
  const tabsData = [
    {
      id: "status",
      label: "Status",
      content: <UpdateStatus handleClose={handleClose} />,
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <WarmupForm selectedEmail={selectedEmail} handleClose={handleClose} />
      ),
    },
  ];

  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default ModalBody;
