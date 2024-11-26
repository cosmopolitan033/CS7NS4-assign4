import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the /explore route when this component mounts
        navigate('/explore');
    }, [navigate]);

    return (
        <div>
            <p>Redirecting to Explore...</p>
        </div>
    );
};

export default IndexPage;
