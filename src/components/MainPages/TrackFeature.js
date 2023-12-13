import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarChart from './Chart';

const TrackFeature = ({ trackID ,getTempo, getTrack}) => {
  const accessToken = useParams().id;
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
          {/* <p>Danceability(ダンス): {features.danceability}</p>
          <p>Energy(エネルギッシュ): {features.energy}</p>
          <p>Tempo(テンポ): {features.tempo}</p> */}
        </div>
      ) : (
        <p>Loading features...</p>
      )}
    </div>
  );
};

export default TrackFeature;
