import { STORE_DATA, INVALID_TYPE_OF_DATA } from "./action.types";

const storeData = (data, typeOfData) => {

  let actionType = INVALID_TYPE_OF_DATA;

  const dataAllowed = ["states", "nodes", "objects", "arrays", "refVars", "vars"];

  if (typeof data === "object" && typeof typeOfData === "string") {
    for (let data of dataAllowed) {
      if (data === typeOfData) {
        actionType = STORE_DATA;
        break;
      }
    }
  }

  return {
    type: actionType,
    payload: {
      typeOfData,
      data
    }
  }
};

export { storeData };