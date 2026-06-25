import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, extname, basename } from 'path';

const ASSETS = './public/Template-1/assets';
const files = readdirSync(ASSETS).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

console.log(`Found ${files.length} images to convert...\n`);

for (const file of files) {
  const input = join(ASSETS, file);
  const outName = basename(file, extname(file)) + '.webp';
  const output = join(ASSETS, outName);

  const meta = await sharp(input).metadata();
  await sharp(input).webp({ quality: 82 }).toFile(output);

  const inKb = Math.round((await import('fs')).statSync(input).size / 1024);
  const outKb = Math.round((await import('fs')).statSync(output).size / 1024);
  const saving = Math.round((1 - outKb / inKb) * 100);

  console.log(`✓ ${file}`);
  console.log(`  ${meta.width}×${meta.height}  |  ${inKb}KB → ${outKb}KB  (-${saving}%)\n`);
}

console.log('Done. WebP files written to', ASSETS);
