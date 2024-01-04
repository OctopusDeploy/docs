This repository contains the documentation for [Octopus Deploy](https://octopus.com/docs).

Contributions to help improve this documentation are welcome, however, you must sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs) before we can accept your contribution.

See the [Octopus style guide](https://www.octopus.design/932c0f1a9/p/26f741-writing) for information including:

* [Markdown quick reference](https://www.octopus.design/932c0f1a9/p/074e30-markdown-reference)
* [Capitalization](https://www.octopus.design/932c0f1a9/p/457bc4-grammar-rules/t/03e016)
* [Working with images](https://www.octopus.design/932c0f1a9/p/5061d7-working-with-images)

## How to contribute a change to the docs

* The `main` branch has the latest version of the docs
* Fork this repo and create a branch for your changes
* Make the changes you'd like to contribute
* Submit a pull request (PR) to master with your changes and include a comment explaining the changes
* Sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs)
* We'll review your PR and accept it or suggest changes

## Required checks

When you raise a pull request, the following checks will take place:

1. A full test
2. A spell-check

### Test

You can run the tests locally using:

```
pnpm test
```

The most common failures are:

- A new image is referenced with the wrong path
- An internal link has a bad address

### Spell check

You can run the spell check locally using:

```
pnpm spellcheck
```

Only changed files are checked for spelling. If a file hasn't been edited since this check was introduced, you may have to fix some old spelling issues.

For each error detected, you'll need to decide whether to:

- Correct your spelling, or
- Propose an addition to the custom dictionary

For example, if you added `MySQL` to an article and it was flagged as an unknown word, you could propose the addition of `MySQL` by adding it word list in the file `dictionary-octopus.txt`.

Some consideration should be given as to whether it should be `MySQL` or `MySql` and just a single entry should be added to `dictionary-octopus.txt` to promote consistency.

### Exclusions

You can see files excluded from the spell check in `cspell.json`.

## Deploying to preview environment (Octopus Developers)

Before merging to `main` it's possible you'd like to see your changes in a preview environment. It's simple to do this:

1. You need [Node.js](https://nodejs.org/en) installed to run the site locally
2. Run `pnpm install` to obtain the dependencies
3. Run `pnpm dev` to run a local preview of the site
4. Open `localhost:3000` to view the site, the first page load usually takes a little time

You can generate a static copy of the site using `pnpm build` and run it in a browser with `pnpm preview`.

## Astro hints and tips

### Editor setup

We have configured [Front Matter CMS](https://frontmatter.codes/), which works through a VS Code extension. This can help guide you during the editing process as there are snippets to help with images and other common components. Front Matter also helps you with the markdown YAML front matter.

Here's the recommended setup for VS Code:

- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Front Matter CMS](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

You can use the Front Matter dashboard to find content, media, and snippets - or the Front Matter toolbar to interact in markdown files (`.md` or `.mdx`).

### Finding pages to edit

The pages are in the exact page shown on the website, so you can easily translate them. For example:

```
https://octopus.com/docs/infrastructure/deployment-targets/tentacle
```

Can be found in the exact same path within `src/pages/`

```
\docs\src\pages\docs\infrastructure\deployment-targets\tentacle
```

The file is either in the `tentacle` folder, and named `index.md(x)`, or will be in the parent `deployment-targets` folder and named `tentacle.md`.

The only exception are include files, which are noted below.

### Redirects

No page should ever be deleted! When a page moves or is retired, it should be changed into a redirect file. The redirect ensures users with old links still land on a useful page.

The below shows the complete contents of a redirect page that sends users from:

```
/docs/administration/authentication/authentication-providers/azure-ad-authentication
```

To the new location:

```
/docs/security/authentication/azure-ad-authentication
```

```
---
layout: src/layouts/Redirect.astro
title: Redirect
redirect: https://octopus.com/docs/security/authentication/azure-ad-authentication
pubDate:  2023-01-01
navSearch: false
navSitemap: false
navMenu: false
---
```

Having the file kept in place helps future authors as they can easily see where the content has moved. It also prevents a new content item being added that can’t be accessed due to redirects being in place.

Search engines are happy to process meta redirects, just like DNS redirects.

### Include files

Include files let you re-use a chunk of content across many pages. When the information in the shared file changes, all the pages that use it get the update. This can be better than finding all references to a concept, but the trade off is it is more complex to reason.

### Shared content

Shared content is placed in `/src/shared-content/`

You can organize the content in folders within the shared content folder.

#### Referencing shared content

Shared content can be referenced from mdx files. If you have a markdown file and want to reference shared content, follow these steps.

Change the file extension from `.md` to `.mdx`

After the front matter ends with `---` you can import the content:

```javascript
import DisableDefaultSpace from 'src/shared-content/administration/disable-default-space.include.md'
```

You can then place the content wherever it needs to be shown:

```html
<DisableDefaultSpace />
```

### MDX file differences

When you convert a file from Markdown to MDX, you may encounter some common errors.

#### Headings

The integration for headings allows custom ids to be specified:

```markdown
## Switching between spaces {#switching-between-spaces}
```

Within an MDX file, this looks like a code block and will error. Escape the statement with a `\` character:

```markdown
## Switching between spaces \{#switching-between-spaces}
```