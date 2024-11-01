import { createSlice } from "@reduxjs/toolkit";

export const compaignSlice = createSlice({
  name: "compaign",
  initialState: {
    isLoading: false,
    compaigns: [],
    compaign: {},
    compaignAnalytics: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    compaignRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "InvalidRequest";
      state.compaigns = [];
      state.compaign = {};
      state.isLoading = false;
    },
    addCompaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateCompaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteCompaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getCompaigns: (state, action) => {
      state.compaigns = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
    getCompaignAnalytics: (state, action) => {
      state.compaignAnalytics = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
    getCompaignDetails: (state, action) => {
      state.compaign = action.payload;
      state.isLoading = false;
    },
  },
});
export default compaignSlice.reducer;
export const {
  compaignRequestLoading,
  invalidRequest,
  addCompaign,
  updateCompaign,
  deleteCompaign,
  getCompaigns,
  getCompaignDetails,
  getCompaignAnalytics,
} = compaignSlice.actions;
