// /*global navigate*/
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      const tokenRequest = new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
        client_id: 'bab9851d507c4ac28f0e97c7f09cef5d',
        client_secret: 'e3928d23dbd144bfa12cbcfd26a6f6c2',
        grant_type: 'authorization_code',
      });
      try {
        // アクセストークンを取得するリクエスト
        const response = await axios.post(
            'https://accounts.spotify.com/api/token', 
            tokenRequest.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
            });
        // 取得したアクセストークンを親コンポーネントに渡す
        // sendData(response.data.access_token);

        const page = 'http://localhost:3000/page/'+response.data.access_token;
        window.location.href = `${page}`;

      } catch (error) {
        console.error('Error fetching access token:', error.message);
        console.error('Response data:', error.response.data);
      }
    };

    handleCallback();
  }, [location]);

  return (
      <div>Logging in...</div>
  );
};

export default Callback;


