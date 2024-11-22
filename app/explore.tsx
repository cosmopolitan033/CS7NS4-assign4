import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('dublin'); // Replace with default city
    const { data, loading, error } = useFetchAirQuality(city);

    console.log('ExplorePage rendered'); // Debugging log
    console.log('Data:', data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Explore Air Quality Data</h1>
            <label>
                Select City:
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
            </label>
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
