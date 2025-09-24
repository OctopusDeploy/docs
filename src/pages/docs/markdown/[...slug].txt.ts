import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Page not found', { status: 404 });
  }

  try {
    // Import all markdown files dynamically
    const allPages = import.meta.glob(['../**/*.md', '../**/*.mdx'], {
      eager: false
    });

    // Find the matching file
    let matchedFile = null;
    let matchedPath = '';

    // Try to find exact match first
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
        matchedPath = path;
        break;
      }
    }

    if (!matchedFile) {
      return new Response('Markdown file not found', { status: 404 });
    }

    // Load the file
    const module = await matchedFile();

    // Get the raw content if available
    let content = '';

    // For .md files, we need to read the raw file content
    // Since we can't access the file system directly in Astro at build time,
    // we'll need to work with what's available

    // Try to get raw content from the module
    if ('rawContent' in module && typeof module.rawContent === 'function') {
      content = module.rawContent();
    } else if ('compiledContent' in module && typeof module.compiledContent === 'function') {
      // If raw content isn't available, we'll have to work with compiled content
      // This is a fallback - the JS module will handle HTML->Markdown conversion
      content = `# ${module.frontmatter?.title || 'Untitled'}\n\n`;

      if (module.frontmatter?.subtitle) {
        content += `${module.frontmatter.subtitle}\n\n`;
      }

      // Add a note that this is a fallback
      content += `> Note: This is a generated markdown view. For best results, use the "Copy page" button which extracts content directly from the rendered page.\n\n`;

      // We can't easily convert the compiled HTML back to markdown here,
      // so we'll just provide the frontmatter and let the frontend handle it
      content += module.compiledContent();
    } else {
      // Last resort: try to reconstruct from frontmatter
      const frontmatter = module.frontmatter || {};
      content = `# ${frontmatter.title || 'Untitled'}\n\n`;

      if (frontmatter.subtitle) {
        content += `${frontmatter.subtitle}\n\n`;
      }

      if (frontmatter.description) {
        content += `${frontmatter.description}\n\n`;
      }

      content += `> Note: Raw markdown content is not available. Use the "Copy page" button for full page content.\n`;
    }

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error loading markdown file:', error);
    return new Response('Internal server error', { status: 500 });
  }
};

export function getStaticPaths() {
  // In SSG mode, we need to pre-generate paths
  // For now, we'll make this dynamic by not providing static paths
  // This will work in SSR mode or with Astro's dynamic routing
  return [];
}