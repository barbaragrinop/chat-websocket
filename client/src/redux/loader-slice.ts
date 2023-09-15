import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice = createSlice({
  name: "loader",
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
  initialState: {
    isLoading: false,
  },
});

export const { hideLoader, showLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
