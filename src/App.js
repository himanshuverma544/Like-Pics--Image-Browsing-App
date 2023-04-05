import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Explore from "./components/Explore";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  
  return (
    <Provider store={store}>
      <Explore/>
    </Provider>
  );
}

export default App;