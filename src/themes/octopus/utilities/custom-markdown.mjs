import { SITE } from '/src/config';
import { size } from '/src/data/image-size.mjs';
import { defineMdastPlugin } from 'satteri';
import path from 'path';
import fs from 'fs';

/* Directive syntax is parsed by Sätteri itself, under `features.directive`.
* The parser produces bare directive nodes with no HTML meaning of their own —
* rendering them is what attributeMarkdown below is for.
*
* Examples:

## Inline

This is an inline :abbr[I18n]{ title="Internationalization" } element

## Images

:img{ src="/img/frankenstein.png" alt="Book cover" loading="lazy" }

## Block

:::div{.note}
This is a custom div element with the class `note`
:::

## Combinations
:::figure
:img{ src="/img/frankenstein.png" alt="Book cover" loading="lazy" }
::figcaption[The modern hardback edition of Frankenstein]
:::

*/

const workingDirectory = process.cwd();

export function getDestination(uri, s) {
  const fromRegEx = new RegExp('^' + SITE.subfolder + '/img/');
  const replacement = SITE.subfolder + '/i/' + s.toString() + '/';
  return uri.replace(fromRegEx, replacement);
}

/**
 * The exported size of an SVG, read off its root element. Prefers the width and
 * height attributes and falls back to the viewBox. Sizes in units other than px
 * are ignored, since they don't map onto CSS pixels.
 */
export function getSvgSize(src) {
  try {
    const file = path.join(workingDirectory, 'public', src);
    const root = fs.readFileSync(file, 'utf8').match(/<svg\b[^>]*>/)?.[0];

    if (!root) {
      return null;
    }

    const attribute = (name) =>
      root.match(new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`))?.[1];
    const pixels = (value) => {
      const match = value?.trim().match(/^(\d+(?:\.\d+)?)(px)?$/);
      return match ? Math.round(Number(match[1])) : null;
    };

    const width = pixels(attribute('width'));
    const height = pixels(attribute('height'));

    if (width && height) {
      return { width, height };
    }

    const viewBox = attribute('viewBox')?.trim().split(/[\s,]+/).map(Number);

    if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
      return { width: Math.round(viewBox[2]), height: Math.round(viewBox[3]) };
    }
  } catch (e) {
    console.warn(e);
  }

  return null;
}

export function getImageInfo(src, className, sizes) {
  const info = {};
  const classes = ((className ?? '') + ' resp-img').trim();

  // img.mjs only generates variants for raster images, so an SVG is served from
  // where it is. It scales without loss, so it needs no srcset either.
  if (path.extname(src).toLowerCase() === '.svg') {
    info.src = src;
    info.srcset = null;
    info.sizes = null;
    info.class = classes;
    info.metadata = getSvgSize(src);
    return info;
  }

  let uri = src;
  uri = uri.replace(/.jpg|.jpeg|.png/, '.webp');

  const imgFallback = getDestination(src, 'x');

  const imgSmall = getDestination(uri, size.small);
  const imgMedium = getDestination(uri, size.medium);
  const imgLarge = getDestination(uri, size.large);

  let nativeSize = size.large;
  info.metadata = null;

  try {
    let metaAddress = path.join(workingDirectory, 'public', src + '.json');

    if (fs.existsSync(metaAddress)) {
      info.metadata = JSON.parse(fs.readFileSync(metaAddress));
      nativeSize = info.metadata.width;
    }
  } catch (e) {
    console.warn(e);
  }

  info.src = imgFallback;
  // use info.metadata to limit the {}w size to the image size if it's smaller
  let srcset = `${imgSmall} ${Math.min(size.small, nativeSize)}w`;

  if (nativeSize >= size.small) {
    srcset += `, ${imgMedium} ${Math.min(size.medium, nativeSize)}w`;

    if (nativeSize >= size.medium) {
      srcset += `, ${imgLarge} ${Math.min(size.large, nativeSize)}w`;
    }
  }

  info.srcset = srcset;
  info.sizes = sizes;
  info.class = classes;

  if ([imgSmall, imgMedium, imgLarge].includes(src)) {
    info.srcset = null;
    info.sizes = null;
  }

  return info;
}

// A directive's `name` is the tag to render and its `attributes` are already
// parsed into plain properties (`{.hint}` arrives as `class: 'hint'`), so
// hanging hName/hProperties off the node is all the conversion needs. Sätteri
// drops null and undefined properties on the way out, which is what keeps an
// image with no srcset from emitting an empty attribute.
function directiveToHtml(node, ctx) {
  const properties = { ...node.attributes };

  if (properties.src) {
    // Process the image
    const info = getImageInfo(
      properties.src,
      properties.class,
      SITE.images.contentSize
    );

    properties.src = info.src;
    properties.srcset = info.srcset;
    properties.sizes = info.sizes;
    properties.class = info.class;

    if (info.metadata) {
      // An `@2x` capture has twice the pixels of the space it fills, so it's
      // shown at half its pixel size, the size the reader sees in Octopus
      const scale = /@2x\.[a-z]+$/i.test(node.attributes.src) ? 2 : 1;

      properties.width = Math.round(info.metadata.width / scale);
      properties.height = Math.round(info.metadata.height / scale);
    }
  }

  ctx.setProperty(node, 'data', {
    hName: node.name,
    hProperties: properties,
  });
}

export const attributeMarkdown = defineMdastPlugin({
  name: 'attribute-markdown',
  textDirective: directiveToHtml,
  leafDirective: directiveToHtml,
  containerDirective: directiveToHtml,
});

export const wrapTables = defineMdastPlugin({
  name: 'wrap-tables',
  table(node, ctx) {
    // wrapNode makes the table the wrapper's first child. The wrapper only
    // exists to carry hName/hProperties, so the node type it is built from
    // never reaches the output.
    ctx.wrapNode(node, {
      type: 'paragraph',
      data: { hName: 'div', hProperties: { class: 'table-wrap' } },
      children: [],
    });
  },
});
