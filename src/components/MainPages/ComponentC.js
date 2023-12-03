import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const ComponentC = ({onClick, postSelectedTempo,postSelectedEnergy,postSelectedDance,postTempoList, postTracklist}) => {
    
    useEffect(() => {
        const closestIndex = postTempoList.reduce((closestIdx, currentValue, currentIndex) => {
            const currentDiff = Math.abs(currentValue - postSelectedTempo);
            const closestDiff = Math.abs(postTempoList[closestIdx] - postSelectedTempo);
          
            return currentDiff < closestDiff ? currentIndex : closestIdx;
          }, 0);

        console.log(postTracklist[closestIndex])
    
      }, );
      
    function button(){
        onClick("Playlist")
    }


  return (
    <div>
      <p>tempo:{postSelectedTempo}</p>
      <p>energy:{postSelectedEnergy}</p>
      <p>dance:{postSelectedDance}</p>

      <p>list:{postTempoList}</p>

      <p>
        {postTempoList.map((tempo, index) => (
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