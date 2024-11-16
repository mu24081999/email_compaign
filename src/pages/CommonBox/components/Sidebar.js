"use client";

import { Sidebar } from "flowbite-react";
import { useForm } from "react-hook-form";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import InputField from "../../../components/FormFields/InputField/InputField";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { List } from "../../../components/ListGroup";
import { getCampaignRepliesApi } from "../../../redux/services/unibox.";

export function SidebarCom() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [campaignsData, setCampaignsData] = useState([]);
  const { compaigns } = useSelector((state) => state.compaign);
  console.log("🚀 ~ SidebarCom ~ compaigns:", campaignsData);
  useEffect(() => {
    if (compaigns?.campaignsData) {
      setCampaignsData(compaigns?.campaignsData);
    }
  }, [compaigns]);
  const getEmailReplies = (id) => {
    dispatch(getCampaignRepliesApi(token, id));
  };
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="Campaigns"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={twMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <div>
              <InputField
                name="search_campaign"
                control={control}
                svg={<FaSearch />}
                errors={errors}
                // placeholder="Enter your email address"
                label="Search Campaign..."
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />{" "}
            </div>{" "}
            <div>
              {/* <List listData={campaignsData} /> */}
              <ul className="font-extrabold ps-5 py-2">
                {campaignsData?.map((item, index) => (
                  <li
                    className=" list-item list-disc cursor-pointer"
                    key={index}
                    onClick={() => getEmailReplies(item?.id)}
                  >
                    {" "}
                    {item?.title}
                  </li>
                ))}
              </ul>
            </div>
            {/* <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item> */}
          </Sidebar.Collapse>

          {/* <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
