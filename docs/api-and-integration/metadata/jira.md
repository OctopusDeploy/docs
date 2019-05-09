---
title: Jira Issue Tracking Integration
description: Configure Jira Cloud and Jira Server issue tracking with Octopus.
---

**Octopus 2019.4** introduced support to integrate Octopus with Jira Cloud and Jira Server. The integration adds work items links, commit links, and release notes to Octopus from Jira. If you're using Jira Cloud, you can view release and deployment details from Octopus directly in Jira issues, making it possible to see if the issue has been associated with any deployments. This builds upon the functionality to [track metadata and work item](/docs/api-and-integration/metadata/index.md) information through your CI/CD pipeline.

## Connecting Jira and Octopus Deploy

This section describes how to configure Octopus Deploy to connect to Jira. In all cases for this integration, connections are always made to Jira (either from Octopus server itself or via links in the browser). There are no cases where Jira connects to Octopus.

What this means is that you can configure any Octopus instance, whether self-hosted or cloud, to use the Jira integration. The only network connectivity requirements are that your Octopus server and your browser can connect to the Jira Base URL discussed below.

<!-- steps go here -->

Navigate to the **{{Configuration,Settings,Jira Issue Tracker}}** page in Octopus and set **Is Enabled** to true.

### Jira Base URL

Set this so Octopus knows where your Jira instance can be found and enables Octopus to render the links to the work items.

### Jira Username and Jira Password

Set these values to allow Octopus to connect to Jira and retrieve work item details when viewing packages or creating releases.

These are optional and depend on the Jira Base URL. If they are not provided then just the raw work item references will be used as the work item link descriptions. If they are provided the work item's title will be used as the work item link's description.

The password should actually be an API Token, rather than an actual password. You can create an API token from an Atlassian account in the 'Security' area.

### Release Notes Prefix

Set this if you would like Octopus to scan the work item's comments for release notes. This allows you to set a specific release note for a work item that is different to its title.

This is an optional setting and depends on the Jira Username and Jira Password being set. If specified, Octopus will look for a comment that starts with the given prefix text and use whatever text appears after the prefix as the release note, which will come through to the release notes templates etc as the work item link's description. If not comment is found with the prefix then Octopus will default back to using the title for that work item.

## Connecting Jira Cloud and Octopus Deploy

If you are using Jira Cloud then all of the above configuration still holds, but there are some additional features you can configure to enable Octopus to push deployment data to your Jira instances. The Jira APIs for pushing this data are only available in Jira Cloud, not Jira Server, which is why this extra configuration is required.

This integration uses the Octopus Deploy plugin for Jira that's available from the [Atlassian Marketplace]](https://marketplace.atlassian.com/apps/1220376/octopus-deploy-for-jira) and the following section describes how to connect and configure Octopus Deploy and Jira Cloud.

![Jira Deployments](jira-deployment.png "width=500")

1. Install the Octopus Deploy plugin in your Cloud Jira instance.

    Add the `Octopus Deploy for Jira` app from the [Atlassian Marketplace](https://marketplace.atlassian.com/apps/1220376/octopus-deploy-for-jira) and then click the 'Get Started' button to configure it.

    Note: Keep this configuration page open while you navigate to Octopus in the next step as you need to copy values from one page to the other.

1. Configure the Jira extension in Octopus Deploy.

    Navigate to the **{{Configuration,Settings,Jira Issue Tracker}}** page in Octopus and copy the following values from the Jira App configuration page:

    - Jira Base URL, i.e., https://your-jira-instance.atlassian.net.
    - Jira Connect App Password.

    Ensure the **Is Enabled** property is set as well.

1. Set the Octopus Server URL in Octopus Deploy.

    Navigate to the **{{Configuration,Nodes}}** page and ensure you have set the Server URI field to your Octopus Server's base URL. i.e., https://my-company.octopus.app/ or https://my-company-internal-name/
    Note: Octopus passes this value to Jira so it can build hyperlinks back to the deployments from its UI. It never actually tries to connect to this Url itself.

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
