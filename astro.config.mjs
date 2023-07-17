import remarkDirective from 'remark-directive';
import remarkHeading from 'remark-heading-id';
import { defineConfig } from 'astro/config';
import { defaultLayout } from '/src/themes/accelerator/utilities/default-layout.mjs';
import mdx from '@astrojs/mdx';
import { attributeMarkdown, wrapTables } from '/src/themes/accelerator/utilities/custom-markdown.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://octopus.com',
    integrations: [
        mdx()
    ],
    markdown: {
        shikiConfig: {
            theme: 'nord'
        },
        remarkPlugins: [
            defaultLayout,
            remarkDirective,
            remarkHeading,
            attributeMarkdown,
            wrapTables
        ],
        trailingSlash: 'never',
        extendDefaultPlugins: true,
    },
});
