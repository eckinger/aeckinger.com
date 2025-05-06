import React from 'react';
import BaseLayout from '../components/BaseLayout';

const Bio: React.FC = () => {
    return (
        <BaseLayout showHomeLink={true}>
          <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
              <span className="text-highlight font-rubik">Bio</span>
            </h1>
            <div className="relative inline-block">
              <span className="btn-shadow"></span>
              <span className="btn-main-no-hover">
                <p className="text-1xl text-left max-w-prose font-rubik">
                  In June 2025, I will graduate from the University of Chicago with
                  a degree in computer science. This summer I will work for a
                  Chicago-based energy startup.
                </p></span>
            </div>
          </div>
        </BaseLayout>
    );
};

export default Bio;
