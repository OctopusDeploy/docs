---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Rolling back a Tomcat deployment
description: This guide covers the topic of rolling back an application deployed to a Tomcat Java application server.
navOrder: 10
hideInThisSectionHeader: true
---
This guide will walk through rolling back a Java application deployed to a Tomcat web server.  We will be using the [PetClinic](https://bitbucket.org/octopussamples/petclinic/src/master/) Spring Boot example.  The PetClinic application consists of two components:

- Database
- Website

Rolling back the database is out of scope for this guide.  This [article](https://octopus.com/blog/database-rollbacks-pitfalls) describes reasons and scenarios in which rolling back a database could result in data loss or incorrect data.  This guide assumes that there are no database changes or the changes are backward compatible.

## Parallel deployments in Apache Tomcat
In Tomcat v7, Apache included the ability to do [parallel deployments](https://tomcat.apache.org/tomcat-9.0-doc/config/context.html#Parallel_deployment) which allows you to deploy multiple versions of the same application to a Tomcat server.  If a version number is provided during deployment, Tomcat will combine it with the context path to rename the `.war` to `<contextpath>##<version>.war`.  Once the new version is in a running state, Tomcat will redirect new sessions to the new version of the application.  Existing sessions will continue against the old version until they expire.  This functionality is ideally suited for supporting rollback scenarios when deploying to Tomcat.

:::warning
The rollback strategy described in this guide will not work if the [undeployOldVersions](https://tomcat.apache.org/tomcat-9.0-doc/config/host.html) feature is enabled on Tomcat.
:::

## Existing deployment process
For this guide, we'll start with an existing deployment process for deploying the PetClinic application:

1.  Create Database If Not Exists
1.  Deploy Database Changes
1.  Deploy PetClinic Web App
1.  Verify Deployment
1.  Notify Stakeholders

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-original-deployment-process.png)

:::success
View the deployment process on our [samples instance](https://samples.octopus.app/app#/Spaces-762/projects/01-petclinic-original/deployments/process).  Please login as a guest.
:::

## Zero Configuration Rollback
!include <zero-configuration-rollback>

## Simple Rollback Process
While doing a rollback can be an operational exercise, the most typical reason for a rollback is something is wrong with the release, and you need to back out the changes.  A bad release should also be [prevented from moving forward](/docs/releases/prevent-release-progression/).

The updated deployment process for a simple rollback would look like this:

1. Calculate Deployment Mode
1. Create Database If Not Exists (skip during rollback)
1. Deploy Database Changes (skip during rollback)
1. Deploy PetClinic Web App
1. Verify Deployment
1. Notify Stakeholders
1. Block Release Progression

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-simple-rollback-process.png)

:::success
View the deployment process on our [samples instance](https://samples.octopus.app/app#/Spaces-762/projects/02-petclinic-simplerollback/deployments/process).  Please login as a guest.
:::

### Calculate Deployment Mode
!include <calculate-deployment-mode>

### Skipping Database Steps
The two database steps, `Create Database If Not Exists` and `Deploy Database Changes` should be skipped for a rollback scenario.  Rolling back database changes could result in data loss or interrupt testing operations.  To skip these steps, we'll use one of the Variable Run Condition output variables from Calculate Depoloyment Mode step:

```
#{Octopus.Action[Calculate Deployment Mode].Output.RunOnDeploy}
```

When looking at the deployment process from the Process tab, there isn't a quick way to determine under which conditions a step will be executed.  Using the `Notes` field for a step is an easy way to provide users information at a glance.

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-step-notes.png)

### Block Release Progression

!include <prevent-release-progression>

## Complex Rollback Process
In the simple rollback scenario, the `.war` file is redeployed, extracted, variable replacement is executed, the `.war` is repackaged before finally being sent to the Tomcat server webapps location.  In cases where the `.war` is very large, the extraction and repackaging of the `.war` could take quite some time, making the rollback process lengthy.  This is where the parallel deployments feature of Tomcat can benefit us as all the processes have already occurred during the initial deployment of that release.  

The new deployment process would look like this:

1. Calculate Deployment Mode
1. Rollback reason (only during rollback)
1. Create Database If Not Exists (skip during rollback)
1. Deploy Database Changes (only during deploy or redeploy)
1. Stop App in Tomcat (only when the previous release exists)
1. Deploy PetClinic Web App
1. Start App in Tomcat (only during rollback)
1. Verify the deployment
1. Notify Stakeholders
1. Block Release Progression (only during rollback)

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-complex-rollback-process.png)

:::success
View the deployment process on our [samples instance](https://samples.octopus.app/app#/Spaces-762/projects/03-petclinic-complexrollback/deployments/process).  Please login as a guest.
:::

Next, we'll go through the newly added and altered steps:

### Rollback reason
The Rollback Reason is a [Manual Intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals/) step that prompts the user for the reason they are rolling back.  The text entered is stored in an output variable which will be used in the Block Release Progression step further down the process.

### Stop App in Tomcat
Before we deploy a new version of our application, we first must stop the existing one.  The Advanced Options section of the `Start/Stop App in Tomcat` step is where we specify which version of the application we're going to stop.  For this guide, the version is identified as the previous release number, which is represented by the following variable.

```
#{Octopus.Release.CurrentForEnvironment.Number}
```

We also need to choose the option to **Stop the application**.

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-stop-application.png)

This step will fail if there isn't a previous release to stop, so we'll need to add a run condition only to run when a previous release exists.  That can be represented by using the following run condition:

```
#{if Octopus.Release.CurrentForEnvironment.Number}True#{/if}
```

### Deploy PetClinic Web App
To configure our deployment to work with the parallel deployment feature, we need to set the deployment version of our application.  This is done in the **Advanced Options** section of the **Deploy to Tomcat Via Manager*8 step.  In the following screenshot, you will see the Octopus variable of `#{Octopus.Release.Number}` being used for the version number.

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-tomcat-advanced.png)

The radio button at the bottom gives you the option to have this deployment be in a `Running` state or a `Stopped` state; the default is `Running`.

For this guide, we only want the Deploy step to occur on a Deployment or a Redeployment.  The Calculate Deployment Mode step provides us with an output variable called `RunOnDeployOrRedeploy` that contains the correct statement for a variable run condition for this step.  Add the following as the value for the Variable Run Condition on this step.

```
#{Octopus.Action[Calculate Deployment Mode].Output.RunOnDeployOrRedeploy}
```

![](/docs/deployments/patterns/rollbacks/tomcat/octopus-deploy-tomcat-run-condition.png)

### Start App in Tomcat
When executing the rollback, we'll need to start the previous version.

This step is only required during a rollback scenario, so you'll need to add the following to the Variable Run Condition.

```
#{Octopus.Action[Calculate Deployment Mode].Output.RunOnRollback}
```

### Block Release Progression
The `Rollback Reason` step captures the reason for the rollback.  We can pass the text entered in this step to the `Reason` field of this step by using the following output variable.

```
#{Octopus.Action[Rollback reason].Output.Manual.Notes}
```

:::info
The retention policy of Octopus Deploy will clean up any old versions of the applications in folders controlled by Octopus.  However, the `<contextpath>##<version>.war` files are not controlled by Octopus and will not be cleaned up with a retention policy.  To assist in Tomcat maintenance, the Octopus team developed the [Undeploy Tomcat Application via Manager](https://library.octopus.com/step-templates/34f13b4c-64e1-42b4-ad1a-4599f25a850e/actiontemplate-undeploy-tomcat-application-via-manager) step template.  This template will remove the application using the specified context path and optional version number.  
:::

## Choosing a rollback strategy
It is our recommendation that you start with the simple rollback strategy, moving to the complex if you determine that the simple method doesn't suit your needs.