import { createSlice, createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";

const globalDataSlice = createSlice({
  name: "globalData",
  initialState: {
    states: {},
    nodes: {},
    variables: {},
    functions: {}
  },
  reducers: {
    statesInStore(state, action) {
      return {
        ...state,
        states: {
          ...state.states,
          ...action.payload
        }
      };
    },
    nodesInStore(state, action) {
      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...action.payload
        }
      };
    },
    variablesInStore(state, action) {
      return {
        ...state,
        variables: {
          ...state.variables,
          ...action.payload
        }
      };
    },
    functionsInStore(state, action) {
      return {
        ...state,
        functions: {
          ...state.functions,
          ...action.payload
        }
      };
    }
  },
  
});

export const { statesInStore, nodesInStore, variablesInStore, functionsInStore } = globalDataSlice.actions;
export default globalDataSlice.reducer;