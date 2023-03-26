import { combineReducers, createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

import imagesReducer from "./reducers/images";

const rootReducer = combineReducers({
  imagesReducer
});

const store = createStore(rootReducer);

 export default store;