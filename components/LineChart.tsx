import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';

// Register required chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface LineChartProps {
    labels: string[];
    data: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, data }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Air Quality Index (AQI)',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Ensure strict type compatibility
            },
            title: {
                display: true,
                text: 'Air Quality Over Time',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'AQI',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
