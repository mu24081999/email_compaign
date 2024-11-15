// features/auth/warmupSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const warmupSlice = createSlice({
  name: "warmup",
  initialState: {
    isLoading: false,
    warmupData: {},
    warmups: [],
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    warmupRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.users = [];
      state.userDetails = {};
      state.message = "";
      state.isLoading = false;
      state.type = "InvalidRequest";
    },
    getWarmup: (state, action) => {
      state.warmupData = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    getWarmups: (state, action) => {
      state.warmups = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    addWarmup: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
    updateWarmup: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.type = "success";
    },
  },
});

export default warmupSlice.reducer;
export const {
  warmupRequestLoading,
  getWarmup,
  getWarmups,
  addWarmup,
  updateWarmup,
  invalidRequest,
} = warmupSlice.actions;
