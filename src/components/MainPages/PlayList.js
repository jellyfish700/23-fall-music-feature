import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getLocalAccessToken } from '../Spotify';

const PlayList = ({getSelectPlaylistID, onClick}) => {
  const accessToken = getLocalAccessToken();
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    async function fetchWebApi(endpoint, method, body) {
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
      return (await fetchWebApi('v1/me/playlists', 'GET')).items;
    }

    async function fetchUserPlaylists() {
      const playlists = await getUserPlaylists();
      setUserPlaylists(playlists);
    }

    fetchUserPlaylists();
  }, [accessToken]);

  function nextButton(playlistId){
    getSelectPlaylistID(playlistId);
    onClick("Track");
  }

  return (
    <div>
      <p className='ft1'>プレイリストを選択してください</p>
      {userPlaylists.length > 0 ? (
        <div>
          {userPlaylists.map(({ id, name, images }) => (
          <div key={id} className='clear'>
            {images.length > 0 && (
              <img className="left Playlistimage"src={images[0].url} alt={`Playlist: ${name}`}/>
            )}
            <p className='ft2 left playlistName'>{name}</p>
            
            <Button className="button rounded-pill left playlistButton" onClick={() => nextButton(id)}>Select</Button>
          </div>
          ))}
        </div>
      ) : (
        <p>Loading user playlists...</p>
      )}
    </div>
  );
};

export default PlayList;