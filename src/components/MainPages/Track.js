import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrackFeature from './TrackFeature';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { Button } from 'react-bootstrap';

const Track = ({ postSelectedPlaylistId, onClick, getSelectTempo, getSelectEnergy, getSelectDance, getTempoList, getTrackList }) => {
  const accessToken = useParams().id;
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [tempoValue, setTempoValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [danceValue, setDanceValue] = useState(0);

  const [tempoList, settempoList] = useState([])
  const [trackList, settrackList] = useState([])


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
    async function fetchPlaylistTracks() {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${postSelectedPlaylistId}/tracks`, {
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
  }, [postSelectedPlaylistId, accessToken]);

  function backButton() {
    onClick("Playlist");
  }

  function nextButton() {
    onClick("Suggest");
    getSelectTempo(tempoValue);
    getSelectEnergy(energyValue);
    getSelectDance(danceValue);
    getTempoList(tempoList);
    getTrackList(trackList);
  }


  const addTempoList = (name) => {
    settempoList(tempoList=>[...tempoList, name])
  }

  const addTrack = (name) => {
    settrackList(trackList=>[...trackList, name])
  }

  return (
    <div>
      <p className='ft1'>特徴量を選択してください</p>
      <Button className="button rounded-pill" onClick={backButton}>戻る</Button>
      <Button className="button rounded-pill" onClick={nextButton}>曲を検索する</Button>

      <p>Tempo : {tempoValue}</p>
      <RangeSlider
      min ="60"
      max="180"
      variant='success'
      id="tempoSelect"
      value={tempoValue}
      onChange={handleTempoChange}/>

      <p>Energy : {energyValue}</p>
      <RangeSlider
      min ="0"
      max="100"
      variant='success'
      id="energySelect"
      value={energyValue}
      onChange={handleEnergyChange}/>

      <p>Danceability : {danceValue}</p>
      <RangeSlider
      min ="0"
      max="100"
      variant='success'
      id="danceSelect"
      value={danceValue}
      onChange={handleDanceChange}/>

      {playlistTracks.length > 0 ? (
        <div>
          {playlistTracks.map(({ track }) => (
            <div key={track.id}>
              <p className='ft2'>{track.name}  by {track.artists.map((artist) => artist.name).join(', ')}</p>
              <TrackFeature trackID={track.id} getTempo={addTempoList} getTrack={addTrack}/>
              {track.album.images.length > 0 && (
                <img src={track.album.images[0].url} alt={`Album: ${track.album.name}`} style={{ width: '100px', height: '100px' }}/>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading playlist tracks...</p>
      )}
    </div>
  );
};

export default Track;
