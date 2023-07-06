import { SEARCH_IMAGES, LOAD_MORE_IMAGES } from "../actions/action.types";


const imagesDataArrReducer = (state, action) => {

  const images = action.payload;

  switch (action.type) {

    case SEARCH_IMAGES:
      return images;

    case LOAD_MORE_IMAGES:
      return [...state, ...images];
      
    default:
      return state;
  }
}

export default imagesDataArrReducer;