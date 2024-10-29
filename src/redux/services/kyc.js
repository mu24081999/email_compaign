import axios from "axios";
import {
  invalidRequest,
  kycRequestLoading,
  addKYC,
  updateKYC,
  deleteKYC,
  getKYCDetails,
  getKYCList,
} from "../slices/kyc";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addKYCRec = (token, data) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_added = await axios
      .post(`${backendURL}/kyc/create-kyc`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addKYC(response.data.message));
        dispatch(getAllKycList(token));
        toast.success(response.data.message);
        return true;
      });
    return is_added;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getAllKycList = (token) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/kyc/get-kyc-list`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getKYCList(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const readKYCDetails = (token, form_id) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/kyc/get-kyc-details/${form_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getKYCDetails(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserKYCList = (token) => async (dispatch) => {
  try {
    dispatch(kycRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/kyc/get-user-kyc-form`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getKYCDetails(response.data.data.kycData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
