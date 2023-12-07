import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PlayList = ({getSelectPlaylistID, onClick}) => {
  const accessToken = useParams().id;
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
      <h1>プレイリストを選択してください</h1>
      {userPlaylists.length > 0 ? (
        <div>
          {userPlaylists.map(({ id, name, images }) => (
          <div key={id}>
            <p>{name} (ID: {id})</p>
            {images.length > 0 && (
              <img src={images[0].url} alt={`Playlist: ${name}`} style={{ width: '100px', height: '100px' }}/>
            )}
            <Button onClick={() => nextButton(id)}>プレイリストを選ぶ</Button>
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