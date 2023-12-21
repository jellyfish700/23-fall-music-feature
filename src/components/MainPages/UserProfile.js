import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocalAccessToken } from '../Spotify';

const UserProfile = ( ) => {
const accessToken = getLocalAccessToken();
console.log(accessToken)
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    if (accessToken) {
      fetchUserProfile();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.display_name}</p>
          <p>Id: {userData.id}</p>
          <p>Email: {userData.email}</p>
          <p>Country: {userData.country}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
