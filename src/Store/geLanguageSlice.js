import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const languageSlice = createSlice({
  name: "getLanguage",
  initialState,
  reducers: {
    getLangData: (state, action) => {
      return action.payload;
    },
  },
});

export const { getLangData } = languageSlice.actions;
export default languageSlice.reducer;
