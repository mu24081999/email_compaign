import React from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
// import Footer from "../components/Footer";

const Layout = ({ component }) => {
  return (
    <div>
      <Navbar showBrand={true} />
      <Container component={component} />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
