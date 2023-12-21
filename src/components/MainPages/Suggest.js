import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getLocalAccessToken } from '../Spotify';

const Suggest = ({ onClick, postSelectedTempo, postSelectedEnergy, postSelectedDance, postTempoList, postEnergyList, postDanceabilityList, postTracklist }) => {
    const accessToken = getLocalAccessToken();
    const [trackTitle, setTrackTitle] = useState(null);
    const [trackImage, setTrackImage] = useState(null);
    const [previewUrl, setpreviewUrl] = useState(null);
    const [artistName, setartistName] = useState(null);

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
