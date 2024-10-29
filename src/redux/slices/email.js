import { createSlice } from "@reduxjs/toolkit";
export const emailSlice = createSlice({
  name: "email",
  initialState: {
    isLoading: false,
    emails: [],
    email: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    emailRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.emails = [];
      state.email = {};
      state.isLoading = false;
    },
    addEmailAccount: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateEmailAccount: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getEmailAccounts: (state, action) => {
      state.emails = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getEmailAccountDetails: (state, action) => {
      state.email = action.payload;
      state.error = "";
      state.isLoading = false;
    },
  },
});
export default emailSlice.reducer;
export const {
  emailRequestLoading,
  invalidRequest,
  addEmailAccount,
  updateEmailAccount,
  deleteEmailAccount,
  getEmailAccounts,
  getEmailAccountDetails,
} = emailSlice.actions;
