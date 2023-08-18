import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const activeSubCategorySlice = createSlice({
  name: "activeCategory",
  initialState,
  reducers: {
    setActiveSubCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveSubCategory } = activeSubCategorySlice.actions;
export default activeSubCategorySlice.reducer;
