// warning: This file is overwritten by Astro Accelerator

// Generates an LLMs.txt file of documentation pages
import { SITE } from '@config';
import { PostFiltering, Accelerator } from 'astro-accelerator-utils';

async function getData() {
	//@ts-ignore
	const allPages = import.meta.glob(['./**/*.md', './**/*.mdx']);

	const accelerator = new Accelerator(SITE);
	let pages = [];

	for (const path in allPages) {
		const article: any = await allPages[path]();

		// Skip drafts and redirect pages
		if (article.frontmatter.draft) {
			continue;
		}

		if (article.frontmatter.redirect) {
			continue;
		}

		// Skip if it shouldn't be in sitemap (likely similar filtering logic)
		const addToLlms = PostFiltering.showInSitemap(article);
		if (!addToLlms) {
			continue;
		}

		let url = accelerator.urlFormatter.formatAddress(article.url);

		// Handle author pages if needed (similar to sitemap logic)
		if (article.frontmatter.layout == 'src/layouts/Author.astro') {
			url += '1/';
		}

		const fullUrl = SITE.url + url;
		// Remove square brackets
		const title = (article.frontmatter.title || 'Untitled').replace(/[[\]]/g, '');
		const description = article.frontmatter.description || 'Documentation page for Octopus Deploy';

		pages.push({
			title,
			description,
			url: fullUrl,
			// Clean slug for sorting
			slug: url.replace(/^\/docs\//, '').replace(/\/$/, ''),
			navOrder: article.frontmatter.navOrder || 999999,
			navSection: article.frontmatter.navSection || '',
			pubDate: article.frontmatter.pubDate,
			modDate: article.frontmatter.modDate,
		});
	}

	// Sort by navSection, then navOrder, then slug (same logic as before)
	pages.sort((a, b) => {
		// First, sort by navSection alphabetically
		const sectionA = a.navSection || '';
		const sectionB = b.navSection || '';
		if (sectionA !== sectionB) {
			return sectionA.localeCompare(sectionB);
		}

		// Within the same section, sort by navOrder first
		if (a.navOrder !== b.navOrder) {
			return a.navOrder - b.navOrder;
		}

		// If navOrder is the same, sort by slug alphabetically
		return a.slug.localeCompare(b.slug);
	});

	// Generate the LLMs.txt content
	let content = '## Documentation\n\n';
	pages.forEach(page => {
		content += `- [${page.title}](${page.url}): ${page.description}\n`;
	});

	return new Response(content, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	});
}

export const GET = getData; 