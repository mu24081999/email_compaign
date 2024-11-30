import axios from "axios";
import {
  invalidRequest,
  subscriptionRequestLoading,
  addSubscription,
  getUserSubscription,
  getPaymentIntend,
} from "../slices/subscriptions";
import { toast } from "react-toastify";
import { login } from "../slices/auth";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const createPaymentIntendApi = (token, data) => async (dispatch) => {
  console.log("🚀 ~ createPaymentIntendApi ~ token:", token);
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/subscriptions/payment-intend`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getPaymentIntend(response.data.data.paymentData));
        toast.success(response.data.message);
        return {
          done: true,
          subscription: response.data.data.paymentData,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const createSubscriptionApi = (token, data) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/subscriptions`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSubscription(response.data.message));
        dispatch(getUserSubscriptionApi(token, data?.user_id));
        dispatch(login(response.data.data.userData));
        toast.success(response.data.message);
        return {
          done: true,
          subscription: response.data.data.subscription,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserSubscriptionApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(subscriptionRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .get(`${backendURL}/subscriptions/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserSubscription(response.data.data.subscription));
        return {
          done: true,
          response: response.data.data.subscription,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
