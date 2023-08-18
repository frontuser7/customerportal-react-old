import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const restoTableSlice = createSlice({
  name: "Resto&TableId",
  initialState,
  reducers: {
    restoTableId: (state, action) => {
      return action.payload;
    },
  },
});

export const { restoTableId } = restoTableSlice.actions;
export default restoTableSlice.reducer;
