import React from "react";

const Container = ({ component }) => {
  return (
    <div className="w-full overflow-scroll">
      <div className="pt-20 px-5 max-w-screen-xl m-auto">{component}</div>
    </div>
  );
};

export default Container;
