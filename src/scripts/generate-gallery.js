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

      const buffer = fs.readFileSync(filePath);
      const dimensions = sizeOf(buffer);

      let dateTaken;
      let orientation = 1;
      try {
        const metadata = await exifr.parse(buffer, {
          pick: ["DateTimeOriginal", "Orientation"],
          translateValues: false,
        });
        dateTaken = metadata?.DateTimeOriginal || stats.birthtime;
        orientation = metadata?.Orientation ?? 1;
      } catch (e) {
        console.warn(`Could not read EXIF for ${file}, using file date.`);
        dateTaken = stats.birthtime;
      }

      const rotated = [5, 6, 7, 8].includes(orientation);

      return {
        src: `/gallery/${file}`,
        width: rotated ? dimensions.height : dimensions.width,
        height: rotated ? dimensions.width : dimensions.height,
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
