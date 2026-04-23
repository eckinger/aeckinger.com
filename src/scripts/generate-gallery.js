const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const exifr = require("exifr");

const galleryDir = path.join(__dirname, "../../public/gallery");
const optimizedDir = path.join(__dirname, "../../public/gallery-optimized");
const thumbDir = path.join(__dirname, "../../public/gallery-thumbs");
const outputFile = path.join(__dirname, "../gallery-data.json");

const MAX_WIDTH = 3200;
const THUMB_WIDTH = 1800;
const QUALITY = 82;

async function generateGallery() {
  fs.mkdirSync(optimizedDir, { recursive: true });
  fs.mkdirSync(thumbDir, { recursive: true });

  const files = fs
    .readdirSync(galleryDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  const data = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(galleryDir, file);
      const baseName = path.parse(file).name;
      const outName = `${baseName}.webp`;

      // Read EXIF before sharp (which strips it)
      const buffer = fs.readFileSync(filePath);
      const stats = fs.statSync(filePath);
      let dateTaken;
      try {
        const metadata = await exifr.parse(buffer, {
          pick: ["DateTimeOriginal"],
        });
        dateTaken = metadata?.DateTimeOriginal || stats.birthtime;
      } catch {
        dateTaken = stats.birthtime;
      }

      // Generate full-size optimized WebP
      const image = sharp(filePath).rotate(); // auto-rotate via EXIF
      const { width, height } = await image
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(optimizedDir, outName))
        .then((info) => info);

      // Generate thumbnail
      await sharp(filePath)
        .rotate()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(path.join(thumbDir, outName));

      return {
        src: `/gallery-optimized/${outName}`,
        thumb: `/gallery-thumbs/${outName}`,
        width,
        height,
        date: new Date(dateTaken).getTime(),
      };
    }),
  );

  data.sort((a, b) => b.date - a.date);
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`✅ ${data.length} photos optimized and sorted.`);
}

generateGallery();
