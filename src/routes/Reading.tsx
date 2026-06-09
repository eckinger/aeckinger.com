import React from "react";
import BaseLayout from "../components/BaseLayout";
import bookData from "../gallery-data-books.json";

const hoverStyles = `
  .book-row { transition: background-color 0.1s ease; }
  .book-row:hover { background-color: #facc15; } /* Tailwind yellow-400 */
`;

const Reading: React.FC = () => {
  // Group finished books by year
  const groupedBooks = bookData.read.reduce(
    (groups: Record<string, typeof bookData.read>, book) => {
      const year = book.yearFinished || "Prior";
      if (!groups[year]) groups[year] = [];
      groups[year].push(book);
      return groups;
    },
    {},
  );

  // Sort years descending
  const sortedYears = Object.keys(groupedBooks).sort((a, b) => {
    if (a === "Prior") return 1;
    if (b === "Prior") return -1;
    return b.localeCompare(a);
  });

  // Shared responsive grid layout classes for perfect cross-section alignment
  const gridLayout =
    "book-row grid grid-cols-12 gap-2 py-2 px-2 border-b border-gray-100 items-center text-xs md:text-sm";

  return (
    <BaseLayout showHomeLink={true}>
      <style>{hoverStyles}</style>
      <div className="h-screen overflow-hidden flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5 mt-10 text-center font-rubik">
          <span className="text-highlight">Reading Log</span>
        </h1>

        <div className="px-4 w-full md:w-11/12 max-w-7xl mx-auto mb-10">
          <div className="relative w-full">
            <span className="btn-shadow"></span>
            <div className="bg-white p-4 md:p-8 rounded-sm border-2 border-black relative h-[70vh] md:h-[80vh] overflow-y-scroll custom-scrollbar w-full text-black font-rubik">
              {/* CURRENTLY READING */}
              {bookData.currentlyReading.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-4">
                    Currently Reading
                  </h2>
                  <div className="flex flex-col">
                    {bookData.currentlyReading.map((book, idx) => (
                      <a
                        key={idx}
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={gridLayout}
                      >
                        <div className="col-span-6 md:col-span-6 font-bold truncate">
                          {book.title}
                        </div>
                        <div className="col-span-3 md:col-span-3 text-gray-600 truncate">
                          {book.author}
                        </div>
                        <div className="col-span-2 md:col-span-2"></div>
                        <div className="col-span-1 md:col-span-1"></div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* FINISHED BOOKS BY YEAR */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 mb-6">
                  Finished
                </h2>

                {sortedYears.map((year) => (
                  <div key={year} className="mb-8">
                    <h3 className="text-lg font-bold mb-3 text-gray-900 w-fit pr-4">
                      {year}
                    </h3>
                    <div className="flex flex-col">
                      {groupedBooks[year].map((book, idx) => (
                        <a
                          key={idx}
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={gridLayout}
                        >
                          <div className="col-span-6 md:col-span-6 font-medium truncate">
                            {book.title}
                          </div>
                          <div className="col-span-3 md:col-span-3 text-gray-600 truncate">
                            {book.author}
                          </div>
                          <div className="col-span-2 md:col-span-2 text-yellow-600 tracking-tighter">
                            {book.rating > 0 && "★".repeat(book.rating)}
                          </div>
                          <div className="col-span-1 md:col-span-1 text-right text-gray-400 text-[11px] uppercase tracking-wider">
                            {book.dateFinished || ""}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Reading;
