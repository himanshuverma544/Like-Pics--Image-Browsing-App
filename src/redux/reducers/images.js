import { SEARCH, LOAD } from "../action/action-types";

const initialState = [];

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.payload;
    case LOAD:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default imagesReducer;