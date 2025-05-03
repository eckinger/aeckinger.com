import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';

const Welcome: React.FC = () => {
    const buttonShadowClasses = "absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black";
    const buttonBorderClasses = "fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900";

    return (
        <BaseLayout>
            <div className="min-h-screen flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
                    <span className="text-highlight">Alexander Eckinger</span> here. Check out my
                </h1>
                <div className="flex flex-col items-center space-y-5">
                    <Link to="/photos" className="relative">
                        <span className={buttonShadowClasses}></span>
                        <span className={buttonBorderClasses}>Photography</span>
                    </Link>
                    <a href="https://www.goodreads.com/eckinger" className="relative">
                        <span className={buttonShadowClasses}></span>
                        <span className={buttonBorderClasses}>Reading</span>
                    </a>
                    <Link to="/bio" className="relative">
                        <span className={buttonShadowClasses}></span>
                        <span className={buttonBorderClasses}>Bio</span>
                    </Link>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Welcome;
