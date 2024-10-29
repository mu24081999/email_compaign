import React, { useEffect, useState } from "react";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompaignLeads } from "../../../../../../../redux/services/leads";
import Modal from "../../../../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import Button from "../../../../../../../components/Button";
const Leads = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { leads } = useSelector((state) => state.lead);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  useEffect(() => {
    dispatch(getCompaignLeads(token, id));
  }, [token, dispatch, id]);
  useEffect(() => {
    setLeadsData(leads?.leadsData);
  }, [leads]);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSave = () => {};

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} className="m-auto py-2" size="md">
        Add Leads
      </Button>
      <div>
        <List leadsData={leadsData} handleOpenModal={() => setIsOpen(true)} />
      </div>

      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Add Leads"
          body=<ModalBody />
          onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          size="xl"
        />
      </div>
    </div>
  );
};

export default Leads;
