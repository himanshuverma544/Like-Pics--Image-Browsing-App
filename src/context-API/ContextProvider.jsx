import { tsContext as TSContext } from "./context";

import { useReducer } from "react";
import dataReducer from "./reducers/dataReducer";


const initialState = {
  states: null,
  nodes: null,
  objects: null,
  arrays: null,
  refVars: null,
  vars: null,
  triggered: false
};     


const ContextProvider = ({ children }) => {

  const [data, dispatch] = useReducer(dataReducer, initialState);

  return (
    <TSContext.Provider value={{ data, dispatch }}>
      {children}
    </TSContext.Provider>
  );
}

export default ContextProvider;