import { createSlice } from "@reduxjs/toolkit";
export const templateSlice = createSlice({
  name: "twilio",
  initialState: {
    isLoading: false,
    callToken: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    twilioRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.callToken = {};
      state.isLoading = false;
    },
    getCallToken: (state, action) => {
      state.callToken = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default templateSlice.reducer;
export const { twilioRequestLoading, invalidRequest, getCallToken } =
  templateSlice.actions;
