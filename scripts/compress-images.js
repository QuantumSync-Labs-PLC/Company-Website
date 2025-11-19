#!/usr/bin/env node

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image compression configuration by category
const imageConfig = {
  // Hero and large section images (aggressive compression)
  hero: ["heroImage1.jpg", "cloud-migration.jpg", "cloud.jpg"],
  // Blog and section images (medium compression)
  blog: [
    "analytics.jpg",
    "building-scalable-apps.jpg",
    "devops.jpg",
    "quantum-healthcare.jpg",
    "ai-trends.jpg",
    "ui-ux-design.jpg",
    "cybersecurity.jpg",
    "cybersecurity-strategies-2024.jpg",
  ],
  // Avatar and portrait images
  avatar: ["kaveesha.PNG"],
};

const imagesDir = path.join(__dirname, "..", "src", "assets", "images");

async function compressImage(filename, category) {
  const inputPath = path.join(imagesDir, filename);
  const tempPath = inputPath + ".tmp";

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠️  Skipped ${filename} (file not found)`);
    return;
  }

  try {
    const ext = path.extname(filename).toLowerCase();
    let pipeline = sharp(inputPath);

    if (category === "hero") {
      // Hero images: resize to 1400px width, quality 70
      pipeline = pipeline
        .resize(1400, undefined, { withoutEnlargement: true })
        .jpeg({ quality: 70, progressive: true });
    } else if (category === "blog") {
      // Blog images: resize to 1200px width, quality 75
      pipeline = pipeline
        .resize(1200, undefined, { withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true });
    } else if (category === "avatar") {
      // Avatar images: resize to 512px, lossless PNG compression
      if (ext === ".png") {
        pipeline = pipeline
          .resize(512, 512, { fit: "cover", withoutEnlargement: true })
          .png({ compressionLevel: 9 });
      } else {
        pipeline = pipeline
          .resize(512, 512, { fit: "cover", withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true });
      }
    }

    // Write to temp, then replace original
    await pipeline.toFile(tempPath);
    fs.renameSync(tempPath, inputPath);

    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`✅ ${filename} → ${sizeMB} MB`);
  } catch (err) {
    console.error(`❌ Error compressing ${filename}:`, err.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function main() {
  console.log("🖼️  Image Compression Script\n");
  console.log(`📁 Processing images in: ${imagesDir}\n`);

  const allImages = [
    ...imageConfig.hero.map((f) => ({ file: f, cat: "hero" })),
    ...imageConfig.blog.map((f) => ({ file: f, cat: "blog" })),
    ...imageConfig.avatar.map((f) => ({ file: f, cat: "avatar" })),
  ];

  for (const { file, cat } of allImages) {
    await compressImage(file, cat);
  }

  console.log('\n✨ Compression complete! Run "npm run build" to verify.');
}

main().catch((err) => {
  console.error("Fatal error:", err);
});
