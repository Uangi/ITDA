import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  imageFile: null,
};

const ProdSlice = createSlice({
  name: "prod",
  initialState,

  reducers: {
    getImage(state, action) {
      state.imageFile = action.payload.data;
    },
  },
});

export const prodReducers = ProdSlice.actions;
export default ProdSlice.reducer;