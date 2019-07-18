---
title: Deployment Notes
description: Summarize the changes in a deployment
position: 6
---

When a release is deployed to an environment, it can be thought of as deploying all changes contained in all releases since the previous deployment to the environment.

Deployment notes summarize these changes by rolling up the [release notes](release-notes.md) from all releases since the previous deployment of the project to the environment.  

![Deployment notes](images/deployment-notes.png)

## Deployment Change Variables

It can be useful to access the changes associated with an deployment in the deployment process.
[Deployment change variables](/docs/deployment-process/variables/system-variables.md#deployment-notes) are available during a deployment.

A common example of this is for use in the [Email step](/docs/deployment-process/steps/email-notifications.md).  

![Deployment notes variables in email step](images/deployment-notes-email-step.png)

In scenarios where you want to use Release Notes Templates and Emails steps together there can be some complications depending on the layout of the email content you need. The easiest option is to use the release notes directly from the releases.

```
Deployment contained releases:<br/>
#{each change in Octopus.Deployment.Changes}
<h2>#{change.Version}</h2>
<p>#{change.ReleaseNotes | MarkdownToHtml}</p>
#{/each}

```

This outputs the details per release, with the work items appearing per release. If you wanted a single set of release notes, with a list of work items below it, you'd have to omit the work item details from the release notes templates itself and use an email body like follows.

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
