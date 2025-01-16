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
  const {
    token,
    isAuthenticated,
    user_id,
    user,
    isLoading: authLoading,
  } = useSelector((state) => state.auth);

  const { subscription, isLoading: subscriptionLoading } = useSelector(
    (state) => state.subscription
  );
  const [startingAuth, setStartingAuth] = useState(false);

  useEffect(() => {
    if (token && user_id) dispatch(getUserSubscriptionApi(token, user_id));
  }, [dispatch, token, user_id]);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (subscription) {
      const checkSubscriptionValidity = () => {
        setStartingAuth(true);
        const currentDate = new Date();
        const startDate = new Date(subscription.start_date);
        const endDate = new Date(subscription.end_date);

        // Check if current date is within start and end date, and if status is active
        const isValidSubscription =
          // currentDate >= startDate &&
          currentDate <= endDate && subscription.status === "active";

        setIsValid(isValidSubscription);
        setStartingAuth(false);
      };

      checkSubscriptionValidity();
    }
  }, [subscription]);
  const email_verified = user.verified;

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 h-screen dark:text-white">
      <ToastContainer autoClose={2000} position="bottom-right" />
      <RouterProvider
        router={routes(
          isAuthenticated,
          isValid,
          authLoading,
          subscriptionLoading,
          startingAuth,
          email_verified,
          user
        )}
      />
    </div>
  );
};

export default App;
