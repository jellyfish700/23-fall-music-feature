import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postEnergyList, postDanceabilityList, postTracklist }) => {
    const accessToken = useParams().id;
    const [trackTitle, setTrackTitle] = useState(null);
    const [trackImage, setTrackImage] = useState(null);
    const [previewUrl, setpreviewUrl] = useState(null);
    const [artistName, setartistName] = useState(null);
    
    useEffect(() => {
        let closeTempoIndex = 0;
        let closeEnergyIndex = 0;
        let closeDanceabilityIndex = 0;

        let closeTempoDifference = Math.abs(postTempoList[0] - postSelectedTempo);
        let closeEnergyDifference = Math.abs(postEnergyList[0] - postSelectedEnergy);
        let closeDanceabilityDifference = Math.abs(postDanceabilityList[0] - postSelectedDance);

        for (let i = 1; i < postTempoList.length; i++) {
            const difference = Math.abs(postTempoList[i] - postSelectedTempo);
            if (difference < closeTempoDifference) {
                closeTempoIndex = i;
                closeTempoDifference = difference;
            }
        }

        for (let i = 1; i < postEnergyList.length; i++) {
            const difference = Math.abs(postEnergyList[i] - postSelectedEnergy);
            if (difference < closeEnergyDifference) {
                closeEnergyIndex = i;
                closeEnergyDifference = difference;
            }
        }

        for (let i = 1; i < postDanceabilityList.length; i++) {
            const difference = Math.abs(postDanceabilityList[i] - postSelectedDance);
            if (difference < closeDanceabilityDifference) {
                closeDanceabilityIndex = i;
                closeDanceabilityDifference = difference;
            }
        }

        async function fetchTrackTitle() {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${postTracklist[closeTempoIndex]}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTrackTitle(data.name);
                setTrackImage(data.album.images[0].url);
                setpreviewUrl(data.preview_url);
                setartistName(data.album.artists[0].name);

            } catch (error) {
                console.error('Error fetching playlist tracks:', error.message);
            }
        }

        fetchTrackTitle();
    }, [postSelectedTempo, postTempoList, postEnergyList, postDanceabilityList, postTracklist, accessToken]);

    function button() {
        onClick("Playlist");
    }

    return (
        <div>
            <p>{postDanceabilityList}</p>

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
