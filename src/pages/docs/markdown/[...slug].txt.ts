import type { APIRoute } from 'astro';
import TurndownService from 'turndown';

export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Page not found', { status: 404 });
  }

  try {
    // Create the URL for the actual page
    const pageUrl = new URL(`/docs/${slug}`, url.origin);

    // Fetch the rendered HTML page
    let htmlContent: string;
    try {
      const response = await fetch(pageUrl.toString());
      if (!response.ok) {
        throw new Error(`Failed to fetch page: ${response.status}`);
      }
      htmlContent = await response.text();
    } catch (fetchError) {
      // If we can't fetch the page, fall back to the old method
      console.warn('Could not fetch rendered page, falling back to raw content:', fetchError);

      // Import all markdown files dynamically
      const allPages = import.meta.glob(['../**/*.md', '../**/*.mdx'], {
        eager: false
      });

      // Find the matching file
      let matchedFile = null;

      for (const path in allPages) {
        // Convert the file path to URL slug
        let fileSlug = path
          .replace('../', '') // Remove the ../ prefix
          .replace(/\.mdx?$/, '') // Remove .md or .mdx extension
          .replace(/\/index$/, ''); // Remove /index suffix

        // Handle root index
        if (fileSlug === 'index') {
          fileSlug = '';
        }

        if (fileSlug === slug || (slug === 'index' && fileSlug === '')) {
          matchedFile = allPages[path];
          break;
        }
      }

      if (!matchedFile) {
        return new Response(`Page not found for slug: ${slug}`, { status: 404 });
      }

      // Load the file and try to get raw content
      const module = await matchedFile();
      const frontmatter = module.frontmatter || {};

      let content = `# ${frontmatter.title || 'Untitled'}\n\n`;
      if (frontmatter.subtitle) {
        content += `${frontmatter.subtitle}\n\n`;
      }
      content += `> Note: This page could not be rendered for markdown extraction. Please use the "Copy page" button on the live page for full content.\n`;

      return new Response(content, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    // Parse the HTML and extract the content
    const markdown = convertHtmlToMarkdown(htmlContent);

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating markdown:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

/**
 * Convert HTML content to markdown using Turndown
 */
function convertHtmlToMarkdown(htmlContent: string): string {
  // Extract title from the HTML
  const titleMatch = htmlContent.match(/<h1[^>]*class="[^"]*header__title[^"]*"[^>]*>([^<]+)<\/h1>|<h1[^>]*>([^<]+)<\/h1>/i);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2]).trim() : 'Untitled';

  // Extract article content
  const articleMatch = htmlContent.match(/<article[^>]*itemtype="https:\/\/schema\.org\/Article"[^>]*>(.*?)<\/article>/is);
  if (!articleMatch) {
    return `# ${title}\n\n> Note: Could not extract article content from HTML.\n`;
  }

  let articleContent = articleMatch[1];

  // Remove unwanted sections using regex
  const sectionsToRemove = [
    /<div[^>]*class="[^"]*page-toc[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*authors[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*taxonomy[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*related[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*page-tools[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*article-journey[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*post-meta[^"]*"[^>]*>.*?<\/div>/gis,
    /<header[^>]*>.*?<\/header>/gis,
    /<meta[^>]*>/gi,
    // Remove bookmark and anchor elements
    /<a[^>]*class="[^"]*bookmark-link[^"]*"[^>]*>.*?<\/a>/gis,
    /<[^>]*class="[^"]*header-anchor[^"]*"[^>]*>.*?<\/[^>]*>/gis,
    /<[^>]*aria-hidden="true"[^>]*>.*?<\/[^>]*>/gis,
    /<button[^>]*>.*?<\/button>/gis,
    // Remove feedback and footer sections
    /<div[^>]*class="[^"]*feedback[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*octo-github-edit[^"]*"[^>]*>.*?<\/div>/gis,
    /<div[^>]*class="[^"]*page-feedback[^"]*"[^>]*>.*?<\/div>/gis,
    /<section[^>]*class="[^"]*feedback[^"]*"[^>]*>.*?<\/section>/gis,
    // Remove any script tags and JSON metadata
    /<script[^>]*>[\s\S]*?<\/script>/gis,
    /<script[^>]*\/?>/gi,
  ];

  sectionsToRemove.forEach(regex => {
    articleContent = articleContent.replace(regex, '');
  });

  // Configure Turndown service
  const turndownService = new TurndownService({
    headingStyle: 'atx', // Use # ## ### style headers
    bulletListMarker: '-', // Use - for bullet points
    codeBlockStyle: 'fenced', // Use ``` for code blocks
    linkStyle: 'inlined' // Use [text](url) for links
  });

  // Add custom rules to handle specific elements
  turndownService.addRule('removeUnwanted', {
    filter: function (node) {
      // Remove elements that shouldn't be in markdown
      return (
        node.classList?.contains('magnify-container') ||
        node.classList?.contains('magnify-icon') ||
        node.classList?.contains('feedback') ||
        node.classList?.contains('octo-github-edit') ||
        node.classList?.contains('page-feedback') ||
        node.getAttribute('aria-hidden') === 'true' ||
        node.tagName === 'SCRIPT'
      );
    },
    replacement: function () {
      return '';
    }
  });

  // Add rule to handle feedback forms and edit links
  turndownService.addRule('removeFeedbackLinks', {
    filter: function (node, options) {
      // Remove links that contain feedback form URLs or GitHub edit links
      if (node.tagName === 'A') {
        const href = node.getAttribute('href');
        return href && (
          href.includes('docs.google.com/forms') ||
          href.includes('github.com') && href.includes('/edit/') ||
          href.includes('/docs/') && !href.includes('/docs/') // Just the /docs/ link at the end
        );
      }
      return false;
    },
    replacement: function () {
      return '';
    }
  });

  // Convert to markdown using Turndown
  let contentMarkdown = turndownService.turndown(articleContent);

  // Post-process to remove any remaining unwanted patterns
  contentMarkdown = contentMarkdown
    // Remove "Help us continuously improve" section and everything after it
    .replace(/## Help us continuously improve[\s\S]*$/i, '')
    // Remove standalone feedback links
    .replace(/\[Send feedback\]\([^)]*\)/gi, '')
    // Remove "Page updated on" lines
    .replace(/Page updated on .*/gi, '')
    // Remove edit on GitHub links
    .replace(/\[Edit on GitHub\]\([^)]*\)/gi, '')
    // Remove JSON metadata patterns
    .replace(/\{\s*"prerender"[\s\S]*?\}/gi, '')
    // Remove standalone /docs/ links
    .replace(/\[?\]\(\/docs\/\)/gi, '')
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Combine title and content
  const markdown = `# ${title}\n\n${contentMarkdown}`;

  return markdown.trim();
}


