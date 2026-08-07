/**
 * Generates the responsive image variants under `public/docs/i/`.
 *
 * Only images that are actually consumed by `getImageInfo` in
 * `custom-markdown.mjs` get variants, i.e. the `:img{}` remark directive and
 * `bannerImage` frontmatter. Everything else in `public/docs/img/` is served
 * as-is by plain `![](...)` markdown, so generating variants for it produced
 * hundreds of megabytes of files that nothing ever requested.
 *
 * Stale variants and metadata sidecars are pruned, so removing the last
 * `:img{}` reference to an image also removes its generated output.
 *
 * @format
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { globSync } from 'glob';

const workingDirectory = process.cwd();

const imageSize = await import(
  'file://' + path.join(workingDirectory, 'src/data/image-size.mjs')
);
const imageModule = await import(
  'file://' + path.join(workingDirectory, 'src/data/images.mjs')
);
const size = imageSize.size;
const imagePaths = imageModule.imagePaths;

const imagePath = path.join('public', imagePaths.src);
const outputPath = path.join('public', imagePaths.dest);
const imageDirectory = path.join(workingDirectory, imagePath);
const outputDirectory = path.join(workingDirectory, outputPath);

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Finds every image path handed to `getImageInfo`, which is the only code path
 * that reads from `public/docs/i/`.
 */
function findReferencedImages() {
  const sources = globSync('src/**/*.{md,mdx,astro}', {
    cwd: workingDirectory,
    nodir: true,
    absolute: true,
  });

  // `:img{ ... src="/docs/img/foo.png" ... }` remark directives
  const directive = /:img\{[^}]*?\ssrc\s*=\s*["']([^"']+)["']/g;
  // `bannerImage:` frontmatter, where `src:` is on a following indented line
  const banner =
    /bannerImage:\s*\r?\n(?:\s*#[^\n]*\r?\n)*\s*src:\s*["']?([^"'\s]+)/g;

  const referenced = new Set();

  for (const file of sources) {
    const text = fs.readFileSync(file, 'utf8');

    for (const pattern of [directive, banner]) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const uri = match[1];

        if (!uri.startsWith(imagePaths.src + '/')) {
          // Not under the image root, so it has no generated variants
          continue;
        }

        const relative = uri.slice(imagePaths.src.length + 1);

        if (!SUPPORTED_EXTENSIONS.includes(path.extname(relative))) {
          continue;
        }

        if (!fs.existsSync(path.join(imageDirectory, relative))) {
          console.warn(
            `Referenced image not found, skipping: ${uri} (${path.relative(workingDirectory, file)})`
          );
          continue;
        }

        referenced.add(relative);
      }
    }
  }

  return [...referenced].sort();
}

function getDestinationFilePathless(source, s) {
  let destination = path.join(outputDirectory, s.toString(), source);
  destination = destination.replace(path.parse(destination).ext, '');
  return destination;
}

/** Fallback variant keeps the source format; resized variants are always webp. */
function getFallbackDestination(source) {
  const pathless = getDestinationFilePathless(source, 'x');

  switch (path.extname(source)) {
    case '.png':
      return pathless + '.png';
    case '.jpg':
    case '.jpeg':
      return pathless + '.jpg';
    default:
      return pathless + '.webp';
  }
}

function getExpectedOutputs(source) {
  return [
    getFallbackDestination(source),
    ...Object.values(size).map(
      (s) => getDestinationFilePathless(source, s) + '.webp'
    ),
  ];
}

async function writeFallback(source, destination) {
  switch (path.extname(source)) {
    case '.png':
      await sharp(source).png().toFile(destination);
      break;
    case '.jpg':
    case '.jpeg':
      await sharp(source).jpeg({ mozjpeg: true }).toFile(destination);
      break;
    default:
      await sharp(source).webp({ quality: 80 }).toFile(destination);
      break;
  }
}

async function generate(relative) {
  const source = path.join(imageDirectory, relative);
  const metadata = await sharp(source).metadata();

  const fallback = getFallbackDestination(relative);
  await fs.promises.mkdir(path.dirname(fallback), { recursive: true });
  await writeFallback(source, fallback);

  for (const target of Object.values(size)) {
    const destination = getDestinationFilePathless(relative, target) + '.webp';
    await fs.promises.mkdir(path.dirname(destination), { recursive: true });

    // Only downscale; upscaling a small source just wastes bytes
    const pipeline =
      metadata.width > target
        ? sharp(source).resize(target, null)
        : sharp(source);

    await pipeline.webp({ quality: 90 }).toFile(destination);
  }

  // `getImageInfo` reads this to emit width/height and cap the srcset widths
  await fs.promises.writeFile(
    source + '.json',
    JSON.stringify({
      width: metadata.width,
      height: metadata.height,
      sizeInBytes: metadata.size,
    })
  );
}

/** Removes generated files that no longer belong to a referenced image. */
async function prune(expectedOutputs, expectedMetadata) {
  let removed = 0;

  const generated = fs.existsSync(outputDirectory)
    ? globSync('**/*', { cwd: outputDirectory, nodir: true, absolute: true })
    : [];

  for (const file of generated) {
    if (!expectedOutputs.has(file)) {
      await fs.promises.rm(file);
      removed++;
    }
  }

  const metadata = globSync('**/*.json', {
    cwd: imageDirectory,
    nodir: true,
    absolute: true,
  });

  for (const file of metadata) {
    if (!expectedMetadata.has(file)) {
      await fs.promises.rm(file);
      removed++;
    }
  }

  // Clean up directories left empty by the removals, deepest first
  const directories = fs.existsSync(outputDirectory)
    ? globSync('**/', { cwd: outputDirectory, absolute: true })
    : [];

  for (const dir of directories.sort((a, b) => b.length - a.length)) {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      await fs.promises.rmdir(dir);
    }
  }

  return removed;
}

const referenced = findReferencedImages();

const expectedOutputs = new Set();
const expectedMetadata = new Set();

for (const relative of referenced) {
  getExpectedOutputs(relative).forEach((f) => expectedOutputs.add(f));
  expectedMetadata.add(path.join(imageDirectory, relative + '.json'));
}

const removed = await prune(expectedOutputs, expectedMetadata);

for (const relative of referenced) {
  const upToDate = getExpectedOutputs(relative).every((f) => fs.existsSync(f));

  if (
    upToDate &&
    fs.existsSync(path.join(imageDirectory, relative + '.json'))
  ) {
    continue;
  }

  console.log('Processing:', imagePaths.src + '/' + relative);
  await generate(relative);
}

console.log(
  `Responsive images: ${referenced.length} source image(s), ${expectedOutputs.size} variant(s), ${removed} stale file(s) removed.`
);
