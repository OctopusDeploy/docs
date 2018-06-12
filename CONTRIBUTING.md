# Contributing to the Octopus Deploy Documentation

This document covers the process for contributing to the documentation and code samples that are hosted on the [Octopus Deploy documentation site](https://octopus.com/docs/).

Documentation is stored in this repository as Markdown files. The site is rendered using [markdig](https://github.com/lunet-io/markdig), Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

Before we can accept your contribution, you need you to sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs).

## In This Document

- [Contribute a Quick Fix](#contribute-a-quick-fix)
- [Contribute More Complex Changes](#contribute-more-complex-changes)
- [Conventions](#conventions)
  - [Voice and Style](#voice-and-style)
  - [Structure](#structure)
- [Working with Files and Folders]()

- [Markdown](#markdown)

## Contribute a Quick Fix

If you spotted a typo, a small error, or a simple omission that you'd like to fix, you can make these changes in the GitHub editor. Once the changes have been made, GitHub makes it easy to [submit your changes as a new branch and start a pull request(PR)](https://help.github.com/articles/editing-files-in-another-user-s-repository/). We will review your PR and accept it or suggest changes.

## Contribute More Complex Changes

If you'd like to contribute more complex changes to the documentation, you'll need an understanding of [Git and GitHub.com](https://guides.github.com/activities/hello-world/) and an awareness of the [conventions](#conventions) used throughout our documentation.

The basic process is:

* Fork this repo and create a branch for your changes.
* Make the changes you'd like to contribute.
* Submit a pull request (PR) to master with your changes and include a comment explaining the changes.
* Sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs).
* We'll review your PR and accept it or suggest changes.

## Conventions

Our goal is to make the documentation as accessible as possible to the reader. These conventions are intended to help our contributors maintain a consistent style and voice throughout the documentation.

### Voice and Style

Not everybody who reads the Octopus Deploy documentation is a native English speaker with a degree in computer science, though many are. To make the documentation as widely accessible as possible we recommend:

- Address the reader directly by writing in second person. Imagine you are talking to the reader.
- Use an informal tone and simple, declarative language.
- Define technical terms the reader might not be familiar with.
- Use simple sentence structures to avoid overloading the reader with too much information all at once.
- Use US English spelling.
- Try to anticipate why somebody would read the documentation and the types of problems they are trying to solve. Instead of describing features, explain what users can do with them and how they do it.
- Avoid overly formal language or an academic style.
- Avoid slang, colloquialisms, and other terms the reader might not be familiar with.

### Structure

When creating new documentation, you should structure it as follows:

1. Introduction.

  Provide an introduction that explains what the documentation covers and provide some sample scenarios for when users might want to implement it. For instance:

  > This document explains how to install Octopus Deploy for fast, reliable, repeatable deployments.

2. Procedural.

  Walk the user through the process with easy to follow step by step instructions. Try to focus on the most common use cases and provide a direct path the user can follow to achieve the goal of the procedure.

  > 1. Select Projects from the main navigation, and click ADD PROJECT.
  > 2. Give the project a name that's meaningful to you, and anybody else who'll work on the project.

3. Reference.

  If there are lists of parameters or additional options available, provide the details in a list or table for easy access after the procedural content. If there are common troubleshooting steps users might need to perform, list them here.

4. Next.

  Provide links to related documentation to help the reader continue their journey.

## Working with Files and Folders

The folder structure in the GitHub docs repository, determines the structure of [www.octopus.com/doc](https://www.octopus.com).



## Markdown


## Redirects

If you delete an article, change its file name, or move it to a different folder, create a redirect so that people who bookmarked the article won't get 404s.  Read [this section](README.md#redirects) on how to add redirects.
