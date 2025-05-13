import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/photo_background.webp";

type BaseLayoutProps = {
  children: React.ReactNode;
  showHomeLink?: boolean;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  showHomeLink = false,
}) => {
  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {showHomeLink && (
        <div className="flex gap-5 fixed top-4 left-4 mt-4">
          <Link to="/" className="relative">
            <span className="absolute top-o left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-xs font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 font-rubik">
              Return Home
            </span>
          </Link>
        </div>
      )}

      {children}

      <div className="flex gap-5 fixed bottom-4 left-4">
        <a
          href="https://www.alltrails.com/trail/us/arizona/scholz-lake"
          className="relative"
        >
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
          <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-xs font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 font-rubik">
            Scholz Lake, Flagstaff
          </span>
        </a>
      </div>

      {/* TODO: add contact buttons */}
    </div>
  );
};

export default BaseLayout;
