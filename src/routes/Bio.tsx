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
                I work in energy consulting for GridCo Partners, where we help utilities,
                governments, and developers with DERs, V2G, interconnection, microgrids,
                NWA cost-benefit analyses, and more.
              </p>
              <br></br>
              <p className="text-1xl text-left max-w-prose font-rubik font-normal">
                I live in Oakland. In my free time, I rock climb, take photos, lift
                weights, backpack, trail run, and read.
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
