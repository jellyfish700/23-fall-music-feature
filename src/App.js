import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';
import Toptrack from './components/Toptrack';
import SelectPlaylist from './components/SelectPlaylist';
import PlaylistTrack from './components/PlaylistTrack';
import TrackTempo from './components/TrackTempo';

import Main from './components/Main';


const App = () => {
  // const [accessToken, setAccessToken] = useState(null);
  // const getAccessToken = (token) => {
  //   setAccessToken(token);
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
              {/* <TrackTempo trackTempo={"0qcQXICGggkNm0xI1x99Yr"} />
              <TrackTempo trackTempo={"03KfnHmik5W7sBlxDnsI7X"} />
              <TrackTempo trackTempo={"2QwatVtCNAW75YLarmoYbe"} /> */}
              <Main />
            </div>

            } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;