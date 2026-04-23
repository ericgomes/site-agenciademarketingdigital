import sharp from 'sharp';
import { existsSync } from 'fs';

const photos = [
  { src: 'img/eric-gomes.jpg',       base: 'img/eric' },
  { src: 'img/marcelo-caricati.jpg', base: 'img/marcelo' },
];

for (const { src, base } of photos) {
  if (!existsSync(src)) { console.error(`Missing: ${src}`); continue; }

  // 1x — 80px (covers hero 72px + contact 80px at 1x density)
  await sharp(src).resize(80, 80, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 }).toFile(`${base}-80.webp`);

  // 2x — 160px (retina)
  await sharp(src).resize(160, 160, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 }).toFile(`${base}-160.webp`);

  // JPEG fallback — 160px resized (local, avoids GitHub raw dependency)
  await sharp(src).resize(160, 160, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true }).toFile(`${base}-160.jpg`);

  console.log(`✓ ${base}`);
}
console.log('WebP generation complete.');
