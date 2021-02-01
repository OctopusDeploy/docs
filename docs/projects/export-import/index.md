---
title: Exporting and Importing Projects 
description: Projects can be exported, and imported into another space 
position: 40
---

The `Export/Import Projects` feature can export one or more projects into a zip file, which can then be imported into other spaces. 

## Scenarios
The intended scenarios are:
- Moving projects between spaces. This includes moving from a self-hosted instance to an Octopus Cloud instance (or vice-versa). 
- Using a project as a template to create projects in other spaces.

Scenarios this feature was _not_ designed for include:
- Backup/restore.  See our [recommended approach](/docs/administration/data/backup-and-restore.md) to disaster-recovery for your Octopus instance.    
- Cloning projects _within_ a space. There is an [easier way to achieve this](/docs/projects/index.md#clone-a-project).  
- Promoting changes between environments on different Octopus instances. See below. 

### Promoting changes between Octopus instances
There are scenarios where it is desirable to create releases and deploy them to test environments on a development Octopus instance before promoting the changes to another instance.  This can be due to reasons including:
- security requirements (e.g. air-gapped environments) 
- multi-tenancy (deploying Octopus to customer infrastructure)
- maintaining strict control over the changes made to the production Octopus instance 

** TODO: call out this may be addressed in a future release **

## Considerations

There a few things to consider when planning to export a project between spaces:

- Deployment targets
- Packages
- Shared resources

## Deployment targets #{deployment-targets}

[Deployment targets](/docs/infrastructure/deployment-targets/index.md) which belong to environments in the project's [lifecycles](docs/releases/lifecycles/index.md) will be included in the export. 

Many deployment target types can be expected to "just work" after importing, for example Azure Web Apps or Kubernetes Cluster targets. Tentacle targets however, will not.  

** TODO: explain polling/listening tentacle specifc considerations **

## Packages

Packages from the built-in feed are _not_ included in the export (this is to avoid extremely large export bundles).

** TODO: explain how to sync packages**

## Shared resources

The Octopus Deploy data-model is a web, not a graph.  Some resources are shared between projects (environments, tenants, accounts, step templates, etc), and these shared resources are exported with the project.  In general, these shared resources are matched by name when importing; this is if there is an existing resource with the same name as one the source, then it will be used.  Sometimes the import will need to merge some information on import.  Some specific examples are mentioned below.

### Environments

Any environments which can be reached via the project will be included in the export.  This includes:

- Environments included in any of the project's lifecycles 
- Environments used to scope variables in any [library variable sets](/docs/projects/variables/library-variable-sets.md) connected to the project 
- Environment restrictions defined on any accounts or certificates referenced by the project 

Only [deployment targets](#deployment-targets) belonging to environments in the project's lifecycles will be included in the export.

### Tenants

All [tenants](/docs/deployment-patterns/multi-tenant-deployments/index.md) connected to the project will be included in the export.

On import, for any tenants which already exist on the destination the project/environment connections in the export will be merged into the existing tenant. 

### Library Variable Sets 

[Library variable sets](/docs/projects/variables/library-variable-sets.md) connected to the project will be exported, including all variables. 

When importing, if a library variable set with the same name already exists, the variables will be merged. If a variable in the export doesn't exist on the destination, it will be created. If a variable with the same name and scopes already exists, the variable on the destination will be left untouched. 

### Accounts

Any accounts which can be referenced via the project will be included in the export.  This includes:

- Accounts used by [deployment targets](#deployment-targets) included in the export
- Accounts which are the value of the project's variables 
- Accounts which are the value of variables in library variable sets connected to the project
- Accounts referenced directly from deployment process steps

When importing, if an account with the same name already exists on the destination, the existing account will be used. 

### Certificates

Any certificates which can be referenced via the project will be included in the export.  This includes:

- Certificates used by [deployment targets](#deployment-targets) included in the export
- Certificates which are the value of the project's variables 
- Certificates which are the value of variables in library variable sets connected to the project

When importing, if a certificate with the same name already exists on the destination, the existing certificate will be used. 

### Step templates

[Step templates](/docs/deployment-process/steps/custom-step-templates.md) used in the project's deployment or runbook processes will be included in the export.

:::hint
Care should be taken with step templates when exporting/importing projects at different times
:::

Projects reference specific versions of a step template. When importing, if a step template with the same name and version already exists on the destination the existing step template version will be used. If the step template already exists, but the imported version is greater than the latest on the destination then the version included in the import will be imported into the destination, effectively incrementing the step template.  Existing projects on the destination will initially not be impacted, as they will be referencing a specific version which will remain unchanged, but care should be taken on future updates of the step template version in these projects. 