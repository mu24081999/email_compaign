import axios from "axios";
import {
  invalidRequest,
  leadRequestLoading,
  addLead,
  updateLead,
  deleteLead,
  getLeadDetails,
  getLeads,
} from "../slices/smsLeads";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const addLeadRec = (token, data) => async (dispatch) => {
  try {
    dispatch(leadRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/sms-lead/create-lead`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addLead(response.data.message));
        dispatch(getCompaignLeads(token, data?.leads[0]?.campaign_id));
        toast.success(response.data.message);
        return {
          done: true,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const updateLeadRec = (token, data, id) => async (dispatch) => {
  try {
    dispatch(leadRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .put(`${backendURL}/sms-lead/update-lead/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updateLead(response.data.message));
        dispatch(getCompaignLeads(token, data?.compaign_id));

        toast.success(response.data.message);
        return {
          done: true,
          id: response?.data?.data?.leadData?.id,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getAllLeads = (token) => async (dispatch) => {
  try {
    dispatch(leadRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios.get(`${backendURL}/sms-lead/leads`, config).then((response) => {
      if (response?.data?.statusCode !== 200) {
        toast.error(response.data.message);
        return dispatch(invalidRequest(response.data.message));
      }
      dispatch(getLeads(response.data.data));
    });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getCompaignLeads =
  (token, campaign_id, query) => async (dispatch) => {
    try {
      console.log("🚀 ~ campaign_id:", campaign_id);

      dispatch(leadRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/sms-lead/campaign-leads/${campaign_id}?${query}`,
          config
        )
        .then((response) => {
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getLeads(response.data.data));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const deleteLeadRec = (token, ids, compaign_id) => async (dispatch) => {
  try {
    dispatch(leadRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sms-lead/delete-bulk`, { ids }, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteLead(response.data.data));
        dispatch(getCompaignLeads(token, compaign_id));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
