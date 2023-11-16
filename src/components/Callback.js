import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Callback = ({ onLoginSuccess }) => {
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      // コールバック時にはlocation.searchを使用してクエリパラメータを取得
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      // アクセストークンを取得するためのリクエストを作成
      const tokenRequest = new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
        client_id: 'bab9851d507c4ac28f0e97c7f09cef5d',
        client_secret: 'e3928d23dbd144bfa12cbcfd26a6f6c2',
        grant_type: 'authorization_code',
      });

        // Output the received code to the console for verification
        // console.log('Received authorization code:', code);
        // console.log('Token request:', tokenRequest.toString());

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
        onLoginSuccess(response.data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error.message);
        console.error('Response data:', error.response.data); // レスポンスデータもログに出力
  // エラーの場合の処理を追加
      }
    };

    handleCallback();
  }, [location, onLoginSuccess]);

  return <div>Logging in...</div>;
};

export default Callback;
