import remarkDirective from 'remark-directive';
import remarkHeading from 'remark-heading-id';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import { attributeMarkdown, wrapTables } from '/src/themes/octopus/utilities/custom-markdown.mjs';
import llmMdEmitter from './src/integrations/llm-md-emitter.ts';
import pruneDist from './src/integrations/prune-dist.ts';
import rehypeWbr from './src/plugins/rehype-wbr.js';
import shikiCodeBlock from './src/plugins/shiki-code-block.js';

// https://astro.build/config
export default defineConfig({
    site: 'https://octopus.com',
    compressHTML: true, // preserve astro v6 behavior - https://docs.astro.build/en/guides/upgrade-to/v7/
    build: {
        // The site is proxied onto octopus.com under /docs/ only, so bundled
        // assets must live inside that prefix or the CDN 404s them
        assets: 'docs/_astro',
    },
    integrations: [
        mdx(),
        llmMdEmitter(),
        // Must run last: strips build output that can't be served under /docs/
        pruneDist()
    ],
    markdown: {
        shikiConfig: {
            // Every token carries both sets. main.css picks the dark one up
            // under html[data-theme='dark']
            themes: {
                light: 'light-plus',
                dark: 'dark-plus'
            },
            defaultColor: 'light',
            // OCL is HCL-derived, so reuse the HCL grammar for ```ocl fences
            langAlias: {
                ocl: 'hcl'
            },
            // A transformer, because rehype plugins registered through
            // `processor` below never reach .mdx pages
            transformers: [shikiCodeBlock()]
        },
        processor: unified({
            remarkPlugins: [
                remarkDirective,
                remarkHeading,
                attributeMarkdown,
                wrapTables
            ],
            rehypePlugins: [
                rehypeWbr
            ],
        }),
    },
    server: {
        port: 3000
    },
});
