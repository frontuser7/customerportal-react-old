import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const activeCategorySlice = createSlice({
  name: "activeCategory",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveCategory } = activeCategorySlice.actions;
export default activeCategorySlice.reducer;
