import { createSlice } from "@reduxjs/toolkit";

export const leadSlice = createSlice({
  name: "lead",
  initialState: {
    isLoading: false,
    leads: [],
    lead: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    leadRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "InvalidRequest";
      state.leads = [];
      state.leadDetails = {};
      state.isLoading = false;
    },
    addLead: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateLead: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteLead: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getLeads: (state, action) => {
      state.leads = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
    getLeadDetails: (state, action) => {
      state.leadDetails = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
  },
});
export default leadSlice.reducer;
export const {
  leadRequestLoading,
  invalidRequest,
  addLead,
  updateLead,
  deleteLead,
  getLeads,
  getLeadDetails,
} = leadSlice.actions;
