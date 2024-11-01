import React from "react";
import EmailEditorComponent from "../../components/EmailEditor";
import Layout from "../../layout/Layout";

const EmailTemplate = () => {
  return (
    <div>
      <Layout component={<EmailEditorComponent />} />
    </div>
  );
};

export default EmailTemplate;
