---
title: Configuration as Code reference
description: Details about the configuration as code feature.
position: 20 
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

### Project Resources saved to SQL Server

Currently, the Project level resources saved to SQL Server when version control is enabled are:

- Channels
- Triggers
- Releases
- Deployments
- Runbooks
- Variables
- General Settings
    - Project Name
    - Enabled / Disabled
    - Logo
    - Description
    - Project Group

:::hint
Runbooks and Variables are planned for future releases of config-as-code.
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

:::hint
Resources managed by the Octopus Terraform Provider will have their state managed by Terraform. Resources managed by the Octopus config-as-code feature will have the state managed by Octopus Deploy. The two are not the same and shouldn't be treated as such.
:::

## Git Configuration Options

Project version control settings can be accessed by clicking on the **{{ Settings, Version Control }}** link on the project navigation menu.

### Git Repository

The _Git Repository_ field should contain the URL for the repository you wish the Octopus configuration to be persisted to. e.g. `https://github.com/OctopusSamples/OctoFX.git`  

The repository must be initialized (i.e. contain at least one branch) prior to saving. Octopus will convert the existing items in the project to OCL (Octopus Configuration Language) and save it to that repository when you click save. If the repository isn't initialized, that will fail.

### Default Branch Name

The _Default Branch Name_ is the branch on which the Octopus configuration will be written. It is also the default branch that will be used in various situations, for example:

- When users view the project's deployment process for the first time in the Octopus UI, this is the initially selected branch 
- When creating releases, this will be the default branch selected

For existing initialized repositories, the default branch must exist. If the repository is new and uninitialized, Octopus will create the default branch automatically.

### Authentication

The config-as-code feature is designed to work with _any_ git repository. When configuring a project to be version-controlled, you can optionally provide credentials for authentication.

:::hint
Do not use credentials from a personal account. Select a shared or service account. When Octopus Deploy saves to your git repo, you will typically see the message `[User Name] authored and [Service Account] committed on [Date].`
:::

For the Password field, we recommend using a personal access token. We also recommend that you follow the principle of least privilege when selecting scopes or permissions to grant this personal access token.

Git providers allow you to create an access token in different ways. The recommended _scope_ for each provider is listed in brackets.

-   [GitHub - Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token); (Scope - `repo`)
-   [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate); (Scope - `vso.code_full`)
-   [BitBucket](https://confluence.atlassian.com/bitbucketserver063/personal-access-tokens-972354166.html); (Permission - `Project admin`)
-   [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html); (Scope - `write_repository`)

### File Storage

_Git File Storage Directory_ specifies the path within the repository where the Octopus configuration will be stored. The default directory is `.octopus`, but that can be changed. If only a single Octopus project will be stored in the repo, we recommend putting the configuration directly under the `.octopus` directory.

:::hint
If multiple projects will be persisted to the repository, adding the project name to the path is the recommended convention, e.g. `./octopus/acme`
:::

We recommend storing projects alongside the application code. While it is possible to store all your deployment projects in a single central repository with folders for each project, it will be challenging to manage as you add more projects. For example, if you have multiple component projects, one for Web UI, another for Web API, etc., but the source code is in one repository, then store all the component projects in that repository. If you move the application code later, you can also [move the deployment configuration](/docs/projects/version-control/moving-version-control.md) to keep it with the application.

## OCL Files

After successfully configuring a project to be version controlled, the specified Git repository will be populated with a set of Octopus Configuration Language (OCL) files. These files are created in the directory you define during setup. E.g. `./octopus/acme`

Currently, Octopus creates the following files:

* deployment_process.ocl
* deployment_settings.ocl
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

## Items of note

When designing the config-as-code feature, we made several decisions to keep an appropriate balance of usability and functionality. There are a few limitations and items of note you should be aware of with config-as-code.

- The Octopus Terraform Provider and OCL are not a 1:1 match. You cannot copy resources between the two and expect everything to work. We want to narrow the gap as much as possible, but as of right now, a gap exists.
- Shared resources (environments, external feeds, step templates, etc.) are referenced by their slug, not ID.
- Shared resources must exist before loading an OCL file into Octopus Deploy. What that means is if you copy the OCL files from one git repo to another, and point a new project at those files, then any shared resource must exist before creating that project. That only applies when projects are in different spaces or on different instances. If the resources do not exist, an error message will appear.
- Pointing multiple projects to the same folder in the same git repo is unsupported. Please see our [unsupported config as code scenarios](/docs/projects/version-control/unsupported-config-as-code-scenarios.md) for more information.
- Converting a project to be version-controlled is a one-way process. At this time, you cannot convert back.