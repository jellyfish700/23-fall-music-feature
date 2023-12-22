import React, { useEffect, useState } from 'react';
import TrackFeature from './TrackFeature';
import { Button } from 'react-bootstrap';
import { getLocalAccessToken } from '../Spotify';

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postEnergyList, postDanceabilityList, postTracklist }) => {
    const accessToken = getLocalAccessToken();
    const [trackData, setTrackData] = useState(null);
    const [previewUrl, setpreviewUrl] = useState(null);

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
                setpreviewUrl(data.preview_url);

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
        window.location.href = `${previewUrl}`;
    }
    return (
        <div>
            {trackData ? (
            <>
                <img className="suggestImage left" src={trackData.album.images[0].url}/>
                <div className='suggestText'>
                    <p className='ft1  '>推薦された曲は</p>
                    <p className='ft1  '>「{trackData.name}」</p>
                </div>
                <div className='clear suggestFeature'>
                    <p className='left'>推薦された曲のアーティストは{trackData.album.artists[0].name}です。</p>
                    {/* <p>tempo {postSelectedTempo}</p>
                    <p>energy {postSelectedEnergy}</p>
                    <p>dance {postSelectedDance}</p> */}
                    {/* <p>{previewUrl}</p> */}
                    {/* <TrackFeature trackID={trackData.id}/> */}
                    <Button className="button rounded-pill musicButton" onClick={music}>曲を聴いてみる</Button>
                    <Button className="button rounded-pill suggestButton" onClick={button}>戻る</Button>
                </div>
        

            </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Suggest;
