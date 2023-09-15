import { configureStore } from "@reduxjs/toolkit";

import LoaderSlice from "./loader-slice";
import UserSlice from "./users-slice";

const store = configureStore({
  reducer: {
    loaderReducer: LoaderSlice,
    userReducer: UserSlice,
  },
});

export default store;
