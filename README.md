This repository contains the documentation for [Octopus Deploy](https://octopus.com/docs).

Contributions to help improve this documentation are welcome, however, you must sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs) before we can accept your contribution.

See the [Octopus style guide](https://style.octopus.com) for information including:

* [Markdown quick reference](https://style.octopus.com/markdown)
* [Capitalization](https://style.octopus.com/capitalization)
* [Working with images](https://style.octopus.com/images)
* [Predefined snippets to include in your text](https://style.octopus.com/octopus-snippets)

## How to contribute a change to the docs

* The `main` branch has the latest version of the docs
* Fork this repo and create a branch for your changes
* Make the changes you'd like to contribute
* Submit a pull request (PR) to master with your changes and include a comment explaining the changes
* Sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs)
* We'll review your PR and accept it or suggest changes

## Deploying to preview environment (Octopus Developers)

Before merging to `main` it's possible you'd like to see your changes in a preview environment. It's simple to do this:

1. You need [Node.js](https://nodejs.org/en) installed to run the site locally
2. Run `npm install` to obtain the dependencies
3. Run `npm run dev` to run a local preview of the site
4. Open `localhost:3000` to view the site, the first page load usually takes a little time
