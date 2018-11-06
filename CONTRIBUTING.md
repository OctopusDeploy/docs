# Contributing to the Octopus Deploy Documentation

This document covers the process for contributing to the documentation and code samples that are hosted on the [Octopus Deploy documentation site](https://octopus.com/docs/).

Documentation is stored in this repository as Markdown files. The site is rendered using [markdig](https://github.com/lunet-io/markdig). Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

Before we can accept your contribution, you need you to sign the [Contribution License Agreement (CLA)](https://cla-assistant.io/OctopusDeploy/docs).

## In This Document

- [Contribute a Quick Fix](#contribute-a-quick-fix)
- [Contribute More Complex Changes](#contribute-more-complex-changes)
- [Conventions](#conventions)
  - [Voice and Style](#voice-and-style)
  - [How to Structure Content](#how-to-structure-content)
- [Working with Files and Folders](#working-with-files-and-folders)
  - [Index Pages](#index-pages)
  - [Filenames](#filenames)
  - [Headers](#headers)
  - [Using and Defining Includes](#using-and-defining-includes)
  - [Reusing Content in Multiple Docs](#reusing-content-in-multiple-docs)
  - [Redirects](#redirects)
- [Working With the Content](#working-with-the-content)
  - [Table of Contents](#table-of-contents)
  - [Headings](#headings)
  - [Images](#images)
  - [Application Paths](#application-paths)
  - [Links](#links)
  - [Code Samples](#code-samples)
  - [Alerts](#alerts)
  - [Lists](#lists)
  - [Working with Long-Term Support Releases and Fast Ring Releases](#working-with-long-term-support-releases-and-fast-ring-releases)

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

### How to Structure Content

When creating new documentation, you should structure it as follows:

1. Introduction.

  Provide an introduction that explains what the documentation covers and provide some sample scenarios for when users might want to implement it. For instance:

  > This document explains how to install Octopus Deploy for fast, reliable, repeatable deployments.

2. Procedural.

  Next, walk the user through the process you're describing with easy to follow step-by-step instructions. Try to focus on the most common use cases and provide a direct path the user can follow to achieve the goal of the procedure.

  > 1. Select Projects from the main navigation, and click ADD PROJECT.
  > 2. Give the project a name that's meaningful to you, and anybody else who'll work on the project.
  > 3. ...

3. Reference.

  If there are lists of parameters or additional options available, provide the details in a list or table for easy access after the procedural content. If there are common troubleshooting steps users might need to perform, list them here.

4. Next.

  Provide links to related documentation to help the reader continue their journey.

## Working with Files and Folders

The folder structure in the GitHub docs repository, determines the structure of [www.octopus.com/docs](https://www.octopus.com/docs) and the navigation menu for the docs. For instance, the contents of the file located at `docs/installation/downloads.md` can be viewed at the URL [www.octopus.com/docs/installation/downloads](https://octopus.com/docs/installation/downloads). Note, the markdown file extension `.md` is not present in the URL.

The only exception to this rule, is index pages, see the next section for details.

### Index Pages

Each directory needs an index.md page with the content that will be displayed on the equivalent page in the docs. For instance, the contents of the file `docs/installation/index.md` is available at the URL: [www.octopus.com/docs/installation](https://octopus.com/docs/installation). Note, `index.md` is not part of the URL.

### Filenames

Filenames must be in lowercase and delimited with a dash `-`. For instance, `backup-and-restore.md`, or `dashboard.png`.

### Headers

Each document has a header. The header is enclosed by `---` and is defined using the [YAML](https://en.wikipedia.org/wiki/YAML) document format.
If you need to review your document in GitHub, the UI will [render YAML](https://github.com/blog/1647-viewing-yaml-metadata-in-your-documents). The header is where you define the title of the page and provide a description of the page. For example:

```md
---
title: Getting Started
description: A conceptual overview of Octopus Deploy.
position: 0
---
```

#### Title (required)
Used for the web page title tag `<head><title>`, and displayed in the page content.

Please use Title Case for titles. If you're not sure about title case, there are a few converters online, for instance: http://titlecaseconverter.com/.

#### Description (required)

Used for the meta description tag (`<meta name="description" />`).
Keep the description under 160 characters.

Read [how to write a good description](https://moz.com/learn/seo/meta-description).

#### Position (optional)
Used to set the position of the document in the menu.

#### hideInThisSection (optional)

Index pages `index.md` automatically have an "In This Section" section added below the content of the page that lists all child pages in the folder. If the page does not need this section, you can stop it from being displayed by adding the following metadata to the YAML header:

```yaml
hideInThisSection: true
```

The "In This Section" section [contains a header](_shared/in-this-section.md), if you don't want the header to be displayed, but you still want the list of child pages to show up, you can omit the header by adding the following metadata to the YAML:

```yaml
hideInThisSectionHeader: true
```

### Using and Defining Includes

Sometimes you need to the same content in multiple pages, using includes lets you write the content once, and include it in more than one place. Markdown includes are pulled into the document prior to passing the content through the markdown conversion.

To create an include, add a file anywhere in the docs repository that is suffixed with `.include.md`. For example, the file might be named `theKey.include.md`. To include the content in `theKey.include.md` in another file, add the following to the markdown in the file you would like to include the content in:

`!include <theKey>`

Don't include a YAML header with includes.

### Reusing Content in Multiple Docs

Sometimes the content that you create is needed in multiple docs. For instance, perhaps your document touches elements on both configuration features and variables and could be included with the docs about variables, the docs about configuration features, and in the deployment example docs. If you added the content to all three areas of the documentation, you would then need to keep all three copies up to date if anything changes.

With includes you can create the content once, and then include it in all the docs that need that content. This makes it easier for users to find relevant content where they need it. See [Using and Defining Includes](#using-and-defining-includes) for details on creating the includes content. Once the content has been created, it should be saved to the `docs/shared-content/` folder.

#### Considerations for Creating Reusable Content

Remember when you reuse content in this manner readers will come to it from different contexts. For this reason it's important to make sure the content fits with each context it will be used with. Some things that can help are to ensure the content works as a standalone piece, for instance, **How to Configure X**, give the section a title and include an introduction so readers understand what this section will cover even though they might be approaching it from different contexts. Lastly, review the content in each context yourself to ensure it fits in each instance.

### Redirects

If you delete or rename a file, you need to add a redirect for that file otherwise publishing will fail.

Redirects are added to [redirects.txt](redirects.txt).

The redirects.txt file looks something like:
```
from-file-path -> to-file-path                 #DO NOT DELETE THIS LINE
docs/page1.md -> docs/page2.md
```
In the above example, `/docs/page1` is redirected to `/docs/page2`.

Add your redirect to the end of the file, after the redirect is added, the original file (`page1`) needs to be deleted from the repo.

## Working With the Content

### Table of Contents

You can include a table of contents by adding `!toc` to the markdown. The table of contents lists all headers (H1, H2, etc) in the current document.

### Headings

The first (and all top level) headers in a `.md` page should be a `h2` (i.e., `##`) with sub-headings under it being `h3`, `h4`, etc.
DO NOT skip heading levels, i.e., h1 > h2 > h4 is not valid!

You must also separate the `##` and the text of the heading with a space. Without the space, the heading will not render correctly on the Octopus docs site (though it will render correctly in the GitHub preview).

Note, the first header is the title provided in the YAML header.

### Images

Images can be incredibly helpful for your audience, but the downside of images is how quickly they can become outdated and leave your reader feeling confused if they're not updated.

Before adding a screenshot of the Octopus UI (or another UI), consider the following:

1. How likely is it the UI will change and the old screenshot will confuse readers?
1. Have you provided text that describes the steps users need to take (for accessibility reasons you shouldn't rely on screenshots to relay information). If the text is clear enough, is the screenshot still necessary?

Put images in the same folder as the markdown file that references it.

Images can be added using the following markdown syntax:

    ![Alt text](img.jpg)

**All** images should have [alt text](https://en.wikipedia.org/wiki/Alt_attribute).

### Application Paths

In order to be consistent when referencing certain areas of the application we have created a markdown extension to render application paths. To render an application path use the following syntax:

```md
{{my,application,path}} or {{my>application>path}}
```
The `,` or `>` are the separator characters.

For example:

```md
To enable Docker in your Octopus Server instance, toggle the feature on via {{Configuration,Features,Docker}}.
```

### Links

Links to other pages in the documentation should be relative and contain the `.md` extension.
The `.md` allows links to work inside the GitHub web UI. The `.md` will be trimmed when they are finally rendered.

#### Anchors

One addition to standard markdown is the auto creation of anchors for headings.

So if you have a heading like this:

    ## My Heading

it will be converted to this:

    <h2>
      <a name="my-heading"/>
      My Heading
    </h2>

Which means elsewhere in the page you can link to it with this:

    [Goto My Heading](#My-Heading)
    [Goto a different page](/docs/getting-started.md#My-Heading)

You do not need to create anchors in the markdown, they will be generated automatically, but if you add them manually, do not use special characters in the anchor text as they will cause the link to be truncated.

### Code Samples

Use GitHub-style fenced code blocks. For example:

    ​```powershell
    Write-Host "Hello"
    ​```

If your example uses multiple languages or files, you can combine them together and add tab headings. They will be rendered as tabs:

    ​```powershell PowerShell
    Write-Host "Hello"
    ​```
    ​```c# C#
    Console.WriteLine("Hello");
    ​```

Snippets are highlighted by Highlight.js

* [Documentation](https://highlightjs.readthedocs.io/)
* [Language List](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases)

| language     | key            |
| ------------ | -------------- |
| c#           | `cs`           |
| xml          | `xml`          |
| no format    | `no-highlight` |
| command line | `bash`         |
| powershell   | `ps`           |
| json         | `json`         |
| sql          | `sql`          |
| f#           | `fsharp`       |
| text         | text           |

**Always use fenced code blocks with a language.** If no language is defined then highlightjs will guess the language and it regularly gets it wrong.

### Alerts

Sometimes it's necessary to draw attention to items you want to call out in a document.

When used sparingly, alerts can effectively draw the user's attention to important information. When used excessively, alerts can have the opposite effect and train users to ignore the alerts. Before adding an alert, consider if it is the best approach or if the user might benefit from the information being presented as part of the main body of text.

Alerts are added through bootstrap alerts https://getbootstrap.com/components/#alerts.

There are several keys, each of which map to a different colored alert:

| Key       | Color  |
| --------- | ------ |
| `success` | green  |
| `hint`    | blue   |
| `warning` | yellow |
| `problem` | red    |

Use the following syntax to add keys:

```md
:::hint
**Guess what**
The answer is 42.
:::
```

will be rendered as
```html
<div class="alert alert-info">
<p><strong>Guess what</strong></br>
The answer is 42.</p>
</div>
```

### Lists
Lists can be created using a few different styles, please be aware that `Roman` and `Letters` won't render properly in GitHub (this is a markdig extension).

You don't have to provide sequential number for list items, that is `1, 2, 3...`, you can just use `1, 1, 1...` unless you insert a break in the list to include some other text. If you include a break in the text, it is recommended that you number your list items correctly, so that the numbers don't reset after the break.

#### Nested Lists

You can nest lists, by adding two spaces before the nested list items.

#### Bullets

```md
- Item 1
- Item 2
```

Which is rendered as:

- Item 1
- Item 2

#### Numbered

```md
1. Item 1
1. Item 2
```

Which is Rendered as:

1. Item 1
2. Item 2

#### Roman

```md
i. Item 1
i. Item 2
```

Which is rendered as:

i. Item 1  
ii. Item 2

#### Letters

```md
a. Item 1
a. Item 2
```

Which is rendered as:

a. Item 1  
b. Item 2

### Working with Long-Term Support Releases and Fast Ring Releases

In Q4 2018 Octopus will introduce Long-Term Support releases. LTS releases are released on a three month cadence and are supported for six months. This means there will be two current LTS releases at any point in time. The documentation for the latest LTS release is the version of the docs that is displayed on the docs site by default. In addition to the LTS releases, we also have the fast ring releases (two) between each LTS release.

#### Which Versions are available?

- **Legacy Documentation**: Copies of the legacy docs go all the way back to version **3.6** and are available in a persistent archive at [www.legacydocs.octopus.com](https://legacydocs.octopus.com).
- **LTS**: Both currently supported versions of the LTS releases are available on the main docs site.
- **Current Fast Lane Release**: If the most recent release is a fast lane release, it is also available on the main docs site from the version selector. Once this version is no longer the most recent version it is added as to the legacy documentation site.

The version switcher lets users choose between the different versions of the documentation.

 ![Version Selector](/docs/images/version-selector.png)

#### Include the Version

The list of versions displayed on the dropdown are loaded from [versions.json](versions.json).

To add a new version to the version switcher all you need to do is add the version to the versions.json file versions array, and leave the default as it is, the example below adds version 2018.4. To add an LTS version append -LTS to the version, for instance, `2018.10-LTS`.

```json
{
   "versions": [
     "2018.3",
     "2018.4"
   ],
   "default": "2018.3",
   "legacy": [
    {
      "version": "2018.2",
      "firstReleased": "8 Feb 2018"
     },
     {
      "version": "2018.1",
      "firstReleased": "24 Jan 2018"
     },
     {
      "version": "4.1",
      "firstReleased": "5 Dec 2017"
     }
   ]
 }
```

The version selector on the website will display the versions added to the versions array:

 ![Version Selector](/docs/images/version-selector.png)

And when selected, a banner tells the user that they are seeing a "preview" of the documentation:

 ![Documentation Preview banner](/docs/images/preview.png)

#### Version Specific Docs

As we make changes to the way the product works or add new features we need to specify which version of the software the changes appears in. This ensure users can access documentation for the version of Octopus they are using.

If the documentation is for a completely new feature, you can add a version to the YAML header at the beginning of the document that explains the feature. For instance:

```md
---
title: New Awesome Feature
description: Documentation for a feature that will blow your mind.
position: 10
version: 2018.11
---
```

With the version information added to the header, the documentation for New Awesome Feature will appear in the docs for version 2018.11 and above.

#### Version Specific Partials

Partials are version specific files that contain markdown that is included inside other markdown documents. Version specific partials are useful when a feature changes between releases, and you need to display one version of the documentation to users viewing older versions of the docs, and a different version of the same page (or part of the same page) to users viewing a newer version of the doc.

Partials use the same version syntax as [nuget](https://docs.microsoft.com/en-us/nuget/reference/package-versioning#version-ranges-and-wildcards).

The convention for defining partials is: filePrefix_key_version.partial.md

For instance, if the way a feature is configured changes in version 2019.2, you can add the markdown with the instructions to configure the feature the old way to a partial with the following filename:

`index_configure_(,2019.2).partial.md`

You can then add the markdown with the instructions for the new version to a partial with the following filename:

`index_configure_(2019.2,).partial.md`

Both of these assume you're adding the partials to the index file.

You also need to add the partial to the document where you want it to appear, for instance:

`!partial <configure>`

Markdown partials are pulled into the document prior to includes, so this means you can add includes to partials.
They are only rendered in the target page when the version filter matches the convention for a give file.

Partials must be added to the same folder as the page that will use the partial.

## Useful Characters

Just go to http://htmlarrows.com/symbols/

## More Information

* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
