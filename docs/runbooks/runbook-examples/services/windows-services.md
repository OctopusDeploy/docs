---
title: Starting, stopping, and restarting Windows services
description: With Octopus Deploy you can start, stop, or restart Windows services with a runbook as part of a routine operations task.
position: 100
---

When developing a Windows Service, starting, stopping, and restarting are all common activities.  However, once deployed to a server, the ability to start, stop, or restart a service requires the user to have either elevated permissions or at least be [granted the ability](http://woshub.com/set-permissions-on-windows-service/#:~:text=In%20the%20list%20of%20services,and%20pause%20permission%20is%20enough.) to remotely perform the operation.  If it's not possible (or feasible) to grant that permission, you may need to fill out a ticket and wait for a server administrator to do it for you, which can kill productivity.  Using a runbook, you can give developers a self-service option to starting, stopping, or restaring a Windows service without having to give them access to the server or performing permissions wizardry.

For Windows Services, there are three Community Step Templates available, one for each action:
- [Start Service](https://library.octopus.com/step-templates/60733bf3-1617-4d85-a40f-4b6a0b9289ef/actiontemplate-windows-service-start)
- [Stop Service](https://library.octopus.com/step-templates/ab3eb4cf-5fc1-4168-be8d-02246d919ca8/actiontemplate-windows-service-stop)
- [Restart Service](https://library.octopus.com/step-templates/d1df734a-c0da-4022-9e70-8e1931b083da/actiontemplate-windows-service-restart)

## Create the Runbook

1. To create a runbook, navigate to **{{Project, Operations, Runbooks, Add Runbook}}**.
2. Give the Runbook a name and click **SAVE**.
3. Click **DEFINE YOUR RUNBOOK PROCESS**, then click **ADD STEP**.
4. Add one of the templates listed above.
5. Fill out all the parameters in the step. It's best practice to use [variables](/docs/projects/variables/index.md) rather than entering the values directly in the step parameters.
:::hint
All three services use a single parameter of the same name
:::

| Parameter  | Description | Example |
| ------------- | ------------- | ------------- |
| Service Name | Name of the Windows Service | MyService|

With a relatively simple runbook you can empower developers and speed up time to market.

## Samples

We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.