import { combineReducers, configureStore } from "@reduxjs/toolkit";

import LoaderSlice from "./loader-slice";
import UserSlice from "./users-slice";

const store = configureStore({
  reducer: {
    loaderReducer: LoaderSlice,
    userReducer: UserSlice,
  },
});

const rootReducer = combineReducers({
  loaderReducer: LoaderSlice,
  userReducer: UserSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
