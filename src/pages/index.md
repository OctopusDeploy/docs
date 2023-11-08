---
layout: src/layouts/Default.astro
title: 'Index'
subtitle: This page is not shown on the live website.
navSearch: false
navSitemap: false
navMenu: false
pubDate: 2022-10-02
modDate: 2023-11-02
keywords: index
description: This index page is not part of the production site.
bannerImage:
    src: /docs/img/blueprint.png
    alt: A blueprint on grid paper with drawing tools
---

This page is not shown on the production site.

- [View the docs site](/docs)

## Reports

- [Missing banners](/report/missing-banner)
- [Missing metadata](/report/missing-meta)
- [Missing publication date](/report/missing-pubdate)
- [Oldest content](/report/oldest-content)
- [Taxonomy](/report/taxonomy)

## Examples

### Boxes

Front Matter snippet: "Information box".

:::div{.hint}
This is a hint box
:::

:::div{.info}
This is an info box
:::

:::div{.success}
This is a success box
:::

:::div{.warning}
This is a warning box
:::

:::div{.problem}
This is a problem box
:::

### Images

Use the toolbar to "Add Media", which will automatically offer these snippets:

Front Matter snippet:

- Standard image (above the fold)
  Adds an image based on metadata stored
- Standard image (below the fold)
  As above, but additionally lazy loads the image