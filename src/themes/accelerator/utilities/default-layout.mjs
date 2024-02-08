/**
 * This javascript file comes from Astro Accelerator
 * Edits will be overwritten if you change the file locally
 */

export function defaultLayout() {
    return function (tree, file) {
        if (!file.data.astro.frontmatter.layout) {
            file.data.astro.frontmatter.layout = `${file.cwd}/src/layouts/Default.astro`;
        }
    };
}