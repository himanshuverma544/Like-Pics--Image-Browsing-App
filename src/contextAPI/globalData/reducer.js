import { STORE_STATES, STORE_NODES, STORE_VARIABLES, STORE_FUNCTIONS } from "./action.types";

const initialState = {
  states: {},
  nodes: {},
  variables: {},
  functions: {}
}

const globalDataReducer = (state = initialState, action) => {

  switch (action.type) {

    case STORE_STATES:
      return {
        ...state,
        states: {
          ...state.states,
          ...action.payload
        }
      };
    case STORE_NODES:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...action.payload
        }
      };
    case STORE_VARIABLES:
      return {
        ...state,
        variables: {
          ...state.variables,
          ...action.payload
        }
      };
    case STORE_FUNCTIONS:
      return {
        ...state,
        functions: {
          ...state.functions,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default globalDataReducer;