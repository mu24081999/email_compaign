import React from "react";
import EmailEditorComponent from "./components/EmailEditor";
import Layout from "../../layout/Layout";
import useMain from "../../context/Main/useMain";

const EmailTemplate = () => {
  const { EmailEditor } = useMain();
  return (
    <div>
      {/* <Layout component={<EmailEditorComponent />} /> */}
      <EmailEditor />
    </div>
  );
};

export default EmailTemplate;
