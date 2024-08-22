import { test, expect } from '@playwright/test';
import { glob } from 'glob';
import fs from 'fs';

const baseUrl = 'http://[::1]:3000';
const regex = /<meta http-equiv="refresh" content="0; URL=(.*?)">/;
const redirectMatcher = /redirect:\s?(.*?)\r?\n/;
const posts = await glob('src/pages/docs/**/*.{md,mdx}');

test('Check redirects', async () => {
  let count = 0;

  for (let post of posts) {
    let url = null;
    const content = fs.readFileSync(post).toString();
    const redirectMatches = content.match(redirectMatcher);

    if (redirectMatches) {
      url = redirectMatches[1];
    }

    try {
      if (url && url.startsWith('/docs')) {
        count++;

        // Get the redirect page
        const redirectPage = await fetch(new URL(baseUrl + url));
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
      }
    } catch(error) {
      expect(`Failed to fetch redirect target ${url} found on ${post} due to ${error}`).toBe('');
    }
  }

  console.log(`Checked ${count} redirects`);
});
