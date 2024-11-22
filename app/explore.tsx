import React, { useState } from 'react';
import { useFetchAirQuality } from '@/hooks/useFetchAirQuality';
import LineChart from '../components/LineChart';

const ExplorePage: React.FC = () => {
    const [city, setCity] = useState<string>('city_name'); // Replace with a default city name.
    const { data, loading, error } = useFetchAirQuality(city);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const labels = data.map((item) => item.timestamp);
    const values = data.map((item) => item.aqi);

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
            <LineChart labels={labels} data={values} />
        </div>
    );
};

export default ExplorePage;
