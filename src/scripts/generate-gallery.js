const fs = require("fs");
const path = require("path");
const { imageSize: sizeOf } = require("image-size");
const exifr = require("exifr");

// Corrected paths for your /src/scripts/ layout
const galleryDir = path.join(__dirname, "../../public/gallery");
const outputFile = path.join(__dirname, "../gallery-data.json");

async function generateGallery() {
  const files = fs
    .readdirSync(galleryDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  const data = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(galleryDir, file);
      const stats = fs.statSync(filePath);

      // Read file into a buffer to avoid the TypeError
      const buffer = fs.readFileSync(filePath);
      const dimensions = sizeOf(buffer);

      // Extract EXIF data
      let dateTaken;
      try {
        const metadata = await exifr.parse(buffer); // Use the buffer here too!
        dateTaken = metadata?.DateTimeOriginal || stats.birthtime;
      } catch (e) {
        console.warn(`Could not read EXIF for ${file}, using file date.`);
        dateTaken = stats.birthtime;
      }

      return {
        src: `/gallery/${file}`,
        width: dimensions.width,
        height: dimensions.height,
        date: new Date(dateTaken).getTime(),
      };
    }),
  );

  // Sort by date taken (Newest first)
  data.sort((a, b) => b.date - a.date);

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ Success! ${data.length} photos sorted by capture date.`);
}

generateGallery();
