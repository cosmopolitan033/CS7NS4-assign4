import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin'); // Active city for data fetching
    const [pendingCity, setPendingCity] = useState<string>('dublin'); // Input field state
    const { data, loading, error } = useFetchAirQuality(city);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingCity(e.target.value); // Update the input field state
    };

    const handleConfirmCity = () => {
        setCity(pendingCity); // Update the city to fetch data
    };

    if (loading) return <p style={styles.loading}>Loading...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

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
            <div style={styles.chartContainer}>
                {data && data.length > 0 ? (
                    <LineChart
                        labels={data.map((item) => item.timestamp)}
                        data={data.map((item) => item.aqi)}
                        options={{
                            maintainAspectRatio: false, // Allow full container usage
                        }}
                        style={styles.chart}
                    />
                ) : (
                    <p>No data available for the selected city.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
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
        flex: 0.8, // Reduce the vertical space taken by the chart
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '90%', // Slightly smaller horizontal size
        maxHeight: '80%', // Restrict the chart height
        backgroundColor: '#fff', // Ensure a distinct chart background
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
