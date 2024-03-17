import { STORE_DATA } from "../actions/action.types";

const dataReducer = (state, action) => {
  
  const { typeOfData, data: newData } = action.payload;

  switch (action.type) {

    case STORE_DATA:
      return {
        ...state,
        [typeOfData]: {
          ...state[typeOfData], ...newData
        },
        triggered: true
      }

    default:
      return state;
  }
}

export default dataReducer;