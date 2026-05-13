import sharp from 'sharp';

// SVG inline — same as favicon.svg
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#7C3AED"/>
  <text x="16" y="22" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="-1">EM</text>
</svg>`;

const buf = Buffer.from(svg);

await sharp(buf).resize(192, 192).png().toFile('icons/icon-192.png');
console.log('✓ icons/icon-192.png');

await sharp(buf).resize(512, 512).png().toFile('icons/icon-512.png');
console.log('✓ icons/icon-512.png');

// maskable variant — extra padding so content sits in safe zone (80% center)
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#7C3AED"/>
  <rect x="4" y="4" width="24" height="24" rx="5" fill="#6D28D9"/>
  <text x="16" y="21" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="-1">EM</text>
</svg>`;

await sharp(Buffer.from(svgMaskable)).resize(512, 512).png().toFile('icons/icon-512-maskable.png');
console.log('✓ icons/icon-512-maskable.png');

console.log('Icons generated.');
