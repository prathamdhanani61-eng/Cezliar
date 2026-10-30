// Creates web-sized WebP copies of every product photo in public/images/products
// (240px for small thumbnails, 640px for cards, 1200px for the product gallery) under
// public/images/optimized. Runs before `npm run dev` and `npm run build`; files
// that are already up to date are skipped. The site falls back to the original
// photo when an optimized copy is missing.
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'public/images/products');
const OUTPUT = path.join(ROOT, 'public/images/optimized/products');
const SIZES = [240, 640, 1200];
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('[optimize-images] sharp is not installed; using original product photos.');
  process.exit(0);
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

const mtime = async (file) => {
  try {
    return (await fs.stat(file)).mtimeMs;
  } catch {
    return 0;
  }
};

let created = 0;
let failed = 0;
for await (const source of walk(SOURCE)) {
  const rel = path.relative(SOURCE, source).replace(/\.[^.]+$/, '');
  const sourceTime = await mtime(source);
  for (const width of SIZES) {
    const target = path.join(OUTPUT, `${rel}-${width}.webp`);
    if ((await mtime(target)) >= sourceTime) continue;
    try {
      await fs.mkdir(path.dirname(target), { recursive: true });
      await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
      created += 1;
    } catch (error) {
      failed += 1;
      console.warn(`[optimize-images] skipped ${path.relative(ROOT, source)}: ${error.message}`);
    }
  }
}

console.log(`[optimize-images] ${created} image(s) written${failed ? `, ${failed} skipped` : ''}.`);
