import React, { useState } from "react";
import Button from "../../../../../../../components/Button";
import UploadCSV from "./UploadCSV";
import { FaFileCsv } from "react-icons/fa";
import { FcBusinessContact } from "react-icons/fc";

import UploadManualEmail from "./UploadManualEmail";
const ModalBody = ({ close }) => {
  const [showMenu, setSHowMenu] = useState(true);
  const [showUploadCSV, setShowUploadCSV] = useState(false);
  const [showUploadManualEmail, setShowUploadManualEmail] = useState(false);
  const handleBack = () => {
    setSHowMenu(true);
    setShowUploadCSV(false);
    setShowUploadManualEmail(false);
  };
  const menuItems = [
    {
      name: "Upload CSV",
      description: "Upload ",
      text_color: "text-green-400",
      icon: <FaFileCsv color="green" />,
      onClick: () => {
        setSHowMenu(false);
        setShowUploadCSV(true);
        setShowUploadManualEmail(false);
      },
    },
    {
      name: "Manual Numbers",
      description: "Enter",
      text_color: "text-gray-800",
      icon: <FcBusinessContact color="green" />,
      onClick: () => {
        setSHowMenu(false);
        setShowUploadCSV(false);
        setShowUploadManualEmail(true);
      },
    },
  ];
  return (
    <div>
      {showMenu && (
        <div className="flex flex-col gap-3">
          {menuItems?.map((item, index) => (
            <div
              key={index}
              className={`hover:shadow-xl border-b hover:border hover:border-gray-500 py-10  text-[30px] space-x-3  rounded-lg ${item?.text_color} font-sans font-extrabold flex gap-5 p-5 cursor-pointer`}
              onClick={item?.onClick}
            >
              <span className="-mt-1">{item?.icon}</span>
              <span> {item?.name}</span>
            </div>
          ))}
        </div>
      )}
      {showUploadCSV && (
        <div>
          <Button onClick={handleBack}>Back</Button>
          <div>
            <UploadCSV close={close} />
          </div>
        </div>
      )}
      {showUploadManualEmail && (
        <div>
          <Button onClick={handleBack}>Back</Button>
          <UploadManualEmail close={close} />
        </div>
      )}
    </div>
  );
};

export default ModalBody;
