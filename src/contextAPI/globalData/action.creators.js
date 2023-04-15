import { STORE_STATES, STORE_NODES, STORE_VARIABLES, STORE_FUNCTIONS } from "./action.types";

export const statesInStore = state => ({
    type: STORE_STATES,
    payload: state
});

export const nodesInStore = node => ({
  type: STORE_NODES,
  payload: node
});

export const variablesInStore = variable => ({
  type: STORE_VARIABLES,
  payload: variable
});

export const functionsInStore = theFunction => ({
  type: STORE_FUNCTIONS,
  payload: theFunction
});