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

### Spell-check

You can run the spell-check locally using:

```
pnpm spellcheck
```

Only changed files are checked for spelling. If a file hasn't been edited since this check was introduced, you may have to fix some old spelling issues.

For each error detected, you'll need to decide whether to:

- Correct your spelling, or
- Propose an addition to the custom dictionary

For example, if you added `MySQL` to an article and it was flagged as an unknown word, you could propose the addition of `MySQL` by adding it word list in the file `cspell.json`.

Some consideration should be given as to whether it should be `MySQL` or `MySql` and just a single entry should be added to `cspell.json` to promote consistency.

## Deploying to preview environment (Octopus Developers)

Before merging to `main` it's possible you'd like to see your changes in a preview environment. It's simple to do this:

1. You need [Node.js](https://nodejs.org/en) installed to run the site locally
2. Run `pnpm install` to obtain the dependencies
3. Run `pnpm dev` to run a local preview of the site
4. Open `localhost:3000` to view the site, the first page load usually takes a little time

You can generate a static copy of the site using `pnpm build` and run it in a browser with `pnpm preview`.
