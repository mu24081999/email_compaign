import { createSlice } from "@reduxjs/toolkit";
export const emailFlowSlice = createSlice({
  name: "emailFlow",
  initialState: {
    isLoading: false,
    emailFlows: [],
    emailFlow: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    emailFlowRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.isLoading = false;
    },
    getEmailFlows: (state, action) => {
      state.emailFlows = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getEmailFlow: (state, action) => {
      state.emailFlow = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default emailFlowSlice.reducer;
export const {
  emailFlowRequestLoading,
  invalidRequest,
  getEmailFlow,
  getEmailFlows,
} = emailFlowSlice.actions;
