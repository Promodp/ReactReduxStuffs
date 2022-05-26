import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "../node_modules/antd/dist/antd.css";
import SignUp from './signUp'

import "./index.css";

import App from "./App"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Practise from './practise'
import { store } from "./redux";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/home">TODO</Link></li>
          <li><Link to="/practise">APICALL</Link></li>
          <li><Link to="/signup">SignUpWithRedux</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<App/>} />
        <Route path="/practise" element={<Practise/>} />
        <Route path="/signup" element={<SignUp/>} />

      </Routes>
    </BrowserRouter>
  </Provider>
  , rootElement);
