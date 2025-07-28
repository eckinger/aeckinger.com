import React from "react";
import { Link } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";

const Welcome: React.FC = () => {
  return (
    <BaseLayout>
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5 mt-40 text-center">
          <span className="text-highlight font-rubik">Alexander Eckinger</span>
        </h1>
        <div className="flex flex-col items-center space-y-5">
          <a href="https://brackishwater.aeckinger.com" className="relative group">
            <span className="btn-shadow"></span>
            <span className="btn-main font-rubik">Brackish Water</span>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 bg-gray-800 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              Photos & Blog
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-800"></div>
            </div>
          </a>
          <a href="https://www.goodreads.com/eckinger" className="relative">
            <span className="btn-shadow"></span>
            <span className="btn-main font-rubik">Reading</span>
          </a>
          <Link to="/bio" className="relative">
            <span className="btn-shadow"></span>
            <span className="btn-main font-rubik">Bio</span>
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Welcome;
