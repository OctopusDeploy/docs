import remarkDirective from 'remark-directive';
import remarkHeading from 'remark-heading-id';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { attributeMarkdown, wrapTables } from '/src/themes/octopus/utilities/custom-markdown.mjs';
import llmMdEmitter from './src/integrations/llm-md-emitter.ts';

// https://astro.build/config
export default defineConfig({
    site: 'https://octopus.com',
    integrations: [
        mdx(),
        llmMdEmitter()
    ],
    // Tailwind v4 only lands on pages that import the Ink design system entry
    // (src/ink/theme.css), so the live site stays untouched.
    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        shikiConfig: {
            theme: 'light-plus'
        },
        remarkPlugins: [
            remarkDirective,
            remarkHeading,
            attributeMarkdown,
            wrapTables
        ],
        trailingSlash: 'never',
        extendDefaultPlugins: true,
    },
    server: {
        port: 3000
    },
});
