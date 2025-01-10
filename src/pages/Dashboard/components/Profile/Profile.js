import React, { useEffect } from "react";
import Tabs from "../../../../components/Tabs";
import AccountSettings from "./components/AccountSetting";
import Layout from "../../../../layout/Layout";
import PasswordReset from "./components/PasswordReset";
import ConfigureNumber from "./components/ConfigureNumber";
import { useDispatch, useSelector } from "react-redux";
import { getClaimedNumbersApi } from "../../../../redux/services/twilio";
import TwoFA from "./components/TwoFA";
const Profile = () => {
  const dispatch = useDispatch();
  const { claimedNumbers, isLoading } = useSelector((state) => state.twilio);
  const { token, user } = useSelector((state) => state.auth);
  const tabsData = [
    {
      id: "account_settings",
      label: "Account Settings",
      content: <AccountSettings />,
    },
    {
      id: "security",
      label: "Security",
      content: <PasswordReset />,
    },
    {
      id: "configure_number",
      label: "Configure Number",
      content: (
        <ConfigureNumber
          claimedNumbers={claimedNumbers}
          isLoading={isLoading}
          dispatch={dispatch}
          user={user}
          token={token}
        />
      ),
    },
  ];
  useEffect(() => {
    dispatch(
      getClaimedNumbersApi(token, {
        accountSid: user.accountSid,
        authToken: user.authToken,
      })
    );
  }, [token, user, dispatch]);
  return <Layout component={<Tabs tabsData={tabsData} />} />;
};

export default Profile;
