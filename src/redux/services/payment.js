import axios from "axios";
import {
  paymentRequestLoading,
  invalidRequest,
  getUserPayments,
  getPayment,
  getPayments,
  addPayment,
  updatePayment,
} from "../slices/payment";
import { login } from "../slices/auth";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addPaymentRec = (token, data) => async (dispatch) => {
  try {
    dispatch(paymentRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/payments`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addPayment(response.data.message));
        toast.success("Payment Success");
        dispatch(login(response.data.data.userData));
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
