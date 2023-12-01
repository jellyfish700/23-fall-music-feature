import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrackFeature from './TrackFeature';

const PlaylistTracks = ({ selectedPlaylistId, selectedTempo, selectedEnergy, selectedDance, onClick }) => {
  const accessToken = useParams().id;
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    // 選択されたプレイリストのIDが変更されるたびに実行
    async function fetchPlaylistTracks() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlaylistTracks(data.items);
      } catch (error) {
        console.error('Error fetching playlist tracks:', error.message);
      }
    }

    fetchPlaylistTracks();
  }, [selectedPlaylistId, accessToken]);

  function serchTrack() {
    onClick();
  }

  return (
    <div>
      <button onClick={serchTrack}>serch</button>
      <p>tempo:{selectedTempo}</p>
      <p>energy:{selectedEnergy}</p>
      <p>dance:{selectedDance}</p>
      {/* <h2>Playlist Tracks for Playlist ID: {selectedPlaylistId}</h2> */}
      {playlistTracks.length > 0 ? (
        <ul>
          {playlistTracks.map(({ track }) => (
            <li key={track.id}>
              {track.name} by {track.artists.map((artist) => artist.name).join(', ')}
              <TrackFeature trackID={track.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading playlist tracks...</p>
      )}
    </div>
  );
};

export default PlaylistTracks;
