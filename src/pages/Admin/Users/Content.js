import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../redux/services/user";
import { loginUser } from "../../../redux/services/auth";
const Content = () => {
  const { token, user_id } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState([]);
  const [pagination, setPagination] = useState({});
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList(token));
    return () => {};
  }, [token, dispatch]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUsersList(token, query));
  };
  const columns = [
    { label: "First Name", accessor: "firstname", type: "link" },
    { label: "Last Name", accessor: "lastname" },
    { label: "Username", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "IP Address", accessor: "ip" },
    { label: "Configured Number", accessor: "twilio_selected_number" },
    { label: "Email Verified", accessor: "verified" },
    { label: "Online", accessor: "connected" },
    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  useEffect(() => {
    const filteredData = [];
    Array.isArray(users?.usersData) &&
      users?.usersData?.map((usr) => {
        return filteredData?.push({
          ...usr,
          connected: usr.connected ? (
            <li style={{ color: "green" }}>Online</li>
          ) : (
            <li style={{ color: "red" }}> Offline</li>
          ),
          verified: usr.verified ? (
            <p style={{ color: "green" }}>Verified</p>
          ) : (
            <p style={{ color: "gold" }}> Pending</p>
          ),
          actions: [
            {
              color: "green",
              label: "Login",
              onClick: () =>
                dispatch(
                  loginUser({ email: usr?.email, password: usr?.password })
                ),
            },
            {
              color: "green",
              label: "Subscription",
              onClick: () =>
                navigateTo(`/admin/user/update-subscription/${usr?.id}`),
            },
          ],
        });
      });
    setUsersData(filteredData);
    setPagination(users?.pagination);

    return () => {};
  }, [users, dispatch, navigateTo, user_id]);
  return (
    <div>
      <div>
        <div className="py-3">
          <Button onClick={() => navigateTo("/admin/add-user")} className="">
            Add User
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            data={usersData}
            totalItems={pagination?.totalItems}
            itemsPerPage={10}
            onPageChange={(page) => fetchData(page)}
            actions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
