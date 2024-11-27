import axios from "axios";
import {
  twilioRequestLoading,
  invalidRequest,
  getCallToken,
} from "../slices/twilio";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
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
