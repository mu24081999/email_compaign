import { createSlice } from "@reduxjs/toolkit";
export const uniboxSlice = createSlice({
  name: "unibox",
  initialState: {
    isLoading: false,
    replies: [],
    reply: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    uniboxRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.reply = {};
      state.replies = [];
      state.isLoading = false;
    },
    getCampaignReplies: (state, action) => {
      state.replies = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getEmailReplies: (state, action) => {
      state.replies = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getReply: (state, action) => {
      state.reply = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    sendSubReply: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default uniboxSlice.reducer;
export const {
  uniboxRequestLoading,
  invalidRequest,
  getCampaignReplies,
  getReply,
  getEmailReplies,
  sendSubReply,
} = uniboxSlice.actions;
