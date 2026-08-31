import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import { attributeMarkdown, wrapTables } from '/src/themes/octopus/utilities/custom-markdown.mjs';
import llmMdEmitter from './src/integrations/llm-md-emitter.ts';
import pagefindIndex from './src/integrations/pagefind-index.ts';
import pruneDist from './src/integrations/prune-dist.ts';
import satteriHeadingId from './src/plugins/satteri-heading-id.js';
import satteriApiExamples, { apiExampleDirective } from './src/plugins/satteri-api-examples.js';
import { endpointDirective } from './src/plugins/satteri-endpoint.js';
import satteriWbr from './src/plugins/satteri-wbr.js';
import pagefindImageAttrs from './src/plugins/pagefind-image-attrs.js';
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
        // After the page emitters, and before the prune that would delete its
        // output
        pagefindIndex(),
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
            // A transformer, so the shell is built as each block is
            // highlighted rather than by re-parsing the markup afterwards
            transformers: [shikiCodeBlock()]
        },
        // Sätteri, the Rust processor, replaces the unified pipeline. Unlike
        // unified's remark/rehype plugins, these also run over .mdx pages.
        processor: satteri({
            features: {
                // `:::div{.hint}` containers and `:img{src=...}` directives
                directive: true,
                // `## Title {#custom-id}` explicit heading ids
                headingAttributes: true
            },
            mdastPlugins: [
                satteriHeadingId,
                attributeMarkdown,
                // After attributeMarkdown, whose generic handler would otherwise
                // render `:::api-example` as an <api-example> tag, and
                // `:endpoint` as an <endpoint> one
                apiExampleDirective,
                endpointDirective,
                wrapTables
            ],
            hastPlugins: [
                satteriWbr,
                pagefindImageAttrs,
                satteriApiExamples
            ],
        }),
    },
    server: {
        port: 3000
    },
});
