import { SITE } from '/src/config';
import { size } from '/src/data/image-size.mjs';
import { defineMdastPlugin } from 'satteri';
import {
  THEME_VARIANT_ATTRIBUTE,
  THEME_VARIANT_MEDIA,
} from '/src/lib/theme.ts';
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

const VALID_TAG_NAME = /^[a-z][a-z0-9-]*$/i;

const DIRECTIVE_MARKERS = {
  textDirective: ':',
  leafDirective: '::',
  containerDirective: ':::',
};

function attributesText(attributes) {
  const entries = Object.entries(attributes ?? {});
  if (!entries.length) return '';
  const parts = entries.map(([key, value]) =>
    key === 'id'
      ? `#${value}`
      : key === 'class'
        ? String(value)
            .split(/\s+/)
            .map((name) => `.${name}`)
            .join(' ')
        : `${key}="${value}"`
  );
  return `{${parts.join(' ')}}`;
}

// Sätteri parses text like `host.example.com:10943` as a `:10943` directive, and
// `::1` on its own line as a leaf one. A name that can't be a tag was never meant
// as one, so put the text back. The label comes back as plain text: anything
// richer is flattened, so that case is reported rather than passed silently.
function restoreDirectiveText(node, ctx) {
  const marker = DIRECTIVE_MARKERS[node.type];
  const attributes = attributesText(node.attributes);

  if (node.type === 'containerDirective') {
    ctx.replaceNode(node, [
      paragraph(`${marker}${node.name}${attributes}`),
      ...node.children,
      paragraph(marker),
    ]);
    return;
  }

  const children = node.children ?? [];
  const label = children.length ? `[${ctx.textContent(node)}]` : '';
  // Sätteri 0.10 collects ctx.report() diagnostics but never prints them.
  if (children.some((child) => child.type !== 'text')) {
    const file = ctx.fileURL ? ` in ${ctx.fileURL.pathname}` : '';
    console.warn(
      `[custom-markdown] Restored "${marker}${node.name}" as text${file}; formatting inside its [label] was dropped`
    );
  }

  const text = {
    type: 'text',
    value: `${marker}${node.name}${label}${attributes}`,
  };
  ctx.replaceNode(node, node.type === 'leafDirective' ? paragraph(text) : text);
}

function paragraph(content) {
  const text =
    typeof content === 'string' ? { type: 'text', value: content } : content;
  return { type: 'paragraph', children: [text] };
}

// A directive's `name` is the tag to render and its `attributes` are already
// parsed into plain properties (`{.hint}` arrives as `class: 'hint'`), so
// hanging hName/hProperties off the node is all the conversion needs. Sätteri
// drops null and undefined properties on the way out, which is what keeps an
// image with no srcset from emitting an empty attribute.
function directiveToHtml(node, ctx) {
  if (!VALID_TAG_NAME.test(node.name)) {
    restoreDirectiveText(node, ctx);
    return;
  }

  if (node.name === 'img' && node.attributes['src-dark']) {
    themedImageToHtml(node, ctx);
    return;
  }

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

    const dimensions = displaySize(node.attributes.src, info);

    if (dimensions) {
      properties.width = dimensions.width;
      properties.height = dimensions.height;
    }
  }

  ctx.setProperty(node, 'data', {
    hName: node.name,
    hProperties: properties,
  });
}

/** The width and height to render an image at, from its generated metadata. */
function displaySize(src, info) {
  if (!info.metadata) {
    return null;
  }

  // An `@2x` capture has twice the pixels of the space it fills, so it's
  // shown at half its pixel size, the size the reader sees in Octopus
  const scale = /@2x\.[a-z]+$/i.test(src) ? 2 : 1;

  return {
    width: Math.round(info.metadata.width / scale),
    height: Math.round(info.metadata.height / scale),
  };
}

/**
 * `:img{src="…-light.svg" src-dark="…-dark.svg" alt="…"}` renders as a
 * `<picture>` whose `<source>` holds the dark variant. The browser downloads
 * only the variant it shows.
 *
 * The source's media query follows the reader's OS setting, which is right for
 * anyone who hasn't picked a theme with the toggle. ThemeScript.astro and
 * theme-switcher.ts rewrite it to `all` or `not all` when they have, so the
 * image follows the site theme. See THEME_VARIANT_ATTRIBUTE in src/lib/theme.ts.
 */
function themedImageToHtml(node, ctx) {
  const { 'src-dark': srcDark, ...attributes } = node.attributes;
  const sizes = SITE.images.contentSize;

  const light = getImageInfo(attributes.src, attributes.class, sizes);
  const dark = getImageInfo(srcDark, null, sizes);

  const imgProperties = {
    ...attributes,
    src: light.src,
    srcset: light.srcset,
    sizes: light.sizes,
    class: light.class,
  };

  // Both variants share one <img>, so they share its width and height too
  const lightSize = displaySize(attributes.src, light);
  const darkSize = displaySize(srcDark, dark);

  if (lightSize) {
    imgProperties.width = lightSize.width;
    imgProperties.height = lightSize.height;
  }

  if (
    lightSize &&
    darkSize &&
    (lightSize.width !== darkSize.width || lightSize.height !== darkSize.height)
  ) {
    console.warn(
      `Themed image variants differ in size, the dark one will be stretched: ` +
        `${attributes.src} (${lightSize.width}x${lightSize.height}), ` +
        `${srcDark} (${darkSize.width}x${darkSize.height})`
    );
  }

  const sourceProperties = {
    media: THEME_VARIANT_MEDIA,
    // An SVG or a pre-sized file has no srcset, so offer the file itself
    srcset: dark.srcset ?? dark.src,
    sizes: dark.sizes,
    [THEME_VARIANT_ATTRIBUTE]: 'dark',
    // The full-size original, for the zoom view. srcset only holds variants
    // sized for the content column.
    'data-original-src': dark.src,
  };

  // The node type is irrelevant once hName is set; emphasis is just a phrasing
  // node that is allowed to hold children wherever an :img{} can appear
  ctx.replaceNode(node, {
    type: 'emphasis',
    data: { hName: 'picture', hProperties: {} },
    children: [
      {
        type: 'emphasis',
        data: { hName: 'source', hProperties: sourceProperties },
        children: [],
      },
      {
        type: 'emphasis',
        data: { hName: 'img', hProperties: imgProperties },
        children: [],
      },
    ],
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
