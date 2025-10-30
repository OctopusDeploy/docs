import { qs } from './query.js';

const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
<rect x="9" y="3" width="6" height="4" rx="2" />
</svg>`;

const copyDoneIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
<rect x="9" y="3" width="6" height="4" rx="2" />
<path d="M9 14l2 2l4 -4" />
</svg>`;

const markdownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<rect x="3" y="5" width="18" height="14" rx="2" />
<path d="M7 15v-6l2 2l2 -2v6" />
<path d="M14 13l2 2l2 -2m-2 2v-6" />
</svg>`;

/**
 * Load Turndown library dynamically
 */
async function loadTurndown() {
  if (window.TurndownService) {
    return window.TurndownService;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/turndown/dist/turndown.js';
    script.onload = () => resolve(window.TurndownService);
    script.onerror = () => reject(new Error('Failed to load Turndown library'));
    document.head.appendChild(script);
  });
}

/**
 * Convert HTML element to markdown using Turndown
 */
async function htmlToMarkdown(element) {
  if (!element) return '';

  try {
    const TurndownService = await loadTurndown();

    // Configure Turndown service with same options as server-side
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
          node.classList?.contains('bookmark-link') ||
          node.classList?.contains('header-anchor') ||
          node.getAttribute('aria-hidden') === 'true' ||
          node.tagName === 'BUTTON'
        );
      },
      replacement: function () {
        return '';
      }
    });

    return turndownService.turndown(element);
  } catch (error) {
    console.warn('Turndown library failed, falling back to simple text extraction:', error);
    // Simple fallback - just get text content
    return getTextContent(element);
  }
}

/**
 * Get text content from element, cleaning up whitespace and unwanted content
 */
function getTextContent(element) {
  if (!element) return '';

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true);

  // Remove elements that shouldn't contribute to the text content
  const unwantedSelectors = [
    '.bookmark-icon',
    '.header-anchor',
    '.anchor-link',
    '.bookmark-link',
    '[aria-hidden="true"]',
    'button',
    '.sr-only',
    '.visually-hidden',
    '.magnify-container',
    '.magnify-icon'
  ];

  unwantedSelectors.forEach(selector => {
    const elements = clone.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });

  // Get the text content and clean it up
  let text = clone.textContent || '';

  // Clean up whitespace - replace multiple spaces/newlines with single space
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Extract page content as markdown using Turndown
 */
async function extractPageMarkdown() {
  const titleElement = qs('article h1, .header__title');
  const contentElement = qs('.page-content, article');

  let markdown = '';

  // Add title
  if (titleElement) {
    markdown += `# ${getTextContent(titleElement)}\n\n`;
  }

  // Add content, but skip unwanted sections
  if (contentElement) {
    const contentClone = contentElement.cloneNode(true);

    // Remove unwanted sections
    const sectionsToRemove = [
      '.page-toc',           // Table of contents
      '.authors',            // Authors section
      '.taxonomy',           // Tags/categories
      '.related',            // Related articles
      '.page-tools',         // The page tools buttons themselves
      '.article-journey',    // Navigation buttons
      '.post-meta',          // Meta information
      '.feedback',           // Feedback sections
      '.octo-github-edit',   // GitHub edit links
      '.page-feedback'       // Page feedback forms
    ];

    sectionsToRemove.forEach(selector => {
      const elements = contentClone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Convert remaining content using Turndown
    const contentMarkdown = await htmlToMarkdown(contentClone);
    markdown += contentMarkdown;
  }

  return markdown.trim();
}

/**
 * Get current page slug for API endpoint
 */
function getCurrentPageSlug() {
  const path = window.location.pathname;
  // Remove /docs/ prefix and trailing slash
  return path.replace(/^\/docs\//, '').replace(/\/$/, '') || 'index';
}

/**
 * Copy page content to clipboard
 */
async function copyPageToClipboard(button) {
  try {
    // Use the same markdown endpoint that the "View as markdown" button uses
    const slug = getCurrentPageSlug();
    const markdownUrl = `/docs/markdown/${slug}.txt`;

    const response = await fetch(markdownUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown content');
    }

    const markdown = await response.text();

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(markdown);
      button.innerHTML = copyDoneIcon;
      button.title = 'Copied to clipboard!';

      setTimeout(() => {
        button.innerHTML = copyIcon;
        button.title = 'Copy page as markdown';
      }, 2000);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      button.innerHTML = copyDoneIcon;
      button.title = 'Copied to clipboard!';

      setTimeout(() => {
        button.innerHTML = copyIcon;
        button.title = 'Copy page as markdown';
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);

    // Fallback to client-side extraction if the fetch fails
    try {
      const markdown = await extractPageMarkdown();
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(markdown);
        button.innerHTML = copyDoneIcon;
        button.title = 'Copied to clipboard!';

        setTimeout(() => {
          button.innerHTML = copyIcon;
          button.title = 'Copy page as markdown';
        }, 2000);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = markdown;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        button.innerHTML = copyDoneIcon;
        button.title = 'Copied to clipboard!';

        setTimeout(() => {
          button.innerHTML = copyIcon;
          button.title = 'Copy page as markdown';
        }, 2000);
      }
    } catch (fallbackError) {
      console.error('Fallback copy also failed:', fallbackError);
      button.title = 'Failed to copy';
    }
  }
}

/**
 * Open markdown view in new tab
 */
function openMarkdownView() {
  const slug = getCurrentPageSlug();
  const markdownUrl = `/docs/markdown/${slug}.txt`;
  window.open(markdownUrl, '_blank');
}

/**
 * Initialize page tools
 */
function enhancePageTools() {
  const copyButton = qs('.page-tool-copy');
  const markdownButton = qs('.page-tool-markdown');

  if (copyButton) {
    copyButton.addEventListener('click', () => copyPageToClipboard(copyButton));
  }

  if (markdownButton) {
    markdownButton.addEventListener('click', openMarkdownView);
  }
}

export { enhancePageTools, copyIcon, markdownIcon };