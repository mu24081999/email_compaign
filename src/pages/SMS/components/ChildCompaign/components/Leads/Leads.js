import React, { useEffect, useState } from "react";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompaignLeads } from "../../../../../../redux/services/smsLeads";
import Modal from "../../../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import Button from "../../../../../../components/Button";
const Leads = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { leads } = useSelector((state) => state.smsLead);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [pagination, setPagination] = useState();
  useEffect(() => {
    dispatch(getCompaignLeads(token, id));
  }, [token, dispatch, id]);
  useEffect(() => {
    setLeadsData(leads?.leadsData);
    setPagination(leads?.pagination);
  }, [leads]);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (data) => {
    console.log("🚀 ~ handleClose ~ data:", data);
    setIsOpen(false);
  };
  const handleSave = () => {};

  return (
    <div>
      <div className="pb-5">
        <Button
          onClick={() => setIsOpen(true)}
          className="m-auto py-2"
          size="md"
        >
          Add Leads
        </Button>
      </div>
      <div>
        <List
          compaign_id={id}
          token={token}
          leadsData={leadsData}
          handleOpenModal={() => setIsOpen(true)}
          pagination={pagination}
        />
      </div>

      <div>
        {/* Modal Component */}
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Add Leads"
          body=<ModalBody close={handleClose} />
          onSave={handleSave}
          saveButtonText="Save Changes"
          closeButtonText="Dismiss"
          // size="xl"
        />
      </div>
    </div>
  );
};

export default Leads;
