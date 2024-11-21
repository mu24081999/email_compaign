import axios from "axios";
import {
  validationRequestLoading,
  sendValidation,
  getUserEmails,
  invalidRequest,
} from "../slices/validation";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getUserValidatedEmails = (token, user_id) => async (dispatch) => {
  try {
    dispatch(validationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(
        `${backendURL}/validation/get-user-validated-emails/${user_id}`,
        config
      )
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getUserEmails(response.data.data.emailsData));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const sendValidationEmails = (token, data) => async (dispatch) => {
  try {
    dispatch(validationRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/validation/validate-emails`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendValidation(response.data.message));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
