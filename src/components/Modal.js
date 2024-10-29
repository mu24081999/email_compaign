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
}) => {
  const sizeClasses = {
    sm: "w-10/12 md:w-1/4",
    md: "w-10/12 md:w-1/2",
    lg: "w-10/12 md:w-3/4",
    xl: "w-[99%]  h-[90vh] mt-20",
  };

  return (
    <div
      className={` backdrop-blur-sm fixed inset-0 flex justify-center items-start md:items-center pt-10 md:pt-0 bg-black bg-opacity-30 transition-opacity duration-1000 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative ${
          sizeClasses[size]
        }   bg-white rounded shadow-lg transform transition-all duration-1000 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-full scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-600">{title}</h2>
        </div>

        {/* Modal Body */}
        <div className="w-full p-3">{body}</div>

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
