import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/RepoSearch/searchSlice";
import selectedRepoSlice from "../features/RepoCard/selectedRepoSlice";
import apiSlice from "../api";

const store = configureStore({
  reducer: {
    search: searchSlice,
    selectedRepo: selectedRepoSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
