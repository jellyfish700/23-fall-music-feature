import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';

const App = () => {
  // const [accessToken, setAccessToken] = useState(null);
  // const getAccessToken = (token) => {
  //   setAccessToken(token);
  // };
  return (
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
            element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;