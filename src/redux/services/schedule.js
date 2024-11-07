import axios from "axios";
import {
  invalidRequest,
  scheduleRequestLoading,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getSchedules,
} from "../slices/schedule";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addScheduleApi = (token, data) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/schedules`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSchedule(response.data.message));
        dispatch(getSchedulesApi(token));
        toast.success(response.data.message);

        return {
          done: true,
          response: response.data.data.response,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateScheduleApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .put(`${backendURL}/schedules/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateSchedule(response.data.message));
        toast.success(response.data.message);
        return {
          done: true,
          response: response.data.data.response,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getSchedulesApi = (token, query) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/schedules?${query}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSchedules(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getScheduleApi = (token, id) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .get(`${backendURL}/schedules/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSchedule(response.data.data.schedule));
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const deleteScheduleApi = (token, id) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/schedules/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteSchedule(response.data.message));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
