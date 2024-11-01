// authActions.js
import axios from "axios";
import {
  invalidRequest,
  dashboardRequestLoading,
  getAnalytics,
} from "../slices/dashboard";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getCompaignsAnalytics = (token) => async (dispatch) => {
  try {
    dispatch(dashboardRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios.get(`${backendURL}/dashboard`, config).then((response) => {
      console.log("🚀 ~ .then ~ response:", response);
      if (response?.data?.statusCode !== 200) {
        toast.error(response.data.message);
        return dispatch(invalidRequest(response.data.message));
      }
      dispatch(getAnalytics(response.data.data));
    });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
