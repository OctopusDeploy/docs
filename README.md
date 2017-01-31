This repository contains the documentation for [OctopusDeploy](https:/octopus.com/docs).

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
---
```

### Title
Required. Used for the web page title tag `<head><title>`, displayed in the page content

### Description
Optional. Used for the meta description tag (`<meta name="description" />`).

### Position
Optional. Used for the position in the menu.

## Menu

The menu is auto generated based on the git repo folder structure and title and position metadata.

## URLs

The directory structure where a `.md` exists is used to derive the URL for that document.
So a file existing at `docs/myfolder/mypage.md` will have a URL of `https://octopus.com/docs/myfolder/mypage`.

### Index Pages

One exception to the URL rule is when a page is named `index.md`. In this case the `index.md` is omitted in the URL and only the directory structure is used.
So a file existing at `docs/myfolder/index.md` will have a URL of `https://octopus.com/docs/myfolder`.

### Linking

Links to other documentation pages should be relative and contain the `.md` extension.
The `.md` allows links to work inside the GitHub web UI. The `.md` will be trimmed when they are finally rendered.


## Markdown

The site is rendered using [markdig](https://github.com/lunet-io/markdig), Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

### Snippets are highlighted using highlightjs

 * [Documentation](https://highlightjs.readthedocs.io/)
 * [Language List](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases)

| language     | key            |
|--------------|----------------|
| c#           | `cs`           |
| xml          | `xml`          |
| no format    | `no-highlight` |
| command line | `bash`         |
| powershell   | `ps`           |
| json         | `json`         |
| sql          | `sql`          |
| f#           | `f#`           |

**Always use fenced code blocks with a language.** If no language is defined then highlightjs will guess the language and it regularly gets it wrong.

### Alerts

Sometimes it is necessary to draw attention to items you want to call out in a document.
This is achieved through bootstrap alerts https://getbootstrap.com/components/#alerts
There are several keys each of which map to a different colored alert

| Key              | Color  |
|------------------|--------|
| `success`        | green  |
| `hint`           | blue   |
| `warning`        | yellow |
| `problem`        | red    |

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

## Headings

The first (and all top level) headers in a `.md` page should be a `h2` (i.e. `##`) with sub-headings under it being `h3`, `h4`, etc.
DO NOT skip headers, eg. h1 > h2 > h4, not valid!

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

