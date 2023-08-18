import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addRemoveItemsSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addMenuItems: (state, action) => {
      if (action.payload.page === "menu") {
        state.push(action.payload);
      } else {
        return (state = []);
      }
    },
    removeMenuItems: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addMenuItems, removeMenuItems } = addRemoveItemsSlice.actions;
export default addRemoveItemsSlice.reducer;
