---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Configuration as Code reference
description: Details about the configuration as code feature.
navOrder: 20 
---

The configuration as code feature enables you to save some project-level settings as files in a git repository instead of SQL Server. The files are written in the OCL (Octopus Configuration Language) format. Storing resources as files lets you leverage version control features such as branching, pull requests, and reverting changes. In addition, you can save both your source code and how you deploy your code in the same git repository. This page is a reference document of how the config-as-code feature works.

## Octopus Project Level Only

The config-as-code feature will store Octopus Project resources in git instead of SQL Server.

### Project Resources version controlled

Currently, the Project level resources saved to git are:

- Deployment Process
- Deployment Settings
    - Release Versioning
    - Release Notes Template
    - Deployment Targets Required
    - Transient Deployment Targets
    - Deployment Changes Template
    - Default Failure Mode
- Variables (excluding Sensitive variables)

:::div{.hint}
Sensitive variables are still stored in the database. Regardless of the current branch, you will always see the same set of sensitive variables.
:::

### Project Resources saved to SQL Server

Currently, the Project level resources saved to SQL Server when version control is enabled are:

- Channels
- Triggers
- Releases
- Deployments
- Runbooks
- Sensitive Variables
- General Settings
    - Project Name
    - Enabled / Disabled
    - Logo
    - Description
    - Project Group

:::div{.hint}
Runbooks and Sensitive Variables are planned for future releases of config-as-code.
:::

### Resources NOT version controlled by config-as-code

The config-as-code feature manages project-level resources. However, it is worth explicitly mentioning some things that are **not included**:

- Infrastructure
    - Environments
    - Deployment Targets
    - Workers
    - Worker Pools        
    - Machine Policies
    - Machine Proxies
    - Accounts
- Tenants
- Library
    - Certificates
    - External Feeds
    - Lifecycles
    - Packages
    - Build Information
    - Script Modules
    - Step Templates
    - Variable Sets
- Server Configuration
    - Feature Flags
    - License
    - Node Settings (Task Cap and Server Uri)
    - Issue Tracker Settings
    - External Auth Provider Settings
    - SMTP
    - Spaces
    - Teams (both membership and role assignment)
    - Users
    - User Roles

Currently, there are no plans to include these resources in the config-as-code feature. Several of the resources above can be put into version control using the [Octopus Terraform Provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs). 

:::div{.hint}
Resources managed by the Octopus Terraform Provider will have their state managed by Terraform. Resources managed by the Octopus config-as-code feature will have the state managed by Octopus Deploy. The two are not the same and shouldn't be treated as such.
:::

## Git Configuration Options

Project version control settings can be accessed by clicking on the **Settings ➜ Version Control** link on the project navigation menu.

### Git Repository

The _Git Repository_ field should contain the URL for the repository you wish the Octopus configuration to be persisted to. e.g. `https://github.com/OctopusSamples/OctoFX.git`  

The repository must be initialized (i.e. contain at least one branch) prior to saving. Octopus will convert the existing items in the project to OCL (Octopus Configuration Language) and save it to that repository when you click save. If the repository isn't initialized, that will fail.

### Authentication

The config-as-code feature is designed to work with _any_ git repository. When configuring a project to be version-controlled, you can optionally provide credentials for authentication.

:::div{.hint}
Do not use credentials from a personal account. Select a shared or service account. When Octopus Deploy saves to your git repo, you will typically see the message `[User Name] authored and [Service Account] committed on [Date].`
:::

For the Password field, we recommend using a personal access token. We also recommend that you follow the principle of least privilege when selecting scopes or permissions to grant this personal access token.

Git providers allow you to create an access token in different ways. The recommended _scope_ for each provider is listed in brackets.

