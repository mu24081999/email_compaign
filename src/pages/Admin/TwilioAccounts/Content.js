import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../redux/services/user";
import {
  closeAccount,
  getAllTwilioAccounts,
  getClaimedNumbersApi,
} from "../../../redux/services/twilio";
import _ from "lodash";
import { setCurrentAccount } from "../../../redux/slices/twilio";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import InputField from "../../../components/FormFields/InputField/InputField";
import { FaRegEdit, FaRegEnvelope } from "react-icons/fa";
import Checkbox from "../../../components/FormFields/Checkbox/Checkbox";
const Content = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const friendlyNameWatcher = watch("friendlyName");
  const sidWatcher = watch("sid");
  const activeWatcher = watch("active");
  const { token } = useSelector((state) => state.auth);
  const { twilioSubAccounts } = useSelector((state) => state.twilio);
  const [usersData, setUsersData] = useState([]);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  useEffect(() => {
    dispatch(getAllTwilioAccounts(token));
    return () => {};
  }, [token, dispatch]);
  const fetchData = (page) => {
    const query = `page=${page}`;
    dispatch(getUsersList(token, query));
  };
  const columns = [
    { label: "Accounnt Name", accessor: "friendlyName", type: "link" },

    { label: "Account ID", accessor: "sid" },
    { label: "Status", accessor: "status" },

    {
      label: "Actions",
      accessor: "actions",
      type: "actions",
      variant: "green",
    },
  ];
  const filterData = useCallback(() => {
    const filteredData = [];
    Array.isArray(twilioSubAccounts) &&
      twilioSubAccounts?.map((usr) => {
        return filteredData?.push({
          ...usr,

          status:
            usr.status === "active" ? (
              <p style={{ color: "green" }}>Active</p>
            ) : (
              <p style={{ color: "red" }}> {_.capitalize(usr.status)}</p>
            ),
          actions: [
            {
              label: "Phone Numbers",
              onClick: () => {
                const params = {
                  accountSid: usr?.sid,
                  authToken: usr?.authToken,
                };
                dispatch(setCurrentAccount(usr));
                dispatch(getClaimedNumbersApi(token, params));
                navigateTo(`/admin/account/phone-numbers/${usr?.sid}`);
              },
            },
            {
              label: "Close Account",
              onClick: () => {
                const params = {
                  subaccountSid: usr?.sid,
                };
                !usr?.friendlyName?.includes("Main")
                  ? dispatch(closeAccount(token, params))
                  : toast.error("Un-Authorized Request");
              },
            },
          ],
        });
      });
    setUsersData(filteredData);
  }, [twilioSubAccounts, dispatch, navigateTo, token]);

  useEffect(() => {
    filterData();
  }, []);
  const handleSearch = () => {
    const filteredData = usersData?.filter(
      (key) =>
        key?.friendlyName?.includes(friendlyNameWatcher) ||
        key?.sid?.includes(sidWatcher)
    );
    setUsersData(filteredData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSearch)} className="flex gap-5 py-5">
        <div className="lg:w-1/3">
          <InputField
            name="friendlyName"
            control={control}
            svg={<FaRegEdit />}
            errors={errors}
            label="Friendly Name"
          />{" "}
        </div>
        <div className="lg:w-1/3">
          <InputField
            name="sid"
            control={control}
            svg={<FaRegEnvelope />}
            errors={errors}
            label="Account SID"
          />{" "}
        </div>

        <div className="">
          <Button type="submit" size="lg" className="py-2 ms-2">
            Search
          </Button>
          <Button
            type="button"
            onClick={filterData}
            size="lg"
            className="py-2 ms-2 bg-black"
          >
            Reset
          </Button>
        </div>
      </form>
      <div>
        <div>
          <Table
            columns={columns}
            data={usersData}
            pagination={false}
            actions={false}
            // bulkActions={bulkActions}
            totalItems={pagination?.totalItems}
            itemsPerPage={10}
            onPageChange={(page) => fetchData(page)}
            // actions={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
