import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://172.166.180.49:8080/api';

interface AirQualityData {
    city: string;
    aqi: number;
    dominantPollutant: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}

export const useFetchData = (city: string, endpoint: string) => {
    const [data, setData] = useState<AirQualityData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/${endpoint}/${city}`);
                setData(response.data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city, endpoint]);

    return { data, loading, error };
};
