import React from 'react';

const Login = () => {
  const handleLogin = () => {

    const authUrl = 'https://accounts.spotify.com/authorize';
    const clientId = 'bab9851d507c4ac28f0e97c7f09cef5d';
    const redirectUri = 'http://localhost:3000/callback';

    const state = Math.random().toString(36).substring(7);
    const scope = 'user-read-private user-read-email';

    window.location.href = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&state=${state}`;
  };

  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};
export default Login;
