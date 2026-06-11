const https = require("https");
const fs = require("fs");
const path = require("path");

const USER_ID = "91888484";
const FEEDS = {
  currentlyReading: `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=currently-reading`,
  read: `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read`,
};

// Cleans up rogue HTML entities left behind by the XML parser
function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function parseDateInfo(dateStr) {
  if (!dateStr) return { display: "", year: "Prior" };
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { display: "", year: "Prior" };

  return {
    display: date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    year: date.getFullYear().toString(),
  };
}

function parseRSS(xml) {
  const items = [];
  const matches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of matches) {
    const content = match[1];
    const title =
      content.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ||
      content.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const author =
      content.match(
        /<author_name><!\[CDATA\[([\s\S]*?)\]\]><\/author_name>/,
      )?.[1] || content.match(/<author_name>([\s\S]*?)<\/author_name>/)?.[1];
    const rating = content.match(/<user_rating>([\s\S]*?)<\/user_rating>/)?.[1];
    const readAt =
      content.match(
        /<user_read_at><!\[CDATA\[([\s\S]*?)\]\]><\/user_read_at>/,
      )?.[1] || content.match(/<user_read_at>([\s\S]*?)<\/user_read_at>/)?.[1];
    const bookId = content.match(/<book_id>([\s\S]*?)<\/book_id>/)?.[1];

    const dates = parseDateInfo(readAt);
    const cleanLink = bookId
      ? `https://www.goodreads.com/book/show/${bookId.trim()}`
      : "";

    if (title) {
      items.push({
        title: cleanText(title),
        author: cleanText(author) || "Unknown Author",
        link: cleanLink,
        rating: rating ? parseInt(rating, 10) : 0,
        dateFinished: dates.display,
        yearFinished: dates.year,
      });
    }
  }
  return items;
}

function fetchFeed(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        // Handle HTTP errors (e.g., 403 Forbidden from Goodreads)
        if (res.statusCode < 200 || res.statusCode >= 300) {
          console.warn(`Failed to fetch ${url}: Status ${res.statusCode}`);
          return resolve([]);
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(parseRSS(data)));
      })
      .on("error", (err) => {
        console.error(`Network error on ${url}:`, err.message);
        resolve([]);
      });
  });
}

async function main() {
  const outputPath = path.resolve(__dirname, "..", "gallery-data-books.json");
  const [currentlyReading, read] = await Promise.all([
    fetchFeed(FEEDS.currentlyReading),
    fetchFeed(FEEDS.read),
  ]);

  if (
    currentlyReading.length === 0 &&
    read.length === 0 &&
    fs.existsSync(outputPath)
  ) {
    return;
  }

  fs.writeFileSync(
    outputPath,
    JSON.stringify({ currentlyReading, read }, null, 2),
  );
}

main();
