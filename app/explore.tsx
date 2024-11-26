import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

type GraphType = 'aqi' | 'temperature' | 'humidity' | 'dominantPollutant';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin');
    const [pendingCity, setPendingCity] = useState<string>('dublin');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedGraph, setSelectedGraph] = useState<GraphType>('aqi');
    const { data, loading, error } = useFetchAirQuality(city);

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
                    text: 'Air Quality Index (AQI) Over Time', // Dynamic chart title
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'AQI', // Dynamic Y-axis title
                    },
                },
            },
        },
        temperature: {
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature (°C) Over Time', // Dynamic chart title
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)', // Dynamic Y-axis title
                    },
                },
            },
        },
        humidity: {
            plugins: {
                title: {
                    display: true,
                    text: 'Humidity (%) Over Time', // Dynamic chart title
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Humidity (%)', // Dynamic Y-axis title
                    },
                },
            },
        },
        dominantPollutant: {
            plugins: {
                title: {
                    display: true,
                    text: 'Dominant Pollutant Over Time', // Dynamic chart title
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Pollutant (Categorized Value)', // Dynamic Y-axis title
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
                    />
                ) : (
                    <p>No data available for the selected city and date range.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f9f9f9',
        boxSizing: 'border-box' as const,
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '10px',
    },
    title: {
        fontSize: '28px',
        color: '#333',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
    },
    dateContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 0',
    },
    selectContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
    },
    label: {
        fontSize: '16px',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
    },
    select: {
        padding: '8px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '250px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    chartContainer: {
        flex: 0.8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    chart: {
        width: '100%',
        height: '100%',
    },
    loading: {
        fontSize: '18px',
        color: '#555',
    },
    error: {
        fontSize: '18px',
        color: 'red',
    },
};

export default ExplorePage;
