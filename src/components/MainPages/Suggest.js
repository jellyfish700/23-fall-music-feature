import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postTracklist }) => {
    const accessToken = useParams().id;
    const [trackTitle, setTrackTitle] = useState(null);
    const [trackImage, setTrackImage] = useState(null);
    const [previewUrl, setpreviewUrl] = useState(null);
    const [artistName, setartistName] = useState(null);
    
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
                console.log(data)
                setTrackTitle(data.name);
                setTrackImage(data.album.images[0].url);
                setpreviewUrl(data.preview_url);
                setartistName(data.album.artists[0].name);

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
            <img className="suggestImage left" src={trackImage}/>
            <div className='suggestText'>
                <p className='ft1  '>推薦された曲は</p>
                <p className='ft1  '>「{trackTitle}」</p>
            </div>
            <div className='clear suggestFeature'>
                <p>推薦された曲のアーティストは{artistName}です。</p>
                <p>tempo {postSelectedTempo}</p>
                <p>energy {postSelectedEnergy}</p>
                <p>dance {postSelectedDance}</p>
                {/* <p>{previewUrl}</p> */}
            </div>
            <Button className="button rounded-pill suggestButton" onClick={button}>back</Button>
        </div>
    );
};

export default Suggest;
