---
title: Configuring version control on a Project
description: How to configure a project to leverage the configuration as code feature. 
position: 10 
---

Version-control is configured per-project, and can be found under the {{Version Control}} navigation menu item.  This page will walk through how to configure a project to be version controlled.

![Version-control configuration UI](version-control-configuration.png "width=500")

## Configuring a project to be version-controlled

Navigate to the {{Version Control}} page in the project.

### Git Repository

The _Git Repository_ field should contain the URL for the repository you wish the Octopus configuration to be persisted to. e.g. `https://github.com/OctopusSamples/OctoFX.git`  

The repository must be initialized (i.e. contain at least one branch) prior to saving.  Octopus will convert the existing items in the project to OCL (Octopus Configuration Language) and save it to that repository when you click save.  If the repository isn't initialized that will fail.

### Default Branch Name

The _Default Branch Name_ is the branch on which the Octopus configuration will be written. It is the also the default branch which will be used in various situations, for example
- When users view the project's deployment process for the first time in the Octopus UI, this is the initially selected branch 
- When creating releases, this will be the branch selected initially

For existing repositories that are initialized, the default branch must exist. If the repository is new and uninitialized, Octopus will create the default branch automatically.

### Authentication

The _Authentication_ field specifies the credentials used by Octopus when authenticating with the git provider.  For the Password field, we recommend using a personal access token. We also recommend that you follow the principle of least privilege when selecting scopes or permissions to grant this personal access token. 

Git providers allow you to create an access token in different ways. The recommended *scope* for each provider is also listed in brackets. 

* [GitHub - Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token); (Scope - `repo`)
* [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate); (Scope - `vso.code_full`)
* [BitBucket](https://confluence.atlassian.com/bitbucketserver063/personal-access-tokens-972354166.html); (Permission - `Project admin`)
* [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html); (Scope - `write_repository`)

### File Storage

_Git File Storage Directory_ specifies the path within the repository where the Octopus configuration will be stored.  The default directory is `.octopus`, but that can be changed.  If only a single Octopus project will be stored in the repo, we recommend putting the configuration directly under the `.octopus` directory. 

:::hint
If multiple projects will be persisted to the repository, adding the project name to the path is the recommended convention, e.g. `./octopus/acme`
:::

While it is possible to store all your projects in one repository, we do not recommend that.  As you add more projects it will be very difficult to manage.  Store all the Octopus projects related to the application in the repository.  For example, if you have multiple component projects, one for Web UI, another for Web API, etc., but the source code is in one repository, then store all the component projects in that repository.

### Conversion

When you click the save button Octopus will convert the existing items in the project to OCL (Octopus Configuration Language) and save it to the folder in the specified repository using the provided credentials.  

:::warning
At the time of this writing, the conversion process is one-way.  You cannot convert back to a non-version controlled project.  Our recommendation is to create a clone of an existing project for the first couple of projects to ensure the feature meets your needs prior to going all in.
:::

## Configure version control during Project creation

You can configure version control during Project creation by checking the **Use version control for this project** checkbox on the project creation modal window and then clicking **Save and Configure VCS**.  That will create the project in Octopus and take you to the Version Control page for the project.

## Not everything is saved to version control

The Configuration as Code feature is per-project, and eventually it will include the deployment process, variables, and runbooks.  There are a number of project-level settings not stored in version control.

:::hint
The first version of Configuration as Code will only include the deployment process.  
:::

Those settings include:

- Project Name
- Logo
- Description
- Project Group
- Triggers
