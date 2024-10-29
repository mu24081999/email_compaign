import { createSlice } from "@reduxjs/toolkit";
export const templateSlice = createSlice({
  name: "template",
  initialState: {
    isLoading: false,
    templates: [],
    template: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    templateRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.template = {};
      state.templates = [];
      state.isLoading = false;
    },
    addTemplate: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateTemplate: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    deleteTemplate: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getTemplate: (state, action) => {
      state.template = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    getTemplates: (state, action) => {
      state.templates = action.payload;
      state.isLoading = false;
      state.message = "";
    },
  },
});
export default templateSlice.reducer;
export const {
  templateRequestLoading,
  invalidRequest,
  getTemplate,
  getTemplates,
  addTemplate,
  updateTemplate,
  deleteTemplate,
} = templateSlice.actions;
