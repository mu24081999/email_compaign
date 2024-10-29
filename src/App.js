import React from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "flowbite";
import { useSelector } from "react-redux";
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 h-screen dark:text-white">
      <ToastContainer autoClose={2000} position="bottom-right" />
      <RouterProvider router={routes(isAuthenticated)} />
    </div>
  );
};

export default App;
