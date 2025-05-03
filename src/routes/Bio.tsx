import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from '../components/BaseLayout';

const Bio: React.FC = () => {
    return (
        <BaseLayout showHomeLink={true}>
          <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
              <span className="text-highlight">Bio</span>
            </h1>
            <p className="text-1xl mb-5 text-left px-20 font-signika">
              As of June 2025, I will be a graduate of the University 
              of Chicago. I will be working at an energy startup based
              out of Chicago, but principally living and working from the
              San Francisco Bay Area.
            </p>
          </div>
        </BaseLayout>
    );
};

export default Bio;
