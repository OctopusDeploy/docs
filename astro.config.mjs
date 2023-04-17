import remarkDirective from 'remark-directive';
import { defineConfig } from 'astro/config';
import { attributeMarkdown, wrapTables } from '/src/themes/accelerator/utilities/custom-markdown.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://octopus.com',
    markdown: {
        shikiConfig: {
            theme: 'nord'
        },
        remarkPlugins: [
            remarkDirective,
            attributeMarkdown,
            wrapTables
        ],
        trailingSlash: 'never',
        extendDefaultPlugins: true,
    },
});
