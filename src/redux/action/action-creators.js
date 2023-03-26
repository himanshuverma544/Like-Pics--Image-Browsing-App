import { SEARCH, LOAD } from "./action-types";

export const searchImages = (images) => ({
  type: SEARCH,
  payload: images,
});

export const loadImages = (images) => ({
  type: LOAD,
  payload: images,
});
