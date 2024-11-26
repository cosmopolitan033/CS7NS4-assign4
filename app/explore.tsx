import React, { useState } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import LineChart from '../components/LineChart';
import styles from "@/components/ui/ExplorePageStyles";

type GraphType = 'aqi' | 'temperature' | 'humidity' | 'dominantPollutant' | 'all';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin');
    const [pendingCity, setPendingCity] = useState<string>('dublin');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedGraph, setSelectedGraph] = useState<GraphType>('aqi');

    // Assuming 'airquality' endpoint returns all data needed
    const { data, loading, error } = useFetchData(city, 'airquality');

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingCity(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleGraphChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGraph(e.target.value as GraphType);
    };

    const handleConfirmCity = () => {
        setCity(pendingCity);
    };

    const filteredData = data?.filter((item) => {
        const timestamp = new Date(item.timestamp).getTime();
        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;

        return (!start || timestamp >= start) && (!end || timestamp <= end);
    });

    if (loading) return <p style={styles.loading}>Loading...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    const pollutants: Record<string, number> = { pm25: 25, pm10: 10, o3: 30, co: 40, so2: 50, no2: 20 };

    const getPollutantValue = (pollutant: string): number => {
        return pollutants[pollutant] || 0;
    };

    // Prepare datasets for the chart
    const chartLabels = filteredData?.map((item) => item.timestamp) || [];

    const datasets = [];

    if (selectedGraph === 'all' || selectedGraph === 'aqi') {
        datasets.push({
            label: 'Air Quality Index (AQI)',
            data: filteredData?.map((item) => item.aqi) || [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            tension: 0.4,
            yAxisID: 'y',
        });
    }

    if (selectedGraph === 'all' || selectedGraph === 'temperature') {
        datasets.push({
            label: 'Temperature (°C)',
            data: filteredData?.map((item) => item.temperature) || [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
            tension: 0.4,
            yAxisID: 'y1',
        });
    }

    if (selectedGraph === 'all' || selectedGraph === 'humidity') {
        datasets.push({
            label: 'Humidity (%)',
            data: filteredData?.map((item) => item.humidity) || [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1,
            tension: 0.4,
            yAxisID: 'y2',
        });
    }

    if (selectedGraph === 'all' || selectedGraph === 'dominantPollutant') {
        datasets.push({
            label: 'Dominant Pollutant (Categorized)',
            data: filteredData?.map((item) => getPollutantValue(item.dominantPollutant)) || [],
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderWidth: 1,
            tension: 0.4,
            yAxisID: 'y3',
        });
    }

    // Configure chart options to handle multiple y-axes if necessary
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Air Quality Data Over Time',
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
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'AQI / Pollutant Value',
                },
            },
            y1: {
                type: 'linear' as const,
                display: selectedGraph === 'all' || selectedGraph === 'temperature',
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                },
            },
            y2: {
                type: 'linear' as const,
                display: selectedGraph === 'all' || selectedGraph === 'humidity',
                position: 'left' as const,
                offset: true,
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Humidity (%)',
                },
            },
            y3: {
                type: 'linear' as const,
                display: selectedGraph === 'all' || selectedGraph === 'dominantPollutant',
                position: 'right' as const,
                offset: true,
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Pollutant (Value)',
                },
            },
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Explore Air Quality Data</h1>
            </header>
            <div style={styles.inputContainer}>
                <label style={styles.label}>
                    Select City:
                    <input
                        type="text"
                        value={pendingCity}
                        onChange={handleCityChange}
                        placeholder="Enter city name"
                        style={styles.input}
                    />
                </label>
                <button onClick={handleConfirmCity} style={styles.button}>
                    Confirm
                </button>
            </div>
            <div style={styles.dateContainer}>
                <label style={styles.label}>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        style={styles.input}
                    />
                </label>
            </div>
            <div style={styles.selectContainer}>
                <label style={styles.label}>
                    Select Graph:
                    <select value={selectedGraph} onChange={handleGraphChange} style={styles.select}>
                        <option value="aqi">Air Quality Index (AQI)</option>
                        <option value="temperature">Temperature (°C)</option>
                        <option value="humidity">Humidity (%)</option>
                        <option value="dominantPollutant">Dominant Pollutant (Categorized)</option>
                        <option value="all">All Variables</option>
                    </select>
                </label>
            </div>
            <div style={styles.chartContainer}>
                {filteredData && filteredData.length > 0 ? (
                    <LineChart
                        labels={chartLabels}
                        datasets={datasets}
                        options={chartOptions}
                        style={styles.chart}
                    />
                ) : (
                    <p>No data available for the selected city and date range.</p>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
