---
title: Release notes templates
description: How to take advantage of the package metadata during release creation.
---

## Release Notes Templates {#Release-Notes-Templates}

To help take advantage of all of this metadata knowledge in the packages, Octopus supports using release notes with variables substitution. A release notes template can also be specified in the project settings, to make consistency across releases easy.

During release creation the template will be evaluated and you will see the resulting markdown displayed in the portal. The template has access to all un-scoped project variables and the variables relating to the release. The package metadata is made available via variables that are based on the following structures:

```csharp
public class Packages
{
  public string PackageId { get; set; }
  public string Version { get; set; }
  public WorkItemLink[] WorkItems { get; set; }
  public Commit[] Commits { get; set; }
}

public class WorkItemLink
{
    public string Id { get; set; }
    public string LinkUrl { get; set; }
    public string Description { get; set; }
}

public class Commit
{
    public string CommitId { get; set; }
    public string LinkUrl { get; set; }
    public string Comment { get; set; }
}
```

The variables are setup so you can iterate over the list or you can directly index via the PackageID. E.g.

```
#{each package in Octopus.Release.Package}
## #{package.PackageId} #{package.Version}
#{/each}
```

or

```
#{Octopus.Release.Package[MyAwesomePackageId].Version}
```

Similarly, the commits can be iterated over or can be accessed by Id. E.g.

```
#{each commit in package.Commits}
    - [#{commit.CommitId}](#{commit.LinkUrl}) - #{commit.Comment}
#{/each}
```

or

```
package.Commits[someSHAValue].Comment
```

You also have access to a distinct list of work items across all packages, so you can provide the distinct list as follows

```#{each package in Octopus.Release.Package}
#{each workItem in Octopus.Release.WorkItems}
- [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
```

If you don't include the work item details yourself, Octopus will automatically add them as a simple list of external links in the UI for the release, deployment preview, and deployment task. Providing them, like in this example, gives you exact control over the rendering in the portal and in the email step, as you'll see in the next section.

## Deployment Variables and the Email Step {#Deployment-Variables}

During a deployment there are variables available for both the release notes values and the work items.

The release changes variable is `Octopus.Deployment.Changes` and contains the release notes and work items in JSON format. The structure is a JSON array of `ReleaseChange` objects matching the following C# class:

```csharp
public class ReleaseChanges
{
  public string Version { get; set; }
  public string ReleaseNotes { get; set; }
  public WorkItemLink[] WorkItems { get; set; }
}

public class WorkItemLink
{
    public string Id { get; set; }
    public string LinkUrl { get; set; }
    public string Description { get; set; }
}
```

There is an entry per release and it includes the release notes (**in markdown format**) and the metadata for each of the packages in that release.

The following example uses these variables to generate the HTML body for the Octopus email step:

```html
<p>Here are the notes customized for email</p>
#{each change in Octopus.Deployment.Changes}
<strong><a href="(#{Octopus.Web.ServerUri}#{Octopus.Web.ReleaseLink}">#{change.Version}</a></strong></br>
#{change.ReleaseNotes | MarkdownToHtml}</br>
#{/each}
```

Also note, in this example we are providing a link back to the release in Octopus as part of the email.

## Some example use cases and templates

### All packages, with work items per package

The following example illustrates some sample text followed by the packages, with the packages rendered as a bullet point list.

```Here are the notes for the packages
Here are the notes for the packages
#{each package in Octopus.Release.Package}
- #{package.PackageId} #{package.Version}
#{each workItem in package.WorkItems}
    - [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
#{/each}
```

### All packages, with a distinct list of work items

Sometimes you might have different packages contributing to an application, e.g. app server and database might be separate packages. In these cases both packages might contain fixes for the same work item, which would look confusing in the release notes. To support this case there is a distinct list of work items, across all packages, included at the top level of the data. An example of using it is as follows.

```
#{each workItem in Octopus.Release.WorkItems}
- [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
```

## Combining release notes templates and email steps

In scenarios where you want to use Release Notes Templates and Emails steps together there can be some complications depending on the layout of the email content you need. The easiest option is to use the release notes directly from the releases.

```
Deployment contained releases:<br/>
#{each change in Octopus.Deployment.Changes}
<h2>#{change.Version}</h2>
<p>#{change.ReleaseNotes | MarkdownToHtml}</p>
#{/each}

```

This outputs the details per release though, with the work items appearing per release. If you wanted a single set of release notes though, with a list of work items below it, you'd have to omit the work item details from the release notes templates itself and use an email body like follows.

```
Deployment contained releases:<br/>
#{each change in Octopus.Deployment.Changes}
<h2>#{change.Version}</h2>
<p>#{change.ReleaseNotes | MarkdownToHtml}</p>
#{/each}
Which addressed the following issues:</br>
#{each workItem in Octopus.Deployment.WorkItems}
  #{if workItem.LinkUrl}
      [<a href="#{workItem.LinkUrl}">#{workItem.Id}</a>] #{workItem.Description}</br>
  #{/if}
  #{unless workItem.LinkUrl}
      #{workItem.Description}</br>
  #{/unless}
#{/each} 
```

Note that when you do this, Octopus will still display the work items in the UI for each release. The UI will automatically show the work items list if there are any and it doesn't see you referencing any of them in the release notes text.

### No work items, use the commit messages as release notes

For some use cases there are actually no work items, the nature of the changes is such that the commit messages themselves should form the release notes. The raw commit data is available per package for the release notes templates.

```
Here are the notes for the packages
#{each package in Octopus.Release.Package}
- #{package.PackageId} #{package.Version}
#{each commit in package.Commits}
    - [#{commit.CommitId}](#{commit.LinkUrl}) - #{commit.Comment}
#{/each}
#{/each}
```



