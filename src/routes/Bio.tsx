import React from "react";
import BaseLayout from "../components/BaseLayout";

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
              <p className="text-1xl text-left max-w-prose font-rubik font-normal">
                In June 2025, I graduated from the University of Chicago. I'm
                passionate about energy, so right now I'm working for a small
                energy company that speeds up outage response for utilities and
                their crewmen.
              </p>
              <br></br>
              <p className="text-1xl text-left max-w-prose font-rubik font-normal">
                I have returned to San Francisco from Chicago. In my free time,
                I love to rock climb, lift weights, backpack, slackline, write
                letters and postcards, and read. I also like to watch baseball
                and take cool photos.
              </p>
              <br></br>
              <p className="text-1xl text-left max-w-prose font-rubik font-normal">
                This website is hosted on my raspberry pi 🥰 and written by me.
              </p>
            </span>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Bio;
