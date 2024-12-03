import axios from "axios";
import {
  uniboxRequestLoading,
  invalidRequest,
  getCampaignReplies,
  getReply,
  getEmailReplies,
  sendSubReply,
} from "../slices/unibox";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getCampaignRepliesApi =
  (token, campaign_id) => async (dispatch) => {
    try {
      dispatch(uniboxRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/email/campaign-email-replies/${campaign_id}`,
          config
        )
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getCampaignReplies(response.data.data.replies));
        });
    } catch (error) {
      return dispatch(invalidRequest(error.message));
    }
  };
export const getUserRepliesApi = (token, user_id) => async (dispatch) => {
  try {
    dispatch(uniboxRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/email/get-user-replies/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCampaignReplies(response.data.data.replies));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const sendEmailReply = (token, data) => async (dispatch) => {
  try {
    dispatch(uniboxRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/email/send-reply`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendSubReply(response.data.message));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
