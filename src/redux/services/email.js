import axios from "axios";
import {
  invalidRequest,
  emailRequestLoading,
  addEmailAccount,
  updateEmailAccount,
  deleteEmailAccount,
  getEmailAccountDetails,
  getEmailAccounts,
} from "../slices/email";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addEmailAccountApi = (token, data) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/email-accounts/create-email-account`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addEmailAccount(response.data.message));
        toast.success(response.data.message);
        dispatch(getEmailAccountsApi(token));
        return {
          done: true,
          id: response?.data?.data?.email_account?.id,
        };
      });
    return response;
  } catch (error) {
    dispatch(invalidRequest(error.message));
  }
};
export const updateEmailAccountApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .put(
        `${backendURL}/email-accounts/update-email-account/${id}`,
        data,
        config
      )
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateEmailAccount(response.data.message));
        toast.success(response.data.message);
        dispatch(getEmailAccountsApi(token));

        return {
          done: true,
          id: response?.data?.data?.email_account?.id,
        };
      });
    return response;
  } catch (error) {
    dispatch(invalidRequest(error.message));
  }
};
export const getEmailAccountsApi = (token, query) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .get(`${backendURL}/email-accounts/get-email-accounts?${query}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getEmailAccounts(response.data.data));
      });
    return response;
  } catch (error) {
    dispatch(invalidRequest(error.message));
  }
};
export const getEmailAccountDetailsApi = (token, id) => async (dispatch) => {
  try {
    dispatch(emailRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .get(`${backendURL}/email-accounts/get-email-account/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getEmailAccountDetails(response.data.data.email_account));
      });
    return response;
  } catch (error) {
    dispatch(invalidRequest(error.message));
  }
};
