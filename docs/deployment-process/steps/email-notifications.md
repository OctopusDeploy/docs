---
title: Email Notification Step
description: Email notification steps allow you to notify team members and stakeholders of deployment activities.
position: 15
---

Deployments can have a strong impact on the people whose work depends on the system being deployed. Great communication is an important part of a great deployment strategy, and email steps are a key way that Octopus can help you keep everyone in the loop. You may want to:

- Notify stakeholders when a new version of an app has been deployed to production.
- Let testers know when a new version is available in UAT.
- Use email in conjunction with [manual interventions approvals](/docs/deployment-process/steps/manual-intervention-and-approvals.md) to make sure everyone is ready for a new deployment.

Before you can add email steps to your deployment processes, you need to add your SMTP  configuration.

## SMTP Configuration

To add you SMTP configuration navigate to **{{Configuration,SMTP}}** and enter your server's details.

## Add an Email Step

Email steps are added to deployment processes in the same way as other steps.

1. Navigate to your [project's](/docs/deployment-process/projects/index.md) overview page by selecting **Projects** and clicking on the project you are working with.
2. Click **PROCESS** and **ADD STEP** to add a step to an existing process. Alternatively, if this is a new deployment process, click the **DEFINE YOUR DEPLOYMENT PROCESS** button, and click **ADD STEP**.
3. Find the **Send Email** step, hover over the step, and click **ADD**.
4. Give the step a short memorable name.
5. The step will run on the Octopus Server.
6. Choose the recipients of the email. You have several options:

  - Enter a comma-separated list of email addresses.
  - Bind to a [variable](/docs/deployment-process/variables/index.md) which defines a list of email addresses (this is really useful for tailoring your recipient list per-environment).
  - Choose one or more teams to include members of those teams in the recipient list.
  - Use a combination of all of these options.

Octopus will build the resulting recipient list during the deployment, remove duplicate emails addresses, and send the email to each recipient.
docs

7. Provide a subject line for the emails. The subject can contain Octopus [basic variable syntax](/docs/deployment-process/variables/variable-substitutions.md#basic-syntax-variablesubstitutionsyntax-basicsyntax).
8. Add the body of the email. The email can be sent in plain text or HTML, and you can use Octopus [extended variable syntax](/docs/deployment-process/variables/variable-substitutions.md#extended-syntax-variablesubstitutionsyntax-extendedsyntax) to include information about the deployment in the email. See the [Email Template Examples](#email-template-examples) below.
9. You can set conditions to determine when the step should run. For instance:

  - Send the email only for successful deployments to certain environments.
  - Send a specific email for failed deployments.
  - Send an email based on the value of a variable expression which works really well with [output variables](/docs/deployment-process/variables/output-variables.md).

10. Save the step.

## Email Template Examples

You can set the email subject and author the email body as plain text or HTML content. You can even use the Octopus [variable syntax](/docs/deployment-process/variables/variable-substitutions.md) to include information about the deployment in the email.

### Deployment Summary Template

This template collects basic information about the deployment, including the package versions included in each step.

```xml
<h1>Deployment of #{Octopus.Project.Name} #{Octopus.Release.Number} to #{Octopus.Environment.Name}</h1>
<p>
  <em>Initiated by
    #{unless Octopus.Deployment.CreatedBy.DisplayName}#{Octopus.Deployment.CreatedBy.Username}#{/unless}
    #{if Octopus.Deployment.CreatedBy.DisplayName}#{Octopus.Deployment.CreatedBy.DisplayName}#{/if}
    #{if Octopus.Deployment.CreatedBy.EmailAddress} (<a href="mailto: #{Octopus.Deployment.CreatedBy.EmailAddress}">#{Octopus.Deployment.CreatedBy.EmailAddress}</a>)#{/if}
    at #{Octopus.Deployment.Created}</em>
</p>
#{if Octopus.Release.Notes}
<h2>Release notes</h2>
<p>#{Octopus.Release.Notes}</p>
#{/if}
<h2>Deployment process</h2>
<p>The deployment included the following actions:</p>
<ul>
  #{each action in Octopus.Action}
    <li><strong>#{action.Name}</strong> #{if action.Package.NuGetPackageId}&mdash; <a href="http://nuget.org/packages/#{action.Package.NuGetPackageId}">#{action.Package.NuGetPackageId}</a> <em>version #{action.Package.NuGetPackageVersion}#{/if}</em></li>
  #{/each}
</ul>
<p>View the <a href="http://my-octopus#{Octopus.Web.DeploymentLink}">detailed deployment log</a>.</p>
```

:::hint
To use the template in your projects, replace `nuget.org` with the DNS name of your NuGet server, and `my-octopus` with the DNS name of your Octopus Server. Make sure you select *Body is HTML* on the email step configuration page.
:::

The output of the template will be an HTML email like:

![](email-output.png)

### Including Step Status

The outcome of each step can be included using a template like the one below:

**Step status summary template**

```xml
<h3>Task summary</h3>
<ol>
#{each step in Octopus.Step}
  #{if step.Status.Code}
    <li>#{step | HtmlEscape} &mdash; <strong>#{step.Status.Code}</strong>
    #{if step.Status.Error}
      <pre>#{step.Status.Error | HtmlEscape}</pre>
      <pre>#{step.Status.ErrorDetail | HtmlEscape}</pre>
    #{/if}  
    </li>
  #{/if}
#{/each}
</ol>
```

:::hint
**Step error detail**
`step.Status.Error` and `step.Status.ErrorDetail` will only display the exit code and Octopus stack trace for the error. As we cannot parse the deployment log, we can only extract the exit/error codes. It cannot show detailed information on what caused the error. For full information on what happened when the deployment fails, you will need to reference the logs.

See [System variables](/docs/deployment-process/variables/system-variables.md)
:::
