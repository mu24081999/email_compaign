// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: {},
    user_id: "",
    message: "",
    error: "",
    token: "",
    type: "",
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    authRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
      state.user = {};
      state.user_id = "";
      state.token = "";
      state.isAuthenticated = false;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
    twoFA: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
    updatedMe: (state, action) => {
      state.user = action.payload;
    },
    contactUs: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    logout: (state, action) => {
      state.user = {};
      state.user_id = "";
      state.token = "";
      state.isLoading = false;
      state.error = "";
      state.message = action.payload;
      state.isAuthenticated = false;
      state.type = "Success";
    },
    register: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      // state.isAuthenticated = true;
      state.isLoading = false;
      state.message = "Registered Successfully.";
      state.type = "Success";
    },
    forgotPassword: (state, action) => {
      state.user = "";
      state.token = "";
      state.user_id = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = "";
      state.message = action.payload;
      state.type = "Success";
    },
    verifyOtp: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.type = "Success";
    },
    resetPassword: (state, action) => {
      // state.user = action.payload;
      // state.token = action.payload.token;
      // state.user_id = action.payload.id;
      // state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Reset Success";
      state.type = "Success";
    },
    reloadPage: (state, action) => {
      state.message = "";
      state.error = "";
    },
    setAccount: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.user_id = action.payload.id;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = "";
      state.message = "Login Success";
      state.type = "Success";
    },
  },
});

export default authSlice.reducer;
export const {
  authRequestLoading,
  invalidRequest,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  reloadPage,
  updatedMe,
  verifyOtp,
  setAccount,
  twoFa,
  contactUs,
} = authSlice.actions;
