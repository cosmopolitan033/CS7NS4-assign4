import React from 'react';

const IndexPage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Air Quality App</h1>
            <p>
                Navigate to the <a href="/app/explore">Explore</a> page to visualize air quality data from various cities.
            </p>
        </div>
    );
};

export default IndexPage;
