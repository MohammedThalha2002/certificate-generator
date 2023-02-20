import { createSlice } from "@reduxjs/toolkit";

const certificateSlice = createSlice({
  name: "certificate",
  initialState: {
    selectedLayer: {},
  },
  reducers: {
    changeSelectedLayer: (state, action) => {
      state.selectedLayer = action.payload;
    },
  },
});

export const { changeSelectedLayer } = certificateSlice.actions;

export default certificateSlice.reducer;
