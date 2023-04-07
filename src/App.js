import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Explore from "./components/Explore";

import { QueryClient, QueryClientProvider } from 'react-query';

import { Provider } from "react-redux";
import store from "./redux/store";


const queryClient = new QueryClient();

function App() {
  
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Explore/>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;