import axios from "axios";
import {
  verificationRequestLoading,
  invalidRequest,
  addVerification,
  getUserVerification,
  updateVerification,
} from "../slices/verification";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getUserVerificationApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(verificationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/verifications/user/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserVerification(response.data.data.a2p));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addVerificationApi = (token, data) => async (dispatch) => {
  try {
    dispatch(verificationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/verifications`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addVerification(response.data.message));
        dispatch(getUserVerificationApi(token, data?.user_id));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateVerificationApi =
  (token, data, user_id) => async (dispatch) => {
    try {
      dispatch(verificationRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .put(`${backendURL}/verfications/:${user_id}`, data, config)
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(updateVerification(response.data.message));
          dispatch(getUserVerificationApi(token, data?.user_id));
          toast.success(response.data.message);
        });
    } catch (error) {
      return dispatch(invalidRequest(error.message));
    }
  };
