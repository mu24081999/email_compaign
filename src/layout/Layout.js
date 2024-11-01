import React from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import SidebarWithNavbar from "../components/SidebarWithNavbar";
// import Footer from "../components/Footer";

const Layout = ({ component }) => {
  return (
    <div>
      {/* <Navbar showBrand={true} /> */}
      <SidebarWithNavbar component={component} />
      {/* <Container component={component} /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
