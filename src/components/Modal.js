import React from "react";

const Modal = ({
  isOpen,
  onClose,
  title = "Default Title",
  body = "Default body content goes here.",
  onSave,
  saveButtonText = "Save",
  closeButtonText = "Close",
  size = "md", // Default size
  noStartMargin = false,
}) => {
  const sizeClasses = {
    sm: "w-10/12 md:w-1/4",
    md: "w-10/12 md:w-1/2 mt-12",
    lg: "w-10/12 md:w-3/4",
    xl: "w-[99%]  h-[90vh] mt-20",
  };

  return (
    <div
      className={`${
        noStartMargin ? "" : "ml-64"
      } dark:bg-gray-800 dark:text-white backdrop-blur-sm fixed inset-0 flex justify-center items-start md:items-center pt-10 md:pt-0 bg-black bg-opacity-30 transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative ${
          sizeClasses[size]
        }   bg-white dark:bg-gray-800 rounded shadow-lg transform transition-all duration-1000 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-full scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 bg-red-500 hover:bg-red-600 text-2xl w-10 h-[52px]  focus:outline-none text-white"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="px-4 py-3 border-b bg-black border-gray-200">
          <h2 className="text-xl font-semibold text-white dark:text-white">
            {title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="w-full p-3  max-h-[70vh] overflow-scroll">{body}</div>

        {/* Modal Footer */}
        {/* <div className="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
          <button
            onClick={onSave}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none"
          >
            {saveButtonText}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"
          >
            {closeButtonText}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
