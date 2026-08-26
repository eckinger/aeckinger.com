const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const exifr = require("exifr");

const galleryDir = path.join(__dirname, "../../public/gallery");
const optimizedDir = path.join(__dirname, "../../public/gallery-optimized");
const thumbDir = path.join(__dirname, "../../public/gallery-thumbs");
const outputFile = path.join(__dirname, "../gallery-data.json");
const cacheFile = path.join(__dirname, "../.gallery-cache.json");

const MAX_WIDTH = 3200;
const THUMB_WIDTH = 1800;
const QUALITY = 82;

// Load previous cache to detect changed files
function loadCache() {
  try {
    if (fs.existsSync(cacheFile)) {
      return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    }
  } catch (err) {
    console.warn("⚠️  Could not load cache, will regenerate all files");
  }
  return {};
}

// Save cache for next run
function saveCache(cache) {
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  } catch (err) {
    console.warn("⚠️  Could not save cache");
  }
}

// Check if a source file has been modified since last run
function isFileChanged(file, sourceStats, cache) {
  const cacheEntry = cache[file];
  if (!cacheEntry) return true; // New file

  // Compare mtime (modification time)
  const currentMtime = sourceStats.mtimeMs;
  if (cacheEntry.mtime !== currentMtime) {
    return true; // Source file was modified
  }

  // Verify output files still exist
  const outName = `${path.parse(file).name}.webp`;
  const optimizedPath = path.join(optimizedDir, outName);
  const thumbPath = path.join(thumbDir, outName);

  if (!fs.existsSync(optimizedPath) || !fs.existsSync(thumbPath)) {
    return true; // Output files were deleted
  }

  return false; // No changes detected
}

async function processFile(file, cache, changedFiles) {
  const filePath = path.join(galleryDir, file);
  const baseName = path.parse(file).name;
  const outName = `${baseName}.webp`;

  try {
    // Validate file exists and is readable
    const stats = fs.statSync(filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File disappeared during processing: ${file}`);
    }

    // Check if file has changed
    if (!isFileChanged(file, stats, cache)) {
      console.log(`  ⏭️  ${file} (unchanged, skipped)`);
      // Still return cached data
      return cache[file].data;
    }

    changedFiles.push(file);

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

    const photoData = {
      src: `/gallery-optimized/${outName}`,
      thumb: `/gallery-thumbs/${outName}`,
      width,
      height,
      date: new Date(dateTaken).getTime(),
    };

    // Update cache
    cache[file] = {
      mtime: stats.mtimeMs,
      data: photoData,
    };

    console.log(`  ✅ ${file} → ${outName} (${width}×${height})`);
    return photoData;
  } catch (err) {
    console.error(`  ❌ ${file}: ${err.message}`);
    delete cache[file]; // Remove from cache on error
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

  // Load cache from previous run
  const cache = loadCache();

  // Track which files changed
  const changedFiles = [];

  // Process all files, collecting results and errors
  const results = await Promise.all(
    files.map((file) => processFile(file, cache, changedFiles)),
  );

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
    console.log(
      `\n✅ ${data.length} photos in gallery (${changedFiles.length} processed, ${files.length - changedFiles.length} cached).`,
    );
  } catch (err) {
    console.error(`❌ Failed to write gallery-data.json: ${err.message}`);
    process.exit(1);
  }

  // Save cache for next run
  saveCache(cache);
}

generateGallery().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
