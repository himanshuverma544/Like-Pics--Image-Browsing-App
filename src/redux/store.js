import { configureStore } from "@reduxjs/toolkit";

import imagesReducer from "./imagesSlice";

const store = configureStore({
  reducer: {
    imagesReducer
  }
});

export default store;