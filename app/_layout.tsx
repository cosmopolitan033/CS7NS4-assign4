import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './index';
import ExplorePage from './explore';

const Layout: React.FC = () => {
    return (
        <Router>
            <nav>
                <a href="/">Home</a> | <a href="/explore">Explore</a>
            </nav>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/explore" element={<ExplorePage />} />
            </Routes>
        </Router>
    );
};

export default Layout;
