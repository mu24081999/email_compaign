import React from "react";

const ModalBody = ({ htmlContent }) => {
  return (
    <div>
      {" "}
      <iframe
        srcDoc={htmlContent}
        className="w-full h-[81vh] border"
        title="Exported HTML Preview"
      ></iframe>
    </div>
  );
};

export default ModalBody;
