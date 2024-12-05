// authActions.js
import axios from "axios";
import {
  invalidRequest,
  campaignRequestLoading,
  addCampaign,
  sendCampaign,
  getCampaign,
  getCampaigns,
  pauseCampaign,
  resumeCompaign,
  deleteCampaign,
} from "../slices/smsCampaign";
import { toast } from "react-toastify";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const addCompaignRec = (token, data) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios
      .post(`${backendURL}/sms-campaign/create-sms-campaign`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(addCampaign(response.data.message));
        toast.success(response.data.message);
        dispatch(getUserCompaignsApi(token, data.user_id));
        return {
          done: true,
          id: response?.data?.data?.campaign?.id,
        };
      });
    return response;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const sendCompaignApi = (token, data, id) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sms-campaign/send-sms-campaign/${id}`, data, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(sendCampaign(response.data.data));
        toast.success(response.data.message);
      });
  } catch (error) {
    return dispatch(invalidRequest(error.message));
  }
};
export const pauseCompaignRec = (token, data) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sms-campaign/pause-sms-campaign`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(pauseCampaign(response.data.message));
        dispatch(readCompaign(token, data.campaign_id));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const resumeCompaignRec = (token, data) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(`${backendURL}/sms-campaign/resume-sms-campaign`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(resumeCompaign(response.data.message));
        dispatch(readCompaign(token, data.campaign_id));
        toast.success(response.data.message);
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

export const getAllCompaignsApi = (token) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/sms-campaign/get-all-campaigns`, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCampaigns(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getUserCompaignsApi =
  (token, user_id, query) => async (dispatch) => {
    try {
      dispatch(campaignRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios
        .get(
          `${backendURL}/sms-campaign/get-user-campaigns/${user_id}?${query}`,
          config
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response:", response);
          if (response?.data?.statusCode !== 200) {
            toast.error(response.data.message);
            return dispatch(invalidRequest(response.data.message));
          }
          dispatch(getCampaigns(response.data.data));
        });
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const readCompaign = (token, id) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/sms-campaign/campaign/${id}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getCampaign(response.data.data.campaign));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
// export const compaignAnalytics = (token, id) => async (dispatch) => {
//   try {
//     dispatch(campaignRequestLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     };
//     await axios
//       .get(`${backendURL}/compaign/analytics/${id}`, config)
//       .then((response) => {
//         if (response?.data?.statusCode !== 200) {
//           toast.error(response.data.message);
//           return dispatch(invalidRequest(response.data.message));
//         }
//         dispatch(getCompaignAnalytics(response.data.data));
//       });
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//   }
// };
export const deleteCompaignApi = (token, ids, user_id) => async (dispatch) => {
  try {
    dispatch(campaignRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .post(
        `${backendURL}/delete-sms-campaign/delete-sms-campaign`,
        { ids },
        config
      )
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(deleteCampaign(response.data.message));
        // dispatch(getUserCompaignsApi(token, user_id));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
