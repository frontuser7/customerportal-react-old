import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const personalDetailsSlice = createSlice({
  name: "personalDetails",
  initialState,
  reducers: {
    addPersonalDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { addPersonalDetails } = personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
