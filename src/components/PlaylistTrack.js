import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistTracks = ({ selectedPlaylistId, selectedTempo }) => {
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

  return (
    <div>
      <h2>Playlist Tracks for Playlist ID: {selectedPlaylistId}</h2>
      <h2>Tempo: {selectedTempo}</h2>
      {playlistTracks.length > 0 ? (
        <ul>
          {playlistTracks.map(({ track }) => (
            <li key={track.id}>
              {track.name} by {track.artists.map((artist) => artist.name).join(', ')}
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
