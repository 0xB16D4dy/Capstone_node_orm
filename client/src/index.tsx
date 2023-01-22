import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import HomeTemplate from './templates/HomeTemplate';
import './assets/scss/styles.scss';
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='*' element={<Navigate to='' />}></Route>
      </Routes>
    </Router>
  </Provider>
);
