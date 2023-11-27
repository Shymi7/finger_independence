import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'


interface TrainingScoreInfoChartProps{
    dataArray: Array<number>;
}

export function TrainingScoreInfoChart({dataArray} : TrainingScoreInfoChartProps){

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Cubic interpolation mode'
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                suggestedMin: 0,
            }
        }
    };

    const labels = Array.from({ length: dataArray.length }, (_, index) => index + 1);
    const twConfig = resolveConfig(tailwindConfig)


    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataArray,
                borderColor: twConfig.theme.colors.accent,
                backgroundColor: '#ffffff',
                tension: 0.4

            },
        ],
    };


    return(
        <Line options={options} data={data}/>
    )
}