import React, { useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import photos from "../gallery-data.json";

const galleryPhotos = photos.map((p) => ({ ...p, src: p.thumb }));
const lightboxSlides = photos.map((p) => ({ src: p.src }));

const photoHoverStyles = `
  .photo-gallery-wrapper [data-testid="photo"],
  .photo-gallery-wrapper img {
    transition: transform 0.2s ease, opacity 0.2s ease;
    cursor: zoom-in;
  }
  .photo-gallery-wrapper [data-testid="photo"]:hover img,
  .photo-gallery-wrapper a:hover img,
  .photo-gallery-wrapper button:hover img,
  .photo-gallery-wrapper div[role="button"]:hover img {
    transform: scale(1.03);
    opacity: 0.88;
  }
  .photo-gallery-wrapper [data-testid="photo"],
  .photo-gallery-wrapper a,
  .photo-gallery-wrapper button,
  .photo-gallery-wrapper div[role="button"] {
    cursor: zoom-in !important;
    overflow: hidden;
  }
`;

const Photos: React.FC = () => {
  const [index, setIndex] = useState(-1);

  return (
    <BaseLayout showHomeLink={true}>
      <style>{photoHoverStyles}</style>
      <div className="h-screen overflow-hidden flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5 mt-10 text-center font-rubik">
          <span className="text-highlight">Gallery</span>
        </h1>

        <div className="px-4 w-full md:w-11/12 max-w-7xl mx-auto mb-10">
          <div className="relative w-full">
            {" "}
            {/* Added w-full here */}
            <span className="btn-shadow"></span>
            <div className="bg-white p-2 md:p-4 rounded-sm border-2 border-black relative h-[70vh] md:h-[80vh] overflow-y-scroll custom-scrollbar w-full">
              <div className="photo-gallery-wrapper">
                <MasonryPhotoAlbum
                  photos={galleryPhotos}
                  columns={(containerWidth) => {
                    if (containerWidth < 600) return 2;
                    if (containerWidth < 900) return 3;
                    return 4;
                  }}
                  spacing={7}
                  onClick={({ index }) => setIndex(index)}
                />
              </div>
            </div>
          </div>
        </div>

        <Lightbox
          slides={lightboxSlides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
        />
      </div>
    </BaseLayout>
  );
};

export default Photos;
