import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Explore from "./components/Explore";

import { Provider } from "react-redux";
import store from "./redux/store";

import GlobalDataContext from "./contextAPI/globalData/context";
import globalDataReducer from "./contextAPI/globalData/reducer";
import { useReducer } from "react";

import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();


const App = () => {

  const [globalData, dispatch] = useReducer(globalDataReducer, {});

  return (
    <Provider store={store}>
      <GlobalDataContext.Provider value={{globalData, dispatch}}>
        <QueryClientProvider client={queryClient}>
          <Explore/>
        </QueryClientProvider>
      </GlobalDataContext.Provider>
    </Provider>
  );
};

export default App;