import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const restoSlice = createSlice({
  name: "myRestaurant",
  initialState,
  reducers: {
    restoData: (state, action) => {
      return action.payload;
    },
  },
});

export const { restoData } = restoSlice.actions;
export default restoSlice.reducer;
