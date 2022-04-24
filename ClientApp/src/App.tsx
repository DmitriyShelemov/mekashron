import React from 'react';
import Account from './components/Account/Account';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/clients" element={<Account />} />
            <Route path="/about" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
