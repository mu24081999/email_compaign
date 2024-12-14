import { createSlice } from "@reduxjs/toolkit";
export const verificationSlice = createSlice({
  name: "verification",
  initialState: {
    isLoading: false,
    verifications: [],
    verification: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    verificationRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.verifications = [];
      state.verification = {};
      state.isLoading = false;
    },
    addVerification: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getUserVerification: (state, action) => {
      state.verification = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default verificationSlice.reducer;
export const {
  verificationRequestLoading,
  invalidRequest,
  addVerification,
  getUserVerification,
} = verificationSlice.actions;
