import { createSlice } from "@reduxjs/toolkit";
export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isLoading: false,
    payments: [],
    payment: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    paymentRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.payments = [];
      state.payment = {};
      state.isLoading = false;
    },
    addPayment: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updatePayment: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getPayments: (state, action) => {
      state.payments = action.payments;
      state.isLoading = false;
    },
    getUserPayments: (state, action) => {
      state.payments = action.payments;
      state.isLoading = false;
    },
    getPayment: (state, action) => {
      state.payment = action.payload;
      state.isLoading = false;
    },
  },
});
export default paymentSlice.reducer;
export const {
  paymentRequestLoading,
  invalidRequest,
  addPayment,
  updatePayment,
  getPayments,
  getPayment,
  getUserPayments,
} = paymentSlice.actions;
