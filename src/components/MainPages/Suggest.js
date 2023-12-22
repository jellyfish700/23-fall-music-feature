import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getLocalAccessToken } from '../Spotify';
import play from '../images/play.svg'

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postEnergyList, postDanceabilityList, postTracklist }) => {
    const accessToken = getLocalAccessToken();
    const [trackData, setTrackData] = useState(null);

    useEffect(() => {
        let getFeature = Number(postSelectedTempo) + Number(postSelectedEnergy)*5 + Number(postSelectedDance)*5//選択した値の特徴量
        let featureList=[]//energyとdancebilityの値を100倍にした値とテンポを足し合わせ、それを曲の特徴量とする
        for (let i = 0; i < postTempoList.length; i++) {
            let currentFeature = postTempoList[i] + postEnergyList[i]*50 + postDanceabilityList[i]*50
            featureList.push(currentFeature)
        }

        let closeIndex = 0;
        let closeDifference = Math.abs(featureList[0] - getFeature);

        for (let i = 1; i < featureList.length; i++) {
            const difference = Math.abs(featureList[i] - getFeature);
            if (difference < closeDifference) {
                closeIndex = i;
                closeDifference = difference;
            }
        }

        async function fetchTrackTitle() {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${postTracklist[closeIndex]}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data)
                setTrackData(data);
    

            } catch (error) {
                console.error('Error fetching playlist tracks:', error.message);
            }
        }

        fetchTrackTitle();
    }, [postSelectedTempo, postTempoList, postEnergyList, postDanceabilityList, postTracklist, accessToken]);

    function button() {
        onClick("Playlist");
    }
    function music() {
        window.location.href = `${trackData.external_urls.spotify}`;
    }
    return (
        <div>
            {trackData ? (
            <>
                <img className="suggestImage left" src={trackData.album.images[0].url}/>
                <div className='suggestText'>
                    <p className='ft1'>{trackData.name}</p>
                    <p className='ft2 ftCenter'>{trackData.album.artists[0].name} / {trackData.album.name}</p>
                    <div className='musicButtonPosition'>
                    <Button className="button rounded-pill musicButton" onClick={music}><img src={play} className='playIcon'/>Play on Spotify</Button>
                    </div>
                </div>
                <div className='clear suggestFeature'>
                    <Button className="button rounded-pill suggestButton" onClick={button}>back</Button>
                </div>
        

            </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Suggest;
