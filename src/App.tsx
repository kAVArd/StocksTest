import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import pageUrl from './const/pages';
import HomePage from './pages/HomePage';
import ExamplePage from './pages/ExamplePage/ExamplePage';
import './styles/app.scss';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={pageUrl.root} element={<HomePage />} />
          <Route path="*" element={<Navigate replace to={pageUrl.root} />} />
          <Route path={pageUrl.examplePage} element={<ExamplePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
