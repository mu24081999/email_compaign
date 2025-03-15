import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Layout from "../../layout/Layout";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import Modal from "../../components/Modal";
import useMain from "../../context/Main/useMain";
import ModalBody from "./ModalBody";
import {
  getOwnerInvitations,
  getOwnerMembers,
} from "../../redux/services/team";
import Heading from "../../components/Heading";
const Team = () => {
  const { isCollapsed } = useMain();

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { user_id, token } = useSelector((state) => state.auth);
  const { invitations, isLoading, members } = useSelector(
    (state) => state.team
  );
  const [invitationData, setInvitationData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [membersData, setMembersData] = useState([]);
  const [memberPagination, setMemberPagination] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getOwnerInvitations(token, user_id));
    dispatch(getOwnerMembers(token, user_id));
  }, [token, user_id, dispatch]);
  useEffect(() => {
    const data = [];
    Array.isArray(invitations?.invitations) &&
      invitations?.invitations?.map((inv) => {
        data.push({
          ...inv,
        });
      });
    setInvitationData(data);
    setPagination(invitations?.pagination);
  }, [invitations]);
  useEffect(() => {
    const data = [];
    Array.isArray(members?.members) &&
      members?.members?.map((inv) => {
        data.push({
          ...inv,
        });
      });
    setMembersData(data);
    setMemberPagination(members?.pagination);
  }, [members]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getOwnerInvitations(token, user_id, query));
  };
  const fetchMemberData = (page) => {
    const query = `page=${page}`;
    dispatch(getOwnerMembers(token, user_id, query));
  };
  const columns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    // { label: "Status", accessor: "status" },
    { label: "Last Name", accessor: "lastname" }, // Example of nested accessor
    // { label: "Sent", accessor: "email_sent_counter" },
    { label: "Email", accessor: "email" },
    { label: "Status", accessor: "status" },
  ];
  const membersColumns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    // { label: "Status", accessor: "status" },
    { label: "Last Name", accessor: "lastname" }, // Example of nested accessor
    // { label: "Sent", accessor: "email_sent_counter" },
    { label: "Email", accessor: "email" },
    { label: "Status", accessor: "status" },
  ];
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Layout
      component={
        <div>
          <div className="pb-5 flex justify-end ">
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="py-3 flex"
            >
              <span className="mt-1 pe-1">
                <FaPlus />
              </span>{" "}
              Invite A Member
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <div>
                <Heading
                  className="text-2xl font-bold text-center"
                  text={"Invitations"}
                />
              </div>
              <Table
                columns={columns}
                data={invitationData}
                totalItems={pagination?.totalItems}
                itemsPerPage={10}
                onPageChange={(page) => fetchData(page)}
              />
            </div>
            <div>
              <div>
                <Heading
                  className="text-2xl font-bold text-center"
                  text={"Team Members"}
                />
              </div>
              <Table
                columns={membersColumns}
                data={membersData}
                totalItems={memberPagination?.totalItems}
                itemsPerPage={10}
                onPageChange={(page) => fetchMemberData(page)}
              />
            </div>
          </div>
          <div>
            {/* Modal Component */}
            <Modal
              isOpen={isOpen}
              onClose={handleClose}
              title="Invite Member "
              body=<ModalBody loading={isLoading} />
              saveButtonText="Save Changes"
              closeButtonText="Dismiss"
              size="md"
              noStartMargin={isCollapsed}
            />
          </div>
        </div>
      }
    ></Layout>
  );
};

export default Team;
