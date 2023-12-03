import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const ComponentC = ({onClick, postSelectedTempo,postSelectedEnergy,postSelectedDance,postTrackList}) => {
    
    function button(){
        onClick("Playlist")
    }


  return (
    <div>
      <p>tempo:{postSelectedTempo}</p>
      <p>energy:{postSelectedEnergy}</p>
      <p>dance:{postSelectedDance}</p>

      <p>list:{postTrackList}</p>

      <p>
        {postTrackList.map((tempo, index) => (
          <p key={index}>{tempo}</p>
        ))}
      </p>

      <h1>選曲された曲
      <button onClick={button}>戻る</button>
      </h1>
    </div>
  );
};

export default ComponentC;