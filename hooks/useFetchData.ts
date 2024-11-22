import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://172.166.180.49:8080/api/airquality/dublin';

type FetchDataResponse = any; // Replace `any` with the specific shape of your response data.

export const useFetchData = (city: string) => {
    const [data, setData] = useState<FetchDataResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${city}`);
                setData(response.data);
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
};
