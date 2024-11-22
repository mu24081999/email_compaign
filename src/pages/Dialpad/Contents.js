import React from "react";
// import TabsComponent from "./components/Tabs/Tabs";
import Dialpad from "./components/Dialpad";
import Heading from "../../components/Heading";

const Contents = () => {
  return (
    <div>
      <Heading size="heading4xl" className="">
        Dialpad
      </Heading>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 p-5">
        {/* <TabsComponent /> */}
        <Dialpad />
      </div>
    </div>
  );
};

export default Contents;
