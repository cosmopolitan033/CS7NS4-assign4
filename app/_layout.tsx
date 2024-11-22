import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorePage from './explore';
import IndexPage from './index';

const Layout: React.FC = () => {
    return (
        <Router>
            <nav>
                <a href="/">Home</a> | <a href="/app/explore">Explore</a>
            </nav>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/explore" element={<ExplorePage />} />
            </Routes>
        </Router>
    );
};

export default Layout;
