import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrackFeature from './TrackFeature';
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
      
      <div className='left featureSelect'>
        <div className='clear'>
          <p className='left featureText'>Tempo  </p>
          <p className='left featureNum'>  {tempoValue}</p>
          <input 
          type="range"
          min ="60"
          max="180"
          className="form-range slider"
          id="tempoSelect"
          value={tempoValue}
          onChange={handleTempoChange}></input>
        </div>

        <div className='clear'>
          <p className='left featureText'>Energy</p>
          <p className='left featureNum'>  {energyValue}</p>
          <input 
          type="range"
          min ="0"
          max="100"
          className="form-range slider"
          id="energySelect"
          value={energyValue}
          onChange={handleEnergyChange}></input>
        </div>

        <div className='clear'>
          <p className='left featureText'>Danceability  </p>
          <p className='left featureNum'>  {danceValue}</p>
          <input 
          type="range"
          min ="0"
          max="100"
          className="form-range slider"
          id="danceSelect"
          value={danceValue}
          onChange={handleDanceChange}></input>
        </div>
      </div>
      <Button className="button rounded-pill trackSearchButton" onClick={nextButton}>search</Button>

      {playlistTracks.length > 0 ? (
        <div className='clear'>
          {playlistTracks.map(({ track }) => (
            <div key={track.id} className='clear'>
              <div>
                <p className='ft2 left trackName'>{track.name}</p>
                <p className='ft2'>by {track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>

              <div>
              {track.album.images.length > 0 && (
                <img className="trackImage left" src={track.album.images[0].url} alt={`Album: ${track.album.name}`} />
              )}
              
              <TrackFeature trackID={track.id} getTempo={addTempoList} getTrack={addTrack}/>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <p>Loading playlist tracks...</p>
      )}
      <Button className="button rounded-pill trackBackButton" onClick={backButton}>back</Button>
    </div>
  );
};

export default Track;
