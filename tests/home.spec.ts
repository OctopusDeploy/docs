import { test, expect } from '@playwright/test';
import { unified } from 'unified';
import { visit } from 'unist-util-visit'
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';

const baseUrl = 'http://[::1]:3000';
const startPath = '/docs';
const crawled: string[] = [];
let discoveredLinks: string[] = [];
let discoveredImages: string[] = [];

test('Crawl for bad URIs', async () => {

  async function crawl(url: string, foundOn: string = '') {
    if (crawled.includes(url)) {
      return;
    }

    console.log(url, foundOn);
    crawled.push(url);

    try {
      const response = await fetch(url);
      expect(response.status, `Expected a 200 OK response for page ${url} found on ${foundOn}`).toBe(200);

      const text = await response.text();
      await handleHtmlDocument(text);
    } catch(error) {
      expect(`Failed to fetch ${url} due to ${error}`).toBe('');
    }

    await crawlImages(url);

    const links = [...new Set(discoveredLinks)];
    discoveredLinks = [];

    for (let i = 0; i < links.length; i++) {
      await crawl(links[i], url);
    }
  }

  // Kick off the crawl
  await crawl(baseUrl + startPath, 'First Page');
  console.log('Crawl checked', crawled.length);
});

function handleHtmlDocument(text: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeStringify)
    .use(findUris)
    .process(text)
}

async function crawlImages(foundOn: string) {
  const images = [...new Set(discoveredImages)];
  discoveredImages = [];

  for (let i = 0; i < images.length; i++) {
    const response = await fetch(images[i]);
    
    if (response.status != 200) {
      console.log(images[i]);
    }
    
    expect(response.status, `Expected a 200 OK response for image ${images[i]} found on ${foundOn}`).toBe(200);
  }
}

function addUri(collection: string[], uri: string) {
  if (uri.substring(0, 1) == '/') {
    collection.push(baseUrl + uri);
  }

  if (uri.indexOf(baseUrl) == 0) {
    collection.push(uri.split('#')[0]);
  }
}

function isString(s: string | any) : s is string {
  return typeof s === 'string';
}

function findUris(options = {}) {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties && isString(node.properties.href)) {
        addUri(discoveredLinks, node.properties.href);
      } else if (node.tagName === 'img' && node.properties) {

        if (isString(node.properties.src)) {
          addUri(discoveredImages, node.properties.src);
        }

        if (isString(node.properties.srcSet)) {
          (<string[]>node.properties.srcSet.split(','))
            .map(s => s.split(' ')[0])
            .forEach(s => addUri(discoveredImages, s));
        }
      }
    })
  }
}