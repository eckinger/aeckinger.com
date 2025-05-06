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
                    In June 2025, I graduate from the University of Chicago with a
                    degree in computer science. I'm returning home to the SF bay
                    and, at least for the summer, working for an energy startup.
                  </p>
                  <br></br>
                  <p className="text-1xl text-left max-w-prose font-rubik font-medium">
                    In my free time, I love to rock climb, slackline, write in cursive,
                    read, and hang out with my friends. I've recently made
                    my 2012 kid self proud and rekindled my love for the SF Giants,
                    so I'd like to go to many games this summer (hopefully SJ Giants
                    games too).
                  </p>
                  <br></br>
                  <p className="text-1xl text-left max-w-prose font-rubik font-medium">
                    This website is hosted on my raspberry pi 🥰 and written by me.
                    I actually had written this whole website, with a functioning photography portfolio, in Haskell/IHP.
                    After failing to deploy on the rpi, I decided to redo it all in
                    react/js. So let it be known this is a WIP.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </BaseLayout>
    );
};

export default Bio;
