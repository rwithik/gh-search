import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  page: number;
  searchQuery: string;
} = {
  page: 1,
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchQuery(state, action: PayloadAction<string>) {
      state.page = 1;
      state.searchQuery = action.payload;
    },
    updateToNextPage(state) {
      state.page = state.page + 1;
    },
  },
});

export const { updateToNextPage, updateSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;

export const selectPage = (state: RootState) => state.search.page;
export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
