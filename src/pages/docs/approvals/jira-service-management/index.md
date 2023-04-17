---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Jira Service Management Integration
description: Octopus Deploy can integrate with your Jira Service Management instance for deployment control using Change Requests/Issues
navOrder: 10
---

:::hint
The Jira Service Management (JSM) Integration Early-Access Program (EAP)  is available in Octopus 
**2022.3.12101** or later. [Contact us](https://octopus.com/company/contact) to request access to this feature. 
:::

## Overview

The Octopus Deploy/JSM integration allows users to block the execution of 
specifically configured deployments unless they have a corresponding approved JSM **Change 
Request** (aka issue).

To enable this behavior, both the Octopus Project and Environment you are deploying to must be 
configured and the JSM configuration is set up before deployments can be managed.

| Project | Environment | Outcome |
|--|--|--|
| Change controlled| Change controlled| Approval required for deployment |
| **_Not_** Change controlled| Change controlled| No approval required |
| Change controlled| **_Not_** Change controlled| No approval required |

## Getting started

The JSM integration requires Octopus **2022.3.12101** or later and an Octopus license with the
JSM Integration feature enabled.

Before you can use the Octopus Deploy/JSM integration, you'll need to:

1. Create a service account in JSM for use by Octopus
1. Request and install a new Octopus license required to enable the JSM feature.
1. Configure a connection from Octopus to JSM.
1. Configure which deployments require an approved CR.

### Configuring Jira Service Management

:::hint
The instructions in this section will require a JSM Administrator.
:::

The Octopus Deploy/JSM integration requires security configuration in your target JSM instance.

The integration will require a user account in JSM. The recommendation is to create a 
service account specifically for Octopus.

Take note of the password assigned or generated for this user.

### Licensing

For the JSM approval checks to be performed as part of the deployment process, an appropriate Octopus license must be configured in your Octopus instance.

A JSM enabled Octopus license must be requested from Octopus directly, and cannot be managed 
through the self-service process. To request a license register for the [JSM Early Access Program](https://octopusdeploy.typeform.com/jsm-eap)

Once you have received your feature-enabled license, you can install it by navigating to **{{Configuration, License}}**.

An enabled license will include a block similar to below:

```xml
<Features>
  <JiraServiceManagement>
    <ValidTo>...</ValidTo>
  </JiraServiceManagement>
</Features>
```

### Configuring JSM connections

:::hint
The instructions in this section will require an Octopus Deploy Manager or Administrator
:::

To connect your Octopus Deploy instance to JSM, navigate to **Configuration ➜ Settings ➜ 
Jira Service Management Integration**.

Check the **Enabled** option
![JSM Integration Settings page](/docs/approvals/jira-service-management/images/jsm-connections-1.png "width=500")

Click on **ADD CONNECTION** and fill out the details.
The JSM Base Url should be the root URL and include the protocol e.g. `https://`

![JSM Integration Add Connection](/docs/approvals/jira-service-management/images/jsm-connections-2.png "width=500")

Press **TEST** to ensure that the connection details are working.

Multiple JSM connections are supported, however, each project can only use one JSM 
connection.

### Configuring Issue Comments

:::hint
The instructions in this section will require an Octopus Deploy Manager or Administrator
:::

If enabled, this feature will result in a linked change request having one or more Comments added 
during the deployment lifecycle which record details about the deployment and its execution status.

To enable this feature navigate to **Configuration ➜ Settings ➜ Jira Service Management 
Integration**, click the **Customer Comments Enabled** checkbox show below then click **Save**.

![JSM Integration Enable Work Notes](/docs/approvals/jira-service-management/images/jsm-customer-comments-settings.png "width=500")

## Configuring deployments

To enforce a deployment to require an approved CR, the **Change Controlled** setting needs to be enabled in **both** the project and the environment it is being deployed to.

### Setting up projects for CR approval

To enable a project to enforce a requirement for an approved CR:

1. Navigate to the project and then **{{Settings,General}}**.
2. Check the **Jira Service Management Integration ➜ Change Controlled** setting.
3. Select your JSM connection in the **Jira Service Management Connection** setting and click 
   **SAVE**.

![JSM Integration Project settings](/docs/approvals/jira-service-management/images/jsm-project-settings.png "width=500")

### Default Behavior

Deployments resulting in a CR creation will produce an issue with a Request Type of **Request a 
change**

### Supplying the CR number to a deployment

If you add a variable to your project named `Octopus.JiraServiceManagement.ChangeRequest.Number`,
then an Issue will not be created, and instead, the supplied number will be used during the 
approval check. This variable can also be [scoped](/docs/projects/variables/#scoping-variables) or configured as a [Prompted variable](/docs/projects/variables/prompted-variables).

### Setting up environments for CR approval

To enable an environment to enforce a requirement for an approved CR, navigate to **{
{Infrastructure,Environments}}**, edit the environment via the overflow menu and check the 
**Jira Service Management Integration ➜ Change Controlled** setting, and then press **SAVE**.

![JSM Integration Environment settings](/docs/approvals/jira-service-management/images/jsm-environment-settings.png "width=500")

## How it works

Deployments where both the project and environment have **Change Controlled** enabled, will 
query JSM for an approved Issue before execution can begin.

When a **Change Controlled** deployment is evaluated for approval, the following checks are performed:

- If a specific CR number is available, via a variable named `Octopus.JiraServiceManagement.ChangeRequest.Number`, then only this CR will be checked.
- If there is an existing CR with the specifically formatted **Short Description** available. See [Title text matching](#title-text-matching) for more information, then this CR will be evaluated.
- Create a new CR.
  - This will be a `Request a change" type Issue
  - An Issue created by Octopus will have a **Short Description** in the format outlined in [Title 
    text matching](#title-text-matching).

When re-deploying a previous deployment, the same Issue will be used if it is still open. If it is 
closed the above process will be followed again.

Once an Issue has been found, the deployment will only proceed if the **State** of the CR is 
`Implementing`. If the **State** is either `Preview`, `Planning`, `Authorize`, or `Awaiting 
Implementation` the 
deployment will wait. Any other **State** will cause the deployment task to fail.

:::info
The only supported states are those defined in the default Issue lifecycle
:::

The number of the Issue created or found will appear in the Task Summary tab of the executing 
Octopus deployment task. Clicking on the CR number in the message will navigate you to the CR in 
JSM.

![Deployment Task Summary awaiting JSM approval](/docs/approvals/jira-service-management/images/jsm-pending-issue-task-message.png 
"width=500")

### Title text matching

Octopus supports matching a CR by setting the **Summary** of the CR to a well-known format:

`Octopus: Deploy "{project name}" version {release version number} to "{environment name}"`

e.g `Octopus: Deploy "Web Site" version 1.0.1-hotfix-001 to "Dev"`

:::hint
The title must match the format **exactly**, including the double-quotes.
:::

### Respecting Change Windows

In addition to a change request being approved, a change must also be in its schedule change 
window in order for the deployment to execute.  The change window is controlled by the `Planned 
star` and `Planned end` on the linked Issue.

::: info
The following list assumes the linked change is in an **approved** state.
:::

- If no `Planned start` and `Planned end` are specified there is no change window and the deployment will execute.
- If only a `Planned start` is set the deployment will execute on or after the defined date.
- If only a `Planned end` is set the deployment will execute on or before the defined date.
- If `Planned start` and `Planned end` are specified the deployment will execute on or between the defined dates.

**If at any time a `Planned end` is exceeded and the linked change request is not approved, the deployment will be terminated.**

## Known Issues and limitations

- Once an Issue is deemed to be related to a deployment, then only this Issue will be evaluated for 
  the deployment to proceed. If the Issue is incorrect, you will need to cancel the deployment, 
  close the CR and try the deployment again.
- Each project only supports a single JSM connection.
