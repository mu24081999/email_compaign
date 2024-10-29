import { createSlice } from "@reduxjs/toolkit";
export const optionsSlice = createSlice({
  name: "options",
  initialState: {
    isLoading: false,
    options: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    optionsRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.ptions = {};
      state.isLoading = false;
    },
    addOptions: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateOptions: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getOptions: (state, action) => {
      state.options = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default optionsSlice.reducer;
export const {
  optionsRequestLoading,
  invalidRequest,
  addOptions,
  updateOptions,
  getOptions,
} = optionsSlice.actions;
