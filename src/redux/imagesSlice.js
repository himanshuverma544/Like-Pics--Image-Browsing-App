import { createSlice } from "@reduxjs/toolkit";

const imagesSlice = createSlice({
  name: "images",
  initialState: [],
  reducers: {
    searchImages(state, action) {
      return action.payload;
    },
    loadImages(state, action) {
      return [...state, ...action.payload];
    }
  }
})

export const { searchImages, loadImages } = imagesSlice.actions;
export default imagesSlice.reducer;