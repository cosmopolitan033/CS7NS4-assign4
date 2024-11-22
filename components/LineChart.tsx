import React, { Suspense } from 'react';

const Line = React.lazy(() => import('react-chartjs-2').then((mod) => ({ default: mod.Line })));

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

// Dynamically import `chartjs-plugin-zoom` only on the client side
if (typeof window !== 'undefined') {
    const zoomPlugin = require('chartjs-plugin-zoom').default;
    ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, zoomPlugin);
}

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
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Air Quality Over Time',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x' as const,
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x' as const,
                },
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

    if (typeof window === 'undefined') {
        return null; // Return nothing if window is unavailable
    }

    return (
        <Suspense fallback={<p>Loading Chart...</p>}>
            <Line data={chartData} options={options} />
        </Suspense>
    );
};

export default LineChart;