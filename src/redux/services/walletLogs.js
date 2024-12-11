import axios from "axios";
import {
  logsRequestLoading,
  invalidRequest,
  addLogs,
  getLogs,
} from "../slices/walletLogs";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getLogsApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(logsRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/wallet-logs/user/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getLogs(response.data.data.logs));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addLogsApi = (token, data) => async (dispatch) => {
  try {
    dispatch(logsRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/wallet-logs`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addLogs(response.data.data.logs));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
