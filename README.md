This repository contains the documentation for [Octopus Deploy](https:/octopus.com/docs).

To contribute to documentation, read the following guide.


# Conventions
## Lower case  and `-` delimited

All content files (`.md`, `.png`, `.jpg` etc) and directories must be lower case.
All links pointing to them must be lower case.
Use a dash (`-`) to delimit filenames (e.g. `specify-endpoint-name.md`).


## Headers

Each document has a header. It is enclosed by `---` and is defined in a [YAML](https://en.wikipedia.org/wiki/YAML) document format.
The GitHub UI will [correctly render YAML](https://github.com/blog/1647-viewing-yaml-metadata-in-your-documents).
For example:

```md
---
title: Getting started
description: From 0 to deployed, this guide walks you through getting started with Octopus.
position: 0
version: "[3.0,4.0)"
---
```

### Title
Required. Used for the web page title tag `<head><title>`, displayed in the page content

### Description
Required. Used for the meta description tag (`<meta name="description" />`).

### Position
Optional. Used for the position in the menu.

### Version
Optional. The versions that this file applies to. This meatadata supports ranges, same syntax as [nuget](https://docs.microsoft.com/en-us/nuget/create-packages/dependency-versions#version-ranges).

## Menu

The menu is auto generated based on the git repo folder structure and title and position metadata.

## URLs

The directory structure where a `.md` exists is used to derive the URL for that document.
So a file existing at `/docs/myfolder/mypage.md` will have a URL of `https://octopus.com/docs/myfolder/mypage`.

### Index Pages

One exception to the URL rule is when a page is named `index.md`. In this case the `index.md` is omitted in the URL and only the directory structure is used.
So a file existing at `/docs/myfolder/index.md` will have a URL of `https://octopus.com/docs/myfolder`.

### Linking

Links to other documentation pages should be relative and contain the `.md` extension.
The `.md` allows links to work inside the GitHub web UI. The `.md` will be trimmed when they are finally rendered.

## "In this section" area

Index pages (`index.md`) automatically have a "In this section" section added to them (bottom of the content).
If the page does not need this section, you can opt out by adding the following metadata to the yaml:
```yaml
hideInThisSection: true
```

The rendering of "In this section" section [contains a header](_shared/in-this-section.md), if you need to omit this header:
```yaml
hideInThisSectionHeader: true
```

## Markdown

The site is rendered using [markdig](https://github.com/lunet-io/markdig), Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

### Lists
Lists can be created using a few different styles, please be aware that `Roman` and `Letters` won't render properly in github (this is a markdig extension).

To ensure the list items are correctly formmatted it is recommended to not number the items, instead let the markdown renderer do that job automatically, so for a numeric list use one `1`s for a letter list use one `a.`s and for a roman list use only `i`s.

#### Bullets
Example:
```md
- Item 1
- Item 2
```

Rendered as:

- Item 1
- Item 2

#### Numbered
Example:
```md
1. Item 1
1. Item 2
```

Rendered as:

1. Item 1
2. Item 2

#### Roman
Example:
```md
i. Item 1
i. Item 2
```

Rendered as:

i. Item 1  
ii. Item 2

#### Letters
Example:
```md
a. Item 1
a. Item 2
```

Rendered as:

a. Item 1  
b. Item 2

### Code Samples

Use GitHub-style fenced code blocks. Example:

    ​```powershell
    Write-Host "Hello"
    ​```

If your example uses multiple languages or files, you can combine them together - they will be rendered as tabs:

    ​```powershell PowerShell
    Write-Host "Hello"
    ​```
    ​```c# ScriptCS
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

**Always use fenced code blocks with a language.** If no language is defined then highlightjs will guess the language and it regularly gets it wrong. Example:

### Alerts

Sometimes it is necessary to draw attention to items you want to call out in a document.
This is achieved through bootstrap alerts https://getbootstrap.com/components/#alerts
There are several keys each of which map to a different colored alert

| Key       | Color  |
| --------- | ------ |
| `success` | green  |
| `hint`    | blue   |
| `warning` | yellow |
| `problem` | red    |

Keys can be used in the following manner

```md
:::hint
**Guess what**
The number is 45.
:::
```

will be rendered as
```html
<div class="alert alert-info">
<p><strong>Guess what</strong></br>
The number is 45.</p>
</div>
```

## ToC
Table of contents can be added to any page anywhere by adding `!toc` to the markdown.

## Headings

The first (and all top level) headers in a `.md` page should be a `h2` (i.e. `##`) with sub-headings under it being `h3`, `h4`, etc.
DO NOT skip headers, eg. h1 > h2 > h4, not valid!

You must also separate the '##' and the heading with a space.  If you don't the heading will render correctly in the Preview in GitHub, and in many other tools, but will not render correctly on the docs site.

## Folder Version
You can version the content of a whole folder by versioning the `index.md` for the folder.
Example:
If we want to hide the whole docker doco for versions prior to v3.4, we can add `version: [3.4,)` to the `docs/guides/docker/index.md` metadata.
This will exclude docker content from all versions prior to v3.4.

## Includes
Sometimes you need to duplicate content in multiple pages, this is where includes are handy.
Markdown includes are pulled into the document prior to passing the content through the markdown conversion.

### Defining an include

Add a file anywhere in the docs repository that is suffixed with `.include.md`. For example, the file might be named `theKey.include.md`.

### Using an include

Add the following to the markdown: `!include <key>`

## Partials
Partials are version specific files that contain markdown.
Markdown partials are pulled into the document prior to includes, so this means you can add includes to partials.
They  are only rendered in the target page when the version filter matches the convention for a give file.

Partial Convention: filePrefix_key_nugetAlias_version.partial.md

### Defining a partial

Add a file in the same folder as the page where you will use the partial to the docs repository that is named `filePrefix_key_version.partial.md`. For example, the file might be named `getting-started_theKey_2.0.partial.md`.

### Using a partial

Add the following to the markdown: `!partial <key>`

## Anchors

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


## Images

Images can be added using the following markdown syntax

    ![Alt text](/docs/images/img.jpg "Optional title")

With the minimal syntax being

    ![](/docs/images/img.jpg)

### Image paths
Paths to internal images need to:

- be relative or absolute
- all lower case
- can include `.` and `-`
- can also have version range, see [image versioning](#image-versioning)

Example `/docs/images/naked-scripting/transferpackage-transfer.png`

### Image versioning
Images can be versioned. To version an image you need to include the default image and the versioned images.
The convention is `imagename_version.ext`

Here is an example:
Let's say we want to display a different versions of `myimage.png` for v1.0 and v2.0 and we are currently on version 3.0.
All we need to do is create the new image and name it with a version range  `myimages_[1.0,3.0).png`.
So in the end you have 2 images, `myimage.png` and `myimages_[1.0,3.0).png`.

**All versioned images need to be in the same folder as the default image.**


### Image sizing

Image size can be controlled by adding the text `width=x` to the end of the title

For example

    ![Alt text](/path/to/img.jpg "Optional title width=x")

With the minimal syntax being

    ![](/path/to/img.jpg "width=x")

This will result in the image being re-sized with the following parameters

    width="x" height="auto"

It will also wrap the image in a clickable lightbox so the full image can be accessed.


## Useful Characters

Just go to http://htmlarrows.com/symbols/

## More Information

* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

