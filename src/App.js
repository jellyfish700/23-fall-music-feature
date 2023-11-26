import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';
import Toptrack from './components/Toptrack';
import UserPlaylist from './components/UserPlaylist';
import PlaylistTrack from './components/PlaylistTrack';
import TrackTempo from './components/TrackTempo';


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
            element={
            <div>
              {/* <UserPlaylist /> */}
              <PlaylistTrack />
              <TrackTempo />
            </div>

            } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;