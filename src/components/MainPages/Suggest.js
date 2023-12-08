import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postTracklist }) => {
    const accessToken = useParams().id;
    const [trackTitle, setTrackTitle] = useState(null);
    
    useEffect(() => {
    let closestIndex = 0;
    let closestDifference = Math.abs(postTempoList[0] - postSelectedTempo);

        for (let i = 1; i < postTempoList.length; i++) {
            const difference = Math.abs(postTempoList[i] - postSelectedTempo);
        
            if (difference < closestDifference) {
                closestIndex = i;
                closestDifference = difference;
            }
        }

        async function fetchTrackTitle() {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${postTracklist[closestIndex]}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTrackTitle(data.name);
            } catch (error) {
                console.error('Error fetching playlist tracks:', error.message);
            }
        }

        fetchTrackTitle();
    }, [postSelectedTempo, postTempoList, postTracklist, accessToken]);

    function button() {
        onClick("Playlist");
    }

    return (
        <div>
            <p className='ft1'>選曲された曲は「{trackTitle}」</p>
            <p>tempo: {postSelectedTempo}</p>
            <p>energy: {postSelectedEnergy}</p>
            <p>dance: {postSelectedDance}</p>
            <Button className="button rounded-pill" onClick={button}>戻る</Button>
        </div>
    );
};

export default Suggest;
