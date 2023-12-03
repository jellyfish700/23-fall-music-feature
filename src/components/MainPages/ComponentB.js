import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrackFeature from './TrackFeature';

const ComponentB = ({ postSelectedPlaylistId, onClick, getSelectTempo, getSelectEnergy, getSelectDance, getTrackList }) => {
  const accessToken = useParams().id;
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [tempoValue, setTempoValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [danceValue, setDanceValue] = useState(0);

  const [tempoList, settempoList] = useState([])//selectTempoとの差を格納するリスト


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
    getTrackList(tempoList)

    // 配列内で一番小さい数値を取得
    const minNumber = Math.min(...tempoList);

    // 一番小さい数値のインデックスを取得
    const minIndex = tempoList.indexOf(minNumber);

    console.log("一番小さい数値:", minNumber);
    console.log("一番小さい数値のインデックス:", minIndex);
  }


  const addTempoList = (name) => {
    settempoList(tempoList=>[...tempoList, Math.abs(name - tempoValue)])
  }

  return (
    <div>
      <h1>特徴量を選択してください</h1>
      <button onClick={backButton}>戻る</button>
      <button onClick={nextButton}>曲を検索する</button>

        {/* Tempo */}
        <p>Tempo : {tempoValue}</p>
        <input 
        type="range"
        class="form-range"
        id="tempoSelect"
        min={60}
        max={180}
        value={tempoValue}
        onChange={handleTempoChange}></input>

        <p>Energy : {energyValue}</p>
        <input 
        type="range"
        class="form-range"
        id="energySelect"
        // min={60}
        // max={180}
        value={energyValue}
        onChange={handleEnergyChange}></input>

        <p>Danceability : {danceValue}</p>
        <input 
        type="range"
        class="form-range"
        id="danceSelect"
        // min={60}
        // max={180}
        value={danceValue}
        onChange={handleDanceChange}></input>

      {playlistTracks.length > 0 ? (
        <ul>
          {playlistTracks.map(({ track }) => (
            <li key={track.id}>
              <div>
                <h3>{track.name}</h3>
                <p>By {track.artists.map((artist) => artist.name).join(', ')}</p>
                <TrackFeature trackID={track.id} getTempo={addTempoList}/>
                {track.album.images.length > 0 && (
                  <img
                    src={track.album.images[0].url}
                    alt={`Album: ${track.album.name}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading playlist tracks...</p>
      )}
    <p>
        {tempoList.map((tempo, index) => (
          <p key={index}>{tempo}</p>
        ))}
      </p>
    </div>
  );
};

export default ComponentB;
