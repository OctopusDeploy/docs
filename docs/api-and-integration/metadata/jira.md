---
title: Jira Issue Tracking Integration
description: Configure Jira Software issue tracking with Octopus.
---

**Octopus 2019.4** introduced support to integrate Octopus with Jira Cloud and Jira Server. The integration adds work items links, commit links, and release notes to Octopus from Jira, and if you're using Jira Cloud, you can view release and deployment details from Octopus directly in Jira issues, making it possible to see if the issue has been associated with any deployments. This builds upon the functionality to [track metadata and work item](/docs/api-and-integration/metadata/index.md) information through your CI/CD pipeline.

## Connecting Jira Server and Octopus Deploy

This section describes how to connect and configure Octopus Deploy and Jira Server. If you are using Jira Cloud, see [Connecting Jira Cloud and Octopus Deploy](#jira-cloud).

<!-- steps go here -->



## Connecting Jira Cloud and Octopus Deploy

This integration uses the [Octopus Deploy plugin for Jira](https://marketplace.atlassian.com/apps/1220376/octopus-deploy-for-jira) and the following section describes how to connect and configure Octopus Deploy and Jira Cloud. If you are using Jira Server, see [Connecting Jira Server and Octopus Deploy](#jira-server).

![Jira Deployments](jira-deployment.png "width=500")

:::hint
The Octopus Deploy plugin for Jira is only compatible with Jira Software Cloud as Jira Server (on-premises) does not support the APIs required to enable this functionality. There is limited support available as noted in our [Jira Server section](#jira-server-on-prem-support).
:::

1. Install the Octopus Deploy plugin in Jira.

    Add the `Octopus Deploy for Jira` app from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1220376/octopus-deploy-for-jira) and then click the 'Get Started' button to configure it.

    Note: Keep this configuration page open while you navigate to Octopus in the next step as you need to copy values from one page to the other.

1. Configure the Jira extension in Octopus Deploy.

    Navigate to the **{{Configuration,Settings,Jira Issue Tracker}}** page in Octopus and copy the following values from the Jira App configuration page:

    - Jira Base URL, i.e., https://your-jira-instance.atlassian.net.
    - Jira Connect App Password.

    Set the **Is Enabled** property as well.

1. Configure the Release Note Options in Octopus Deploy (optional).

    - Jira username/password: Octopus can retrieve Jira Issue descriptions if you specify your Atlassian Cloud username and an API token. You can create an API token from an Atlassian account in the 'Security' area.
    - Release Note Prefix: Specifying a 'release note prefix' tells Octopus to search through your Jira issue description for that value. If it finds a match, then it will use the issue description as the release note; otherwise, it will use the issue title. See [Release Notes](/docs/api-and-integration/metadata/release-notes-templates.md) for more information.

1. Set the Octopus Server URL in Octopus Deploy.

    Navigate to the **{{Configuration,Nodes}}** page and ensure you have set the Server URI field to your Octopus Server's base URL. i.e., https://my-company.octopus.app/ or https://my-company-internal-name/

1. Configure the Octopus Deploy plugin for Jira.

    Navigate to the **{{Configuration,Settings,Jira Issue Tracker}}** page in Octopus, copy the **Octopus InstallationID**, and add it to Jira App configuration.

1. Update your Octopus environment settings.

    Navigate to **{{Infrastructure,Environments}}** to map your Octopus environments to Jira environment types. This is required so Jira can understand Octopus environments and track issue progress.

    Note: Jira environment types are a fixed list that cannot be edited.

When configured this integration will provide Jira with updates about the progress of Jira issues (work items) through the pipeline.

## Octopus Deployment Task Log

When the Jira issue tracker is enabled and configured, you will see blocks similar to the following appear in the log during your deployments. These show the state updates Octopus is sending through to Jira, and if you expand them the details include information about the Jira issues for traceability.

The following illustrates where Octopus tried to send an _in_progress_, and then a _successful_, state change to Jira but was unable to.

Note: **This does not impact the Octopus deployment itself, it will still be considered a successful deployment.**

![Deployment task log](deploy-task-log.png)

When Octopus successfully sends state changes to Jira, the blocks will appear with green text just like the other blocks in the log.

## Jira Server (on-premises) Support

The Octopus Deploy plugin for Jira is only compatible with Jira Software Cloud however, there is some limited functionality available that works with Jira Server (on-premises). Octopus can display Jira issue names and descriptions in release and deployments if the following is true.

* You have configured your build server to [push build and commit metadata](/docs/api-and-integration/metadata/index.md) to Octopus.
* You have configured the Jira extension in Octopus Deploy as above with your on-premises server details including the username and password/API token.
