import axios from "axios";
import {
  invalidRequest,
  teamRequestLoading,
  sendInvitation,
  getUserMembers,
} from "../slices/team";
import {
  invalidRequest as authInvalidRequest,
  authRequestLoading,
  register,
} from "../slices/auth";
import { toast } from "react-toastify";

const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;
export const sendInvitationApi = (token, data) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.post(
      `${backendURL}/team/invite-member`,
      data,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(sendInvitation(response.data.data));
    toast.success(response.data.message);
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const getOwnerInvitations =
  (token, user_id, query) => async (dispatch) => {
    try {
      dispatch(teamRequestLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios.get(
        `${backendURL}/team/invitations/${user_id}?${query && query}`,
        config
      );
      if (!response.data.statusCode === 200) {
        dispatch(invalidRequest(response.data.message));
        return toast.error(response.data.message);
      }
      dispatch(sendInvitation(response.data.data));
    } catch (e) {
      dispatch(invalidRequest(e.message));
    }
  };
export const getOwnerMembers = (token, user_id, query) => async (dispatch) => {
  try {
    dispatch(teamRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await axios.get(
      `${backendURL}/team/members/${user_id}?${query && query}`,
      config
    );
    if (!response.data.statusCode === 200) {
      dispatch(invalidRequest(response.data.message));
      return toast.error(response.data.message);
    }
    dispatch(getUserMembers(response.data.data));
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
export const registerTeamMember = (registerData) => async (dispatch) => {
  try {
    dispatch(authRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${backendURL}/team/register-member`,
      registerData,
      config
    );
    if (response?.data?.statusCode !== 200) {
      toast.error(response.data.message);
      return dispatch(authInvalidRequest(response.data.message));
    }
    toast.success(response.data.message);
    dispatch(register(response.data.data.userData));
    return response.data;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
