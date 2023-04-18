import { STORE_IN_GLOBAL_DATA } from "./action.types";

const initialState = {};

const globalDataReducer = (state = initialState, action) => {
  
  switch (action.type) {
 
    case STORE_IN_GLOBAL_DATA:

    const { component, typeOfData, data: newData } = action.payload;

    if (!state[component]) {
      state[component] = {};
    }

    if (!state[component][typeOfData]) {
      state[component][typeOfData] = {};
    }

    return {
      ...state,
      [component]: {
        ...state[component], [typeOfData]: {
          ...state[component][typeOfData], ...newData
        },
      },
      triggered: component     
    }
         
    default:
      return state;
  }
};

export default globalDataReducer;