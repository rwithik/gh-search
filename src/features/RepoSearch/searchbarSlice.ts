import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  page: number;
  searchQuery: string;
  focusedOptionIndex: number;
  isOpen: boolean;
} = {
  page: 1,
  searchQuery: "",
  focusedOptionIndex: -1,
  isOpen: false,
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
    updateFocusedIndex(state, action: PayloadAction<number>) {
      state.focusedOptionIndex = action.payload;
    },
    updateFocusToPrevItem() {},
    updateIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  updateToNextPage,
  updateSearchQuery,
  updateFocusedIndex,
  updateIsOpen,
} = searchSlice.actions;

export default searchSlice.reducer;

export const selectPage = (state: RootState) => state.search.page;
export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
export const selectFocusedOptionIndex = (state: RootState) =>
  state.search.focusedOptionIndex;
export const selectIsOpen = (state: RootState) => state.search.isOpen;
