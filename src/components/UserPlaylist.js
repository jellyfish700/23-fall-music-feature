import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPlaylists = () => {
  const accessToken = useParams().id;
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    async function fetchWebApi(endpoint, method, body) {
      console.log(accessToken);
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getUserPlaylists() {
      return (await fetchWebApi(
        'v1/me/playlists',
        'GET'
      )).items;
    }

    async function fetchUserPlaylists() {
      const playlists = await getUserPlaylists();
      setUserPlaylists(playlists);
    }

    fetchUserPlaylists();
  }, [accessToken]);

  return (
    <div>
      <div>
        <h2>User Playlists</h2>
        {userPlaylists.length > 0 ? (
          <ul>
            {userPlaylists.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading user playlists...</p>
        )}
      </div>
    </div>
  );
};

export default UserPlaylists;
