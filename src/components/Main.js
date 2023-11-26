import React, { useState } from 'react';

import SelectPlaylist from './SelectPlaylist';
import PlaylistTrack from './PlaylistTrack';

const Main = () => {
  const [selectPlaylistPage, setSelect] = useState(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [selectedTempo, setSelectedTempo] = useState(null);

  const serchTrack = () => {
    setSelect((selectComponent) => !selectComponent);
  };

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleSelectTempo = (tempo) => {
    setSelectedTempo(tempo);
  };

  return (
    <div>
      {selectPlaylistPage ? (
        <div>
            <button onClick={serchTrack}>serch</button>
            <SelectPlaylist 
                onSelectPlaylistID={handleSelectPlaylist}
                onSelectTempo={handleSelectTempo}
            />
        </div>
      ) : (
        <div>
            <button onClick={serchTrack}>back</button>
            <PlaylistTrack 
                selectedPlaylistId={selectedPlaylistId}
                selectedTempo={selectedTempo}
            />
        </div>
      )}
    </div>
  );
};

export default Main;
