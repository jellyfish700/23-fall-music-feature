// import React, { useState } from 'react';

// import SelectPlaylist from './MainPages/SelectPlaylist';
// import PlaylistTrack from './MainPages/PlaylistTrack';

// const Main = () => {
//   const [selectPlaylistPage, setSelect] = useState(true);
//   const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
//   const [selectedTempo, setSelectedTempo] = useState(null);
//   const [selectedEnergy, setSelectedEnergy] = useState(null);
//   const [selectedDance, setSelectedDance] = useState(null);

//   const serchTrack = () => {
//     setSelect((selectComponent) => !selectComponent);
//   };

//   const handleSelectPlaylist = (playlistId) => {
//     setSelectedPlaylistId(playlistId);
//   };

//   const handleSelectTempo = (tempo) => {
//     setSelectedTempo(tempo);
//   };

//   const handleSelectEnergy = (energy) => {
//     setSelectedEnergy(energy);
//   };

//   const handleSelectDance = (dance) => {
//     setSelectedDance(dance);
//   };

//   return (
//     <div>
//       {selectPlaylistPage ? (
//         <div>
//             {/* <button onClick={serchTrack}>serch</button> */}
//             <SelectPlaylist 
//                 onSelectPlaylistID={handleSelectPlaylist}
//                 onSelectTempo={handleSelectTempo}
//                 onSelectEnergy={handleSelectEnergy}
//                 onSelectDance={handleSelectDance}
//                 onClick={serchTrack}
//             />
//         </div>
//       ) : (
//         <div>
//             {/* <button onClick={serchTrack}>back</button> */}
//             <PlaylistTrack 
//                 selectedPlaylistId={selectedPlaylistId}
//                 selectedTempo={selectedTempo}
//                 selectedEnergy={selectedEnergy}
//                 selectedDance={selectedDance}
//                 onClick={serchTrack}
//             />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Main;


import React, { useState } from 'react';
import ComponentA from './MainPages/ComponentA';
import ComponentB from './MainPages/ComponentB';
import ComponentC from './MainPages/ComponentC';

const Main = () => {
  //ページ遷移
  const [activeComponent, setActiveComponent] = useState('Playlist');
  const handleComponentChange = (component) => {
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
  const handleSetTempoList = (list) => {
    setTempoList(list);
  };

  return (
    <div>
      {activeComponent === 'Playlist' && <ComponentA 
      onClick={handleComponentChange} 
      getSelectPlaylistID={handleSelectPlaylist}/>}

      {activeComponent === 'Track' && <ComponentB 
      onClick={handleComponentChange} 
      postSelectedPlaylistId={selectedPlaylistId}
      getSelectTempo={handleSelectTempo}
      getSelectEnergy={handleSelectEnergy}
      getSelectDance={handleSelectDance}
      getTrackList={handleSetTempoList}
/>}
      {activeComponent === 'Suggest' && <ComponentC 
      onClick={handleComponentChange}

      postSelectedTempo={selectedTempo}
      postSelectedEnergy={selectedEnergy}
      postSelectedDance={selectedDance}

      postTrackList={tempoList}
      
      />}
    </div>
  );
};

export default Main;
