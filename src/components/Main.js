import React, { useState } from 'react';
import PlayList from './MainPages/PlayList';
import Track from './MainPages/Track';
import Suggest from './MainPages/Suggest';

const Main = () => {
  //ページ遷移
  const [activeComponent, setActiveComponent] = useState('Playlist');
  const handleSuggesthange = (component) => {
    setActiveComponent(component);
  };

  //PlaylistID
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  //特徴量
  const [selectedTempo, setSelectedTempo] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState(null);
  const [selectedDance, setSelectedDance] = useState(null);

  const handleSelectTempo = (tempo) => {
    setSelectedTempo(tempo);
  };

  const handleSelectEnergy = (energy) => {
    setSelectedEnergy(energy);
  };

  const handleSelectDance = (dance) => {
    setSelectedDance(dance);
  };

  //Playlistの特徴量を格納した配列
  const [tempoList, setTempoList] = useState([]);
  const [trackList, setTrackList] = useState([]);

  const handleSetTempoList = (list) => {
    setTempoList(list);
  };
  const handleSetTrackList = (list) => {
    setTrackList(list);
  };

  return (
    <div>
      {activeComponent === 'Playlist' && <PlayList 
      onClick={handleSuggesthange} 
      getSelectPlaylistID={handleSelectPlaylist}/>}

      {activeComponent === 'Track' && <Track 
      onClick={handleSuggesthange} 
      postSelectedPlaylistId={selectedPlaylistId}
      getSelectTempo={handleSelectTempo}
      getSelectEnergy={handleSelectEnergy}
      getSelectDance={handleSelectDance}
      getTempoList={handleSetTempoList}
      getTrackList={handleSetTrackList}/>}

      {activeComponent === 'Suggest' && <Suggest 
      onClick={handleSuggesthange}
      postSelectedTempo={selectedTempo}
      postSelectedEnergy={selectedEnergy}
      postSelectedDance={selectedDance}
      postTempoList={tempoList}
      postTracklist={trackList}/>}
    </div>
  );
};

export default Main;
