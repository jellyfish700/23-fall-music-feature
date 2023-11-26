import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistTracks = () => {
  const accessToken = useParams().id;
  const playlistId  = "1Pi4iHvT60RPDSCaegIo0o";
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    async function fetchPlaylistTracks() {
      try {
        // Spotify Web APIのプレイリストのトラック情報取得エンドポイント
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ここにSpotifyのアクセストークンを設定
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
  }, [playlistId]);

  return (
    <div>
      <h2>Playlist Tracks for Playlist ID: {playlistId}</h2>
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
