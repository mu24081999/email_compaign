import { createSlice } from "@reduxjs/toolkit";
export const scheduleSlice = createSlice({
  name: "smsSchedule",
  initialState: {
    isLoading: false,
    schedules: [],
    schedule: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    scheduleRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.schedules = [];
      state.schedule = {};
      state.isLoading = false;
    },
    addSchedule: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    updateSchedule: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    deleteSchedule: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    getSchedules: (state, action) => {
      state.schedules = action.payload;
      state.isLoading = false;
    },
    getSchedule: (state, action) => {
      state.schedule = action.payload;
      state.isLoading = false;
    },
  },
});
export default scheduleSlice.reducer;
export const {
  scheduleRequestLoading,
  invalidRequest,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedules,
  getSchedule,
} = scheduleSlice?.actions;
