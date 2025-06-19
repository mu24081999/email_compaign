import React from "react";
import DashboardCard from "../../../../../../../components/DashboardCard";
import { FaRegEnvelope, FaRegEnvelopeOpen } from "react-icons/fa";
import {
  BsEnvelopeCheck,
  BsEnvelopeOpenHeart,
  BsEnvelopePlus,
  BsEnvelopeSlash,
} from "react-icons/bs";
import Button from "../../../../../../../components/Button";
import { IoIosRefresh } from "react-icons/io";
import { compaignAnalytics } from "../../../../../../../redux/services/compaign";

const Analystics = ({ data, loading, dispatch, token, id }) => {
  const refresh = () => {
    dispatch(compaignAnalytics(token, id));
  };
  const cards = [
    {
      heading: "Total Emails",
      value: data?.leads || "0",
      icon: <FaRegEnvelope size={28} className="text-blue-500" />,
    },
    {
      heading: "Email Sent",
      value: data?.sent || "0",
      icon: <BsEnvelopePlus size={28} className="text-yellow-500" />,
    },
    {
      heading: "Emails Remaining",
      value: data?.remaining || 0,
      icon: <BsEnvelopeCheck size={28} className="text-indigo-500" />,
    },
    {
      heading: "Emails Opened",
      value: data?.opens || 0,
      icon: <FaRegEnvelopeOpen size={28} className="text-cyan-500" />,
    },
    {
      heading: "Emails Bounce",
      value: data?.bounce || 0,
      icon: <BsEnvelopeSlash size={28} className="text-red-500" />,
    },
    {
      heading: "Warmup Emails",
      value: data?.warmupEmails || 0,
      icon: <BsEnvelopeOpenHeart size={28} className="text-orange-500" />,
    },
  ];
  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={refresh}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
          } shadow-md`}
        >
          <IoIosRefresh
            size={18}
            className={`${loading ? "animate-spin" : ""}`}
          />
          {loading ? "Refreshing..." : "Reload Analytics"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-center mb-2">{card.icon}</div>
            <div className="text-center text-3xl font-bold text-gray-800 dark:text-white">
              {card.value}
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-300 uppercase tracking-wide">
              {card.heading}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analystics;
