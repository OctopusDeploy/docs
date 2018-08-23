---
title: Cleaning up Environments
description: Octopus can automatically remove unwanted machines from environments based on their health status.  
position: 3
---

Octopus can automatically remove unwanted machines from environments based on their health status.  This is useful when an environment is scaled down and orphaned deployment targets remain in Octopus.  Automatic environment clean up can be configured through machine policies.

## Machine Policies {#Cleaningupenvironments-Machinepolicies}

Machine policies are machine related settings that can be applied per-machine. They can be accessed at {{Infrastructure,Machine policies}}.

In this example we will create a machine policy to automatically delete machines when they become unavailable.

## Creating a Machine Policy for Environment Cleanup {#Cleaningupenvironments-Creatingamachinepolicyforenvironmentcleanup}

1. Navigate to the *Machine policies* screen.
2. Create a new machine policy by selecting **Add machine policy**:

![](creating-machine-policy.png "width=500")

3. Name the machine policy "Clean up machines".
4. Change the setting "Clean up unavailable machines" to "Automatically delete unavailable machines".  By selecting this option and setting the time to 0, any machines that fail a health check and become unavailable will be deleted:

![](cleanup-setting.png "width=500")

5. Save the machine policy.

6. Assign the machine policy to a machine by selecting a machine and using the *Policy* drop down to select the machine policy:

![](assign-to-machine.png "width=500")

7. Turn the machine off and run a health check.

In versions prior to **Octopus 2018.1** a separate scheduled task ran periodically and removed machines from Octopus.  As of **Octopus 2018.1**, machine deletion happens as part of health checks.


:::hint
Read more about [machine policies](/docs/infrastructure/machine-policies.md)
:::

## Troubleshooting Automatic Environment Clean Up {#Cleaningupenvironments-Troubleshootingautomaticenvironmentcleanup}

As of **Octopus 2018.1**, machine clean up is part of health checks and machine clean up logs are not stored.  Machine clean up logging is written to the log of the health check task that performed the deletion.  Audit events recording the automatic clean up of machines can be accessed via the {{Configuration,Diagnostics}} page by selecting **Machine clean up events**, which redirects to the audit log of automatic machine removals.

![](deletion-audit.png "width=500")
