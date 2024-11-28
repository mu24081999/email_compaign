import React from "react";

import Nav from "./DialpadComponents/Nav";
import Dialer from "./DialpadComponents/Dialer";

const Dialpad = () => {
  return (
    <div>
      <Nav />
      <div className=" grid pt-10 place-items-center ">
        <Dialer />
      </div>
    </div>
  );
};

export default Dialpad;
