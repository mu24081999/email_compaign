import React, { useEffect, useState } from "react";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "flowbite";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriptionApi } from "./redux/services/subscription";
const App = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user_id } = useSelector(
    (state) => state.auth
  );
  const { subscription } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getUserSubscriptionApi(token, user_id));
  }, [dispatch, token, user_id]);
  const [isValid, setIsValid] = useState(false);
  console.log("🚀 ~ App ~ isValid:", isValid, subscription);
  useEffect(() => {
    if (subscription) {
      const checkSubscriptionValidity = () => {
        const currentDate = new Date();
        const startDate = new Date(subscription.start_date);
        const endDate = new Date(subscription.end_date);

        // Check if current date is within start and end date, and if status is active
        const isValidSubscription =
          // currentDate >= startDate &&
          currentDate <= endDate && subscription.status === "active";

        setIsValid(isValidSubscription);
      };

      checkSubscriptionValidity();
    }
  }, [subscription]);
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 h-screen dark:text-white">
      <ToastContainer autoClose={2000} position="bottom-right" />
      <RouterProvider router={routes(isAuthenticated, isValid)} />
    </div>
  );
};

export default App;
