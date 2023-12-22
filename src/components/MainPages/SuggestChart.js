import React from "react";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement} from 'chart.js';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
  )

const SuggestChart = ({ energy, danceability, acousticness, speechiness, liveness, valence}) => {
    const data = {
        labels: ['energy', 'danceability','acousticness','speechiness','liveness','valence'],
        datasets: [
            {
            axis: 'y',
            label: 'track feature',
            data: [ energy, danceability, acousticness, speechiness, liveness, valence],
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        
            },
        ]
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      };

    return (
    <div>
        <Bar data={data} options={options}/>
    </div>
    )
  };

export default SuggestChart;