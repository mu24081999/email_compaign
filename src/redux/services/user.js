// authActions.js
import axios from "axios";
import {
  invalidRequest,
  userRequestLoading,
  updatedUser,
  getAllUsers,
} from "../slices/user";
import { toast } from "react-toastify";
import { updateMe } from "../slices/auth";
const backendURL = `${process.env.REACT_APP_BACKEND_URL_PRODUCTION}`;

export const updateUserRec = (token, user_id, data) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const is_updated = await axios
      .put(`${backendURL}/users/${user_id}`, data, config)
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response);
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(updatedUser(response.data.message));
        dispatch(updateMe(response.data.data.userData));
        toast.success(response.data.message);
        return response?.data?.data?.userData;
      });
    return is_updated;
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};
// export const storeProperty = (token, data) => async (dispatch) => {
//   try {
//     dispatch(userRequestLoading());
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "x-access-token": token,
//       },
//     };
//     await axios
//       .post(`${backendURL}/properties/add-property`, data, config)
//       .then((response) => {
//         if (response?.data?.statusCode !== 200) {
//           toast.error(response.data.message);
//           return dispatch(invalidRequest(response.data.message));
//         }
//         dispatch(addProperty(response.data.message));
//         toast.success(response.data.message);
//         dispatch(getPropertiesList(token));
//       });
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//   }
// };
export const getUsersList = (token, query) => async (dispatch) => {
  try {
    dispatch(userRequestLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    await axios
      .get(`${backendURL}/users?${query && query}`, config)
      .then((response) => {
        if (response?.data?.statusCode !== 200) {
          toast.error(response.data.message);
          return dispatch(invalidRequest(response.data.message));
        }
        dispatch(getAllUsers(response.data.data));
      });
  } catch (e) {
    dispatch(invalidRequest(e.message));
  }
};

// export const getPropertyByIdRec = (token, property_id) => async (dispatch) => {
//   try {
//     dispatch(userRequestLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     };
//     await axios
//       .get(`${backendURL}/properties/property-by-id/${property_id}`, config)
//       .then((response) => {
//         console.log("🚀 ~ .then ~ response:", response);
//         if (response?.data?.statusCode !== 200) {
//           toast.error(response.data.message);
//           return dispatch(invalidRequest(response.data.message));
//         }
//         dispatch(getPropertyById(response.data.data.boardData));
//       });
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//   }
// };

// export const deleteBoardRec = (token, board_id) => async (dispatch) => {
//   try {
//     dispatch(boardRequestLoading());
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     };
//     await axios
//       .delete(`${backendURL}/user/board/delete-board/${board_id}`, config)
//       .then((response) => {
//         console.log("🚀 ~ .then ~ response:", response);
//         if (response?.data?.statusCode !== 200) {
//           toast.error(response.data.message);
//           return dispatch(invalidRequest(response.data.message));
//         }
//         dispatch(deleteBoard(response.data.message));
//         dispatch(getBoardList(token));
//         toast.success(response.data.message);
//       });
//   } catch (e) {
//     dispatch(invalidRequest(e.message));
//   }
// };
