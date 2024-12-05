import React from "react";

const ListItemCard = ({ icon, title, description, onClick }) => {
  return (
    <div onClick={onClick}>
      {" "}
      <div className="flex gap-3 p-5 border bg-white dark:text-white dark:bg-gray-900 border-gray-300 rounded-2xl shadow-lg hover:scale-105">
        <div className=" border-e border-gray-300 p-3">{icon}</div>
        <div>
          <div className="text-left font-extrabold">{title}</div>
          <div className="text-sm text-left">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItemCard;
