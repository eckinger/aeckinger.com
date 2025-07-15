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
                In June 2025, I graduated from the University of Chicago with a
                degree in computer science. I'm now home in the SF bay–this
                summer, I am working for an energy startup. It's been a blast so
                far, and I think I really want to work in energy!
              </p>
              <br></br>
              <p className="text-1xl text-left max-w-prose font-rubik font-normal">
                In my free time, I love to rock climb, lift weights, slackline,
                write letters and postcards, read, and hang out with my friends.
                I've recently rekindled my love for the SF + SJ Giants, so I'd
                like to go to many games this summer.
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
