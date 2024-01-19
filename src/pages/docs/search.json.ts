// warning: This file is overwritten by Astro Accelerator

import { Accelerator, PostFiltering } from 'astro-accelerator-utils';
import type { MarkdownInstance } from 'astro';
import { SITE } from '@config';
import { htmlToText, convert } from 'html-to-text';
import keywordExtractor from 'keyword-extractor';


const getData = async () => {
    //@ts-ignore
    const allPages = import.meta.glob(['./**/*.md', './**/*.mdx']);
    const items = [];

    const accelerator = new Accelerator(SITE);

    for (const path in allPages) {
        const page = await allPages[path]() as  MarkdownInstance<Record<string, any>>;

        if (!PostFiltering.showInSearch(page)) {
            continue;
        }

        let url = page.url ?? '';
    
        if (page.frontmatter.paged) {
            url += '/1/';
        }

        const headings = await page.getHeadings();
        const title = await accelerator.markdown.getTextFrom(page.frontmatter.title ?? '');
        const content = page.compiledContent ? page.compiledContent() : '';
        let counted: { word: string, count: number }[] = [];

        if (content) {
            const text = convert(content, { wordwrap: false });

            const words = keywordExtractor.extract(text, {
                language: 'english',
                return_changed_case: true,
                remove_duplicates: true
            });

            counted = words.map((w) => {
                return { word: w, count: words.filter(wd => wd === w).length };
            }).filter(e => e.word.replace(/[^a-z]+/g, '').length > 1);
        }

        items.push({
            title: title,
            headings: headings.map(h => {
                return {text: h.text, slug: h.slug }
            }),
            description: page.frontmatter.description ?? '',
            keywords: counted.map(c => c.word).join(' '),
            tags: page.frontmatter.tags ?? [],
            url: SITE.url + accelerator.urlFormatter.formatAddress(url),
            date: page.frontmatter.pubDate ?? ''
        });
    }

    return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
        'Content-Type': "application/json"
        }
    });
}

export const GET = getData;
