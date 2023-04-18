import { STORE_IN_GLOBAL_DATA, INVALID_TYPE_OF_DATA } from "./action.types";

const storeInGlobalData = (data, typeOfData, component) => {
  
  const dataAllowed = ["states", "nodes", "objects", "arrays", "refVars", "vars"];
  let actionType = INVALID_TYPE_OF_DATA;

  for (let data of dataAllowed) {
    if (data === typeOfData) {
      actionType = STORE_IN_GLOBAL_DATA;
      break;
    }
  }

  return {
    type: actionType,
    payload: {
      component,
      typeOfData,
      data
    }
  }
};

export { storeInGlobalData };