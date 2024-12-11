import { createSlice } from "@reduxjs/toolkit";
export const walletSchema = createSlice({
  name: "wallet",
  initialState: {
    isLoading: false,
    wallet: {},
    message: "",
    error: "",
    type: "",
  },
  reducers: {
    walletRequestLoading: (state, action) => {
      state.isLoading = true;
    },
    invalidRequest: (state, action) => {
      state.error = action.payload;
      state.message = "Error";
      state.type = "Invalid Request";
      state.wallet = {};
      state.isLoading = false;
    },
    getWallet: (state, action) => {
      state.wallet = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    addWallet: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    updateWallet: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
      state.error = "";
    },
  },
});
export default walletSchema.reducer;
export const {
  walletRequestLoading,
  invalidRequest,
  addWallet,
  updateWallet,
  getWallet,
} = walletSchema.actions;
