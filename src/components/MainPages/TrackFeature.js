import React, { useEffect, useState } from 'react';
import BarChart from './Chart';
import { getLocalAccessToken } from '../Spotify';

const TrackFeature = ({ trackID ,getTempo, getEnergy, getDanceability, getTrack}) => {
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
        getTempo(data.tempo);
        getEnergy(data.energy);
        getDanceability(data.danceability);
        getTrack(trackID)
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
          <BarChart 
          tempo={features.tempo}
          energy={features.energy}
          danceability={features.danceability}
          />
        </div>
      ) : (
        <p>Loading features...</p>
      )}
    </div>
  );
};

export default TrackFeature;
