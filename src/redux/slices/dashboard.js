import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    analytics: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    dashboardRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "InvalidRequest";
      state.analytics = [];
      state.isLoading = false;
    },
    getAnalytics: (state, action) => {
      state.analytics = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default dashboardSlice.reducer;
export const { dashboardRequestLoading, invalidRequest, getAnalytics } =
  dashboardSlice.actions;
