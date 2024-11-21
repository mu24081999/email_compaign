import { createSlice } from "@reduxjs/toolkit";
export const validationSlice = createSlice({
  name: "validation",
  initialState: {
    isLoading: false,
    emails: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    validationRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.emails = [];
      state.isLoading = false;
    },
    getUserEmails: (state, action) => {
      state.emails = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    sendValidation: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default validationSlice.reducer;
export const {
  validationRequestLoading,
  invalidRequest,
  getUserEmails,
  sendValidation,
} = validationSlice.actions;
