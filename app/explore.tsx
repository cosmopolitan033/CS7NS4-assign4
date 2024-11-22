import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin'); // Active city for data fetching
    const [pendingCity, setPendingCity] = useState<string>('dublin'); // Input field state
    const { data, loading, error } = useFetchAirQuality(city);

    console.log('ExplorePage rendered'); // Debugging log
    console.log('Data:', data);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPendingCity(e.target.value); // Update the input field state
    };

    const handleConfirmCity = () => {
        setCity(pendingCity); // Update the city to fetch data
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Explore Air Quality Data</h1>
            <label>
                Select City:
                <input
                    type="text"
                    value={pendingCity}
                    onChange={handleCityChange}
                    placeholder="Enter city name"
                />
            </label>
            <button onClick={handleConfirmCity}>Confirm</button>
            {data && data.length > 0 ? (
                <LineChart
                    labels={data.map((item) => item.timestamp)}
                    data={data.map((item) => item.aqi)}
                />
            ) : (
                <p>No data available for the selected city.</p>
            )}
        </div>
    );
};

export default ExplorePage;
