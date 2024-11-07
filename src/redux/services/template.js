import axios from "axios";
import {
  templateRequestLoading,
  invalidRequest,
  addTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplate,
  getTemplates,
} from "../slices/templates";

import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const getAllTemplateList = (token) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/template/templates`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTemplates(response.data.data));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};

export const getTemplateDetails = (token, id) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/template/template/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTemplate(response.data.data.template));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const getUserTemplateList = (token, user_id) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/template/user-templates/${user_id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getTemplates(response.data.data));
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const addTemplateRec = (token, data) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/template/create`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addTemplate(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserTemplateList(token, data?.user_id));
        return {
          done: true,
          response: response?.data?.data?.template,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const updateTemplateRec = (token, data, id) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/template/update/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateTemplate(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserTemplateList(token, data?.user_id));
        return {
          done: true,
          response: response?.data?.data?.template,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const deleteTemplateRec = (token, id, user_id) => async (dispatch) => {
  try {
    dispatch(templateRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/template/delete/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteTemplate(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserTemplateList(token, user_id));
        return {
          done: true,
        };
      });
    return response;
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
