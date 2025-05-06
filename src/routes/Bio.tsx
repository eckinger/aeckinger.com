import React from 'react';
import BaseLayout from '../components/BaseLayout';

const Bio: React.FC = () => {
    return (
        <BaseLayout showHomeLink={true}>
          <div className="min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
              <span className="text-highlight font-rubik">Bio</span>
            </h1>
            <div className="px-4 w-full md:w-3/4 lg:w-2/3 max-w-3xl mx-auto">
              <div className="relative inline-block w-full">
                <span className="btn-shadow"></span>
                <span className="btn-main-no-hover">
                  <p className="text-1xl text-left max-w-prose font-rubik font-medium">
                    In June 2025, I will graduate from the University of Chicago with
                    a degree in computer science. This summer I will work for a
                    Chicago-based energy startup.
                  </p></span>
              </div>
            </div>
          </div>
        </BaseLayout>
    );
};

export default Bio;
