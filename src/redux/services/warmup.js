import axios from "axios";
import {
  warmupRequestLoading,
  invalidRequest,
  addWarmup,
  updateWarmup,
  getWarmup,
} from "../slices/warmup";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addWarmupRec = (token, data) => async (dispatch) => {
  try {
    dispatch(warmupRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/warmup-email`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addWarmup(response.data.message));
        toast.success(response.data.message);
      });
  } catch (error) {
    toast.error(error.message);
    return dispatch(invalidRequest(error.message));
  }
};
export const sendWarmupEmail = (token, data) => async (dispatch) => {
  try {
    dispatch(warmupRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/warmup-email/send-warmup-email`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addWarmup(response.data.message));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getWarmupApi = (token, email_id) => async (dispatch) => {
  try {
    dispatch(warmupRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/warmup-email?email_id=${email_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getWarmup(response.data.data.warmup));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateWarmupRec = (token, data, id) => async (dispatch) => {
  try {
    dispatch(warmupRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/warmup-emai/${id}l`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateWarmup(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
