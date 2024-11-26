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
    options?: any; // Add `options` property for chart options
    style?: React.CSSProperties; // Add `style` property for container styling
    graphType: string;
}

const labelMap: Record<string, string> = {
    aqi: 'Air Quality Index (AQI)',
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    dominantPollutant: 'Dominant Pollutant (Categorized)',
};

const LineChart: React.FC<LineChartProps> = ({ labels, data, options, style, graphType }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: labelMap[graphType] || 'Dataset',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false, // Adjust for dynamic resizing
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
        <div style={style}>
            <Suspense fallback={<p>Loading Chart...</p>}>
                <Line data={chartData} options={{ ...defaultOptions, ...options }} />
            </Suspense>
        </div>
    );
};

export default LineChart;
