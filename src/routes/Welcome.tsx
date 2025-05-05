import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';

const Welcome: React.FC = () => {
    return (
        <BaseLayout>
            <div className="min-h-screen flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
                    <span className="text-highlight">Alexander Eckinger</span>
                </h1>
                <div className="flex flex-col items-center space-y-5">
                    <Link to="/photos" className="relative">
                        <span className="btn-shadow"></span>
                        <span className="btn-main">Photography</span>
                    </Link>
                    <a href="https://www.goodreads.com/eckinger" className="relative">
                        <span className="btn-shadow"></span>
                        <span className="btn-main">Reading</span>
                    </a>
                    <Link to="/bio" className="relative">
                        <span className="btn-shadow"></span>
                        <span className="btn-main">Bio</span>
                    </Link>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Welcome;
