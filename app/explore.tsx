import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin'); // Active city for data fetching
    const [pendingCity, setPendingCity] = useState<string>('dublin'); // Input field state
    const [startDate, setStartDate] = useState<string>(''); // Start date for query
    const [endDate, setEndDate] = useState<string>(''); // End date for query
    const { data, loading, error } = useFetchAirQuality(city);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingCity(e.target.value); // Update the input field state
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value); // Update start date
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value); // Update end date
    };

    const handleConfirmCity = () => {
        setCity(pendingCity); // Update the city to fetch data
    };

    // Filter data based on the start and end dates
    const filteredData = data?.filter((item) => {
        const timestamp = new Date(item.timestamp).getTime();
        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;

        return (!start || timestamp >= start) && (!end || timestamp <= end);
    });

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
            <div style={styles.chartContainer}>
                {filteredData && filteredData.length > 0 ? (
                    <LineChart
                        labels={filteredData.map((item) => item.timestamp)}
                        data={filteredData.map((item) => item.aqi)}
                        options={{
                            maintainAspectRatio: false,
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
