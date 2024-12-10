import { createSlice } from "@reduxjs/toolkit";
export const smsCampaignSlice = createSlice({
  name: "smsCampaign",
  initialState: {
    isLoading: false,
    campaigns: [],
    campaign: {},
    analytics: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    campaignRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.campaigns = [];
      state.campaign = {};
      state.analytics = {};
      state.isLoading = false;
    },
    addCampaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteCampaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    sendCampaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    pauseCampaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    resumeCompaign: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getCampaigns: (state, action) => {
      state.campaigns = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getCampaign: (state, action) => {
      state.campaign = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getAnalytics: (state, action) => {
      state.analytics = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default smsCampaignSlice.reducer;
export const {
  campaignRequestLoading,
  invalidRequest,
  addCampaign,
  deleteCampaign,
  sendCampaign,
  getCampaign,
  getCampaigns,
  pauseCampaign,
  resumeCompaign,
  getAnalytics,
} = smsCampaignSlice.actions;
