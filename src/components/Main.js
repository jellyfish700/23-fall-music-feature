import React, { useState } from 'react';

import SelectPlaylist from './SelectPlaylist';
import PlaylistTrack from './PlaylistTrack';

const Main = () => {
  const [selectPlaylistPage, setSelect] = useState(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const serchTrack = () => {
    setSelect((selectComponent) => !selectComponent);
  };

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  return (
    <div>
      <button onClick={serchTrack}>serch</button>
      {selectPlaylistPage ? (
        <SelectPlaylist onSelectPlaylistID={handleSelectPlaylist} />
      ) : (
        <PlaylistTrack selectedPlaylistId={selectedPlaylistId} />
      )}
    </div>
  );
};

export default Main;
