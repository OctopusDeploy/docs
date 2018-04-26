This repository contains the documentation for [Octopus Deploy](https:/octopus.com/docs).

To contribute to documentation, read the following guide.

# Conventions
## Lowercase  and `-` Delimited

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
Required. Used for the web page title tag `<head><title>`, displayed in the page content. Please use Title Case for titles. If you're not sure what makes title case, there are a few converters online, for instance: http://titlecaseconverter.com/

### Description
Required. Used for the meta description tag (`<meta name="description" />`).
Keep the description under 160 characters.
Read [how to write a good description](https://moz.com/learn/seo/meta-description).

### Position
Optional. Used for the position in the menu.

## Menu

The menu is auto generated based on the git repo folder structure and title and position metadata.

## URLs

The directory structure where a `.md` exists is used to derive the URL for that document.
So a file that is located at `/docs/myfolder/mypage.md` will have a URL of `https://octopus.com/docs/myfolder/mypage`.

### Index Pages

One exception to the URL rule is when a page is named `index.md`. In this case the `index.md` is omitted in the URL and only the directory structure is used.
So a file existing at `/docs/myfolder/index.md` will have a URL of `https://octopus.com/docs/myfolder`.

### Linking

Links to other documentation pages should be relative and contain the `.md` extension.
The `.md` allows links to work inside the GitHub web UI. The `.md` will be trimmed when they are finally rendered.

## "In This Section" Area {#in-this-section}

Index pages (`index.md`) automatically have a "In this section" section added to them (bottom of the content), which lists all child pages in the folder.
If the page does not need this section, you can opt out by adding the following metadata to the yaml:
```yaml
hideInThisSection: true
```

The rendering of "In This Section" section [contains a header](_shared/in-this-section.md), if you need to omit this header (but still want it to contain the list of child pages):
```yaml
hideInThisSectionHeader: true
```

## Markdown

The site is rendered using [markdig](https://github.com/lunet-io/markdig), Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax.

### Lists
Lists can be created using a few different styles, please be aware that `Roman` and `Letters` won't render properly in GitHub (this is a markdig extension).

To ensure the list items are correctly formatted it is recommended not to number the items, instead let the markdown renderer do that job automatically, so for a numeric list use one `1`s for a letter list use one `a.`s and for a roman list use only `i`s.

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

If your example uses multiple languages or files, you can combine them together and add tab headings - they will be rendered as tabs:

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

## Application Paths
In order to be consistent when referencing certain areas of the application we have created a markdown extension to render application paths.
To render an application path use the following syntax:
```md
{{my,application,path}} or {{my>application>path}}
```
The `,` or `>` are the separator characters.

Example:
```md
To enable Docker in your Octopus Server instance, toggle the feature on via {{Configuration,Features,Docker}}.
```

## Table of Contents
Table of contents can be added to any page anywhere by adding `!toc` to the markdown. The table of contents lists all headers (H1, H2 etc) in the current document (see [In This Section](#in-this-section) for child page links on index pages).

## Headings

The first (and all top level) headers in a `.md` page should be a `h2` (i.e., `##`) with sub-headings under it being `h3`, `h4`, etc.
DO NOT skip headers, eg. h1 > h2 > h4, not valid!

You must also separate the '##' and the heading with a space.  If you don't the heading will render correctly in the Preview in GitHub, and in many other tools, but will not render correctly on the docs site.

## Includes
Sometimes you need to duplicate content in multiple pages, this is where includes are handy.
Markdown includes are pulled into the document prior to passing the content through the markdown conversion.

### Defining and Using Includes

Add a file anywhere in the docs repository that is suffixed with `.include.md`. For example, the file might be named `theKey.include.md`. To include the content in `theKey.include.md` in another file, add the following to the markdown: `!include <key>`.

## Partials
Partials are version specific files that contain markdown.
Markdown partials are pulled into the document prior to includes, so this means you can add includes to partials.
They are only rendered in the target page when the version filter matches the convention for a give file.

Partial Convention: filePrefix_key_version.partial.md

### Defining and Using Partial

Add a file in the same folder as the page where you will use the partial to the docs repository that is named `fileName_key_version.partial.md`. For example, the file might be named `getting-started_theKey_2.0.partial.md`.

To include the content in the partial, add the following to the markdown: `!partial <key>` (including the `<>`s)

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

If you create anchors in the markdown, do not use special characters in the anchor text as they will cause the link to be truncated.

## Images

Images can be incredibly helpful for your audience, but the downside of images is how quickly they can become inaccurate.

Before adding a screenshot of the Octopus UI or another UI that users will interact with, consider the following:

1. How likely is it the UI will change and the old screenshot will confuse readers?
1. Have you provided text that describes the steps users need to take (for accessibility reasons you shouldn't rely on screenshots to relay information), is the text clear enough that the screenshot isn't necessary?

Put images in the same folder as the markdown file that references it.

If you're including images from the internet, reference using the `https://` scheme.

Images can be added using the following markdown syntax:

    ![Alt text](img.jpg "Optional title width=500")

With the minimal syntax being;

    ![Alt text](img.jpg)

**All** images should have [alt text](https://en.wikipedia.org/wiki/Alt_attribute).

Keep reading for a detailed explanation of the options available when working with images.

### Image Sizing

Image size can be controlled by adding the text `width=x` to the end of the title.

For example:

    ![Alt text](img.jpg "Optional-title width=x")

With the minimal syntax being:

    ![](img.jpg "width=x")

This will result in the image being re-sized with the following parameters:

    width="x" height="auto"

It will also wrap the image in a clickable lightbox so the full image can be accessed.

## Redirects
When a file is deleted or renamed you need to consider adding a redirect for that file.
Redirects are added to [redirects.txt](redirects.txt).
This file looks something like:
```
from-file-path -> to-file-path                 #DO NOT DELETE THIS LINE
docs/page1.md -> docs/page2.md
```
In the above example, `/docs/page1` is redirected to `/docs/page2`.

Once a redirect is added, the source file needs to be deleted from the repo.

The destination is validated and must exist.

If a file is deleted, a redirect must be added for it, otherwise publishing fails.

## Version Dropdown

The version dropdown menu let's user choose between [legacy versions](https://legacydocs.octopus.com) of the documentation, the latest (default) version, and pre-release versions.

### Include Pre-release Documentation

The list of versions displayed on the dropdown are loaded from [versions.json](versions.json).

Support to publish pre-release versions of documentation.
This is useful when we are planning a new release or we are releasing betas or RCs.

To use this functionality all you need to do is add the pre-release version to the versions.json file versions array, and leave the default the same version, the example above adds 2018.4 pre-release:
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

The version selector on the website displays the latest version by default, but the new pre-release is now listed above:

![](/docs/images/version-selector.png)

And when selected, a banner tells the user that they are seeing a "preview" of the documentation:

![](/docs/images/preview.png)


## Useful Characters

Just go to http://htmlarrows.com/symbols/

## More Information

* [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
