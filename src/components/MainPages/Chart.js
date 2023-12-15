import React from "react";

import { Radar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  )

  
const BarChart = ({tempo, energy, danceability}) => {
    const data = {
        labels:["Tempo","Energy","Danceability"],
        datasets: [
            {
            label: "特徴量",
            data: [tempo, energy*200, danceability*200],
            fill: true,
            backgroundColor: 'rgba(46, 189, 89, 0.2)',
            borderColor: 'rgb(46, 189, 89)',
            pointBackgroundColor: 'rgb(46, 189, 89)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(46, 189, 89)',
            },
        ]
    }
    const options = {
        scales: {
          r: {
            beginAtZero: true,
            max: 200,
            ticks: {
              display: false,
            },
            grid: {
              color: "rgba(255, 255, 255, 0.3)",
            },
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
        <Radar data={data} options={options} className="chart"/>
    </div>
    )
  };

export default BarChart;