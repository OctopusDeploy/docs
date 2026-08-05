import remarkDirective from 'remark-directive';
import remarkHeading from 'remark-heading-id';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import { attributeMarkdown, wrapTables } from '/src/themes/octopus/utilities/custom-markdown.mjs';
import llmMdEmitter from './src/integrations/llm-md-emitter.ts';
import rehypeWbr from './src/plugins/rehype-wbr.js';

console.log('rehypeWbr =', rehypeWbr);

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
        llmMdEmitter()
    ],
    markdown: {
        shikiConfig: {
            theme: 'light-plus',
            // OCL is HCL-derived, so reuse the HCL grammar for ```ocl fences
            langAlias: {
                ocl: 'hcl'
            }
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
