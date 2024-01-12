import React, { useEffect, useState } from 'react';
import { getLocalAccessToken } from '../Spotify';
import ChartSuggestTrack from './ChartSuggestTarck'

const TrackFeature = ({ trackID }) => {
  const accessToken = getLocalAccessToken();
  const trackId = trackID;
  const [trackInfo, setTrackInfo] = useState(null);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    async function fetchTrackInfo() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTrackInfo(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching track info:', error.message);
      }
    }

    async function fetchFeatures() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching features:', error.message);
      }
    }
    fetchTrackInfo();
    fetchFeatures();
  }, [accessToken, trackId]);

  return (
    <div>
      {trackInfo !== null && features !== null ? (
        <div>

          <ChartSuggestTrack energy={features.energy}  danceability={features.danceability}  acousticness={features.acousticness}  speechiness={features.speechiness}  liveness={features.liveness}  valence={features.valence} />
        </div>
      ) : (
        <p>Loading features...</p>
      )}
    </div>
  );
};

export default TrackFeature;
