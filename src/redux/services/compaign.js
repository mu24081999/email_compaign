// authActions.js
import axios from "axios";
import {
  invalidRequest,
  compaignRequestLoading,
  addCompaign,
  updateCompaign,
  deleteCompaign,
  getCompaignDetails,
  getCompaignAnalytics,
  getCompaigns,
} from "../slices/compaign";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addCompaignRec = (token, data) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/compaign/create-compaign`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addCompaign(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserCompaignsApi(token, data.user_id));
        return {
          done: true,
          id: response?.data?.data?.campaign?.id,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendCompaign = (token, data) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/email/send-bulk`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        // dispatch(getTemplates(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const sendCompaignApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/compaign/send-compaign/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        // dispatch(getTemplates(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateCompaignRec = (token, data, id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .put(`${backendURL}/compaign/update-compaign/${id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateCompaign(response.data.message));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllCompaignsApi = (token) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/compaign/compaigns`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCompaigns(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserCompaignsApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/compaign/user-compaigns/${user_id}`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCompaigns(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readCompaign = (token, id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/compaign/compaign/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCompaignDetails(response.data.data.campaign));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const compaignAnalytics = (token, id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/compaign/analytics/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCompaignAnalytics(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteCompaignApi = (token, id) => async (dispatch) => {
  try {
    dispatch(compaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .delete(`${backendURL}/compaign/compaign/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteCompaign(response.data.message));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