-   [GitHub - Creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token); (Permission - `Contents - Read and Write`)
-   [GitHub - Creating a personal access token (Classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic); (Scope - `repo`)
-   [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate); (Scope - `vso.code_full`)
-   [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html); (Scope - `write_repository`)
-   [BitBucket Server](https://confluence.atlassian.com/bitbucketserver063/personal-access-tokens-972354166.html); (Permission - `Project admin`)
-   [BitBucket Cloud - Use App Passwords](https://support.atlassian.com/bitbucket-cloud/docs/app-passwords/); (Permission - `Repositories - Read & Write`)

:::div{.hint}
Some VCS providers require that you use only a username and personal access token for authentication, not an email address (i.e. BitBucket).
:::

#### BitBucket Repository Access Tokens
BitBucket's repository access tokens allow you to create repository-specific access tokens. For these to work with your Git repositories in Octopus, you must set the username to `x-token-auth`, and the password to the token.

:::figure
![Screenshot of Octopus Version Control Settings page with Authentication section expanded. Username/password auth method is selected, the Username input field is highlighted with a bold red box, and contains the value x-token-auth](/docs/projects/version-control/octopus-bitbucket-repository-access-tokens.png)
:::

### File Storage

_Git File Storage Directory_ specifies the path within the repository where the Octopus configuration will be stored. The default directory is `.octopus`, but that can be changed. If only a single Octopus project will be stored in the repo, we recommend putting the configuration directly under the `.octopus` directory.

:::div{.hint}
If multiple projects will be persisted to the repository, adding the project name to the path is the recommended convention, e.g. `./octopus/acme`
:::

We recommend storing projects alongside the application code. While it is possible to store all your deployment projects in a single central repository with folders for each project, it will be challenging to manage as you add more projects. For example, if you have multiple component projects, one for Web UI, another for Web API, etc., but the source code is in one repository, then store all the component projects in that repository. If you move the application code later, you can also [move the deployment configuration](/docs/projects/version-control/moving-version-control) to keep it with the application.

### Branch Settings

#### Default Branch Name

The _Default Branch Name_ is the branch on which the Octopus configuration will be written. It is also the default branch that will be used in various situations, for example:

- When users view the project's deployment process for the first time in the Octopus UI, this is the initially selected branch 
- When creating releases, this will be the default branch selected
- When running Runbooks, variable values will be pulled from this branch

For existing initialized repositories, the default branch must exist. If the repository is new and uninitialized, Octopus will create the default branch automatically.

:::div{.hint}
When snapshotting a Runbook in a Git project, the variables will always be taken from the default branch.
:::

#### Initial Commit Branch

If the default branch is protected in your repository, select the *Is the default branch protected?* checkbox. This will allow you to use a different _Initial Commit Branch_. If this branch does not exist, Octopus will create the branch automatically. 

The Octopus configurations will be written to the initial commit branch instead of the default branch. You will need to merge the changes from this branch into the default branch outside of Octopus. 

#### Protected Branches Pattern

You can also nominate protected branches for your Project. This will prevent users from making direct commits to the nominated branches from the Octopus UI and encourage them to create a new branch instead. To nominate protected branches, type in the name or a wildcard pattern in the Protected Branches Pattern field under Branch Settings. This will apply to all existing and future branches.



## OCL Files

After successfully configuring a project to be version controlled, the specified Git repository will be populated with a set of Octopus Configuration Language (OCL) files. These files are created in the directory you define during setup. E.g. `./octopus/acme`

Currently, Octopus creates the following files:

* deployment_process.ocl
* deployment_settings.ocl
* variables.ocl
* schema_version.ocl

The _deployment_process.ocl_ file contains the configuration for your project's steps. Below is an example _deployment_process.ocl_ for a project containing a single _Deploy a Package_ step.

```hcl
step "deploy-a-package" {
    name = "Deploy a Package"
    properties = {
        Octopus.Action.TargetRoles = "web"
    }

    action {
        action_type = "Octopus.TentaclePackage"
        properties = {
            Octopus.Action.EnabledFeatures = ",Octopus.Features.ConfigurationTransforms,Octopus.Features.ConfigurationVariables"
            Octopus.Action.Package.AdditionalXmlConfigurationTransforms = "Web.Release.config => Web.config"
            Octopus.Action.Package.AutomaticallyRunConfigurationTransformationFiles = "True"
            Octopus.Action.Package.AutomaticallyUpdateAppSettingsAndConnectionStrings = "True"
            Octopus.Action.Package.DownloadOnTentacle = "False"
            Octopus.Action.Package.FeedId = "octopus-server-built-in"
            Octopus.Action.Package.PackageId = "webConfig"
        }
        worker_pool_variable = ""

        packages {
            acquisition_location = "Server"
            feed = "octopus-server-built-in"
            package_id = "webConfig"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

The _deployment_settings.ocl_ file contains the configuration for the deployment settings associated with the deployment process. If using the default deployment process settings, the .ocl will be mostly empty.

```hcl
connectivity_policy {
}

versioning_strategy {
}
```

However, configuring the settings via Octopus will populate the fields with their properties and values.

```hcl
default_guided_failure_mode = "On"
deployment_changes_template = <<-EOT
        #{each release in Octopus.Deployment.Changes}
        **Release #{release.Version}**
        
        #{release.ReleaseNotes}
        #{each workItem in release.WorkItems}
        - [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
        #{/each}
        #{/each}
    EOT
release_notes_template = <<-EOT
        #{each workItem in Octopus.Release.WorkItems}
        - [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
        #{/each}
    EOT

connectivity_policy {
    allow_deployments_to_no_targets = true
    exclude_unhealthy_targets = true
    skip_machine_behavior = "SkipUnavailableMachines"
    target_roles = ["Web"]
}

versioning_strategy {

    donor_package {
        step = "deploy-a-package"
    }
}
```

The _variables.ocl_ file contains all non-sensitive variables for the project.

```hcl
variable "DatabaseName" {
    value "AU-BNE-TST-001" {
        environment = ["test"]
    }

    value "AU-BNE-DEV-001" {
        environment = ["development"]
    }

    value "AU-BNE-001" {
        environment = ["production"]
    }
}

variable "DeploymentPool" {
    type = "WorkerPool"

    value "non-production-pool" {}

    value "production-pool" {
        environment = ["production"]
    }
}
```

:::div{.hint}
In Git projects, [Octopus will continue apply variable permissions based on scopes](/docs/security/users-and-teams/security-and-un-scoped-variables) when interacting through the API and Portal. As these variables are written to a single text file, any user with access to the repository will have full access to all variables (regardless of scoping).
:::

## Slugs in OCL

Prior to version 2022.3.4517, Git projects would reference shared resources using their name. This had a side-effect causing API responses for Git projects to contain names instead of IDs.
From version 2022.3.4517 onwards, a handful of resources are referenced from OCL by their slug. IDs will be used in API responses instead of names.

The following resources will be referenced via their slug:
- Account
- Channel
- Deployment Action
- Deployment Step
- Deployment Target
- Environment
- Feed
- Lifecycle
- Team
- Worker Pool

All other resources will be referenced from OCL via their ID. We plan on growing this list to include more resources in the future as we introduce slugs into more places throughout Octopus.

## Items of note

When designing the config-as-code feature, we made several decisions to keep an appropriate balance of usability and functionality. There are a few limitations and items of note you should be aware of with config-as-code.

- The Octopus Terraform Provider and OCL are not a 1:1 match. You cannot copy resources between the two and expect everything to work. We want to narrow the gap as much as possible, but as of right now, a gap exists.
- Octopus currently only supports connecting to git repositories over HTTPS and not SSH. 
- Shared resources (environments, external feeds, channels, etc.) are referenced by their slug from OCL. The API however will still use IDs.
- Shared resources must exist before loading an OCL file into Octopus Deploy. What that means is if you copy the OCL files from one git repo to another, and point a new project at those files, then any shared resource must exist before creating that project. That only applies when projects are in different spaces or on different instances. If the resources do not exist, an error message will appear.
- Pointing multiple projects to the same folder in the same git repo is unsupported. Please see our [unsupported config as code scenarios](/docs/projects/version-control/unsupported-config-as-code-scenarios) for more information.
- Converting a project to be version-controlled is a one-way process. At this time, you cannot convert back.
