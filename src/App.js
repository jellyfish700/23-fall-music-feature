// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setAccessToken(token);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              !accessToken ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <div id="loggedin">
                  <UserProfile accessToken={accessToken} />
                </div>
              )
            }
          />
          <Route path="/callback" element={<Callback onLoginSuccess={handleLoginSuccess} />} />
        </Routes>

        <UserProfile accessToken={accessToken} />
      </div>
    </Router>
  );
};

export default App;
