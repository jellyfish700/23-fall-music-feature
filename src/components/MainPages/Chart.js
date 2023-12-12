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
    ChartData,
    ChartOptions,
  } from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  )
  

const BarChart = () => {
    const data = {
        labels:["Tempo","Energy","Danceability"],
        datasets: [
            {
            label: "特徴量", // 凡例
            data: [100, 40, 80],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
            
            },
        ]
    }
    const options = {
        scales: {
            r: {
              beginAtZero: true, // 中心から始めるかどうか
              ticks: {
                display: false, // 数値のラベルを非表示にする
              },
              grid: {
                color: "rgba(255, 255, 255, 0.3)", // 目盛りの線の色を設定
              },
            },
            
          },
    }

    return (
    <div>
        <Radar data={data} options={options}/>
    </div>
    )
  };

export default BarChart;