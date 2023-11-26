import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FeaturesDisplay = () => {
  const accessToken = useParams().id;
  const trackId = '4yh4QM2HRXYg7hevgirrAK';
  const [features, setFeatures] = useState(null);

  useEffect(() => {
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

    fetchFeatures();
  }, [accessToken, trackId]);

  return (
    <div>
      <h2>Features Display for Track ID: {trackId}</h2>
      {features !== null ? (
        <ul>
          <li>Danceability: {features.danceability}</li>
          <li>Energy: {features.energy}</li>
          <li>Key: {features.key}</li>
          <li>Loudness: {features.loudness}</li>
          <li>Mode: {features.mode}</li>
          <li>Speechiness: {features.speechiness}</li>
          <li>Acousticness: {features.acousticness}</li>
          <li>Instrumentalness: {features.instrumentalness}</li>
          <li>Liveness: {features.liveness}</li>
          <li>Valence: {features.valence}</li>
          <li>Tempo: {features.tempo}</li>
        </ul>
      ) : (
        <p>Loading features...</p>
      )}
    </div>
  );
};

export default FeaturesDisplay;
