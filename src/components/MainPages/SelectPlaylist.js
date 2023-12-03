import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SelectPlaylist = ({ onSelectPlaylistID, onSelectTempo,onSelectEnergy,onSelectDance, onClick}) => {
  const accessToken = useParams().id;
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [tempoValue, setTempoValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [danceValue, setDanceValue] = useState(0);

  const handleTempoChange = (e) => {
    setTempoValue(e.target.value);
  };

  const handleEnergyChange = (e) => {
    setEnergyValue(e.target.value);
  };

  const handleDanceChange = (e) => {
    setDanceValue(e.target.value);
  };

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

  function selectPlaylist(playlistId) {
    onSelectPlaylistID(playlistId);
  }

  function serchTrack() {
    onClick();
    onSelectTempo(tempoValue);
    onSelectEnergy(energyValue);
    onSelectDance(danceValue);
  }

  return (
    <div>
      <div>
      <button onClick={serchTrack}>serch</button>
        <h2>SelectPlaylist</h2>

        {/* Tempo */}
        {/* <p>Tempo : {tempoValue}</p>
        <input 
        type="range"
        class="form-range"
        id="tempoSelect"
        min={60}
        max={180}
        value={tempoValue}
        onChange={handleTempoChange}></input>

        <p>Energy : {energyValue}</p>
        <input 
        type="range"
        class="form-range"
        id="energySelect"
        // min={60}
        // max={180}
        value={energyValue}
        onChange={handleEnergyChange}></input>

        <p>Danceability : {danceValue}</p>
        <input 
        type="range"
        class="form-range"
        id="danceSelect"
        // min={60}
        // max={180}
        value={danceValue}
        onChange={handleDanceChange}></input> */}
        
        {userPlaylists.length > 0 ? (
          <ul>
            {userPlaylists.map(({ id, name, images }) => (
              <li key={id}>
                <p>{name} (ID: {id})</p>
                {images.length > 0 && (
                  <img
                    src={images[0].url}
                    alt={`Playlist: ${name}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <button onClick={() => selectPlaylist(id)}>Select</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading user playlists...</p>
        )}
      </div>
    </div>
  );
};

export default SelectPlaylist;
