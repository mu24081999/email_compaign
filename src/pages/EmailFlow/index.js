import React, { useState } from "react";
import Content from "./Content";
import List from "./components/List";
import Layout from "../../layout/Layout";
import Tabs from "../../components/Tabs";

const index = () => {
  const tabsData = [
    {
      id: "addFlow",
      label: "Add New Template",
      content: <Content />,
    },
    {
      id: "list",
      label: "List",
      content: <List />,
    },
  ];
  return (
    <Layout
      component={
        <div>
          <Tabs tabsData={tabsData} />
        </div>
      }
    />
  );
};

export default index;
