import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const sessionSlice = createSlice({
  name: "sessionDetails",
  initialState,
  reducers: {
    addSessionSlice: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSessionSlice } = sessionSlice.actions;
export default sessionSlice.reducer;
