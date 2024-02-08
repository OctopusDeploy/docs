/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

import { SITE } from '/src/config';
import { size } from '/src/data/image-size.mjs';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { fromSelector } from 'hast-util-from-selector'
import path from 'path';
import fs from 'fs';

/* Based on https://github.com/remarkjs/remark-directive
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

export function getImageInfo(src, className, sizes) {
  const info = {};

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
  info.class = (className ?? '' + ' resp-img').trim();

  if ([imgSmall, imgMedium, imgLarge].includes(src)) {
    info.srcset = null;
    info.sizes = null;
  }

  return info;
}

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function attributeMarkdown() {
  return (tree) => {

    visit(tree, (node) => {
      if (['textDirective', 'leafDirective', 'containerDirective'].includes(node.type)) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes);

        if (hast.properties.src) {
          // Process the image
          const info = getImageInfo(hast.properties.src, hast.properties.class, SITE.images.contentSize);

          hast.properties.src = info.src;
          hast.properties.srcset = info.srcset;
          hast.properties.sizes = info.sizes;
          hast.properties.class = info.class;

          if (info.metadata) {
            hast.properties.width = info.metadata.width;
            hast.properties.height = info.metadata.height;
          }
        }

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  }
}

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function wrapTables() {
  return (tree) => {
    visit(tree, (node, i, parent) => {
      if (node.type == 'table') {
        // Create the wrapping element
        const wrap = fromSelector('div');
        const data = wrap.data || (wrap.data = {})
        const props = data.hProperties || (data.hProperties = {})
        props.className = 'table-wrap';

        // Add the table to the wrapper
        wrap.children = [node];

        // Replace the table with the wrapper
        parent.children[i] = wrap;
      }
    });
  }
}