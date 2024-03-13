import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./configurations/firebase";

import { tsContext as TSContext } from "./context";
import dataReducer from "./reducers/globalData";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

import Explore from "./components/Explore";


const initialState = {

  states: null,
  nodes: null,
  objects: null,
  arrays: null,
  refVars: null,
  vars: null,
  triggered: false
};

const queryClient = new QueryClient();


const App = () => {

  const [tsData, tsDispatch] = useReducer(dataReducer, initialState);

  return (
    <Provider store={store}>
      <TSContext.Provider value={{ tsData, tsDispatch }}>
        <QueryClientProvider client={queryClient}>
          <Explore/>
        </QueryClientProvider>
      </TSContext.Provider>
    </Provider>
  );
};

export default App;