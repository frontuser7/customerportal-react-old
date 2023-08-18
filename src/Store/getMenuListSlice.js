import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const getMenuListSlice = createSlice({
  name: "Menulist",
  initialState,
  reducers: {
    addMenuList: (state, action) => {
      return action.payload;
    },
    updateItemCount: (state, action) => {
      state.data.item[action.payload.index].count = action.payload.count;
    },
  },
});

export const { addMenuList, updateItemCount } = getMenuListSlice.actions;
export default getMenuListSlice.reducer;
