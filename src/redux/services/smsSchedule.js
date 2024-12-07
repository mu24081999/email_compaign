import axios from "axios";
import {
  invalidRequest,
  scheduleRequestLoading,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getSchedules,
} from "../slices/smsSchedule";
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
      .post(`${backendURL}/sms-schedules`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSchedule(response.data.message));
        dispatch(getSchedulesApi(token, `campaign_id=${data?.campaign_id}`));
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
      .put(`${backendURL}/sms-schedules/${id}`, data, config)
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
      .get(`${backendURL}/sms-schedules?${query}`, config)
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
export const getScheduleApis = (token, id) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .get(`${backendURL}/sms-schedules/${id}`, config)
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
export const deleteScheduleApi = (token, id, user_id) => async (dispatch) => {
  try {
    dispatch(scheduleRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .delete(`${backendURL}/sms-schedules/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteSchedule(response.data.message));
        const query = `user_id=${user_id}`;
        dispatch(getSchedulesApi(token, query));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
