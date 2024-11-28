import React, { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import LineChart from '../components/LineChart';
import styles from "@/components/ui/ExplorePageStyles";
import * as ss from 'simple-statistics';
import { ChartDataset } from 'chart.js';

type GraphType = 'aqi' | 'temperature' | 'humidity' | 'dominantPollutant' | 'all' | 'correlation';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin');
    const [pendingCity, setPendingCity] = useState<string>('dublin');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selectedGraph, setSelectedGraph] = useState<GraphType>('aqi');
    const [backgroundColor, setBackgroundColor] = useState<string>('#f9f9f9');

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

    const calculateAverageAQI = (): number | null => {
        if (!filteredData || filteredData.length === 0) return null;
        const totalAQI = filteredData.reduce((sum, item) => sum + item.aqi, 0);
        return totalAQI / filteredData.length;
    };

    useEffect(() => {
        const averageAQI = calculateAverageAQI();
        if (averageAQI !== null) {
            if (averageAQI < 50) {
                setBackgroundColor('#d4edda');
            } else if (averageAQI < 100) {
                setBackgroundColor('#fff3cd');
            } else {
                setBackgroundColor('#f8d7da');
            }
        } else {
            setBackgroundColor('#f9f9f9');
        }
    }, [filteredData]);

    if (loading) return <p style={styles.loading}>Loading...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    const pollutants: Record<string, number> = { pm25: 25, pm10: 10, o3: 30, co: 40, so2: 50, no2: 20 };

    const getPollutantValue = (pollutant: string): number => {
        return pollutants[pollutant] || 0;
    };

    const timestamps = filteredData?.map((item) => item.timestamp) || [];
    const aqiData = filteredData?.map((item) => item.aqi) || [];
    const temperatureData = filteredData?.map((item) => item.temperature) || [];
    const humidityData = filteredData?.map((item) => item.humidity) || [];
    const pollutantData = filteredData?.map((item) => getPollutantValue(item.dominantPollutant)) || [];

    const correlations = {
        aqi_temperature: ss.sampleCorrelation(aqiData, temperatureData),
        aqi_humidity: ss.sampleCorrelation(aqiData, humidityData),
        aqi_pollutant: ss.sampleCorrelation(aqiData, pollutantData),
        temperature_humidity: ss.sampleCorrelation(temperatureData, humidityData),
        temperature_pollutant: ss.sampleCorrelation(temperatureData, pollutantData),
        humidity_pollutant: ss.sampleCorrelation(humidityData, pollutantData),
    };

    const datasets: ChartDataset<'line'>[] = [];

    if (selectedGraph === 'all' || selectedGraph === 'aqi') {
        datasets.push({
            label: 'Air Quality Index (AQI)',
            data: aqiData,
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
            data: temperatureData,
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
            data: humidityData,
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
            data: pollutantData,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderWidth: 1,
            tension: 0.4,
            yAxisID: 'y3',
        });
    }

    const chartOptions = {
    };

    return (
        <div style={{...styles.container, backgroundColor}}>
            <header style={styles.header}>
                <h1 style={styles.title}>Explore Air Quality Data</h1>
            </header>
            {/* Input controls */}
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
                        <option value="correlation">Correlation Analysis</option>
                    </select>
                </label>
            </div>
            <div style={styles.chartContainer}>
                {filteredData && filteredData.length > 0 ? (
                    selectedGraph === 'correlation' ? (
                        <div style={styles.correlationContainer}>
                            <h2 style={styles.correlationTitle}>Correlation Analysis</h2>
                            <table style={styles.correlationTable}>
                                <thead>
                                <tr>
                                    <th>Variable Pair</th>
                                    <th>Correlation Coefficient</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>AQI & Temperature</td>
                                    <td>{correlations.aqi_temperature.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>AQI & Humidity</td>
                                    <td>{correlations.aqi_humidity.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>AQI & Dominant Pollutant</td>
                                    <td>{correlations.aqi_pollutant.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Temperature & Humidity</td>
                                    <td>{correlations.temperature_humidity.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Temperature & Dominant Pollutant</td>
                                    <td>{correlations.temperature_pollutant.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Humidity & Dominant Pollutant</td>
                                    <td>{correlations.humidity_pollutant.toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <LineChart
                            labels={timestamps}
                            datasets={datasets}
                            options={chartOptions}
                            style={styles.chart}
                        />
                    )
                ) : (
                    <p>No data available for the selected city and date range.</p>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
