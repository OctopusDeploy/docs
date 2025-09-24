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
 * Convert HTML element to markdown format
 */
function htmlToMarkdown(element) {
  if (!element) return '';

  // Handle text nodes
  if (element.nodeType === Node.TEXT_NODE) {
    return element.textContent;
  }

  const tagName = element.tagName?.toLowerCase();
  let result = '';

  switch (tagName) {
    case 'h1':
      return `# ${element.textContent}\n\n`;
    case 'h2':
      return `## ${element.textContent}\n\n`;
    case 'h3':
      return `### ${element.textContent}\n\n`;
    case 'h4':
      return `#### ${element.textContent}\n\n`;
    case 'h5':
      return `##### ${element.textContent}\n\n`;
    case 'h6':
      return `###### ${element.textContent}\n\n`;

    case 'p':
      return `${convertChildren(element)}\n\n`;

    case 'strong':
    case 'b':
      return `**${element.textContent}**`;

    case 'em':
    case 'i':
      return `*${element.textContent}*`;

    case 'code':
      return `\`${element.textContent}\``;

    case 'pre':
      const codeElement = element.querySelector('code');
      if (codeElement) {
        return `\`\`\`\n${codeElement.textContent}\n\`\`\`\n\n`;
      }
      return `\`\`\`\n${element.textContent}\n\`\`\`\n\n`;

    case 'blockquote':
      return `> ${convertChildren(element)}\n\n`;

    case 'ul':
      let ulResult = '';
      Array.from(element.children).forEach(li => {
        ulResult += `- ${convertChildren(li)}\n`;
      });
      return ulResult + '\n';

    case 'ol':
      let olResult = '';
      Array.from(element.children).forEach((li, index) => {
        olResult += `${index + 1}. ${convertChildren(li)}\n`;
      });
      return olResult + '\n';

    case 'li':
      return convertChildren(element);

    case 'a':
      const href = element.getAttribute('href');
      if (href) {
        return `[${element.textContent}](${href})`;
      }
      return element.textContent;

    case 'img':
      const src = element.getAttribute('src');
      const alt = element.getAttribute('alt') || '';
      if (src) {
        return `![${alt}](${src})`;
      }
      return '';

    case 'br':
      return '\n';

    case 'hr':
      return '\n---\n\n';

    default:
      return convertChildren(element);
  }
}

/**
 * Convert children elements to markdown
 */
function convertChildren(element) {
  let result = '';
  Array.from(element.childNodes).forEach(child => {
    result += htmlToMarkdown(child);
  });
  return result;
}

/**
 * Extract page content as markdown
 */
function extractPageMarkdown() {
  const titleElement = qs('article h1');
  const contentElement = qs('.page-content');

  let markdown = '';

  // Add title
  if (titleElement) {
    markdown += `# ${titleElement.textContent}\n\n`;
  }

  // Add content, but skip the table of contents
  if (contentElement) {
    const contentClone = contentElement.cloneNode(true);

    // Remove table of contents
    const toc = contentClone.querySelector('.page-toc');
    if (toc) toc.remove();

    // Remove authors section
    const authors = contentClone.querySelector('.authors');
    if (authors) authors.remove();

    // Remove taxonomy
    const taxonomy = contentClone.querySelector('.taxonomy');
    if (taxonomy) taxonomy.remove();

    // Remove related section
    const related = contentClone.querySelector('.related');
    if (related) related.remove();

    // Convert remaining content
    markdown += convertChildren(contentClone);
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
    const markdown = extractPageMarkdown();
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
    button.title = 'Failed to copy';
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