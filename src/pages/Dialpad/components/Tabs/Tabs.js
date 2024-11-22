import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./tabs.css";
import React, { useEffect, useState } from "react";
import Table from "../../../../../components/Table/Table";
import Pagination from "../../../../../components/Pagination/Pagination";
import CallLogs from "./components/CallLogs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClaimedNumbers,
  getAvailableNumbers,
  getCallLogs,
} from "../../../../../redux/services/signalwire";
import PhoneNumbers from "./components/PhoneNumber";
import ClaimedPhoneNumbers from "./components/ClaimedPhoneNumber";

const TabsComponent = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const productColumns = [
    { label: "From", accessor: "from" },
    { label: "To", accessor: "to" },
    { label: "Date", accessor: "date" },
    { label: "Recording", accessor: "recording" },
  ];

  const productData = [
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
    {
      from: "+923174660027",
      to: "+923174660027",
      date: "30 Oct 2024",
      recording: "...",
    },
  ];

  const [recordings, setRecordings] = useState(productData);
  const handleDataPagination = (data) => {
    setRecordings(data);
  };
  useEffect(() => {
    dispatch(
      getAvailableNumbers(token, {
        numberType: "local",
        region: "WA",
        country_iso: "US",
      })
    );
    dispatch(getAllClaimedNumbers(token));
    dispatch(
      getCallLogs(token, {
        api_token: "PT2b49a60637f0aca688588707eebd9c0e7253f96f58c24b3d",
        project_id: "5de25e8d-290d-4b31-a7a3-c3914a6d68d8",
        space_url: "kki9ew2.signalwire.com",
      })
    );
  }, [token, dispatch]);
  return (
    <div classname="">
      <Tabs>
        <TabList>
          <Tab>Logs</Tab>
          <Tab>Claimed Numbers</Tab>
          <Tab>Voicemail</Tab>
          <Tab>Available Numbers</Tab>
        </TabList>

        <TabPanel>
          <CallLogs />
        </TabPanel>
        <TabPanel>
          <ClaimedPhoneNumbers />
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel>
          <PhoneNumbers />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabsComponent;
