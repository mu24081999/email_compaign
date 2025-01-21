import axios from "axios";
import {
  twilioRequestLoading,
  invalidRequest,
  getCallToken,
  getCallLogs,
  getAvailableNumbers,
  getClaimedNumbers,
  claimPhoneNumber,
  getMessages,
  getTwilioAccounts,
} from "../slices/twilio";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const releasePhoneNumber = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/users/twilio/release-number`, formData, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const closeAccount = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/users/twilio/close-account`, formData, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        toast.success(response.data.message);
        dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllTwilioAccounts = (token) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/users//twilio/subaccounts`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTwilioAccounts(response.data.data.accountsData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getCallTokenApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/get-call-token`, formData, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCallToken(response.data.data.token));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getCallLogsApi = (token, formData, query) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/calling/logs?${query}`, formData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCallLogs(response.data.data));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getUserMessages = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/sms/account-messages`, formData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getMessages(response.data.data.messagesData));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getAvailableNumbersApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/calling/did-numbers`, formData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAvailableNumbers(response.data.data.availablePhoneNumbers));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getClaimedNumbersApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/calling/claimed-numbers`, formData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getClaimedNumbers(response.data.data.claimedNumbers));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const claimPhoneNumberApi = (token, formData) => async (dispatch) => {
  try {
    dispatch(twilioRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/twilio/claim-number`, formData, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.status !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(claimPhoneNumber(response.data.message));
        dispatch(
          getClaimedNumbersApi(token, {
            accountSid: formData.accountSid,
            authToken: formData.authToken,
          })
        );
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
