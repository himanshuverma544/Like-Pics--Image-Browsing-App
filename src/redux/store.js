import { configureStore } from "@reduxjs/toolkit";

import imagesReducer from "./imagesSlice";
import globalDataReducer from "./globalDataSlice";

const store = configureStore({
  reducer: {
    imagesReducer,
    globalDataReducer
  }
});

export default store;