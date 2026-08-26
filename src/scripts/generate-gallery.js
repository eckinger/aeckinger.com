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

async function processFile(file) {
  const filePath = path.join(galleryDir, file);
  const baseName = path.parse(file).name;
  const outName = `${baseName}.webp`;

  try {
    // Validate file exists and is readable
    const stats = fs.statSync(filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File disappeared during processing: ${file}`);
    }

    // Read file into buffer
    let buffer;
    try {
      buffer = fs.readFileSync(filePath);
    } catch (err) {
      throw new Error(`Failed to read file: ${err.message}`);
    }

    if (buffer.length === 0) {
      throw new Error(`File is empty (still uploading?): ${file}`);
    }

    // Extract EXIF date
    let dateTaken = stats.birthtime;
    try {
      const metadata = await exifr.parse(buffer, {
        pick: ["DateTimeOriginal"],
      });
      if (metadata?.DateTimeOriginal) {
        dateTaken = metadata.DateTimeOriginal;
      }
    } catch (err) {
      console.warn(`  ⚠️  No EXIF data for ${file}, using file mtime`);
    }

    // Validate image can be read by sharp
    let image;
    try {
      image = sharp(filePath).rotate(); // auto-rotate via EXIF
    } catch (err) {
      throw new Error(`Sharp failed to read image: ${err.message}`);
    }

    // Generate full-size optimized WebP
    let optimizedInfo;
    try {
      optimizedInfo = await image
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(optimizedDir, outName));
    } catch (err) {
      throw new Error(`Failed to create optimized WebP: ${err.message}`);
    }

    const { width, height } = optimizedInfo;

    // Generate thumbnail
    try {
      await sharp(filePath)
        .rotate()
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(path.join(thumbDir, outName));
    } catch (err) {
      // Clean up orphaned optimized file if thumbnail fails
      try {
        fs.unlinkSync(path.join(optimizedDir, outName));
      } catch {}
      throw new Error(`Failed to create thumbnail: ${err.message}`);
    }

    console.log(`  ✅ ${file} → ${outName} (${width}×${height})`);

    return {
      src: `/gallery-optimized/${outName}`,
      thumb: `/gallery-thumbs/${outName}`,
      width,
      height,
      date: new Date(dateTaken).getTime(),
    };
  } catch (err) {
    console.error(`  ❌ ${file}: ${err.message}`);
    return null;
  }
}

async function generateGallery() {
  console.log(">> Reading gallery directory...");

  fs.mkdirSync(optimizedDir, { recursive: true });
  fs.mkdirSync(thumbDir, { recursive: true });

  const files = fs
    .readdirSync(galleryDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort();

  if (files.length === 0) {
    console.log("⚠️  No image files found in gallery directory");
  } else {
    console.log(`>> Processing ${files.length} image(s)...`);
  }

  // Process all files, collecting results and errors
  const results = await Promise.all(files.map(processFile));

  // Filter out nulls (failed files)
  const data = results.filter((item) => item !== null);

  // Report any failures
  const failedCount = files.length - data.length;
  if (failedCount > 0) {
    console.error(
      `\n⚠️  ${failedCount} file(s) failed to process. Check errors above.`,
    );
  }

  // Sort by date descending
  data.sort((a, b) => b.date - a.date);

  // Write metadata
  try {
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`\n✅ ${data.length} photos optimized and sorted.`);
  } catch (err) {
    console.error(`❌ Failed to write gallery-data.json: ${err.message}`);
    process.exit(1);
  }
}

generateGallery().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
