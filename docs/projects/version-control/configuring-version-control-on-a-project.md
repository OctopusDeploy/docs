---
title: Configuring version control on a Project
description: Configuring a project to leverage the configuration as a code feature. 
position: 10 
---

Version-control is configured per project and is accessed via the **{{ Settings, Version Control }}** link in the project navigation menu. This page will walk through how to configure a project to be version-controlled.

![Version-control configuration UI](version-control-configuration.png "width=500")

## Enable the Configuration as Code feature.

First, you will need to ensure the Configuration as Code feature is enabled in Octopus. You can access this feature under **{{ Configuration, Features, Configuration as Code }}**.

![enable version control](enable-version-control.png)

## Creating a new version-controlled project

To get a feel for the config-as-code feature, you may want to create a new project that you can test with before committing to permanently converting an existing project. This project's deployment process will be stored in a git repository when configured.

Click the **New Project** button and select **Use version control for this project.**

![adding a project using vcs](add-project-vcs.png)

Once you click the save button, you'll be sent to the version control screen to configure your version control settings. Enter the URL for your git repository, the name of the default branch, your username and password / personal access token. 

Learn more about [git credentials in Octopus Deploy](/docs/projects/version-control/config-as-code-reference.md).

Next, add the directory you would like Octopus to store the deployment process. You can have multiple deployment processes in the same repository if they all use a different sub-directory. E.g. `.octopus/acme`

## Configuring an existing project to be version-controlled

:::warning
Converting a project to use version control is a one-way change. Once a project is converted to version control, it **cannot** be converted back. Please make sure you want to do this, and perhaps clone your project to test how it works, so you know what to expect before converting important projects.
:::

With the release of config-as-code, you can perform a one-way conversion of existing projects to leverage version control. 

Select the project you would like to convert and click on the **{{ Settings, Version Control }}** link on the project navigation menu.
Enter the connection information for your Git repository. You need to provide: 
- The URL for your git repository
- The name of the default branch
- A Username and password / personal access token (or anonymous for a public repository)

Finally, provide the directory you would like Octopus to store the deployment process in.

Learn more about [git credentials in Octopus Deploy](/docs/projects/version-control/config-as-code-reference.md).

:::hint
You can have multiple deployment processes in the same repository if they all use a different sub-directory.
:::

Once you press the **Configure** button, a modal window will appear to confirm this change and give you the option to provide a summary and description for the first commit or cancel the conversion.

![configuring version control](configure-version-control.png)

Your project is now configured with Version Control. You can see this change reflected on the Process page, where you can change branches. You can also confirm this in your Git repository. The `.octopus` directory will now be created, and it should contain your _deployment_process.ocl_, _deployment_settings.ocl_, and _schema_version.ocl_ files. 

## Not everything is saved to version control

The Configuration as Code feature is per-project. Currently, only the deployment process and settings are saved to version control. Eventually, it will include variables and runbooks. 

Even after variables and runbooks are added, a number of project-level and instance-level settings will not be stored in version control.

Learn more about [what is stored in version control](/docs/projects/version-control/config-as-code-reference.md).

## Using a project with version control enabled

In general, modifying a project via the Octopus UI with version control enabled is the same as modifying a project configured to save changes to SQL Server. However, there are some minor differences.

Learn more about [Editing a project with version control enabled](/docs/projects/version-control/editing-a-project-with-version-control-enabled.md).
