import React, { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import photos from "../gallery-data.json";

const Photos: React.FC = () => {
  const [index, setIndex] = useState(-1);

  return (
    <BaseLayout showHomeLink={true}>
      <div className="h-screen overflow-hidden flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5 mt-20 text-center font-rubik">
          <span className="text-highlight">Gallery</span>
        </h1>

        <div className="px-4 w-full md:w-11/12 max-w-7xl mx-auto mb-10">
          <div className="relative w-full">
            {" "}
            {/* Added w-full here */}
            <span className="btn-shadow"></span>
            <div className="bg-white p-4 rounded-sm border-2 border-black relative h-[60vh] md:h-[80vh] overflow-y-scroll custom-scrollbar w-full">
              <MasonryPhotoAlbum
                photos={photos}
                columns={(containerWidth) => {
                  if (containerWidth < 500) return 2;
                  if (containerWidth < 900) return 3;
                  return 4;
                }}
                spacing={10}
                onClick={({ index }) => setIndex(index)}
              />
            </div>
          </div>
        </div>

        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
        />
      </div>
    </BaseLayout>
  );
};

export default Photos;
