---
title: Guided Failures
description: Guided failures allow problematic deployments to be reviewed and managed human intervention.  
position: 9
---

When deployments encounter errors, they will typically fail. However, the **guided failure** mode provides an option to prompt a user to intervene when a deployment encounters an error so that the deployment can continue. With guided failure mode enabled, the user can fail the process, and retry or ignore any steps that failed the first time.

## Enable Guided Failure Mode for an Environment

Guided failure mode can be enabled per environment. When enabled for an environment, if a deployment encounters an error, Octopus will prompt a user to intervene.

1. Navigate to {{Infrastructure,Environments}}.
1. Click the overflow menu for the specific environment you want to enable guided failure on and select *Edit*.
1. Expand the **Default Guided Failure Mode** section and tick the checkbox to enable the feature.
1. Click **SAVE**.

Note, you can still override this setting for individual deployments.

## Enabling Guided Failure Mode for a Project {#Guidedfailures-Enablingguidedfailuremode}

By default, projects inherit their guided failure mode settings from the environments they are deploying to. This allows you to use guided failure mode for some environments but not others within the same project. For instance, if the test environment has guided failure mode disabled, but the production environment has guided failure mode enabled, errors encountered during deployment to the test environment will result in a failed deployment, whereas errors encountered during deployment to the production environment will prompt a user for instructions before failing.

To override the guided failure settings of the environments being deployed to and set a project level guided failure mode:

1. Navigate to the project's overview page, and select **Settings**.
1. Expand the **Default failure mode** section.
1. select the mode you want to use. Click **SAVE**.

## Responding to a Guide Failure {#Guidedfailures-Whathappens}

If something goes wrong during the deployment, Octopus will interrupt the deployment, and request guidance for how to handle the failure.

1. When a deployment encounters an error, Octopus will interrupt the deployment and wait for manual intervention.
1. A user with the correct [permissions](/docs/administration/managing-users-and-teams/user-roles.md) can claim the manual intervention by clicking **ASSIGN TO ME**.
1. Next, the user can choose between the following options:
  - **FAIL**: mark the deployment as failed, don't try anything else.
  - **RETRY**: retry the step where the error occurred.
  - **IGNORE**: skip the operation, but keep going with the deployment.
  - **EXCLUDE MACHINE FROM DEPLOYMENTS**: exclude the deployment target from the rest of the deployment and proceed.

:::success
 Guided failure mode uses the same [user experience that is used for manual steps](/docs/deployment-examples/manual-intervention-and-approvals.md) (internally, requests for failure guidance, and manual steps, use the same implementation: we call them Interruptions in the [REST API](/docs/api-and-integration/api/index.md)).
:::
