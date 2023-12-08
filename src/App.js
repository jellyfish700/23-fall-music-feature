import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Login from './components/Login';
import Callback from './components/Callback';
import Main from './components/Main';

const App = () => {
  return (
    <div className='App'>
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Login/>}
          />
          <Route 
            path="/callback" 
            element={<Callback  />} />
          <Route 
            path="/page/:id"
            element={
            <div>
              <Main />
            </div>

            } />
        </Routes>
      </div>
    </Router>
    </div>
  );
};

export default App;