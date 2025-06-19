import axios from "axios";
import {
  unsubscribedRequestLoading,
  invalidRequest,
  getUnsubscribedEmails,
} from "../slices/unsubscribed";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getUnsubscribedEmailsApi = (token, query) => async (dispatch) => {
  try {
    dispatch(unsubscribedRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/unsubscribed?${query && query}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUnsubscribedEmails(response.data.data));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addUnsubscribedEmailsApi =
  (token, formData) => async (dispatch) => {
    try {
      dispatch(unsubscribedRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .post(`${backendURL}/unsubscribed`, formData, config)
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getUnsubscribedEmails(response.data.data));
        });
    } catch (error) {
      return dispatch(invalidRequest(error.message));
    }
  };
