export function defaultLayout() {
  return function (tree, file) {
    if (!file.data.astro.frontmatter.layout) {
      file.data.astro.frontmatter.layout = `${file.cwd}/src/layouts/Default.astro`;
    }
  };
}
