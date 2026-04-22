import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('./og-image.svg');
await sharp(svg)
  .jpeg({ quality: 92, progressive: true })
  .toFile('./og-image.jpg');

console.log('og-image.jpg gerado com sucesso (1200x630)');
