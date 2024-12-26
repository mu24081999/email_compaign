import React, { useEffect, useState } from "react";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompaignLeads } from "../../../../../../../redux/services/leads";
import Modal from "../../../../../../../components/Modal";
import ModalBody from "./components/ModalBody";
import Button from "../../../../../../../components/Button";
import useMain from "../../../../../../../context/Main/useMain";
import moment from "moment/moment";
const Leads = () => {
  const { isCollapsed } = useMain();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { leads } = useSelector((state) => state.lead);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [pagination, setPagination] = useState();
  useEffect(() => {
    dispatch(getCompaignLeads(token, id));
  }, [token, dispatch, id]);
  useEffect(() => {
    const data = [];
    leads?.leadsData?.map((lead) => {
      data.push({
        id: lead?.id,
        firstname: lead.firstname,
        lastname: lead.lastname,
        opened_at: lead.opened_at
          ? moment(lead.opened_at).format("HH:MM:SS DD MMM YYYY")
          : "Not open yet",
        open_count: lead.open_count,
        email: lead?.email,
        open: lead?.open === true ? "TRUE" : "FALSE",
      });
    });
    setLeadsData(data);
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
          noStartMargin={isCollapsed}
          // size="xl"
        />
      </div>
    </div>
  );
};

export default Leads;
