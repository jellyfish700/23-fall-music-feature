import React from 'react';
import { Button } from 'react-bootstrap';
import icon from './images/icon.svg'

const Login = () => {
  const handleLogin = () => {
    const authUrl = 'https://accounts.spotify.com/authorize';
    const clientId = 'bab9851d507c4ac28f0e97c7f09cef5d';
    const redirectUri = 'http://localhost:3000/callback';

    const state = Math.random().toString(36).substring(7);
    //取得したい情報が増えたときはhttps://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks　のAuthorization scopesの部分を追加する
    const scope = 'user-read-private user-read-email user-top-read playlist-read-private';
    
    window.location.href = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  };

  return (
    <div>
      <p className='ft1 loginFont'>Spotifyのアカウントにログインしてください</p>
      <div className='text-center'>
      <Button className="button rounded-pill loginButton" onClick={handleLogin}>
        <img src={icon} className='iconLeft'/>
        Login with Spotify
      </Button>
      </div>
    </div>
  );
};
export default Login;
