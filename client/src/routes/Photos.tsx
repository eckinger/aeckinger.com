import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '../types/Photo';

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching photos');
        setLoading(false);
        console.error(err);
      }
    };
  fetchPhotos();
  }, []);


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
              {loading ? (
                <p>Loading photos...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                Object.entries(groupPhotosByDate(photos))
                  .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                  .map(([date, photoGroup]) => (
                    <PhotoGroup key={date} date={date} photos={photoGroup} />
                  ))
              )}
            </div>
          </section>
        </h1>
      </div>
    </div>
  );
};

const PhotoItem: React.FC<{ photo: Photo }> = ({ photo }) => {
  return (
    <div className="overflow-hidden h-min w-full">
      <img
        src={`http://localhost:5000${photo.photo_path}`}
        alt={photo.caption}
        className="block object-cover object-center animate-fade-in transition duration-500 transform scale-100 hover:scale-110"
      />
    </div>
  );
};

const PhotoGroup: React.FC<{ date: string, photos: Photo[] }> = ({ date, photos }) => {
  return (
    <div className="flex flex-wrap w-full">
      <h1 className="text-white font-signika">{date}</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2 place-content-center">
        {photos.map(photo => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

const groupPhotosByDate = (photos: Photo[]): Record<string, Photo[]> => {
  return photos.reduce((groups: Record<string, Photo[]>, photo) => {
    const date = photo.photo_date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(photo);
    return groups;
  }, {});
};

export default Photos;
