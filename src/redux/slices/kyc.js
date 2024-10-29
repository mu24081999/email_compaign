import { createSlice } from "@reduxjs/toolkit";

export const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    isLoading: false,
    kycList: [],
    kycDetails: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    kycRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "InvalidRequest";
      state.kycList = [];
      state.kycDetails = {};
      state.isLoading = false;
    },
    addKYC: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateKYC: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteKYC: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getKYCList: (state, action) => {
      state.kycList = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
    getKYCDetails: (state, action) => {
      state.kycDetails = action.payload;
      state.error = "";
      state.isLoading = false;
      state.message = "";
    },
  },
});
export default kycSlice.reducer;
export const {
  kycRequestLoading,
  invalidRequest,
  addKYC,
  updateKYC,
  deleteKYC,
  getKYCList,
  getKYCDetails,
} = kycSlice.actions;
