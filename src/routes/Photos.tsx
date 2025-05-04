import React from 'react';
import { Link } from 'react-router-dom';

const Photos: React.FC = () => {
  return (
    <div className="dark:bg-black bg-white h-screen text-black dark:text-white px-5 md:px-20 <!--opacity-0--> animate-fade-in transition duration-500">
      <header className="flex w-full overflow-hidden pt-10 pb-1">
        <div className="container mx-auto flex flex-wrap items-center md:flex-no-wrap">
          <div className="mr-4 md:mr-8">
            <Link to="/"> <span className="text-2xl font-signika font-bold">ALEXANDER ECKINGER</span></Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto">
        <h1 className="pt-10 pb-8">
          <section className="text-neutral-700">
            <div className="container w-full">
              photos
            </div>
          </section>
        </h1>
      </div>
    </div>
  );
};

export default Photos;
