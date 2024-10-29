import { createSlice } from "@reduxjs/toolkit";
export const sequenceSlice = createSlice({
  name: "sequence",
  initialState: {
    isLoading: false,
    sequences: [],
    sequence: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    sequenceRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.sequence = {};
      state.sequences = [];
      state.isLoading = false;
    },
    addSequence: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateSequence: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteSequence: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getSequence: (state, action) => {
      state.sequence = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    getSequences: (state, action) => {
      state.sequences = action.payload;
      state.isLoading = false;
      state.message = "";
    },
  },
});
export default sequenceSlice.reducer;
export const {
  sequenceRequestLoading,
  invalidRequest,
  getSequence,
  getSequences,
  addSequence,
  updateSequence,
  deleteSequence,
} = sequenceSlice.actions;
