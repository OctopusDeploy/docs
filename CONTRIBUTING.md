# Contributing to the Octopus Deploy documentation

This document covers the process for contributing to the articles and code samples that are hosted on the [Octopus Deploy documentation site](https://octopus.com/docs/).

## How to contribute

Articles are stored in this repository as Markdown files. Simple changes to the content of a Markdown file can be made in the github editor and submitted for review via a pull request (PR). We will review the PR and accept it or suggest changes. 

No issue is required to be created before hand, however we still need you to sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs) before we can accept your contribution.

### More complex changes

You'll need a basic understanding of [Git and GitHub.com](https://guides.github.com/activities/hello-world/).

* Open an [issue](https://github.com/OctopusDeploy/docs/issues/new) describing what you want to do, such as change an existing article or create a new one.
* Fork this repo and create a branch for your changes.
* Submit a pull request (PR) to master with your changes.
* Sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs)

## Markdown syntax

The site is rendered using [markdig](https://github.com/lunet-io/markdig), Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

For all the syntax and conventions used in articles read our [README.md](README.md).

## Voice and tone

Our goal is to write documentation that is easily understandable by the widest possible audience. To that end we have established guidelines for writing style that we ask our contributors to follow. For more information, see [Voice and tone guidelines](voice-tone.md).

## Redirects

If you delete an article, change its file name, or move it to a different folder, create a redirect so that people who bookmarked the article won't get 404s.  Read [this section](README.md#redirects) on how to add redirects.