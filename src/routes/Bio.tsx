import React from 'react';
import BaseLayout from '../components/BaseLayout';

const Bio: React.FC = () => {
    return (
        <BaseLayout showHomeLink={true}>
          <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
              <span className="text-highlight">Bio</span>
            </h1>
            <p className="text-1xl mb-5 text-left max-w-prose font-signika">
              In June 2025, I graduated from the University of Chicago with
              a degree in computer science. After moving back to the SF Bay,
              I began work for a Chicago-based energy startup.
            </p>
          </div>
        </BaseLayout>
    );
};

export default Bio;
