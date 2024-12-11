import { createSlice } from "@reduxjs/toolkit";
export const logsSchema = createSlice({
  name: "logs",
  initialState: {
    isLoading: false,
    logs: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    logsRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.logs = [];
      state.isLoading = false;
    },
    addLogs: (state, action) => {
      state.logs = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getLogs: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default logsSchema.reducer;
export const { logsRequestLoading, invalidRequest, addLogs, getLogs } =
  logsSchema.actions;
