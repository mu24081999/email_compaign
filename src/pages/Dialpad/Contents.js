import React from "react";
// import TabsComponent from "./components/Tabs/Tabs";
import Dialpad from "./components/Dialpad";
import Heading from "../../components/Heading";
import Sidebar from "./components/Sidebar";

const Contents = () => {
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 p-5 ">
        <div>
          <Sidebar />
        </div>
        <div className="col-span-2">
          <Dialpad />
        </div>
      </div>
    </div>
  );
};

export default Contents;
