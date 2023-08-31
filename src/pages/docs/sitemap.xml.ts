// warning: This file is overwritten by Astro Accelerator

// Generates an ATOM feed of recent posts
import { SITE } from '@config';
import { PostFiltering, Accelerator } from 'astro-accelerator-utils';

async function getData() {
  //@ts-ignore
  const allPages = import.meta.glob(['./**/*.md', './**/*.mdx']);
  
  const accelerator = new Accelerator(SITE);
  let pages = [];
  
  for (const path in allPages) {
    const article: any = await allPages[path]();
    const addToSitemap = PostFiltering.showInSitemap(article);

    let url = accelerator.urlFormatter.formatAddress(article.url);

    if (article.frontmatter.layout == 'src/layouts/Author.astro') {
      url += '1/';
    }

    if (addToSitemap) {
      pages.push(`
        <url>
          <loc>${ SITE.url + url }</loc>
          <lastmod>${ article.frontmatter.pubDate }</lastmod>
        </url>`);
    }
  }

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                                  http://www.sitemaps.org/schemas/sitemap/0.9.xsd">
${pages.join('')}
</urlset>`, {
      status: 200,
      headers: {
        'Content-Type': "application/xml"
      }
  });
}

export const GET = getData;
