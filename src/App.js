import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Login from './components/Login';
import Callback from './components/Callback';
import UserProfile from './components/UserProfile';

const Call = () => {
  const [accessToken, setAccessToken] = useState(null);
  const getAccessToken = (token) => {
    setAccessToken(token);
  };
  useEffect(() => {
    console.log('Component mounted');
    // ここに初期化のための処理を追加する場合があります
  }, []); // 空の依存配列でマウント時のみ実行
  
  useEffect(() => {
    console.log('AccessToken updated:', accessToken);
  }, [accessToken]); // accessToken が変更されたときのみ実行
  return(
    <div>
      <h1>アクセストークン{accessToken}</h1>
      <Callback sendData={getAccessToken} />
    </div>
  )
}

const App = () => {
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
            element={
              <Call />
          } />
          <Route 
            path="/page/:id"
            element={
            <div>
              <UserProfile />
              {/* <UserProfile accessToken={accessToken} /> */}
            </div>} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;