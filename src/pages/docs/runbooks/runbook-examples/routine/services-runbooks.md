---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Services Runbooks
description: With Octopus Deploy you can manage service operations using runbooks.
navOrder: 140
---

Octopus can deploy the services that your application depend on. Working with services often requires direct access to the server and elevated permissions. With Runbooks, you can give users a self-service method to perform operations on services without giving them access to the server or any special permissions.

The next section shows how you can create runbooks to manage services operations:

- [Windows services runbooks](#windows-services-runbooks)
- [Linux services runbooks](#linux-services-runbooks)

## Windows services runbooks {#windows-services-runbooks}

When developing a Windows service, starting, stopping, and restarting are all common activities.  However, once deployed to a server, the ability to start, stop, or restart a service requires the user to have either elevated permissions or at least be [granted the ability](http://woshub.com/set-permissions-on-windows-service/#:~:text=In%20the%20list%20of%20services,and%20pause%20permission%20is%20enough.) to remotely perform the operation.  If it's not possible (or feasible) to grant that permission, you may need to fill out a ticket and wait for a server administrator to do it for you, which can kill productivity.  Using a runbook, you can give developers a self-service option to start, stop, or restart a Windows service without having to grant them permission to the server.

For Windows services, there are three Community Step Templates available, one for each action:
- [Start Service](https://library.octopus.com/step-templates/60733bf3-1617-4d85-a40f-4b6a0b9289ef/actiontemplate-windows-service-start)
- [Stop Service](https://library.octopus.com/step-templates/ab3eb4cf-5fc1-4168-be8d-02246d919ca8/actiontemplate-windows-service-stop)
- [Restart Service](https://library.octopus.com/step-templates/d1df734a-c0da-4022-9e70-8e1931b083da/actiontemplate-windows-service-restart)

### Manage Windows services runbook {#windowsservices-manage-runbook}

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add one of the templates listed above.
5. Fill out all the parameters in the step. It is best practice to use [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters.

:::hint
All three services use a single parameter of the same name.
:::

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Service Name | Name of the Windows service. | MyService |

With a relatively simple runbook you can empower developers and speed up time to market.

### Windows services samples {#windows-services-samples}

We have a [Target - Windows](https://oc.to/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

## Linux services runbooks {#linux-services-runbooks}

Using a runbook in Octopus can provide a self-service mechanism for developers to restart a service on a Linux system, such as Ubuntu, without having to track down a server administrator.

### Restart Ubuntu service runbook {#linuxservices-restart-ubuntuservice-runbook}

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add a new step template from the community library called **Linux Service - Start, Stop, Restart**.
5. Fill out all the parameters in the step. We recommend using [variables](/docs/projects/variables/) rather than entering the values directly in the step parameters, for instance:

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Service Name | Name of the service to start (case sensitive). | wildfly |
| Action | Start, Stop, Restart. | Restart |
| Sleep in seconds | Length of time in seconds to wait for the service to start. | 5 (default) |

:::warning
Use variables where possible so you can assign scopes to values. This will ensure that things like service name are correct for the environment you're executing the runbook on.
:::

After adding all of the required parameters, click **Save**, and you have a basic runbook to restart a service on Ubuntu. You can add additional steps to add security to your runbooks, such as a [manual intervention](/docs/projects/built-in-step-templates/manual-intervention-and-approvals.md) step for business approvals. 

### Linux service samples {#linux-services-samples}

We have a [Target - Wildfly](https://oc.to/TargetWildflySamplePetClinic) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `PetClinic` project.

## Learn more

- [Linux Service - Start, Stop, Restart community step template](https://library.octopus.com/step-templates/cc2aa1d1-975b-4ac4-a145-094bbd92a2c9/actiontemplate-linux-service-start,-stop,-restart)