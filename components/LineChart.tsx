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

if (typeof window !== 'undefined') {
    const zoomPlugin = require('chartjs-plugin-zoom').default;
    ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, zoomPlugin);
}

interface LineChartProps {
    labels: string[];
    datasets: any[]; // Updated to accept multiple datasets
    options?: any;
    style?: React.CSSProperties;
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets, options, style }) => {
    const chartData = {
        labels: labels,
        datasets: datasets,
    };

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        ...options, // Merge passed options
    };

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div style={style}>
            <Suspense fallback={<p>Loading Chart...</p>}>
                <Line data={chartData} options={defaultOptions} />
            </Suspense>
        </div>
    );
};

export default LineChart;
