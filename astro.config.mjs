import remarkDirective from 'remark-directive';
import remarkHeading from 'remark-heading-id';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import { attributeMarkdown, wrapTables } from '/src/themes/octopus/utilities/custom-markdown.mjs';
import llmMdEmitter from './src/integrations/llm-md-emitter.ts';

// https://astro.build/config
export default defineConfig({
    site: 'https://octopus.com',
    compressHTML: true, // preserve astro v6 behavior - https://docs.astro.build/en/guides/upgrade-to/v7/
    integrations: [
        mdx(),
        llmMdEmitter()
    ],
    markdown: {
        shikiConfig: {
            theme: 'light-plus'
        },
        processor: unified({
            remarkPlugins: [
                remarkDirective,
                remarkHeading,
                attributeMarkdown,
                wrapTables
            ],
        }),
    },
    server: {
        port: 3000
    },
});
