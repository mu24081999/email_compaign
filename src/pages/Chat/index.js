import React from "react";
import Layout from "../../layout/Layout";
import Content from "./Content";
const index = () => {
  return (
    <div>
      <Layout component={<Content />} />
    </div>
  );
};

export default index;
