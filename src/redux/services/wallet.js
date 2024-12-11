import axios from "axios";
import {
  walletRequestLoading,
  addWallet,
  updateWallet,
  getWallet,
  invalidRequest,
} from "../slices/wallet";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const getWalletApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(walletRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/wallet/user/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getWallet(response.data.data.wallet));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addWalletApi = (token, data) => async (dispatch) => {
  try {
    dispatch(walletRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios.post(`${backendURL}/wallet`, data, config).then((response) => {
      if (response?.data?.statusCode !== 200) {
        toast.error(response.data.message);
        return dispatch(invalidRequest(response.data.message));
      }
      dispatch(addWallet(response.data.data.wallet));
    });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateWalletApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(walletRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/wallet/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateWallet(response.data.message));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
