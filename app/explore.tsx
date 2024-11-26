import React, { useState } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import LineChart from '../components/LineChart';
import styles from "@/components/ui/ExplorePageStyles";
type GraphType = 'aqi' | 'temperature' | 'humidity' | 'dominantPollutant';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin');
    const [pendingCity, setPendingCity] = useState<string>('dublin');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedGraph, setSelectedGraph] = useState<GraphType>('aqi');
    const endpointMap: Record<GraphType, string> = {
        aqi: 'airquality',
        temperature: 'temperature',
        humidity: 'humidity',
        dominantPollutant: 'dominantpollutant',
    };
    const { data, loading, error } = useFetchData(city, endpointMap[selectedGraph]);

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

    const graphData: Record<GraphType, number[]> = {
        aqi: filteredData?.map((item) => item.aqi) || [],
        temperature: filteredData?.map((item) => item.temperature) || [],
        humidity: filteredData?.map((item) => item.humidity) || [],
        dominantPollutant: filteredData?.map((item) => getPollutantValue(item.dominantPollutant)) || [],
    };

    const chartOptions: Record<GraphType, any> = {
        aqi: {
            plugins: {
                title: {
                    display: true,
                    text: 'Air Quality Index (AQI) Over Time',
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'AQI',
                    },
                },
            },
        },
        temperature: {
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature (°C) Over Time',
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                    },
                },
            },
        },
        humidity: {
            plugins: {
                title: {
                    display: true,
                    text: 'Humidity (%) Over Time',
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                    },
                },
            },
        },
        dominantPollutant: {
            plugins: {
                title: {
                    display: true,
                    text: 'Dominant Pollutant Over Time',
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Pollutant (Categorized Value)',
                    },
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
                    </select>
                </label>
            </div>
            <div style={styles.chartContainer}>
                {filteredData && filteredData.length > 0 ? (
                    <LineChart
                        labels={filteredData.map((item) => item.timestamp)}
                        data={graphData[selectedGraph]}
                        options={{
                            maintainAspectRatio: false,
                            ...chartOptions[selectedGraph], // Apply specific options for the selected graph
                        }}
                        style={styles.chart}
                        graphType={selectedGraph}
                    />
                ) : (
                    <p>No data available for the selected city and date range.</p>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
