import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { HashRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Explore from "./pages/Explore";
import Saved from './pages/Saved';
import Page404 from './pages/Page404';

import { EXPLORE, SAVED, PAGE404 } from "./utils/constants";


const App = () => {

  return (
    <HashRouter basename=''>
      <Routes>
        <Route path={EXPLORE.pathname} element={<Layout/>}>
          <Route index element={<Explore/>}/>
          <Route path={SAVED.pathname} element={<Saved/>}/>
          <Route path={PAGE404.pathname} element={<Page404/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;