---
title: Configuration as Code reference
description: Details about the configuration as code feature.
position: 20 
---

The configuration as code feature enables you save some project-level settings as files in a git repository instead of SQL Server.  The files are written in OCL (Octopus Configuration Language) format.  This enables you to leverage version control features such as branching, pull requests, and reverting.  How you deploy your code and your source code can now be saved in the same git repository.

## Octopus Project Level Only

The confg-as-code feature is to store Octopus Project resources in git instead of SQL Server.

### Resources NOT version controlled by config-as-code

Several resources are shared between projects and as such are not included in version control.

Resources not version controlled by the config-as-code feature are:

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

Several of those resources can be put into version control using [Octopus Terraform Provider](https://registry.terraform.io/providers/OctopusDeployLabs/octopusdeploy/latest/docs).  

:::hint
Resources managed by the Octopus Terraform Provider will have their state managed by Terraform.  Resources managed by the Octopus config-as-code feature will have the state manged by Octopus Deploy.  The two are not the same and shouldn't be treated as such.
:::

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

Currently, the Project level resourcs saved to SQL Server when version controll is enabled are:

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
    - Descriptin
    - Project Group

:::hint
Runbooks and Variables are expected to be added in future releases of config-as-code.
:::

## Git Configuration Options

Project version control settings can be accessed by clicking on the {{Version Control}} link on the left menu.

### Git Repository

The _Git Repository_ field should contain the URL for the repository you wish the Octopus configuration to be persisted to. e.g. `https://github.com/OctopusSamples/OctoFX.git`  

The repository must be initialized (i.e. contain at least one branch) prior to saving.  Octopus will convert the existing items in the project to OCL (Octopus Configuration Language) and save it to that repository when you click save.  If the repository isn't initialized that will fail.

### Default Branch Name

The _Default Branch Name_ is the branch on which the Octopus configuration will be written. It is the also the default branch which will be used in various situations, for example
- When users view the project's deployment process for the first time in the Octopus UI, this is the initially selected branch 
- When creating releases, this will be the branch selected initially

For existing repositories that are initialized, the default branch must exist. If the repository is new and uninitialized, Octopus will create the default branch automatically.

### Authentication

The config-as-code feature is designed to work with _any_ git repository.  When configuring a project to be version controlled, you will be asked to provide credentials.  

:::hint
Do not use credentials from your personal account.  Select a shared or service account.  When Octopus Deploy saves to your git repo you will typically see the message `[User Name] authored and [Service Account] committed on [Date].`
:::

For the Password field, we recommend using a personal access token or making use of our Get Credentials feature. We also recommend that you follow the principle of least privilege when selecting scopes or permissions to grant this personal access token.

Git providers allow you to create an access token in different ways. The recommended _scope_ for each provider is also listed in brackets.

-   [GitHub - Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token); (Scope - `repo`)
-   [Azure DevOps](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate); (Scope - `vso.code_full`)
-   [BitBucket](https://confluence.atlassian.com/bitbucketserver063/personal-access-tokens-972354166.html); (Permission - `Project admin`)
-   [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html); (Scope - `write_repository`)

If you wish to re-use the same credentials between projects we recommend leveraging the *Git Credentials* shared resource in Octopus.  The option can be found under *Library* -> *Git Credentials*. This simplifies managing your Git Credentials between team members responsible for configuring your version controlled projects. To manage your Git Credentials access, we have introduced the following permissions: `GitCredentialEdit` and `GitCredentialView`.

### File Storage

_Git File Storage Directory_ specifies the path within the repository where the Octopus configuration will be stored.  The default directory is `.octopus`, but that can be changed.  If only a single Octopus project will be stored in the repo, we recommend putting the configuration directly under the `.octopus` directory. 

:::hint
If multiple projects will be persisted to the repository, adding the project name to the path is the recommended convention, e.g. `./octopus/acme`
:::

While it is possible to store all your projects in one repository, we do not recommend that.  As you add more projects it will be very difficult to manage.  Store all the Octopus projects related to the application in the repository.  For example, if you have multiple component projects, one for Web UI, another for Web API, etc., but the source code is in one repository, then store all the component projects in that repository.

## OCL Files Examples

After successfully configuring a project to be version controlled, the specified Git repository will be populated with a set of Octopus Configuration Language (OCL) files. These files are created in the directory you define during setup. E.g. `./octopus/acme`

Currently, Octopus creates following files:

* deployment_process.ocl
* deployment_settings.ocl
* schema_version.ocl


The _deployment_process.ocl_ file contains the configuration for your project's steps. Below is an example _deployment_process.ocl_ for a project containing a single _Deploy a Package_ step.

``` text
step "Deploy a Package" {
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
            Octopus.Action.Package.FeedId = "Octopus Server (built-in)"
            Octopus.Action.Package.PackageId = "webConfig"
        }
        worker_pool_variable = ""

        packages {
            acquisition_location = "Server"
            feed = "Octopus Server (built-in)"
            package_id = "webConfig"
            properties = {
                SelectionMode = "immediate"
            }
        }
    }
}
```

The _deployment_settings.ocl_ file contains the configuration for the deployment settings associated with the deployment process. If using the default deployment process settings, the .ocl will be mostly empty.

```
connectivity_policy {
}

versioning_strategy {
}
```

However, configuring the settings via Octopus will populate the fields with their properties and values.

```
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
        step = "Deploy a Package"
    }
}
```

## Other Config as Code items of note

When designing the config-as-code feature we made a number of decisions to keep an appropriate balance of usability and functionality.  There are a few limitations and items of note you should be aware of with config-as-code.

- The Octopus Terraform Provider and OCL are not a 1:1 match.  You cannot copy resources between the two and expect everything to work.  We want to narrow the gap as much as possible, but as of right now a gap exists.
- Shared resources (environments, external feeds, step templates, etc.) are referenced by name, not by ID.  Be very careful when changing the names of any shared resources.  
- Shared resources must exist prior to loading an OCL file into Octopus Deploy.  What that means is if you copy the OCL files from one git repo to another, and point a new project at those files, then any shared resource must exist prior to creating that project.  This only applies when projects are in different spaces or on different instances.  If the resources do not exist you will be presented with an error message.
- Pointing multiple projects to the same folder in the same git repo is unsupported.  Please see [unsupported config as code scenarios](/docs/projects/version-control/unsupported-config-as-code-scenarios.md) for more information.
- Converting a project to be version controlled is a one-way process.  At this time, you cannot convert back.