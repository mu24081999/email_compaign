// features/auth/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    users: [],
    userDetails: {},
    activity: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    userRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.users = [];
      state.userDetails = {};
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
    },
    getAllUsers: (state, action) => {
      state.error = "";
      state.users = action.payload;
      state.message = "success";
      state.isLoading = false;
      state.type = "success";
    },
    addUser: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    updatedUser: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    getUserById: (state, action) => {
      state.userDetails = action.payload;
      state.message = "";
      state.isLoading = false;
      state.type = "success";
      state.token = "";
    },
    deleteUser: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    setActivity: (state, action) => {
      state.activity = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
  },
});

export default userSlice.reducer;
export const {
  userRequestLoading,
  getAllUsers,
  addUser,
  updatedUser,
  getUserById,
  deleteUser,
  invalidRequest,
  setActivity,
} = userSlice.actions;
