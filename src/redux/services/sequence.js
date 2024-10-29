import axios from "axios";
import {
  sequenceRequestLoading,
  invalidRequest,
  addSequence,
  updateSequence,
  deleteSequence,
  getSequence,
  getSequences,
} from "../slices/sequence";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getAllSequenceList = (token) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sequence/sequences`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSequences(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getSequenceDetails = (token, id) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sequence/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSequence(response.data.data.sequence));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getUserSequenceList = (token, user_id) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/sequence/user-sequences/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getSequences(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addSequenceRec = (token, data) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/sequence/create`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addSequence(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserSequenceList(token, data?.user_id));
        return {
          done: true,
          response: response?.data?.data?.sequence,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateSequenceRec = (token, data, id) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/sequence/update/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateSequence(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserSequenceList(token, data?.user_id));
        return {
          done: true,
          response: response?.data?.data?.sequence,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const deleteSequenceRec = (token, id, user_id) => async (dispatch) => {
  try {
    dispatch(sequenceRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/sequence/delete/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteSequence(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserSequenceList(token, user_id));
        return {
          done: true,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
