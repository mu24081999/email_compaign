import axios from "axios";
import {
  optionsRequestLoading,
  addOptions,
  updateOptions,
  getOptions,
  invalidRequest,
} from "../slices/options";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addOptionsApi = (token, data) => async (dispatch) => {
  try {
    dispatch(optionsRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/options`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addOptions(response.data.message));
        toast.success(response.data.message);

        return {
          done: true,
          response: response.data.data.newOptions,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateOptionsApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(optionsRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .put(`${backendURL}/options/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateOptions(response.data.message));
        toast.success(response.data.message);
        return {
          done: true,
          response: response.data.data.option,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getOptionsApi = (token, compaign_id) => async (dispatch) => {
  try {
    dispatch(optionsRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/options/${compaign_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getOptions(response.data.data.optionData));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
