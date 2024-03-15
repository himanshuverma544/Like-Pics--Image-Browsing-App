import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Provider } from "react-redux";
import store from "./redux/store";

import ContextProvider from "./context-API/ContextProvider";

import "./configurations/firebase";


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </Provider>
  </ContextProvider>
);