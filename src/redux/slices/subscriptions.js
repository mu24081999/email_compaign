import { createSlice } from "@reduxjs/toolkit";
export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState: {
    isLoading: false,
    subscriptions: [],
    subscription: {},
    paymentIntend: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    subscriptionRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.subscription = {};
      state.subscriptions = [];
      state.paymentIntend = {};
      state.isLoading = false;
    },
    addSubscription: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getUserSubscription: (state, action) => {
      state.subscription = action.payload;
      state.isLoading = false;
      state.message = "";
    },
    getPaymentIntend: (state, action) => {
      state.paymentIntend = action.payload;
      state.isLoading = false;
    },
    getAllSubacriptions: (state, action) => {
      state.subscriptions = action.payload;
      state.isLoading = false;
      state.message = "";
    },
  },
});
export default subscriptionSlice.reducer;
export const {
  subscriptionRequestLoading,
  invalidRequest,
  getSequence,
  getUserSubscription,
  addSubscription,
  getPaymentIntend,
  getAllSubacriptions,
} = subscriptionSlice.actions;
