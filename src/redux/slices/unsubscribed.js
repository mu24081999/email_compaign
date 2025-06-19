import { createSlice } from "@reduxjs/toolkit";
export const unsubscribedSlice = createSlice({
  name: "unsubscribed",
  initialState: {
    isLoading: false,
    unsubscribedEmails: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    unsubscribedRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.isLoading = false;
    },
    getUnsubscribedEmails: (state, action) => {
      state.unsubscribedEmails = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default unsubscribedSlice.reducer;
export const {
  unsubscribedRequestLoading,
  invalidRequest,
  getUnsubscribedEmails,
} = unsubscribedSlice.actions;
