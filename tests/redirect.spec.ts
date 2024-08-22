import { test, expect } from '@playwright/test';
import { Accelerator } from 'astro-accelerator-utils';
import { SITE } from '@config';

const baseUrl = 'http://[::1]:3000';
const regex = /<meta http-equiv="refresh" content="0; URL=(.*?)">/;

test('Check redirects', async () => {
  const accelerator = new Accelerator(SITE);
  const posts = accelerator.posts.all().filter(p => p.frontmatter.redirect != null);

  for (let post of posts) {
    let url = baseUrl + post.url;
    console.log(url);

    try {
      // Get the know redirect page
      const redirectPage = await fetch(new URL(url));
      expect(redirectPage.status, `Expected a 200 OK response for page ${url}`).toBe(200);

      // Get the new location
      const redirectText = await redirectPage.text();
      const matches = redirectText.match(regex);

      if (matches && matches.length > 1 && matches[1].charAt(0) === '/') {
        // Check the new location works
        const targetPage = await fetch(new URL(baseUrl + matches[1]))
        expect(targetPage.status, `Expected a 200 OK response for target page ${matches[1]}`).toBe(200);
        
        // Make sure the new location isn't a redirect page
        const targetText = await targetPage.text();
        const targetMatches = targetText.match(regex);
       
        if (targetMatches && targetMatches.length > 0) {
          expect(`Target page ${matches[1]} contains a redirect`).toBe('');
        }
      }

      // Check the new location to make sure it works and doesn't redirect (no chains allowed)

    } catch(error) {
      expect(`Failed to fetch ${url} due to ${error}`).toBe('');
    }
  }

  expect(posts.length).toBe(4);
});
