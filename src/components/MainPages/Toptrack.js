import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Toptrack = () => {
  const accessToken = useParams().id;
  const [topTracks, setTopTracks] = useState([]);

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

    async function getTopTracks() {
      return (await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=5',
        'GET'
      )).items;
    }

    async function someFunction() {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
    }

    someFunction();
  }, [accessToken]);

  return (
    <div>
      <div>
        <h2>Top Tracks</h2>
        {topTracks.length > 0 ? (
          <ul>
            {topTracks.map(({ name, artists }) => (
              <li key={name}>
                {name} by {artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading top tracks...</p>
        )}
      </div>
    </div>
  );
};

export default Toptrack;
