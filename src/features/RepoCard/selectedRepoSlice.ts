import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchResultItem } from "../../types";
import { RootState } from "../../app/store";

const initialState: {
  selectedItem: SearchResultItem | null;
} = {
  selectedItem: null,
};

const selectedRepo = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    updateSelectedItem(state, action: PayloadAction<SearchResultItem>) {
      state.selectedItem = action.payload;
    },
  },
});

export const { updateSelectedItem } = selectedRepo.actions;

export default selectedRepo.reducer;

export const selectSelectedItem = (state: RootState) =>
  state.selectedRepo.selectedItem;
