import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const getFilteredItemSlice = createSlice({
  name: "FilteredItemslist",
  initialState,
  reducers: {
    addFilteredItemList: (state, action) => {
      return action.payload;
    },
    updateFilteredItemCount: (state, action) => {
      state[action.payload.index].count = action.payload.count;
    },
  },
});

export const { addFilteredItemList, updateFilteredItemCount } =
  getFilteredItemSlice.actions;
export default getFilteredItemSlice.reducer;
