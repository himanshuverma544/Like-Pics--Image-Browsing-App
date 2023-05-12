import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Explore from "./components/Explore";

import { Provider } from "react-redux";
import store from "./redux/store";

import { tsContext as TSContext } from "./contextAPI/globalData/context";
import dataReducer from "./contextAPI/globalData/reducer";
import { useReducer } from "react";


const initialState = {
  states: null,
  nodes: null,
  objects: null,
  arrays: null,
  refVars: null,
  vars: null,
  triggered: false
};


const App = () => {

  const [tsData, tsDispatch] = useReducer(dataReducer, initialState);

  return (
    <Provider store={store}>
      <TSContext.Provider value={{ tsData, tsDispatch }}>
          <Explore/>
      </TSContext.Provider>
    </Provider>
  );
};

export default App;