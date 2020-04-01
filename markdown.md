# Markdown quick reference

Both the [Octopus blog](https://github.com/OctopusDeploy/blog) and the [Octopus documentation](https://github.com/OctopusDeploy/docs) are written in Markdown and rendered using [markdig](https://github.com/lunet-io/markdig). Markdig supports [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) as well as some extra syntax. 

## Filenames

Markdown filenames are lowercase and end with `.md`. Use hyphens to separate words.

- `installation.md`
- `backup-and-restore.md`

## Files and directories

Directories must have an index file: `index.md`.

directory/index.md
directory/another-file.md

## YAML headers

The Markdown files have a YAML header:

### YAML header (blog)

```md
---
title: Runbooks best practices <!-- post title -->
description: This post provides a step by step template you can use to generate high quality runbooks in Octopus
author: email@octopus.com <!-- use your email address -->
visibility: public <!-- options are public or private -->
published: 2020-03-09 <!-- The date the post will be published  -->
metaImage: runbooks-best-practices.png
bannerImage: runbooks-best-practices.png
tags: <!-- see blog/tags.txt for a comprehensive list of tags -->
 - Product
 - Runbooks
---
```

### YAML header (docs)

```md
---
title: Installation <!-- page title -->
description: How to install the Octopus Server.
position: 20 <!-- position of the document relative to the other documents in the same section -->
hideInThisSection: true  <!-- Optional. Hides the automatic "In this section" section that lists child documents in the same section. Leave out if not needed. -->
hideInThisSectionHeader: true <!-- Optional. Only hides the header for the "In this section" section -->
---
```

## Table of contents

Use `!toc` within the body of a page to include a table of contents that lists the sections on the current page.

## Headings

Use `##` to create h2 headers and `###` to create h3 headers.

The first header you include on a page must be a h2 header. The title of the page comes from the title in the YAML block.

## Formating text

Bold text with `**` on both sides of text to create `**bold text**`: **bold text**.

Italicize text with `*` on both sides of text to create `*emphasized text*`: *emphasized text*.

## Images

Add images to an `images/` directory in the same directory as the file that references the image. Image filenames must be all lowercase. 

Images are added to documents with the following syntax:

	![](images/image-name.png)

Images should include alt text for accessibility:

	![A brief description of the image](images/image-name.png)

Control the size of the image in pixels with the text `width=500`:

	![A brief description of the image](images/image-name.png "width=500")

## Lists

Bullet lists are written with a hyphen at the beginning of the line:

```md
- Item 1
- Item 2
```

Which is rendered as:

- Item 1
- Item 2

Numbered lists are written with a number at the beginning of the line:

```md
1. Item 1
1. Item 2
```

Which is rendered as:

1. Item 1
2. Item 2

You can nest lists, by adding three spaces before the nested list items.

```md
1. Item 1
   1. Item 1.1
   1. Item 1.2
1. Item 2
```

Which is rendered as:

1. Item 1
   1. Item 1.1
   1. Item 1.2
1. Item 2

If you include a break between the list, resume the list with the number the list should restart with:

```md
1. Item 1
1. Item 2

A break in the list.

3. Item 3
3. Item 4

```

Which is rendered as:

1. Item 1
2. Item 2

A break in the list.

3. Item 3
4. Item 4

## Links

Use the following syntax to link to other documents within the blog repo, (include the full filename and extension:

For more information, see the `[installation page](/docs/installation/index.md)` and review the `[installation requirements](/docs/installation/requirements.md)`.

This will link to https://www.octopus.com/docs/installation and https://www.octopus.com/docs/installation/requirements.

To link to a specific section within a document, add the section heading as an anchor and replace the spaces with a hyphen:

Octopus can be installed on these versions of `[Windows Server](docs/installation/requirements.md#windows-server)`.

This will link to https://octopus.com/docs/installation/requirements#windows-server

If you'd like to control the anchor text (Perhaps to ensure it doesn't change even if the title does), use the following syntax:

  `## Windows Server {#windows-server}`

## Navigation paths

When instructing users to navigate through multiple options in the UI, use the following syntax:

`{{ infrastructure,Deployment Targets}}`

Which will be rendered:

**Infrastructure ➜ Deployment Targets**

## Code samples

Use GitHub-style fenced code blocks. For example:

    ​```ps
    Write-Host "Hello"
    ​```

If your example uses multiple languages or files, you can combine them together to add tab headings:

    ​```ps PowerShell
    Write-Host "Hello"
    ​```
    ​```cs C#
    Console.WriteLine("Hello");
    ​```

Snippets are highlighted by Highlight.js

* [Documentation](https://highlightjs.readthedocs.io/)
* [Language List](https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md)

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
| python       | `python`       |
| text         | text           |

If no language is defined, highlightjs will guess the language and it regularly gets it wrong.

## Call-outs

To create a call-out that draws the readers attention, use the following syntax:

```md
:::warning
This release includes the following breaking changes...
:::
```

This will be rendered as:

```html
<div class="alert alert-warning">
<p><strong>This release includes the following breaking changes...</strong></p>
</div>
```

There are several keys, each of which map to a different colored alert:

| Key       | Color  |
| --------- | ------ |
| `success` | green  |
| `hint`    | blue   |
| `warning` | yellow |
| `problem` | red    |

Call-outs are added through bootstrap alerts https://getbootstrap.com/components/#alerts.

## Reuse text in multiple locations

To create reusable text that is automatically added to any document that references it, add the text to a new file and save the file with a key followed by `.include.md`. For instance, `latest-version.include.md`:

```md
The latest version of Octopus Deploy is version 2020.1
```

To include the text in other documents use the following syntax everywhere you want it to be included:

`!include <latest-version>`

When you use an include file in this way, you only need to update the text in one file and the updated text will be included anywhere it is referenced.

### Docker images

When referencing docker images, use the syntax:

`!docker-image <org/image:tag>`

This will be replaced with the most recently published version of the image.

#### Example 1 - with tags

`!docker-image <octopusdeploy/octo:alpine>`

Will be replaced with:

`octopusdeploy/octo:6.17.3-alpine`

#### Example 2 - without tags

`!docker-image <octopusdeploy/octo>`

Will be replaced with:

`octopusdeploy/octo:6.17.3`

## Link to the Octopus Guides

The Octopus Guides combine content to allow users to specify their entire CI/CD pipeline. It is sometimes helpful to link to the guides, with specific options predefined, rather than the default options.

You can create the links to use by adding query parameters to the URL for the guides:

- Application: add `?application=PHP`:
    https://www.octopus.com/docs/guides?application=PHP
- Build server: add `?build-server=jenkins`:
    https://www.octopus.com/docs/guides?buildServer=Jenkins
- Source control: `sourceControl=TFVC`:
    https://octopus.com/docs/guides?sourceControl=TFVC
- Package repository: `?packageRepository=Artifactory`:
    https://octopus.com/docs/guides?packageRepository=Artifactory
- Destination: `?destination=NGINX`
    https://octopus.com/docs/guides?destination=NGINX

If you'd like to pre-fill more than one option, add multiple queries parameters to the URL:

https://octopus.com/docs/guides?application=PHP&buildServer=TeamCity&destination=NGINX

## Redirects

If you delete or rename a file in either the docs or blog repos, you need to add a redirect for that file otherwise publishing will fail.

Redirects are added to [redirects.txt](docs/redirects.txt) and [redirects.txt](blog/redirects.txt) respectively.

The redirects.txt file looks like this:
```
from-file-path -> to-file-path                 #DO NOT DELETE THIS LINE
docs/page1.md -> docs/page2.md
```
In the above example, `/docs/page1` is redirected to `/docs/page2`.

Add your redirect to the end of the file, after the redirect is added, the original file (`page1`) needs to be deleted from the repo.


