import React from "react";
import Tabs from "../../../../components/Tabs";
import AccountSettings from "./components/AccountSetting";
import Layout from "../../../../layout/Layout";
import PasswordReset from "./components/PasswordReset";
const Profile = () => {
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
  ];
  return <Layout component={<Tabs tabsData={tabsData} />} />;
};

export default Profile;
