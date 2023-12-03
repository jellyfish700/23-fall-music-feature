import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      {/* <h2>Features Display for Track ID: {trackId}</h2> */}
      {trackInfo !== null && features !== null ? (
        <div>
          {/* <p>Artists: {trackInfo.artists.map(artist => artist.name).join(', ')}</p>
          <p>Track Name: {trackInfo.name}</p> */}
          <ul>
            <li>Danceability(ダンス): {features.danceability}</li>
            <li>Energy(エネルギッシュ): {features.energy}</li>
            <li>Tempo(テンポ): {features.tempo}</li>
          </ul>
          <br></br>
        </div>
      ) : (
        <p>Loading features...</p>
      )}
    </div>
  );
};

export default TrackFeature;
